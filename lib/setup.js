const fileSystem = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const handlebars = require('handlebars');

const moveFile = (fileName, fileSource, fileDestination) => {
    const relativeFileDestination = path.join(__dirname, fileDestination);
    fileSystem.copyFile(fileSource, relativeFileDestination, error => {
        if (error) throw error;
    });
};

const moveFiles = (filesToCopy) => {
    filesToCopy.forEach((fileToCopy) => {
        moveFile(fileToCopy.fileName, fileToCopy.fileSource, fileToCopy.fileDestination)
    });
};

const setupCodeStyleElement = (codeStyleFilePath) => {
    const codeStyle = require(codeStyleFilePath);
    if (codeStyle.filesToCopy) moveFiles(codeStyle.filesToCopy);
    return codeStyle;
};

const retrieveCodeStylesElements = (codeStyle) => new Promise((resolve, reject) => {
    fileSystem.readdir(
        path.join(__dirname, `codeStyles/${codeStyle}`),
        (error, codeStyleElements) => {
            if (error) reject(error);
            resolve(codeStyleElements);
        }
    );
});

const setupCodeStyle = (codeStyle) => new Promise( async (resolve) => {
    const codeStyleElements = await retrieveCodeStylesElements(codeStyle);
    resolve(
        codeStyleElements.map((codeStyleElement) => setupCodeStyleElement(
            `./codeStyles/${codeStyle}/${codeStyleElement}/${codeStyleElement}.cs`
        ))
    );
});

const generateCodeStylesArray = new Promise((resolve, reject) => {
    fileSystem.readdir(
        path.join(__dirname, 'codeStyles'),
        (error, codeStyles) => {
            if (error) reject(error);
            resolve(codeStyles.filter(codeStyle => codeStyle !== 'default'));
        }
    );
});

const runSetup = async () => {
    const codeStyles = await generateCodeStylesArray;

    const questions = [
        {
            type: 'checkbox',
            name: 'codeTypes',
            message: 'Please select the code styles your project will use',
            choices: codeStyles
        },
    ];

    const userResponse = await inquirer.prompt(questions);

    const codeStylesToProcess = [
        'default',
        ...userResponse['codeTypes'],
    ];

    const codeStylePromises = await codeStylesToProcess.map(async (codeStyle) => {
        const codeStyleSetup = await setupCodeStyle(codeStyle)
        return { codeStyle, codeStyleSetup };
    });
    const codeStyleSetupDetails = await Promise.all(codeStylePromises);
    generateReadMe(codeStyleSetupDetails);
};

const generateReadMe = (codeStyles) => {
    const fileDestination = path.join(__dirname, '../STYLE.md');
    const templateDestination = path.join(__dirname, 'templates/STYLE.hbs');
    fileSystem.readFile(templateDestination, 'utf8', function(error, templateContent) {
        if (error) throw error;

        const template = handlebars.compile(templateContent);
        const fileContent = template({
            codeStyles
        });

        fileSystem.writeFile(fileDestination, fileContent, error => {
            if (error) throw error;
            console.log('Setup complete, please check the new STYLE.md file in your directory.');
        });
    });
};

module.exports = runSetup;
