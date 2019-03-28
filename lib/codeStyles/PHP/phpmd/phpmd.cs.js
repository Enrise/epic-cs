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
    ]
};

module.exports = codeStyle;
