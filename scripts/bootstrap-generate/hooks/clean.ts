#!/usr/bin/env node

import asyncFs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cacheDirsPath = `${__dirname}/cacheDirs.json`;

export default ((async () => {
  if (fs.existsSync(cacheDirsPath)) {
    try {
      const dirs = JSON.parse(await asyncFs.readFile(cacheDirsPath, 'utf8'));
      for await (const dir of dirs) {
        asyncFs.rmdir(dir, { recursive: true });
        console.log('Clean dirs success');
      }
    } catch (e) {
      console.error('Parse cacheDirs.json failed', e);
    }
  }
}))()

