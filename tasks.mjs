'use strict'
import {rmdir} from 'fs/promises'
import {execSync} from 'child_process'
import {randomBytes} from 'crypto'

function getUniqueId2() {
    if (!getUniqueId2.id) getUniqueId2.id = randomBytes(16).toString('hex')
    return getUniqueId2.id
}

function createVsDevCmd(dstDir) {
    const dst = path.join(dstDir, 'vs-dev-cmd.cmd')
    console.log(`target:  ${dst}`)
}

const cmdList = {
    version() {
        console.log(`Welcome to tasks.js!`)
    },
    bareMetal() {
        this.clean()
    },
    async clean() {
        await rmdir('build', {recursive: true})
    },
    cg() {
        // cmakeGenerate
        this.clean()
        execSync(
            `call "c:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Enterprise\\Common7\\Tools\\VsDevCmd.bat" -arch=amd64 -host_arch=amd64 && cmake.exe -Bbuild -G"Ninja Multi-Config"`,
            {stdio: 'inherit'}
        )
    },
    guid() {
        console.log(`getid [${getUniqueId2()}]`)
        console.log(`getid [${getUniqueId2()}]`)
        console.log(`getid [${getUniqueId2()}]`)
    },
    cvs() {
        // createVsDevCmd
        createVsDevCmd('build')
    }
}

function main() {
    const cmd = (process.argv[2] || '').toLowerCase()
    for (const x in cmdList) {
        if (x.toLowerCase() === cmd) {
            return cmdList[x]()
        }
    }
    console.log('Unknown command')
}

main()
