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

## 首页概念视觉

`public/images/concepts/` 中的两张图片仅用于审核首页的空间、材质和版式方向，不代表真实产品：

- `acrylic-cat-furniture-concept.png`：首页主图与空间场景图
- `acrylic-material-detail.png`：亚克力材质细节图

收到真实照片后，可使用相同文件名替换，也可以在 `src/app/page.tsx` 更新图片路径。替换图片不会影响页面结构。
