# EPIC-CS

EPIC-CS is a Team EPIC tool for maintaining consistent code style setup across a variety of projects.

## Global Installation and Usage

It is intended that you install EPIC-CS globally to be used across your projects.
It does not need to be a dependency of your project.

```shell
npm install -g epic-cs
```

To use EPIC-CS, change directory to the root of your project and run:
```shell
epic-cs
```

Then select the setup options you wish to apply to that directory.

The tool will copy over any relevant setup files and create a STYLE.md file containing example commands to run.

## Code Styles


#### Adding Styles

All code style setups are grouped within the lib folder.
lib > group name > code style
e.g. lib/PHP/phpmd

Each code style should have a code style file with a name matching it's folder.
e.g. phpmd.cs.js

Each code style file must export an object with a name:
```js
const codeStyle = {
    name: 'phpcpd'
};

module.exports = codeStyle;
```

#### Copying Files

The code style file can also reference files to be copied:
```js
const path = require('path');
const filePath = path.join(__dirname, 'files');
const fileNames = ['.eslintignore', '.eslintrc.json'];

const filesToCopy = fileNames.map(fileName => ({
    fileName,
    fileSource: `${filePath}/${fileName}`,
    fileDestination: `../${fileName}`,
}));

const codeStyle = {
    name: 'eslint',
    filesToCopy
};

module.exports = codeStyle;
```
Here we define the source path of the files to be copied, and the destination the files will be copied to.
The file destination is relative to the directory the script is run from.

#### Setup Details

Setup can be added to each code style file, in order to populate the STYLE.md file:
```js
const codeStyle = {
    name: 'phpcpd',
    setupDetails: [
        {
            name: 'instructions',
            detail: 'Example instructions here...',
        },
        {
            name: 'setup',
            detail: 'composer require --dev sebastian/phpcpd "^4.0.0"'
        },
        {
            name: 'run-local',
            detail: 'bin/phpcpd src/ tests/ --exclude vendor/',
        },
        {
            name: 'run-pipeline',
            detail: 'bin/phpcpd src/ tests/ --exclude vendor/',
        },
    ]
};

module.exports = codeStyle;
```
