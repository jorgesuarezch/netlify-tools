const tasks = arr => arr.join(' && ')

module.exports = {
  hooks: {
    'post-merge': 'yarn',
    'pre-commit': tasks(['lint-staged']),
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
}
