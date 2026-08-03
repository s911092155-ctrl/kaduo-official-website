export type ProductStatus = "draft" | "published" | "archived";

export type ProductImages = {
  main: string | null;
  scenes: string[];
  details: string[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  englishName: string | null;
  series: string | null;
  summary: string;
  designConcept: string | null;
  features: string[];
  materials: string[];
  dimensions: string[];
  images: ProductImages;
  modules: string[];
  status: ProductStatus;
};

/**
 * 产品数据的单一入口。
 * status 为 "draft" 的产品不会显示在公开产品列表中。
 * 未确认的信息请使用 null 或空数组，不要填写猜测值。
 */
export const products: Product[] = [
  {
    id: "cactus-cat-tree",
    slug: "cactus-cat-tree",
    name: "仙人掌猫爬架",
    englishName: null,
    series: null,
    summary: "产品资料整理中，暂不对外发布。",
    designConcept: null,
    features: [],
    materials: [],
    dimensions: [],
    images: {
      main: null,
      scenes: [],
      details: [],
    },
    modules: [],
    status: "draft",
  },
];

export const publishedProducts = products.filter(
  (product) => product.status === "published",
);
