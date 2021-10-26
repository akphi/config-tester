import * as githubActionCore from '@actions/core';

githubActionCore.warning('Aiyoo');
githubActionCore.warning('Achoo');
githubActionCore.warning('Dot');
githubActionCore.warning('Okl');
githubActionCore.warning('Huh?');
githubActionCore.error(process.env.GITHUB_REF);

githubActionCore.setOutput('yob', 1957);
