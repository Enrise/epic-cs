const codeStyle = {
    name: 'ecs',
    setupDetails: [
        {
            name: 'setup',
            detail: 'composer require --dev symplify/easy-coding-standard'
        },
        {
            name: 'run-local',
            detail: 'bin/ecs check --config=ecs.yml',
        },
        {
            name: 'run-pipeline',
            detail: 'bin/ecs check --config=ecs.yml --no-progress-bar',
        },
    ]
};

module.exports = codeStyle;
