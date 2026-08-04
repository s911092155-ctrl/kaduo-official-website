# 产品图片

正式产品图片请按产品建立独立目录，例如：

```text
public/images/products/cactus-cat-tree/
├── main.webp
├── scene-01.webp
├── detail-01.webp
├── dimensions.webp
└── video-cover.webp
```

主图、场景图、细节图、尺寸图和视频封面的路径与 alt 文字统一在 `src/data/products.ts` 中维护。没有确认的图片不要建立虚构路径，保持 `null` 或空数组即可。
