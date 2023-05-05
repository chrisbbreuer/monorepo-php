const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, 'package.json');
const { version } = JSON.parse(fs.readFileSync(packagePath, {
    encoding: 'utf8'
}));

const composerPath = path.join(__dirname, 'composer.json');
const composer = JSON.parse(fs.readFileSync(composerPath, {
    encoding: 'utf8'
}));

composer.version = version;

fs.writeFileSync(composerPath, JSON.stringify(composer, null, 2));

const packagesDir = path.join(__dirname, 'packages');
const packageDirs = fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const packages = packageDirs.map(async packageDir => {
    const packageComposerPath = path.join(packagesDir, packageDir, 'composer.json')

    const packageComposer = JSON.parse(fs.readFileSync(packageComposerPath, {
        encoding: 'utf8'
    }));

    packageComposer.version = version;
    fs.writeFileSync(packageComposerPath, JSON.stringify(packageComposer, null, 2));
});

