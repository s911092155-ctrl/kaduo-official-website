import { assertValidProducts } from "@/data/product-validation";

export type ProductStatus = "draft" | "published" | "archived";
export type ProductImageSourceType =
  | "ai-render"
  | "prototype-photo"
  | "design-drawing";

export type ProductImage = {
  src: string;
  alt: string;
  caption?: string;
  sourceType?: ProductImageSourceType;
  publicApproved?: boolean;
};

export type ProductVideo = {
  cover: ProductImage | null;
  url: string | null;
};

export type ProductFeature = {
  title: string;
  description: string;
};

export type ProductModule = {
  name: string;
  description: string | null;
  image: ProductImage | null;
};

export type ProductColor = {
  name: string;
  value: string | null;
};

export type ProductImages = {
  main: ProductImage | null;
  scenes: ProductImage[];
  details: ProductImage[];
  dimensions: ProductImage[];
  drawings: ProductImage[];
  prototypes: ProductImage[];
};

export type ProductConsultation = {
  title: string;
  description: string;
  primaryLabel: string;
  secondaryLabel: string | null;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  englishName: string | null;
  shortName: string | null;
  series: string | null;
  englishSeries: string | null;
  productType: string | null;
  summary: string | null;
  detailIntroduction: string[];
  designConceptTitle: string | null;
  designConcept: string | null;
  features: ProductFeature[];
  materials: string[];
  materialDescription: string | null;
  materialNote: string | null;
  overallDimensions: string | null;
  dimensionsDisplay: string | null;
  dimensionsNote: string | null;
  weight: string | null;
  suitableCats: string | null;
  images: ProductImages;
  video: ProductVideo;
  modules: ProductModule[];
  moduleNote: string | null;
  colors: ProductColor[];
  prototypeNote: string | null;
  standardExclusions: string[];
  cushionNote: string | null;
  displayNotice: string | null;
  consultation: ProductConsultation | null;
  seoTitle: string | null;
  seoDescription: string | null;
  status: ProductStatus;
  sortOrder: number;
  featuredOnHome: boolean;
  inquiryLabel: string | null;
  /** 仅供本地开发检查版式；生产环境始终隐藏。 */
  developmentOnly: boolean;
};

const emptyVideo: ProductVideo = {
  cover: null,
  url: null,
};

const aiCaption =
  "AI产品效果示意图，最终外观、颜色、配置与细节以实际交付产品为准。";
const drawingCaption =
  "设计图依据当前设计方案整理，最终尺寸、结构与配置以确认版工程图为准。";
const prototypeCaption =
  "产品打样照片，保护膜、临时包装、局部颜色和组件状态不代表最终交付外观。";

/**
 * 产品资料的单一入口。
 *
 * - 未确认的文字使用 null，未确认的列表使用空数组。
 * - 只有 status 为 "published" 且 developmentOnly 为 false 的产品会公开。
 * - developmentOnly 产品只在 npm run dev 时用于检查页面，不代表正式产品。
 */
