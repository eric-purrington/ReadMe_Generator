var inquirer = require("inquirer");
var fs = require("fs");
var axios = require("axios");
var generateMarkdown = require("./utils/generateMarkdown");

// inquirer.prompt(
//     {
//         type: "input",
//         name: "githubUsername",
//         message: "What is your Github username?"
//     }).then(function (input) {
//         let answers = { ...input };
//         const queryURL = `https://api.github.com/users/${answers.githubUsername}`;
//         axios.get(queryURL).then(function (res) {

//             answers.githubURL = res.data.html_url;
//             if (res.data.email !== null) {
//                 answers.githubEmail = res.data.email;
//             } else {
//                 answers.githubEmail = "direct message";
//             }
//         }).catch(err => {
//             console.log("Github not found.");
//             init();
//         });
//         questioningCont(answers);
//     });
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
    message: "Please give a relative path to media file you would like to include from your readme file, if any."
}, {
    type: "input",
    name: "depCommand",
    message: "To run your application, what command should a user use to install necessary dependencies?"
}, {
    type: "input",
    name: "usage",
    message: "What should be done to use your application?"
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
    message: "List any links you would like to include "
}, {
    type: "input",
    name: "acknowledgments",
    message: "List any acknowledgments"
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
                console.log(res.data);
                if (res.data.email !== null) {
                    answers.githubEmail = `or contact me via Email: ${res.data.email}`;
                } else {
                    answers.githubEmail = "";
                }
                
                // User gives nothing
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
    let answers = { ...input, ...data };
    const generatedMarkdown = generateMarkdown.generateMarkdown(answers);
    writeToFile("test.md", generatedMarkdown);
}

init();