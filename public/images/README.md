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

`public/images/home/` 保存当前暖调首页审核使用的三张视觉示意，不代表真实产品：

- `warm-hero-living-room.png`：明亮客厅、透明家具与猫咪首屏
- `cat-family-living-room.png`：猫与家的情感章节
- `acrylic-warm-detail.png`：自然光下的亚克力材质细节

正式照片到位后，使用相同文件名替换最省事，也可以在 `src/app/page.tsx` 更新路径。建议保持接近 3:2 的横向比例，避免影响现有裁切。

## 早期方向存档

`public/images/concepts/` 中的两张图片仅用于审核首页的空间、材质和版式方向，不代表真实产品：

- `acrylic-cat-furniture-concept.png`：首页主图与空间场景图
- `acrylic-material-detail.png`：亚克力材质细节图

这组图片已经不再由首页调用，保留在仓库中仅用于追溯早期视觉方向。
