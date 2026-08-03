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
