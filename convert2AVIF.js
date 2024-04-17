const { readdir, readFile } = require("node:fs/promises");
const { join } = require('node:path');
const sharp = require('sharp');

const img_folder = join(import.meta.dir, 'projects.kitanga.dev', 'img');

// read all the files in the current directory
const files = await readdir(img_folder);

console.log(files);

files.filter(file => file.includes('.webp')).forEach(async file => {
    readFile(join('projects.kitanga.dev', 'img', file)).then(buf => {
        const sharpFile = sharp(buf);

        sharpFile
            .avif({
                effort: 7
            }).toFile(join('projects.kitanga.dev', 'img', file.replace('.webp', '.avif')));
    });
})