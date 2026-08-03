# kaduo-official-website
kaduo-official-website

这是“凯朵 KADUO”官方网站的第一版基础框架。项目定位是高端宠物家居与人宠共居美学品牌官网，当前包含品牌介绍、产品资料结构和联系页面，不包含登录、支付、购物车或后端管理系统。

> 原仓库 README 的标题与项目名保留在文件开头，下面是在此基础上补充的维护说明。

## 技术组成

- Next.js（App Router）
- React
- TypeScript
- Tailwind CSS
- ESLint

依赖的准确版本记录在 `package-lock.json` 中。建议使用 Node.js 20.9 或更高版本。

## 本地运行

第一次运行时，在项目目录中执行：

```bash
npm install
npm run dev
```

然后在浏览器中打开 <http://localhost:3000>。

日常修改后，可以运行：

```bash
npm run lint
npm run build
```

两条命令都通过，说明代码格式、类型检查和生产构建没有发现阻塞问题。

## 页面位置

| 页面 | 文件 |
| --- | --- |
| 首页 | `src/app/page.tsx` |
| 产品中心 | `src/app/products/page.tsx` |
| 品牌故事 | `src/app/brand/page.tsx` |
| 设计理念 | `src/app/design/page.tsx` |
| 联系咨询 | `src/app/contact/page.tsx` |

网站顶部导航和页脚分别位于 `src/components/site-header.tsx` 与 `src/components/site-footer.tsx`。

## 如何新增产品

所有产品资料统一放在 `src/data/products.ts`。复制现有的“仙人掌猫爬架”对象，再修改内容即可。

每个产品支持这些信息：

- 产品名称与英文名称
- 产品系列、简介与设计理念
- 功能特点、材质与尺寸
- 主图、场景图与细节图
- 模块或配件
- 发布状态

发布状态有三种：

- `draft`：草稿，不会出现在公开产品列表中
- `published`：已发布，会显示在产品中心
- `archived`：已归档，不再公开展示

未确认的资料请保留为 `null` 或空数组，不要填写猜测内容。准备发布时，先补齐经过确认的信息，再把 `status` 改为 `published`。

## 如何替换图片

1. 在 `public/images/products/` 下为产品创建目录。
2. 放入主图、场景图和细节图，建议优先使用 WebP 格式。
3. 在 `src/data/products.ts` 中填写图片路径。

示例：

```ts
images: {
  main: "/images/products/cactus-cat-tree/main.webp",
  scenes: ["/images/products/cactus-cat-tree/scene-01.webp"],
  details: ["/images/products/cactus-cat-tree/detail-01.webp"],
}
```

更详细的目录示例见 `public/images/README.md`。

## 如何检查网站

修改内容后，按下面顺序检查：

1. 运行 `npm run dev`，分别打开五个页面。
2. 缩小浏览器宽度，确认手机尺寸下文字、导航和卡片没有被截断。
3. 点击顶部导航与页脚链接，确认页面可以互相跳转。
4. 运行 `npm run lint`。
5. 运行 `npm run build`。

## 上线前待确认

- 正式域名，并替换 `layout.tsx`、`sitemap.ts` 和 `robots.ts` 中的 `kaduo.example.com`
- 对外邮箱、电话或企业微信
- 品牌正式图片与产品图片
- 产品材质、尺寸、功能和配件资料
- 隐私政策、备案与其他适用的合规信息
