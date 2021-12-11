'use strict'

const {rmdirSync} = require('fs')
const {execSync} = require('child_process')

// function unlinkCatch(fpath) {
//     try {
//         unlinkSync(fpath)
//     } catch (e) {
//         if (e.code !== 'ENOENT') throw e
//     }
// }

const cmdList = {
    version() {
        console.log(`Welcome to tasks.js!`)
    },
    bareMetal() {
        this.clean()
    },
    clean() {
        rmdirSync('build', {recursive: true})
    },
    cg() { // cmakeGen
        console.log(`CMake version`)
        execSync('cmake.exe -B buid -G "Ninja Multi-Config"', {stdio: 'inherit'})
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
