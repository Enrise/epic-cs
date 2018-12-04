const codeStyle = {
    name: 'phpcpd',
    setupDetails: [
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
