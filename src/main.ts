import * as core from '@actions/core';
import * as exec from '@actions/exec';
import {dirname} from 'path';
import {getGitChglog} from './installer';

async function run(): Promise<void> {
  try {
    const version = core.getInput('version') || 'latest';
    const args = core.getInput('args');
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

    core.info('🏃 Running git-chglog...');
    await exec.exec(`${gitChglog} ${args}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
