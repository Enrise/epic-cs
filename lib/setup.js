const fileSystem = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const handlebars = require('handlebars');

const moveFile = (fileName, fileSource, fileDestination) => {
    const relativeFileDestination = path.join(process.cwd(), fileDestination);
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

const setupCodeStyle = (codeStyle) => async () => {
    const codeStyleElements = await retrieveCodeStylesElements(codeStyle);
    return codeStyleElements.map(codeStyleElement => setupCodeStyleElement(
        `./codeStyles/${codeStyle}/${codeStyleElement}/${codeStyleElement}.cs`
    ));
};

const generateCodeStylesArray = new Promise((resolve, reject) => {
    fileSystem.readdir(
        path.join(__dirname, 'codeStyles'),
        (error, codeStyles) => {
            if (error) reject(error);
            resolve(codeStyles);
        }
    );
});

const runSetup = async (version) => {
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

    if (userResponse['codeTypes'].length === 0) return console.log('Nothing selected');

    const codeStylePromises = userResponse['codeTypes'].map(async codeStyle => {
        const codeStyleSetup = await setupCodeStyle(codeStyle);
        return { codeStyle, codeStyleSetup };
    });
    const codeStyleSetupDetails = await Promise.all(codeStylePromises);
    generateReadMe(codeStyleSetupDetails, version);
};

const generateReadMe = (codeStyles, version) => {
    const fileDestination = path.join(process.cwd(), 'STYLE.md');
    const templateDestination = path.join(__dirname, 'templates/STYLE.hbs');
    fileSystem.readFile(templateDestination, 'utf8', function(error, templateContent) {
        if (error) throw error;

        const template = handlebars.compile(templateContent);
        const fileContent = template({
            version,
            creationDate: new Date(),
            codeStyles
        });

        fileSystem.writeFile(fileDestination, fileContent, error => {
            if (error) throw error;
            console.log('Setup complete, please check the new STYLE.md file in your directory');
        });
    });
};

module.exports = runSetup;
