import * as github from '@actions/github';
import * as githubActionCore from '@actions/core';
import chalk from 'chalk';
import semver from 'semver';
import { execSync } from 'child_process';

githubActionCore.warning('Aiyoo');
githubActionCore.warning('Achoo');
githubActionCore.warning('Dot');
githubActionCore.warning('Okl');
githubActionCore.warning('Huh?');
githubActionCore.error(process.env.GITHUB_REF);

githubActionCore.setOutput('title', 'Release 1.6.0');
