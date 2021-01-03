/**
 * To enforce consistent format on commit messages, we follow conventional commit
 * See https://www.conventionalcommits.org/en/v1.0.0/
 *
 * To validate commit message we use `commitlint`. However we don't like the prompt CLI/wizard
 * that comes with it (@commitlint/prompt). So we want to use [commitizen](http://commitizen.github.io/cz-cli/)
 * as the prompt for better UX/DX.
 *
 * However, this does not read `commitlint` config, so we don't want make this file too complicated. Otherwise,
 * there's no other way than to use native commitlint prompt.
 * See https://github.com/conventional-changelog/commitlint/blob/master/docs/guides-use-prompt.md
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
