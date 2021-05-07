import * as core from '@actions/core';
import * as exec from '@actions/exec';
import {dirname} from 'path';
import {getGitChglog} from './installer';

async function run(): Promise<void> {
  try {
    const version = core.getInput('version') || 'latest';
    const workdir = core.getInput('workdir') || '.';
    const gitChglog = await getGitChglog(version);
    core.info(`✅ git-chglog installed successfully`);

    const gitChglogDir = dirname(gitChglog);
    core.addPath(gitChglogDir);
    core.debug(`Added ${gitChglogDir} to PATH`);

    if (workdir && workdir !== '.') {
      core.info(`📂 Using ${workdir} as working directory...`);
      process.chdir(workdir);
    }

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
