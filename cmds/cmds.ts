import {execSync, spawnSync} from 'child_process'
import FastGlob from 'fast-glob'
import {rmdir, unlink, writeFile, mkdir, readFile} from 'fs/promises'
import Path from 'path'
import OS from 'os'

const fnameSetMsvcEnv = 'build/set-msvc-env.cmd'

function ignore() {}

function rmFiles(files: string[]) {
    return files.map(x => unlink(x).catch(ignore))
}

function rmDirs(dirs: string[]) {
    return dirs.map(x => rmdir(x, {recursive: true}).catch(ignore))
}

const commands = {
    async updateFile() {
        const dir = `${process.env['USERPROFILE']}/ctest`
        const fname = `${dir}/number.txt`
        console.log(`This is the file [${fname}]`)
        const txt = (await readFile(fname, {encoding: 'utf8'}).catch(ignore)) ?? ''
        console.log(`Text is [${txt}]`)
        let num: number = Number.parseInt(txt)
        console.log(`Number is [${num}]`)
        if (isNaN(num)) {
            console.log(`Creating dir --------------------------------`)
            await mkdir(dir).catch(ignore)
            console.log(`Made the dir --------------------------------`)
            num = 0
        }
        ++num
        await writeFile(fname, num.toString())
    },
    async bare() {
        await this.clean()
        await Promise.all(rmFiles(['cmds/package-lock.json', 'cmds/pnpm-lock.yaml']))
        await Promise.all(rmDirs(['cmds/node_modules', 'build', 'artifacts']))
    },
    async clean() {
        await Promise.all(rmFiles(['cmds.js.map', '.pnpm-debug.log', '.ninja_log']))
    },
    async build() {
        await this.updateFile()
        const res = await this.createSetMsvcEnv()
        const tmp = await FastGlob(FastGlob.escapePath(Path.posix.normalize(res!.bestName + '../../..')) + '/**/ninja.exe')
        if (tmp[0]) process.env['path'] += `;${Path.dirname(tmp[0])}`
        // spawnSync('cmd.exe', ['/c', 'ninja.exe', '-v', '>artifacts/build.log', '2>&1'], {stdio: 'inherit'})
    },
    async rebuild() {
        await Promise.all(rmDirs(['build', 'artifacts']))
        this.build()
    },
    async createDirs() {
        const dirs = ['build/dbg', 'build/rel', 'artifacts/dbg', 'artifacts/rel']
        const todo = dirs.map(x => mkdir(x, {recursive: true}).catch(ignore))
        await Promise.all(todo)
    },
    async createSetMsvcEnv() {
        this.createDirs()

        //- Find the latest version of VsDevCmd.bat
        let bestVer = 0
        let bestName = ''
        const search: Promise<void>[] = []
        for (let ch = 'A'.charCodeAt(0); ch <= 'Z'.charCodeAt(0); ++ch) {
            let pattern = FastGlob.escapePath(`${String.fromCharCode(ch)}:/Program Files (x86)/Microsoft Visual Studio`) + '/**/Common7/Tools/VsDevCmd.bat'
            search.push(
                FastGlob(pattern)
                    .then(fnames => {
                        for (const fname of fnames) {
                            const ver = Number.parseInt(fname.split('/')[3]!)
                            if (!isNaN(ver) && bestVer < ver) {
                                bestVer = ver
                                bestName = fname
                            }
                        }
                    })
                    .catch(ignore)
            )
        }
        await Promise.all(search)
        if (bestName.length === 0) return

        //- Execute the .bat file and capture the environment variables
        const cmd = `"${bestName}" -no_logo -arch=amd64 -host_arch=amd64 -app_platform=Desktop && set`
        const envStrs = execSync(cmd, {stdio: ['inherit', 'pipe', 'inherit'], encoding: 'utf8'}).split('\n')

        //- Build a list of the environment variable that are different and write them to a cmd file
        let psTxt: string[] = [`@echo off`, `set SourceDir=${process.cwd()}`, `set BuildDir=${process.cwd()}/build`]
        for (let str of envStrs) {
            str = str.trim()
            const i = str.indexOf('=')
            const name = str.slice(0, i)
            let value = str.slice(i + 1)
            if (i === -1 || name.startsWith('__') || process.env[name] === value) continue
            psTxt.push(`set ${name}=${value}`)
        }
        await writeFile(fnameSetMsvcEnv, psTxt.join(OS.EOL))
        return {bestName: bestName}
    }
}

// @ts-ignore 7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type
const fn = commands[process.argv[2]]
if (fn) {
    fn.call(commands)
} else {
    console.error(`Invalid command`)
    console.error(commands)
}
