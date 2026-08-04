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
| 产品详情 | `src/app/products/[slug]/page.tsx`（根据产品数据自动生成） |
| 品牌故事 | `src/app/brand/page.tsx` |
| 设计理念 | `src/app/design/page.tsx` |
| 联系咨询 | `src/app/contact/page.tsx` |

网站顶部导航和页脚分别位于 `src/components/site-header.tsx` 与 `src/components/site-footer.tsx`。

## 如何新增产品

产品资料统一保存在 `src/data/products.ts`。产品中心和详情页都会读取这个文件，不需要另外修改页面代码。

非技术用户可以按下面的顺序准备资料：

1. 在 `products` 数组中复制一整条现有记录。建议复制“仙人掌猫爬架”草稿，因为它没有演示内容。
2. 修改 `id` 和 `slug`。两者都使用不重复的小写英文，例如 `cloud-cat-bed`；`slug` 会成为网址的一部分。
3. 填写已经确认的名称、系列、简介、设计理念、功能、材质和规格。
4. 把产品图片放进 `public/images/products/产品英文目录/`，再把路径和 alt 文字填入产品记录。
5. 保持 `status: "draft"`，先在本地检查。
6. 资料与图片全部确认后，再改成 `status: "published"`。

每款产品支持以下资料：

- 中文名称、英文名称、产品系列与简短介绍
- 设计理念、功能特点、材质
- 整体尺寸、重量、适用猫咪信息
- 主图、场景图、细节图和尺寸图
- 视频封面和视频地址
- 模块与配件、产品颜色
- 发布状态、排序、首页推荐开关和咨询按钮文案

未确认的单项资料请保留为 `null`，未确认的列表请保留为 `[]`。页面会自动隐藏没有资料的板块，不要填写猜测内容。

### 怎样发布或隐藏产品

修改产品记录中的 `status`：

- `draft`：草稿。产品中心、详情页和搜索引擎都不会公开它。
- `published`：已发布。产品会按 `sortOrder` 从小到大显示。
- `archived`：已归档。产品从公开页面隐藏，但资料仍保留在文件中。

如果只是临时下线产品，把 `published` 改成 `draft` 即可；不需要删除整条记录。`developmentOnly: true` 只用于本地开发版式检查，生产环境始终隐藏，正式产品必须设为 `false`。

### 发布前必须填写的资料

把产品状态改成 `published` 前，至少要确认并填写：

- 中文名称
- slug
- 产品系列
- 简短介绍
- 产品主图及其 alt 文字
- 咨询按钮文案

项目会在构建时自动检查 `src/data/products.ts`。重复的 `id` 或 `slug`、格式不正确的 slug、空白图片 alt、错误的本地图片路径和无效的 `sortOrder` 也会阻止构建。报错信息会写明产品和字段，先修正数据，再重新运行 `npm run build`。

草稿和归档产品可以保留 `null` 或空数组，不会因为资料尚未完成而构建失败。`developmentOnly: true` 的记录不能设为 `published`。

### 怎样替换产品图片

1. 在 `public/images/products/` 下为产品建立独立目录。
2. 放入主图、场景图、细节图和尺寸图，建议优先使用 WebP 格式。
3. 在 `src/data/products.ts` 的 `images` 中填写每张图的路径与 alt 文字。

示例：

```ts
images: {
  main: {
    src: "/images/products/cloud-cat-bed/main.webp",
    alt: "云朵猫窝在明亮客厅中的正面产品图",
  },
  scenes: [
    {
      src: "/images/products/cloud-cat-bed/scene-01.webp",
      alt: "猫咪在客厅使用云朵猫窝的场景图",
    },
  ],
  details: [],
  dimensions: [],
},
```

alt 文字应简短说明图片里能看到什么，不要加入图片无法证明的材质、功能或认证。替换图片后，运行网站并打开对应产品详情页，分别检查电脑和手机尺寸。

更详细的目录示例见 `public/images/README.md`。

首页当前使用的亚克力家具图片是视觉方向示意，不代表真实产品，也不代表“仙人掌猫爬架”的真实结构。首页图片分别放在 `public/images/homepage/` 与 `public/images/cats/`，路径和替代文字集中维护在 `src/config/homepage-images.ts`。

收到正式照片后，优先使用相同文件名覆盖对应图片，这样不需要改页面布局。如果文件名必须变化，只需要修改 `src/config/homepage-images.ts`。替换后请分别检查电脑端和手机端，确认产品与猫没有被裁切或被文字遮挡。更详细的目录说明见 `public/images/README.md`。

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
