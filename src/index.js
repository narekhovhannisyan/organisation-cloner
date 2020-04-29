const { exec } = require('child_process')

const Bluebird = require('bluebird')
const requestPromise = require('request-promise')

const ORGANIZATION = '<YOUR_ORGANIZATION>'
const TOKEN = '<YOUR_TOKEN>'

const gitString = `http://api.github.com/orgs/${ORGANIZATION}/repos?access_token=${TOKEN}`
 
requestPromise(gitString, { headers: { 'User-Agent': 'Awesome-Octocat-App' }, json: true })
  .then((repositories) => repositories.map((repository) => repository.ssh_url))
  .then((repos) => Bluebird.map(repos, (repo) => exec(`git clone ${repo}`)))
