# 雨云 GitHub Actions

通过 GitHub Actions 管理[雨云](https://www.rainyun.com)资源。

## 项目结构

```
.
├── src/
│   ├── api.ts              # 共享 API 客户端（封装请求逻辑）
│   └── restart-app.ts      # restart-app action 入口
├── rca/
│   └── restart-app/
│       └── action.yml      # restart-app action 定义
└── package.json
```

- **`src/api.ts`** — 共享 API 客户端，封装了与雨云 API 通信的基础设施。所有 action 通过此模块发起请求，方便后续扩展。
- **`rca/`** — RCA (Rainyun Cloud App) 相关的 action 均放在此目录下，每种操作一个子目录。

## 可用 Actions

### RCA — Restart App

重启指定的 RCA 应用实例。

```yaml
- name: 重启 RCA 应用
  uses: AkagiYui/rainyun-actions/rca/restart-app@main
  with:
    app-id: 114514
    api-key: ${{ secrets.RAINYUN_API_KEY }}
```

**输入**

| 参数      | 必填 | 说明                              |
|-----------|------|-----------------------------------|
| `app-id`  | ✅   | RCA 应用 ID                       |
| `api-key` | ✅   | 雨云 API Key，建议存入 Secrets |

**输出**

| 参数     | 说明                            |
|----------|---------------------------------|
| `result` | API 返回的原始结果（JSON 字符串） |
| `status` | 操作状态: `success` / `failure`  |

## 开发

### 安装依赖

```bash
npm install
```

### 添加新的 Action

1. 在 `src/api.ts` 的对应命名空间（如 `rca`）下新增方法。
2. 新建 `src/your-action.ts` 作为入口，调用 `src/api.ts` 中定义的方法。
3. 在对应分类目录下创建 `action.yml`，例如 `rca/your-action/action.yml`。

### 构建

```bash
npm run build
```
