# kaduo-official-website
kaduo-official-website

这是“凯朵 CATDOW”官方网站的第一版基础框架。项目定位是高端宠物家居与人宠共居美学品牌官网，当前包含品牌介绍、产品资料结构和联系页面，不包含登录、支付、购物车或后端管理系统。

> 原仓库 README 的标题与项目名保留在文件开头，下面是在此基础上补充的维护说明。

## 技术组成

- Next.js（App Router）
- React
- TypeScript
- Tailwind CSS
- next-intl（三语言路由与翻译）
- ESLint

依赖的准确版本记录在 `package-lock.json` 中。建议使用 Node.js 20.9 或更高版本。

## 本地运行

第一次运行时，在项目目录中执行：

```bash
npm install
npm run dev
```

然后在浏览器中打开 <http://localhost:3000>，根路径会进入简体中文首页 `/zh-CN`。繁体中文和英文首页分别是 `/zh-TW` 与 `/en`。

日常修改后，可以运行：

```bash
npm run lint
npm run build
```

两条命令都通过，说明代码格式、类型检查和生产构建没有发现阻塞问题。

## 页面位置

| 页面 | 文件 |
| --- | --- |
| 首页 | `src/app/[locale]/page.tsx` |
| 产品中心 | `src/app/[locale]/products/page.tsx` |
| 产品详情 | `src/app/[locale]/products/[slug]/page.tsx`（根据产品数据自动生成） |
| 品牌故事 | `src/app/[locale]/brand/page.tsx` |
| 设计理念 | `src/app/[locale]/design/page.tsx` |
| 联系咨询 | `src/app/[locale]/contact/page.tsx` |

网站顶部导航和页脚分别位于 `src/components/site-header.tsx` 与 `src/components/site-footer.tsx`。

## 如何新增产品

产品资料统一保存在 `src/data/products.ts`。产品中心和详情页都会读取这个文件，不需要另外修改页面代码。

非技术用户可以按下面的顺序准备资料：

1. 在 `products` 数组中复制一整条现有记录，并把现有内容替换成新产品已经确认的资料。
2. 修改 `id` 和 `slug`。两者都使用不重复的小写英文，例如 `cloud-cat-bed`；`slug` 会成为网址的一部分。
3. 在同一产品的 `translations` 中分别填写 `zh-CN`、`zh-TW` 和 `en`。不要复制三份完整产品对象；状态、slug、排序、图片路径和尺寸数值继续共用。
4. 把产品图片放进 `public/images/products/产品英文目录/`。图片路径写在共用 `images` 中，三种语言的 alt 与 caption 写在各自翻译的 `imageTexts` 中。
5. 保持 `status: "draft"`，先在本地检查。
6. 资料与图片全部确认后，再改成 `status: "published"`。

每款产品支持以下资料：

- 三种语言的名称、系列、产品类型与简短介绍
- 详情简介、设计理念、功能特点、材质说明
- 整体尺寸、重量、适用猫咪信息
- 主图、场景图、细节图、尺寸图、设计图和打样实拍图
- 视频封面和视频地址
- 模块与配件、产品颜色
- 标准配置说明、咨询入口和 SEO 草稿
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

- 名称、产品系列与简短介绍
- 产品主图及该语言的 alt 文字
- 咨询按钮文案
- SEO 标题和 SEO 描述

以上必要字段必须在 `zh-CN`、`zh-TW` 和 `en` 三种语言中全部填写。缺少任何一种语言时，`npm run build` 会指出产品 slug、locale 和缺失字段。公开页面不会自动借用其他语言的内容。

项目会在构建时自动检查 `src/data/products.ts`。重复的 `id` 或 `slug`、格式不正确的 slug、空白图片 alt、错误的本地图片路径和无效的 `sortOrder` 也会阻止构建。AI 效果图还必须填写真实性说明；未获公开许可的图片不能作为已发布产品主图。报错信息会写明产品和字段，先修正数据，再重新运行 `npm run build`。

草稿和归档产品可以保留 `null` 或空数组，不会因为资料尚未完成而构建失败。`developmentOnly: true` 的记录不能设为 `published`。

