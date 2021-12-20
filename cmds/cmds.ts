import {execSync,spawnSync} from 'child_process'
import FastGlob from 'fast-glob'
import {rmdir, unlink, writeFile} from 'fs/promises'
import OS from 'os'

const fnameSetMsvcEnv = 'set-msvc-env.cmd'

function ignore() {}

// function singleQuotePs(s: string) {
//     return "'" + s.replace(/'/g, "''") + "'"
// }

const commands = {
    bare() {
        this.clean()
        rmdir('cmds/node_modules', {recursive: true})
        rmdir('build', {recursive: true})
        unlink('cmds/package-lock.json').catch(ignore)
        unlink('cmds/pnpm-lock.yaml').catch(ignore)
    },
    clean() {
        unlink('cmds.js.map').catch(ignore)
        unlink('.pnpm-debug.log').catch(ignore)
        unlink('.ninja_log').catch(ignore)
    },
    rebuild() {
        this.bare()
        spawnSync('cmd.exe', ['/c', 'ninja.exe'], {stdio: 'inherit'})
    },

    async createMsvcScript() {
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

        //- Build a list of the environment variable that are different and write them to a PS1 file
        let psTxt: string[] = [`@echo off`, `set SourceDir=_this_dir`, `set BuildDir=_this_dir/build`]
        for (let str of envStrs) {
            str = str.trim()
            const i = str.indexOf('=')
            const name = str.slice(0, i)
            const value = str.slice(i + 1)
            if (i === -1 || name.startsWith('__') || process.env[name] === value) continue
            // psTxt.push(`set ${name}=${singleQuotePs(value)}`)
            psTxt.push(`set ${name}=${value}`)
        }
        await writeFile(fnameSetMsvcEnv, psTxt.join(OS.EOL))
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
