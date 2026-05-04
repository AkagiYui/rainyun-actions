/**
 * Rainyun API Client — 共享 API 客户端
 *
 * 所有 Rainyun Action 通过此模块发起 API 请求。
 * 如需新增 action，在此模块添加对应方法即可。
 */
export interface RequestOptions {
    apiKey?: string;
    body?: unknown;
}
export interface ApiResponse {
    status: number;
    data: unknown;
}
export declare const rca: {
    /**
     * 重启指定 RCA 应用
     * POST /product/rca/app/{appId}/restart
     */
    restartApp(appId: number, apiKey: string): Promise<ApiResponse>;
};
