const codeStyle = {
    name: 'phpcs',
    setupDetails: [
        {
            name: 'setup',
            detail: 'composer require --dev squizlabs/php_codesniffer "^3.3"'
        },
        {
            name: 'run-local',
            detail: 'bin/phpcs --colors --extensions=php --standard=PSR2 --ignore=vendor/ src/ tests/',
        },
        {
            name: 'run-pipeline',
            detail: 'bin/phpcs --colors --extensions=php --standard=PSR2 --ignore=vendor/ src/ tests/',
        },
    ]
};

module.exports = codeStyle;
