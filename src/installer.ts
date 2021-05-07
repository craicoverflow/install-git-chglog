import * as util from 'util';
import * as github from './github';
import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';

export async function getGitChglog(version: string): Promise<string> {
  const release: github.GitHubRelease | null = await github.getRelease(version);
  if (!release) {
    throw new Error(`Cannot find git-chglog ${version} release`);
  }

  core.info(`✅ git-chglog version found: ${release.tag_name}`);
  const filename = getFilename(release.tag_name);
  const downloadUrl = util.format(`${github.baseUrl}/releases/download/%s/%s`, release.tag_name, filename);

  core.info(`⬇️ Downloading ${downloadUrl}...`);
  const downloadPath: string = await tc.downloadTool(downloadUrl);
  core.debug(`Downloaded to ${downloadPath}`);

  core.info('📦 Extracting git-chglog...');
  let extPath: string;
  extPath = await tc.extractTar(downloadPath);

  const cachePath: string = await tc.cacheDir(extPath, 'git-chglog-action', release.tag_name.replace(/^v/, ''));
  core.debug(`Cached to ${cachePath}`);

  const exePath: string = 'git-chglog';
  core.debug(`Exe path is ${exePath}`);

  return exePath;
}

const getFilename = (version: string): string => {
  const platform = 'linux';
  const arch = 'amd64';
  const ext = 'tar.gz';
  if (version.charAt(0) === 'v') {
    version = version.slice(1);
  }
  return `git-chglog_${version}_${platform}_${arch}.${ext}`;
};
