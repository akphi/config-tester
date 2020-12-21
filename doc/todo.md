# TODO

## Legend Studio

- change generating of `config.json` to points at `legend.finos.` by default, clearly that way
- Handle creation of `version.json`, skip maven?
- `MAYBE` Setup testing `fixtures` (React) or `examples` (Material-UI) - https://stackoverflow.com/questions/12071344/what-are-fixtures-in-programming
- Check with @maoo to enable `Renovate` bot for Studio - https://github.com/apps/renovate
- Learn from babel github-actions script to respond to issue on github
- Create a script to check typescript tsconfig file references using `package.json`, we shouldn't update since the `tsconfig.json` file might contain comments
- Follow commit message format in vue.js
- Consider add section in `CONTRIBUTING.md` on commit message format
  https://github.com/torvalds/subsurface-for-dirk/blob/a48494d2fbed58c751e9b7e8fbff88582f9b2d02/README#L88
- Add `copyrightchecker` script like `Jest`
- Consider tidying up the `paths` of `tsconfig.json` using - `tsconfig-paths` and `tsconfig-paths-webpack-plugin` - https://medium.com/@NiGhTTraX/making-typescript-monorepos-play-nice-with-other-tools-a8d197fdc680
- Consider using conventional-commits
  https://www.conventionalcommits.org/en/v1.0.0-beta.2/#summary
  https://github.com/conventional-changelog/conventional-changelog
  https://github.com/facebook/docusaurus/blob/master/CONTRIBUTING.md#semantic-commit-messages
- Consider using `prettier` - use // prettier-ignore if needs be - now we can probably remove the auto-format after-save in `.vscode/settings` - consider `eslint-plugin-prettier`
- setup `husky` pre-commit hook with `prettier` like `github/babel`

# Further Improvements

- Stylelint
  https://github.com/serhii-havrylenko/monorepo-babel-ts-lerna-starter OR https://medium.com/@serhiihavrylenko/monorepo-setup-with-lerna-typescript-babel-7-and-other-part-1-ac60eeccba5f
  https://stylelint.io/developer-guide/formatters#writing-formatters
- Yarn 2 with `PNP`, or NPM 7
- Code-splitting and lazy-loading - https://github.com/dan-kez/lerna-webpack-example
