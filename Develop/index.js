// require files
var inquirer = require("inquirer");
var fs = require("fs");
var axios = require("axios");
var generateMarkdown = require("./utils/generateMarkdown");

// questions asked after the GitHub has been found
var questionsCont = [
{
    type: "input",
    name: "title",
    message: "What is the name of your project/repo?"
}, {
    type: "input",
    name: "description",
    message: "Please give a description of your project"
}, {
    type: "input",
    name: "mediaFile",
    message: "Include a media (img or gif) file by specifying relative path"
}, {
    type: "input",
    name: "depCommand",
    message: "What command should a user use to install necessary dependencies?"
}, {
    type: "input",
    name: "usage",
    message: "What notes on usage can you give your users?"
}, {
    type: "list",
    name: "license",
    message: "What license would you like to use?",
    choices: ["Apache License 2.0", "GPL", "MIT", "Mozilla Public License 2.0"]
}, {
    type: "input",
    name: "contribution",
    message: "How can other devs contribute?"
}, {
    type: "input",
    name: "testing",
    message: "How would a user run tests on your application?"
}, {
    type: "input",
    name: "othersTech",
    message: "List any links to other tech you would like to include"
}];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Success!");
    });
}

function init() {
    inquirer.prompt(
        {
            type: "input",
            name: "githubUsername",
            message: "What is your Github username?"
        }).then(input => {
            let answers = { ...input };
            const queryURL = `https://api.github.com/users/${answers.githubUsername}`;
            axios.get(queryURL).then(res => {

                answers.githubURL = res.data.html_url;

                // In case GitHub email is null
                if (res.data.email !== null) {
                    answers.githubEmail = `or contact me via Email: ${res.data.email}`;
                } else {
                    answers.githubEmail = "";
                }
                
                // User gives blank username
                if (answers.githubUsername === "") {
                    console.log("Github not found. Please enter valid username.");
                    init();
                } else {
                    inquirer.prompt(questionsCont).then(data => {
                        consolidateData(answers, data);
                    });
                }
            }).catch(function (err) {
                // User gives username that doesn't correlate with GitHub
                console.log("Github not found. Please enter valid username.");
                init();
            });
        });
}

function consolidateData(input, data) {
    // Consolidates data from GitHub and users inputs
    let answers = { ...input, ...data };
    const generatedMarkdown = generateMarkdown.generateMarkdown(answers);
    writeToFile("WeatherDashReadMe.md", generatedMarkdown);
}

init();