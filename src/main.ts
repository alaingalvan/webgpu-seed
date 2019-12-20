import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { parse } from 'webidl2';
import { printModuleMember, outStr } from './idl2tsd';

// 👓 Read `external/gpuweb/spec/index.bs` and extract all idl code
var specPath = join(__dirname, '../external/gpuweb/spec/index.bs');
var specData = readFileSync(specPath, { encoding: 'utf8' });

var idlData = '';
var match = null;
var startMarkup = '<script type=idl>';
var startRegex = new RegExp(startMarkup, 'g');
while ((match = startRegex.exec(specData)) != null) {
    var lengthOfCurrentBlock = 0;
    //find next `</script>`
    var nextMatch = /<\/script>/.exec(specData.substring(match.index + startMarkup.length));
    lengthOfCurrentBlock = nextMatch.index;
    idlData += specData.substr(match.index + startMarkup.length, lengthOfCurrentBlock) + '\n';
}

// 📚 Use grammar to convert webidl to typescript def
try {
    var idlAst = parse(idlData);
    printModuleMember(idlAst);

    // ✍ Write to dist/webgpu.d.ts
    var distDir = join(__dirname, '../dist');
    if (!existsSync(distDir)) {
        mkdirSync(distDir);
    }
    writeFileSync(join(distDir, 'webgpu.d.ts'), outStr);
} catch (e) {
    console.error(e);
}
