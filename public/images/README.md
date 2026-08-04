# 图片目录

请按产品建立独立目录，例如：

```text
public/images/products/cactus-cat-tree/
├── main.webp
├── scene-01.webp
└── detail-01.webp
```

图片确认后，把文件放到对应目录，再到 `src/data/products.ts` 填写以 `/images/` 开头的路径。

在图片与产品资料未确认前，保持字段为 `null` 或空数组，避免公开页面出现失效图片或不准确内容。

## 首页视觉示意

首页图片按用途分在三个目录：

```text
public/images/
├── homepage/  # 首屏、材质与共居空间
├── cats/      # 猫与家的生活照片
└── products/  # 正式产品主图、场景图和细节图
```

当前首页使用的图片包括：

- `homepage/hero-living-room.png`：明亮客厅、透明家具与猫咪首屏
- `homepage/acrylic-material-detail.png`：自然光下的亚克力材质细节
- `cats/cat-family-living-room.png`：猫与家的情感章节

所有首页图片路径、替代文字和视觉示意标记集中在 `src/config/homepage-images.ts`。正式照片到位后，直接替换同名文件即可，不需要修改页面布局。若文件名发生变化，只修改这个配置文件，不要在 `src/app/page.tsx` 分散填写路径。

建议继续使用接近 3:2 的横向图片。正式照片替换前，请确认电脑端和手机端裁切都能完整看见产品与猫。

当前概念图只用于确认家居氛围和页面构图，不代表“仙人掌猫爬架”的真实产品结构。

## 早期方向存档

`public/images/homepage/` 中以 `archive-dark-` 开头的两张图片仅用于追溯早期视觉方向，不代表真实产品：首页不会调用它们。

- `archive-dark-concept.png`
- `archive-dark-material.png`
