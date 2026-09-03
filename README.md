# 生活碎页

手账拼贴风中文个人博客，使用 Astro、TypeScript、原生 CSS 和 Markdown。所有插画保存在 `public/art`，无需外部图片或字体服务。

公开地址：[生活碎页](https://qiuxiao-jiang.github.io/personal-blog/)。源码仓库：[Qiuxiao-Jiang/personal-blog](https://github.com/Qiuxiao-Jiang/personal-blog)。

## 本地运行

需要 Node.js 22.12+ 或兼容版本，以及 pnpm 10.11.0。

```sh
pnpm install
pnpm dev
pnpm check
pnpm build
pnpm preview
```

开发地址为 http://localhost:4321。当前电脑已有 Node 和 pnpm 运行时；若终端找不到 pnpm，可在 PowerShell 使用：

```powershell
node 'C:\Users\1\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\pnpm\bin\pnpm.cjs' dev
```

当前工作目录保留在 C 盘。安装时将 pnpm 内容存储、缓存和依赖实体目录指定到 D 盘；项目内只保留正常解析所需的依赖链接。其他电脑直接 `pnpm install` 即可，无须沿用这台电脑的 D 盘路径。

## 改成你的主页

编辑 `src/config.ts`，替换站名、姓名、简介、兴趣、位置及联系方式，将 `exampleProfile` 改为 `false`。邮件留空、社交列表为空时，不渲染联系方式。社交链接使用完整的 `https://` 地址。

默认六篇文章均标注「示例文章」。替换正文后，把文章中的 `example` 改为 `false`；不需要的示例可以删除。首页显示最近三篇文章，精选区域显示最新一篇 `featured: true` 的已发布文章；没有精选时显示最新文章。

## 写文章

1. 复制 `templates/post.md` 到 `src/content/posts/my-first-post.md`。
2. 修改标题、日期（YYYY-MM-DD）、摘要和标签。文件名决定永久地址，发布后尽量不改。
3. 编写 Markdown 正文。支持标题、列表、引用、链接、代码块及图片。
4. 完成后设置 `draft: false`，运行 `pnpm check` 和 `pnpm build`。
5. 提交并推送到 `main`，GitHub Actions 自动重新构建发布。

`draft: true` 的文章不会出现在首页、列表、详情路由或站点地图。**草稿文件仍在 Git 仓库里；公开仓库中的草稿不是私密内容。** 日期用于排序，不作为定时发布开关。

封面可省略。使用 `public` 下的文件时写 `cover: "art/fields.svg"`，不要重复填写仓库名。正文图片推荐与文章放在同一目录，用 `![图片描述](./image.jpg)` 引用，Astro 会生成兼容 GitHub Pages 子路径的地址。避免正文写死 `/图片.jpg` 这样的根路径。文内跳转到另一篇文章可使用 `../文章文件名/`。

## 发布到 GitHub Pages

默认目标为 GitHub 账户 `Qiuxiao-Jiang` 的公开仓库 `personal-blog`，最终以实际关联的仓库为准。

1. 在 GitHub 创建一个空仓库 `personal-blog`（不要覆盖已有仓库）。
2. 将本项目提交到该仓库的 `main` 分支。
3. 在仓库 Settings → Pages → Build and deployment 中，将 Source 设为 **GitHub Actions**。
4. 在 Actions 中运行 **Publish journal to GitHub Pages**，或推送一个新提交。
5. 工作流成功后，在部署记录中打开真实网址。

`.github/workflows/deploy.yml` 读取 GitHub Pages 的实际 origin 和 base_path，再执行类型检查、构建和部署。普通项目仓库与 `用户名.github.io` 用户站点均兼容。无需手改页面内的导航地址，也不用提交 `dist`。

本地模拟项目仓库路径：

```powershell
$env:SITE_URL = 'https://Qiuxiao-Jiang.github.io'
$env:BASE_PATH = '/personal-blog'
node 'C:\Users\1\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\pnpm\bin\pnpm.cjs' build
node 'C:\Users\1\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\node_modules\pnpm\bin\pnpm.cjs' preview
```

此时打开 http://localhost:4321/personal-blog/。普通本地预览请清除这两个环境变量，重新构建。

## 验证要点

- 桌面、平板和手机浏览，无横向溢出。
- 标签筛选、浏览器后退、文章直达链接、目录锚点及 404 返回首页可用。
- 页面标题、描述、canonical 和站点地图使用正确部署路径。
- 新增文章自动进入倒序列表，草稿不产生公开页面。
- 网站仅包含阅读功能，没有登录、评论或写作后台。
