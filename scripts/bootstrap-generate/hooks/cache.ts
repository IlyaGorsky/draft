#!/usr/bin/env node

import path from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const cacheDirsPath = `${__dirname}/cacheDirs.json`

async function hookCleanBeforeWriteFile(args: string[]) {
    const [, , , ...paths] = args
    const dirs = [
        ...new Set(
            paths.map((p: string) => path.relative('./', path.resolve(p, '..')))
        ),
    ]
    try {
        await fs.access(cacheDirsPath, fs.constants.F_OK)
        const cache = await fs.readFile(cacheDirsPath, 'utf-8')
        if (dirs.toString() === JSON.parse(cache).toString()) {
          console.log('Skip')
            return
        }
    } finally {
      try {
          await fs.writeFile(
              cacheDirsPath,
              JSON.stringify([...new Set(dirs)], null, 2),
              'utf8'
          )
          console.log('Write path cacheDirs.json success')
      } catch (e) {
          console.log('Write path cacheDirs.json failed', e)
      }
    }
}

export default hookCleanBeforeWriteFile(process.argv)
