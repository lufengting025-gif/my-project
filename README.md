# 贪吃蛇小游戏

这是一个无需构建步骤的纯静态贪吃蛇网页游戏，可用方向键、WASD 或触屏按钮控制。

## 使用 GitHub Pages 发布

仓库包含 `.github/workflows/deploy-pages.yml`，推送到 `main` 分支后会自动部署。

1. 将本仓库推送到 GitHub：`git push -u origin main`。
2. 在 GitHub 仓库中打开 **Settings → Pages**，将 **Build and deployment / Source** 设为 **GitHub Actions**。
3. 等待 `Deploy static site to GitHub Pages` 工作流成功。部署链接会显示在该工作流的 `github-pages` environment 中。

项目页的默认网址为 `https://<GitHub 用户名或组织名>.github.io/<仓库名>/`。
