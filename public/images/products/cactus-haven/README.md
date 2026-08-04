# 仙人掌乐园产品图片说明

本目录保存“仙人掌乐园亚克力猫爬架”的审核素材。产品仍处于草稿阶段，图片能否用于页面由 `src/data/products.ts` 中的 `sourceType`、`caption` 和 `publicApproved` 共同控制。

## 目录与公开状态

| 当前文件 | 原始文件类型 | 资料类别 | 是否可公开 | 说明 |
| --- | --- | --- | --- | --- |
| `ai/ai-living-room-scene.jpg` | 原始PNG，网页JPG | AI效果图 | 是，须带AI说明 | 产品主视觉与家居场景 |
| `ai/ai-product-overview.jpg` | 原始PNG，网页JPG | AI效果图 | 是，须带AI说明 | 产品整体氛围展示 |
| `ai/ai-module-overview.jpg` | 原始PNG，网页JPG | AI效果图 | 是，须带AI说明 | 模块氛围展示 |
| `ai/ai-feeding-and-scratch.jpg` | 原始PNG，网页JPG | AI效果图 | 是，须带AI说明 | 喂食与互动位置示意 |
| `ai/ai-cat-interaction.jpg` | 原始PNG，网页JPG | AI效果图 | 是，须带AI说明 | 猫咪与透明舱体互动示意 |
| `prototype/prototype-platform-panels.jpg` | 原始PNG，网页JPG | 打样实拍 | 是 | 无清晰人物面部，记录木质平台与底板打样件 |
| `drawings/drawing-overall-dimensions.png` | PDF页面渲染PNG | 设计图 | 是 | 整体尺寸与支撑平台设计依据 |
| `drawings/drawing-module-system.png` | PDF页面渲染PNG | 设计图 | 是 | 功能舱体与模块设计依据 |
| `drawings/drawing-assembly-steps.png` | PDF页面渲染PNG | 设计图 | 是 | 组装步骤设计依据 |

AI 图片在页面中必须统一显示：

> AI产品效果示意图，最终外观、颜色、配置与细节以实际交付产品为准。

## 未导入公开目录的资料

- `A- (10).png` 是 AI 尺寸海报，标注的 `145cm × 82cm × 212cm` 与本次确认的网站尺寸口径不一致，因此不导入、不渲染。网站统一使用 `1500mm × 980mm × 2110mm`。
- `codex-clipboard-c7182690-b3f7-404a-a52c-3675454f01e4.png` 与 `codex-clipboard-57b80ed1-6cd6-4c17-85f3-c41978bed97b.png` 含清晰人物，当前视为 `prototype-photo`、`publicApproved: false`。在获得肖像公开授权或完成只保留产品、手部和安装动作的安全裁剪前，不复制到 `public`，也不在页面显示。
- 其余没有进入页面的 AI 海报包含尚未确认的参数或宣传性文字，暂不作为产品资料引用。

## 后续替换方法

收到正式产品图后，优先沿用现有的小写英文文件名覆盖对应图片。若需要新增文件，请使用小写英文和连字符命名，并在 `src/data/products.ts` 中补充路径、准确的 alt、资料类型、图片说明和公开状态。替换图片不会要求修改详情页布局。
