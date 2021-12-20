'use strict'
import {rmdir, unlink} from 'fs/promises'
import {spawn, spawnSync} from 'child_process'

var isWatch = false

function ignore() {}

const cmdList = {
    //- Cleaning ---------------------------------------------------------------
    async bareMetal() {
        this.clean()
        await rmdir('node_modules', {recursive: true})
        await unlink('package-lock.json').catch(ignore)
        await unlink('pnpm-lock.yaml').catch(ignore)
    },
    async clean() {
        await rmdir('int', {recursive: true})
        await rmdir('bin', {recursive: true})
    },

    //- Building ---------------------------------------------------------------
    tsc() {
        nodeRun(['tsc'])
    },
    esbuild() {
        nodeRun([
            'esbuild',
            '--bundle',
            '--outdir=..',
            '--platform=node',
            '--sourcemap',
            '--target=es2015', // same setting in tsconfig.json
            'cmds.ts'
        ])
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

// Conditionally add --watch to command invocation
function nodeRun(args) {
    args[0] = 'node_modules\\.bin\\' + args[0] + '.cmd'
    if (isWatch) args.push('--watch')
    args.unshift('/c')
    console.log('cmd.exe ' + args.join(' '))
    isWatch ? spawn('cmd.exe', args, {stdio: 'inherit'}) : spawnSync('cmd.exe', args, {stdio: 'inherit'})
}

function main() {
    if (process.argv[3] === '--watch') isWatch = true
    const cmd = (process.argv[2] || '').toLowerCase()
    for (const x in cmdList) {
        if (x.toLowerCase() === cmd) {
            cmdList[x]()
            return
        }
    }
    console.log('Unknown command')
}

main()
