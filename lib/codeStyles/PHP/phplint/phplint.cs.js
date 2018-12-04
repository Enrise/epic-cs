const codeStyle = {
    name: 'php lint',
    setupDetails: [
        {
            name: 'setup',
            detail: 'composer require --dev jakub-onderka/php-parallel-lint "^1.0"'
        },
        {
            name: 'run-local',
            detail: 'bin/parallel-lint src/ tests/',
        },
        {
            name: 'run-pipeline',
            detail: 'bin/parallel-lint src/ tests/',
        },
    ]
};

module.exports = codeStyle;
