'use strict'
import {rmdir, unlink} from 'fs/promises'
import {spawn, spawnSync} from 'child_process'

let isWatch = false

function ignore() {}

const commands = {
    //- Cleaning ---------------------------------------------------------------
    bare() {
        this.clean()
        rmdir('node_modules', {recursive: true})
        unlink('package-lock.json').catch(ignore)
        unlink('pnpm-lock.yaml').catch(ignore)
    },
    clean() {
        unlink('../cmds.js.map').catch(ignore)
    },

    //- Building ---------------------------------------------------------------
    tsc() {
        nodeRun('tsc')
    },
    esbuild() {
        nodeRun('esbuild', '--bundle --outdir=.. --platform=node --sourcemap --target=es2015 cmds.ts')
    },
    build() {
        spawnSync('npm.cmd', ['i'], {stdio: 'inherit'})
        this.tsc()
        this.esbuild()
    },
    start() {
        isWatch = false
        this.build()

        isWatch = true
        this.esbuild()
    }
}

function nodeRun(cmd, args = '') {
    cmd = `node_modules\\.bin\\${cmd}.cmd ${args} ${isWatch ? '--watch' : ''}`
    isWatch ? spawn('cmd.exe', ['/c', cmd], {stdio: 'inherit'}) : spawnSync('cmd.exe', ['/c', cmd], {stdio: 'inherit'})
}

// @ts-ignore 7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type
const fn = commands[process.argv[2]]
if (fn) {
    fn.call(commands)
} else {
    console.error(`Invalid command`)
    console.error(commands)
}
