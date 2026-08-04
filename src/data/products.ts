import { assertValidProducts } from "@/data/product-validation";

export type ProductStatus = "draft" | "published" | "archived";

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductVideo = {
  cover: ProductImage | null;
  url: string | null;
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
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  englishName: string | null;
  series: string | null;
  summary: string | null;
  designConcept: string | null;
  features: string[];
  materials: string[];
  overallDimensions: string | null;
  weight: string | null;
  suitableCats: string | null;
  images: ProductImages;
  video: ProductVideo;
  modules: ProductModule[];
  colors: ProductColor[];
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

/**
 * 产品资料的单一入口。
 *
 * - 未确认的文字使用 null，未确认的列表使用空数组。
 * - 只有 status 为 "published" 且 developmentOnly 为 false 的产品会公开。
 * - developmentOnly 产品只在 npm run dev 时用于检查页面，不代表正式产品。
 */
export const products: Product[] = [
  {
    id: "cactus-cat-tree",
    slug: "cactus-cat-tree",
    name: "仙人掌猫爬架",
    englishName: null,
    series: null,
    summary: null,
    designConcept: null,
    features: [],
    materials: [],
    overallDimensions: null,
    weight: null,
    suitableCats: null,
    images: {
      main: null,
      scenes: [],
      details: [],
      dimensions: [],
    },
    video: emptyVideo,
    modules: [],
    colors: [],
    status: "draft",
    sortOrder: 10,
    featuredOnHome: false,
    inquiryLabel: null,
    developmentOnly: false,
  },
  {
    id: "development-transparent-home",
    slug: "development-transparent-home",
    name: "透明共居家具（开发演示）",
    englishName: null,
    series: "页面布局演示",
    summary: "这条记录只用于检查产品中心与详情页布局，不代表凯朵已经发布的正式产品。",
    designConcept:
      "本段用于检查较长正文、图片与留白的排版关系。正式产品发布前，应替换为经过确认的设计资料。",
    features: [],
    materials: [],
    overallDimensions: null,
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
    },
    video: emptyVideo,
    modules: [],
    colors: [],
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
    series: "页面布局演示",
    summary: "用于验证增加多款产品后的卡片排序与前后导航，生产环境不会显示。",
    designConcept: null,
    features: [],
    materials: [],
    overallDimensions: null,
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
    },
    video: emptyVideo,
    modules: [],
    colors: [],
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
  return getVisibleProducts().find((product) => product.slug === slug) ?? null;
}
