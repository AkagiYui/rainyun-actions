/**
 * Rainyun API Client — 共享 API 客户端
 *
 * 所有 Rainyun Action 通过此模块发起 API 请求。
 * 如需新增 action，在此模块添加对应方法即可。
 */

import * as https from 'https';

const BASE_URL = 'api.v2.rainyun.com';

/* ------------------------------------------------------------------ */
/*  类型定义                                                           */
/* ------------------------------------------------------------------ */

export interface RequestOptions {
  apiKey?: string;
  body?: unknown;
}

export interface ApiResponse {
  status: number;
  data: unknown;
}

/* ------------------------------------------------------------------ */
/*  底层请求工具                                                       */
/* ------------------------------------------------------------------ */

function request(
  method: string,
  path: string,
  options: RequestOptions = {},
): Promise<ApiResponse> {
  return new Promise((resolve, reject) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (options.apiKey) {
      headers['x-api-key'] = options.apiKey;
    }

    const bodyStr =
      options.body !== undefined ? JSON.stringify(options.body) : null;

    const req = https.request(
      { hostname: BASE_URL, path, method, headers },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (chunk: Buffer) => chunks.push(chunk));
        res.on('end', () => {
          const raw = Buffer.concat(chunks).toString('utf-8');
          let data: unknown;
          try {
            data = JSON.parse(raw);
          } catch {
            data = raw;
          }
          resolve({ status: res.statusCode ?? 0, data });
        });
      },
    );

    req.on('error', (err: Error) => reject(err));

    if (bodyStr) {
      req.write(bodyStr);
    }
    req.end();
  });
}

/* ------------------------------------------------------------------ */
/*  RCA (Rainyun Cloud App) 相关 API                                   */
/* ------------------------------------------------------------------ */

export const rca = {
  /**
   * 重启指定 RCA 应用
   * POST /product/rca/app/{appId}/restart
   */
  restartApp(appId: number, apiKey: string): Promise<ApiResponse> {
    return request('POST', `/product/rca/app/${appId}/restart`, { apiKey });
  },
};