export const products: Product[] = [
  {
    id: "cactus-haven-acrylic-cat-tree",
    slug: "cactus-haven-acrylic-cat-tree",
    name: "仙人掌乐园亚克力猫爬架",
    englishName: "Cactus Haven Modular Acrylic Cat Tree",
    shortName: "Cactus Haven",
    series: "一体化猫家具系列",
    englishSeries: "Integrated Cat Furniture Collection",
    productType: "模块化亚克力猫爬架 / 人宠共居家具",
    summary:
      "以仙人掌向上生长的形态为灵感，将攀爬、休憩、躲藏、喂食与互动功能整合进一件适合现代客厅陈列的模块化猫家具。",
    detailIntroduction: [
      "仙人掌乐园亚克力猫爬架，以垂直生长的仙人掌轮廓组织猫咪的探索动线。绿色透明亚克力减轻大型猫家具的视觉体量，浅色木质平台为透明结构加入温暖的家居质感。",
      "开放平台、半包裹猫兜、透明猫房、底层猫窝和顶部瞭望猫屋，为猫咪提供不同高度、不同开放程度的活动空间，满足攀爬、观察、休息、躲藏和互动需求。",
    ],
    designConceptTitle: "向上生长的猫咪乐园",
    designConcept:
      "设计以仙人掌向上生长的自然形态为原型，将猫咪的垂直活动路径转化为一组层层递进的家具模块。\n\n透明舱体让猫咪休息时仍能观察家庭环境，也让主人能够近距离感受猫咪的状态。开放平台、半封闭空间和包裹式猫窝共同形成不同安全感层级，使大型猫爬架不再只是宠物设备，而成为人与猫共同生活的空间家具。",
    features: [
      {
        title: "分层垂直攀爬",
        description:
          "多层平台形成由低到高的活动路径，满足猫咪跳跃、登高和观察空间的需求。",
      },
      {
        title: "多种休憩空间",
        description:
          "开放猫椅、半包裹猫兜、透明中舱、底层猫窝和顶部瞭望猫屋，为猫咪提供不同高度与包裹程度的休息选择。",
      },
      {
        title: "一体化喂食区域",
        description:
          "底层预留喂食空间，可用于放置适配的食盆、饮水机或自动喂食设备。",
      },
      {
        title: "躲藏与观察",
        description:
          "透明和半封闭舱体兼顾安全感、躲藏需求和环境观察。",
      },
      {
        title: "抓挠与互动",
        description:
          "设计包含抓球、抓柱和悬挂互动组件的位置，用于回应猫咪磨爪、扑抓和游戏需求。",
      },
      {
        title: "模块化组合",
        description:
          "产品由支撑系统、分层平台和多个功能舱体组合构成，便于生产、安装、维护和后续模块调整。",
      },
      {
        title: "家具化表达",
        description:
          "透明亚克力、自然木色和仙人掌造型共同降低传统猫爬架的设备感，使产品能够进入现代客厅。",
      },
    ],
    materials: [
      "主体采用10mm高透亚克力",
      "绿色透明渐变效果",
      "浅色木质饰面平台",
      "连接与固定结构",
    ],
    materialDescription:
      "10mm高透亚克力构成产品主要透明结构，使大型猫家具能够以更轻盈的视觉状态进入家居空间。浅色木质平台平衡透明材质的冷感，为猫咪的踩踏和休息区域增加温暖的家具质感。",
    materialNote:
      "主体采用10mm高透亚克力，局部结构和装饰组件以最终生产配置为准。",
    overallDimensions: "W1500 × D980 × H2110 mm",
    dimensionsDisplay: "宽约1500mm × 深约980mm × 高约2110mm",
    dimensionsNote:
      "尺寸根据当前确认版设计图汇总，最终生产尺寸以确认版工程图和交付产品为准。",
    weight: null,
    suitableCats: null,
    images: {
      main: {
        src: "/images/products/cactus-haven/ai/ai-living-room-scene.jpg",
        alt: "明亮现代客厅中的仙人掌乐园亚克力猫爬架与猫咪AI效果示意图",
        caption: aiCaption,
        sourceType: "ai-render",
        publicApproved: true,
      },
      scenes: [
        {
          src: "/images/products/cactus-haven/ai/ai-product-overview.jpg",
          alt: "仙人掌乐园亚克力猫爬架整体结构与猫咪AI效果示意图",
          caption: aiCaption,
          sourceType: "ai-render",
          publicApproved: true,
        },
        {
          src: "/images/products/cactus-haven/ai/ai-cat-interaction.jpg",
          alt: "猫咪在透明底层猫窝中的AI互动效果示意图",
          caption: aiCaption,
          sourceType: "ai-render",
          publicApproved: true,
        },
      ],
      details: [
        {
          src: "/images/products/cactus-haven/ai/ai-module-overview.jpg",
          alt: "仙人掌乐园不同休憩模块AI效果示意图",
          caption: aiCaption,
          sourceType: "ai-render",
          publicApproved: true,
        },
        {
          src: "/images/products/cactus-haven/ai/ai-feeding-and-scratch.jpg",
          alt: "底层喂食空间、抓球与休憩位置AI效果示意图",
          caption: aiCaption,
          sourceType: "ai-render",
          publicApproved: true,
        },
      ],
      dimensions: [
        {
          src: "/images/products/cactus-haven/drawings/drawing-overall-dimensions.png",
          alt: "仙人掌乐园整体尺寸与分层支撑设计图",
          caption: drawingCaption,
          sourceType: "design-drawing",
          publicApproved: true,
        },
      ],
      drawings: [
        {
          src: "/images/products/cactus-haven/drawings/drawing-module-system.png",
          alt: "仙人掌乐园各功能舱体与模块设计图",
          caption: drawingCaption,
          sourceType: "design-drawing",
          publicApproved: true,
        },
        {
          src: "/images/products/cactus-haven/drawings/drawing-assembly-steps.png",
          alt: "仙人掌乐园由底层至顶部的组装步骤设计图",
          caption: drawingCaption,
          sourceType: "design-drawing",
          publicApproved: true,
        },
      ],
      prototypes: [
        {
          src: "/images/products/cactus-haven/prototype/prototype-platform-panels.jpg",
          alt: "打样阶段包裹保护膜的浅色木质平台和底板组件",
          caption: prototypeCaption,
          sourceType: "prototype-photo",
          publicApproved: true,
        },
      ],
    },
    video: emptyVideo,
    modules: [
      {
        name: "垂直支撑柱系统",
        description: "连接各层平台，形成产品主要攀爬高度。",
        image: null,
      },
      {
        name: "一层底层生活平台",
        description: "承载底层喂食、休息和活动模块。",
        image: null,
      },
      {
        name: "二层中层活动平台",
        description: "连接猫房、踏步和互动区域。",
        image: null,
      },
      {
        name: "三层高层过渡平台",
        description: "连接顶部猫屋和高层休息模块。",
        image: null,
      },
      {
        name: "一体化喂食房",
        description: "用于集中放置用户自行配置的喂食与饮水设备。",
        image: null,
      },
      {
        name: "底层休憩猫窝",
        description: "提供较低位置、具有包裹感的休息空间。",
        image: null,
      },
      {
        name: "透明中舱猫房",
        description: "兼顾观察、躲藏和中层休息。",
        image: null,
      },
      {
        name: "开放式猫椅",
        description: "具有仙人掌轮廓的开放坐卧平台。",
        image: null,
      },
      {
        name: "悬浮猫兜",
        description: "半开放碗形休息空间。",
        image: null,
      },
      {
        name: "顶部瞭望猫屋",
        description: "位于产品最高位置的仙人掌造型透明舱体。",
        image: null,
      },
      {
        name: "抓球与悬挂互动组件",
        description: "用于抓挠、扑抓和日常互动。",
        image: null,
      },
    ],
    moduleNote:
      "模块名称及组合方式依据当前设计与打样方案整理，最终配置以订单确认内容为准。",
    colors: [{ name: "绿色透明渐变", value: null }],
    prototypeNote:
      "以下照片记录产品打样和组装验证过程。照片中的保护膜、临时包装、局部颜色和组件状态不代表最终交付外观。",
    standardExclusions: [
      "自动喂食器",
      "饮水机",
      "食盆",
      "所有图片中展示的坐垫",
      "猫咪",
      "家居陈设",
    ],
    cushionNote:
      "产品预留坐垫放置空间，但标准产品不包含坐垫。坐垫是否可拆洗、是否可机洗及具体清洁方式，应以消费者自行购买的坐垫说明为准。",
    displayNotice:
      "图片中的猫咪、坐垫、自动喂食器、饮水机、食盆及家居陈设仅作场景展示，不包含在产品标准配置中。",
    consultation: {
      title: "让仙人掌乐园进入你的家",
      description:
        "告诉我们你的居住空间、猫咪数量与使用需求，我们将为你提供产品配置、尺寸确认和摆放建议。",
      primaryLabel: "预约产品咨询",
      secondaryLabel: "获取尺寸与摆放建议",
    },
    seoTitle: "仙人掌乐园亚克力猫爬架 | 凯朵 CATDOW",
    seoDescription:
      "仙人掌乐园亚克力猫爬架以透明亚克力、木质平台和模块化结构，将攀爬、休憩、躲藏、喂食与互动功能融入现代家居空间。",
    status: "draft",
    sortOrder: 10,
    featuredOnHome: false,
    inquiryLabel: "预约产品咨询",
    developmentOnly: false,
  },
  {
    id: "development-transparent-home",
    slug: "development-transparent-home",
    name: "透明共居家具（开发演示）",
    englishName: null,
    shortName: null,
    series: "页面布局演示",
    englishSeries: null,
    productType: null,
    summary: "这条记录只用于检查产品中心与详情页布局，不代表凯朵已经发布的正式产品。",
    detailIntroduction: [],
    designConceptTitle: null,
    designConcept:
      "本段用于检查较长正文、图片与留白的排版关系。正式产品发布前，应替换为经过确认的设计资料。",
    features: [],
    materials: [],
    materialDescription: null,
    materialNote: null,
    overallDimensions: null,
    dimensionsDisplay: null,
    dimensionsNote: null,
    weight: null,
    suitableCats: null,
    images: {
      main: {
        src: "/images/homepage/hero-living-room.png",
        alt: "明亮客厅中的透明宠物家具与猫咪开发演示图，不代表正式产品",
      },
      scenes: [
        {
          src: "/images/cats/cat-family-living-room.png",
          alt: "猫咪与现代家居共同生活的开发演示场景图",
        },
      ],
      details: [
        {
          src: "/images/homepage/acrylic-material-detail.png",
          alt: "透明材质边缘与自然光的开发演示细节图",
        },
      ],
      dimensions: [],
      drawings: [],
      prototypes: [],
    },
    video: emptyVideo,
    modules: [],
    moduleNote: null,
    colors: [],
    prototypeNote: null,
    standardExclusions: [],
    cushionNote: null,
    displayNotice: null,
    consultation: null,
    seoTitle: null,
    seoDescription: null,
    status: "draft",
    sortOrder: 20,
    featuredOnHome: false,
    inquiryLabel: "联系咨询",
    developmentOnly: true,
  },
  {
    id: "development-shared-space",
    slug: "development-shared-space",
    name: "共居空间单元（开发演示）",
    englishName: null,
    shortName: null,
    series: "页面布局演示",
    englishSeries: null,
    productType: null,
    summary: "用于验证增加多款产品后的卡片排序与前后导航，生产环境不会显示。",
    detailIntroduction: [],
    designConceptTitle: null,
    designConcept: null,
    features: [],
    materials: [],
    materialDescription: null,
    materialNote: null,
    overallDimensions: null,
    dimensionsDisplay: null,
    dimensionsNote: null,
    weight: null,
    suitableCats: null,
    images: {
      main: {
        src: "/images/cats/cat-family-living-room.png",
        alt: "猫咪在现代客厅中的共居空间开发演示图",
      },
      scenes: [
        {
          src: "/images/homepage/hero-living-room.png",
          alt: "透明宠物家具进入明亮住宅的开发演示场景图",
        },
      ],
      details: [],
      dimensions: [],
      drawings: [],
      prototypes: [],
    },
    video: emptyVideo,
    modules: [],
    moduleNote: null,
    colors: [],
    prototypeNote: null,
    standardExclusions: [],
    cushionNote: null,
    displayNotice: null,
    consultation: null,
    seoTitle: null,
    seoDescription: null,
    status: "draft",
    sortOrder: 30,
    featuredOnHome: false,
    inquiryLabel: "联系咨询",
    developmentOnly: true,
  },
];

assertValidProducts(products);

function sortProducts(items: Product[]) {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}

export const publishedProducts = sortProducts(
  products.filter(
    (product) => product.status === "published" && !product.developmentOnly,
  ),
);

export const developmentProducts = sortProducts(
  products.filter((product) => product.developmentOnly),
);

export function getVisibleProducts() {
  if (publishedProducts.length > 0) {
    return publishedProducts;
  }

  return process.env.NODE_ENV === "development" ? developmentProducts : [];
}

export function getVisibleProductBySlug(slug: string) {
  if (process.env.NODE_ENV === "development") {
    return (
      products.find(
        (product) => product.slug === slug && product.status !== "archived",
      ) ?? null
    );
  }

  return publishedProducts.find((product) => product.slug === slug) ?? null;
}
