#!/usr/bin/env node --harmony

const inquirer = require('inquirer')
const fs = require('fs')
const path = require('path')
const creator = require('..')

function requiredQuestion(input) {
  return !input ? false : input.trim().length > 0
}

const templates = fs.readdirSync(path.join(__dirname, '..', 'templates'))
  .filter(file => fs.statSync(path.join(__dirname, '..', 'templates', file)).isDirectory())
  .map(file => file.split(path.sep)[file.split(path.sep).length - 1])

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Component name',
    validate: requiredQuestion
  },
  {
    type: 'input',
    name: 'prefix',
    message: 'Component prefix',
    default: 'mws-v',
    validate: requiredQuestion
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description',
    validate: requiredQuestion
  },
  {
    type: 'input',
    name: 'author',
    message: 'Author',
    default: 'Sebastian Lind',
    validate: requiredQuestion
  },
  {
    type: 'input',
    name: 'authorEmail',
    message: 'Email',
    default: 'sebastian.lind@gmail.com',
    validate: requiredQuestion
  },
  {
    type: 'list',
    name: 'template',
    choices: templates,
    message: 'Component template',
    default: 'vue-simple'
  }
]

inquirer.prompt(questions).then(answers => {
  creator.create(Object.assign({
    cwd: process.cwd()
  }, answers))
}).catch(err => {
  console.log(err)
})
