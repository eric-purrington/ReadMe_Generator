var inquirer = require("inquirer");
var fs = require("fs");
var axios = require("axios");
var generateMarkdown = require("./utils/generateMarkdown");

const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the name of your project?"
    }, {
        type: "input",
        name: "description",
        message: "Describe your project:"
    }, {
        type: "input",
        name: "depCommand",
        message: "What command should a user use to install necessary dependencies?"
    }, {
        type: "input",
        name: "githubUsername",
        message: "What is your Github username?"
    }, {
        type: "list",
        name: "license",
        message: "What license would you like to use?",
        choices: ["MIT", "something else", "other"]
    }
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Success!");
    });
}

function init() {
    inquirer.prompt(questions).then(function (input) {
        let answers = { ...input };

        const queryURL = `https://api.github.com/users/${answers.githubUsername}`;
        axios.get(queryURL).then(function (res) {

            answers.githubURL = res.data.html_url;
            answers.githubEmail = res.data.email;
            answers.githubPic = res.data.avatar_url;
        }).catch(err => {
            console.log("Github not found");
        });
        const generatedMarkdown = generateMarkdown.generateMarkdown(answers);
        writeToFile("test.md", generatedMarkdown);
    });
}

init();