### 怎样替换产品图片

1. 在 `public/images/products/` 下为产品建立独立目录。
2. 放入主图、场景图、细节图和尺寸图，建议优先使用 WebP 格式。
3. 在 `src/data/products.ts` 的共用 `images` 中填写路径和真实性字段，再在每种语言的 `imageTexts` 中填写 alt 与 caption。

每张图片还可以记录以下可选信息：

- `caption`：显示在图片下方的说明。AI 效果图必须填写。
- `sourceType`：选择 `ai-render`、`prototype-photo` 或 `design-drawing`。
- `publicApproved`：只有确认可以公开时才设为 `true`；设为 `false` 的图片不会在页面渲染。

示例：

```ts
images: {
  main: {
    src: "/images/products/cloud-cat-bed/main.webp",
    sourceType: "prototype-photo",
    publicApproved: true,
  },
  scenes: [
    {
      src: "/images/products/cloud-cat-bed/scene-01.webp",
      sourceType: "prototype-photo",
      publicApproved: true,
    },
  ],
  details: [],
  dimensions: [],
},
```

alt 文字应简短说明图片里能看到什么，不要加入图片无法证明的材质、功能或认证。替换图片后，运行网站并打开对应产品详情页，分别检查电脑和手机尺寸。

草稿产品可在 `npm run dev` 启动后，通过完整语言地址内部审核。例如简体中文预览地址是 `/zh-CN/products/cactus-haven-acrylic-cat-tree`，繁体中文和英文只需将开头改为 `/zh-TW` 或 `/en`。页面会明确显示“草稿预览”，但生产构建不会公开草稿，也不会把草稿地址写入 sitemap。

### 粉色猫茶几 V6 设计阶段资料

粉色猫茶几当前仅保留为内部草稿。其 V6 原始图纸中的脚轮示意仍待设计方修订，品牌最终配置为无脚轮；图纸内的尺寸和部件厚度均属于设计阶段资料，必须在打样和确认版工程资料完成后才能作为正式生产参数发布。

更详细的目录示例见 `public/images/README.md`。

首页当前使用的亚克力家具图片是视觉方向示意，不代表真实产品，也不代表“仙人掌乐园亚克力猫爬架”的真实结构。首页图片分别放在 `public/images/homepage/` 与 `public/images/cats/`，路径集中维护在 `src/config/homepage-images.ts`，三语言替代文字在 `messages/*.json` 中维护。

## 如何维护三种语言

- 界面文字：修改 `messages/zh-CN.json`、`messages/zh-TW.json` 和 `messages/en.json`。
- 产品文字：修改 `src/data/products.ts` 中对应产品的 `translations`。
- 语言与路由：统一配置在 `src/i18n/routing.ts`；站内链接使用 `src/i18n/navigation.ts`，会自动保留当前语言。
- 新增可见文案时，三份 messages 文件应使用相同键名；不要在组件中直接写死某一种语言。
- 繁体中文应按台湾读者习惯校对，英文应保持简洁，不得补充未经确认的产品参数或承诺。

收到正式照片后，优先使用相同文件名覆盖对应图片，这样不需要改页面布局。如果文件名必须变化，只需要修改 `src/config/homepage-images.ts`。替换后请分别检查电脑端和手机端，确认产品与猫没有被裁切或被文字遮挡。更详细的目录说明见 `public/images/README.md`。

## 如何检查网站

修改内容后，按下面顺序检查：

1. 运行 `npm run dev`，分别打开五个页面。
2. 缩小浏览器宽度，确认手机尺寸下文字、导航和卡片没有被截断。
3. 点击顶部导航与页脚链接，确认页面可以互相跳转。
4. 运行 `npm run lint`。
5. 运行 `npm run build`。

## 上线前待确认

- 正式域名，并替换 `layout.tsx`、`sitemap.ts` 和 `robots.ts` 中的 `catdow.example.com`
- 对外邮箱、电话或企业微信
- 品牌正式图片与产品图片
- 产品材质、尺寸、功能和配件资料
- 隐私政策、备案与其他适用的合规信息
