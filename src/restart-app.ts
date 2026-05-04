/**
 * Rainyun Action — RCA Restart App
 *
 * 重启指定的雨云 RCA 应用实例。
 */

import * as core from '@actions/core';
import { rca } from './api';

async function run(): Promise<void> {
  try {
    const appId = Number(core.getInput('app-id', { required: true }));
    const apiKey = core.getInput('api-key', { required: true });

    if (!Number.isFinite(appId)) {
      throw new Error('app-id 必须是有效的数值');
    }

    core.info(`正在重启 RCA 应用: ${appId}`);

    const { status, data } = await rca.restartApp(appId, apiKey);

    if (status >= 200 && status < 300) {
      core.info(`应用 ${appId} 重启成功`);
      core.setOutput('result', JSON.stringify(data));
      core.setOutput('status', 'success');
    } else {
      core.setFailed(`请求失败 (HTTP ${status}): ${JSON.stringify(data)}`);
    }
  } catch (error) {
    core.setFailed(
      `Action 执行失败: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

run();
