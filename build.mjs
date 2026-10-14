import { cp, mkdir, rm, stat } from 'node:fs/promises';

const files = ['index.html', 'style.css', 'script.js'];
const output = new URL('./dist/', import.meta.url);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const file of files) {
  const source = new URL(`./${file}`, import.meta.url);
  const fileInfo = await stat(source);
  if (!fileInfo.isFile()) throw new Error(`${file} is not a file`);
  await cp(source, new URL(`./dist/${file}`, import.meta.url));
}

console.log(`Build complete: ${files.join(', ')} copied to dist/`);
