import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateSync } from 'node:zlib';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(projectRoot, 'dist');

// Generate the two PNG sizes required by browser install prompts without an
// image-processing dependency. The shape matches the monochrome SVG favicon.
const crcTable = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit++) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  return value >>> 0;
});

function pngChunk(type, data) {
  const name = Buffer.from(type);
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  let crc = 0xffffffff;
  for (const byte of Buffer.concat([name, data])) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  const checksum = Buffer.alloc(4);
  checksum.writeUInt32BE((crc ^ 0xffffffff) >>> 0);
  return Buffer.concat([length, name, data, checksum]);
}

function iconPng(size) {
  const pixels = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) {
    const row = y * (size * 4 + 1);
    for (let x = 0; x < size; x++) {
      const px = (x + 0.5) * 64 / size;
      const py = (y + 0.5) * 64 / size;
      const cross = (px >= 28 && px < 36 && py >= 16 && py < 48)
        || (py >= 28 && py < 36 && px >= 16 && px < 48);
      const color = cross ? [212, 212, 216] : [9, 9, 9];
      const offset = row + 1 + x * 4;
      pixels[offset] = color[0];
      pixels[offset + 1] = color[1];
      pixels[offset + 2] = color[2];
      pixels[offset + 3] = 255;
    }
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(size, 0);
  header.writeUInt32BE(size, 4);
  header[8] = 8;
  header[9] = 6;
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', header),
    pngChunk('IDAT', deflateSync(pixels)),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

await mkdir(path.join(dist, 'icons'), { recursive: true });
for (const size of [192, 512]) {
  await writeFile(path.join(dist, 'icons', `icon-${size}.png`), iconPng(size));
}

async function listFiles(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(path.join(directory, entry.name), relative));
    } else if (entry.isFile() && relative !== 'sw.js') {
      files.push(relative);
    }
  }
  return files.sort();
}

const files = await listFiles(dist);
const hash = createHash('sha256');
for (const file of files) {
  hash.update(file);
  hash.update(await readFile(path.join(dist, file)));
}
const cacheName = `anamnese-${hash.digest('hex').slice(0, 16)}`;

const worker = `const CACHE_NAME = ${JSON.stringify(cacheName)};
const CACHE_PREFIX = 'anamnese-';
const PRECACHE = ${JSON.stringify(files)};
const ROOT = self.registration.scope;

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(PRECACHE.map((file) => new URL(file, ROOT)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(ROOT)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    if (request.mode === 'navigate') {
      const page = await cache.match(new URL('index.html', ROOT));
      if (page) return page;
    }
    // Stylesheet and module requests may carry an Origin header while the
    // precache request did not. Static build assets are identical either way.
    const cached = await cache.match(url.href, { ignoreSearch: true, ignoreVary: true });
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response.ok && response.type === 'basic') await cache.put(request, response.clone());
      return response;
    } catch {
      return new Response('Recurso indisponível offline.', { status: 503 });
    }
  })());
});
`;

await writeFile(path.join(dist, 'sw.js'), worker);
console.log(`Offline: ${files.length} arquivos armazenados na versão ${cacheName}.`);
