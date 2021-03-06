const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const generateMarkdown = require("./utils/generateMarkdown");

const writeFileAsync = util.promisify(fs.writeFile);
const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};


function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "What is your GitHub username?"
        },
        {
            type: "input",
            name: "title",
            message: "What is your project title?"
        },
        {
            type: "input",
            name: "description",
            message: "What is a brief description of your project?"
        },
        {
            type: "list",
            name: "color",
            message: "What's your favorite color?",
            choices: ["red", "green", "purple", "black", "magenta"],
        },
        {
            type: "input",
            name: "installation",
            message: "How do you install this program?"
        },
        {
            type: "input",
            name: "usage",
            message: "Enter usage specifications here."
        },
        {
            type: "list",
            name: "license",
            message: "Enter license information here.",
            choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
        },
        {
            type: "input",
            name: "contributing",
            message: "How can someone contribute to this project?"
        },
        {
            type: "input",
            name: "tests",
            message: "How do you run tests?"
        },
        {
            type: "input",
            name: "questions",
            message: "Enter frequently asked questions here."
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?",
            validate: validateEmail,
        },
    ]);
}
async function init() {
    try {
        const answers = await promptUser();

        const md = generateMarkdown(answers);

        await writeFileAsync("README.md", md);

        console.log("Successfully wrote README.md file.");
    } catch (err) {
        console.log(err);
    }
}

init();