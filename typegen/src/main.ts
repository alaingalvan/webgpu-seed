import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { printModuleMember, getOutput } from './idl2tsd';
import convert from './webidl2typescript';

// 👓 Read `external/gpuweb/spec/index.bs` and extract all idl code
let specPath = join(__dirname, '../external/gpuweb/spec/index.bs');
let specData = readFileSync(specPath, { encoding: 'utf8' });

let idlData = '';
let match = null;
let startMarkup = '<script type=idl>';
let startRegex = new RegExp(startMarkup, 'g');
while ((match = startRegex.exec(specData)) != null) {
    let lengthOfCurrentBlock = 0;
    // 🔎 find next `</script>`
    let nextMatch = /<\/script>/.exec(specData.substring(match.index + startMarkup.length));
    lengthOfCurrentBlock = nextMatch.index;
    idlData += specData.substr(match.index + startMarkup.length, lengthOfCurrentBlock) + '\n';
}

// 🧼 Cleanup warnings in WebIDL (sequence attributes, etc.)
idlData = idlData.replace(/attribute sequence/gi, 'attribute FrozenArray');
idlData = idlData.replace(/EventHandler/gi, 'any');

// 📚 Use grammar to convert webidl to typescript def
try {
    // ✍ Write to dist/webgpu.d.ts
    let distDir = join(__dirname, '../dist');
    if (!existsSync(distDir)) {
        mkdirSync(distDir);
    }
    printModuleMember(idlData);
    writeFileSync(join(distDir, 'webgpu.d.ts'), getOutput());
} catch (e) {
    console.error(e);
}
