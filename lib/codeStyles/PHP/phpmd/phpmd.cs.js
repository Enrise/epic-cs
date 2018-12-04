const path = require('path');
const fileName = 'phpmd.xml';
const fileSource = path.join(__dirname, `files/${fileName}`);

const codeStyle = {
    name: 'phpmd',
    setupDetails: [
        {
            name: 'setup',
            detail: 'composer require --dev phpmd/phpmd "^2.6"'
        },
        {
            name: 'run-local',
            detail: 'bin/phpmd src/,tests/ text phpmd.xml --exclude=vendor/',
        },
        {
            name: 'run-pipeline',
            detail: 'bin/phpmd src/,tests/ text phpmd.xml --exclude=vendor/ --minimumpriority 1',
        },
    ],
    filesToCopy: [
        {
            fileName,
            fileSource,
            fileDestination: fileName,
        }
    ]
};

module.exports = codeStyle;
