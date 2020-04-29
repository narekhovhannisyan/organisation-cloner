const { exec } = require('child_process')

const Bluebird = require('bluebird')
const requestPromise = require('request-promise')

/**
 * Gets organization repositories using github API.
 * Then gets `ssh_url` from the repository and clones using ssh.
 * @param {String} organization
 * @param {String} token
 * @returns {Promise.<any>}
 */
const cloneOrganizationRepositories = (organization, token) => {
  const gitHubPath = `http://api.github.com/orgs/${organization}/repos?access_token=${token}`

  return requestPromise(gitHubPath, { headers: { 'User-Agent': 'Awesome-Octocat-App' }, json: true })
    .then((repositories) => repositories.map((repository) => repository.ssh_url))
    .then((repos) => Bluebird.map(repos, (repo) => exec(`git clone ${repo}`)))
}

module.exports = {
  cloneOrganizationRepositories
}
