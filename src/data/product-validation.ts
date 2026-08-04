import type {Product, ProductImageAsset, ProductTranslation} from "@/data/products";
import {locales, type AppLocale} from "@/i18n/routing";

const productSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const hasText = (value: string | null | undefined): value is string => typeof value === "string" && value.trim().length > 0;

type ImageEntry = {field: string; image: ProductImageAsset; textIndex: number; group: keyof ProductTranslation["imageTexts"]};

function describeProduct(product: Product, index: number) {return `产品 "${product.id || product.slug || `第 ${index + 1} 条记录`}"`;}

function getImages(product: Product): ImageEntry[] {
  const result: ImageEntry[] = [];
  if (product.images.main) result.push({field:"images.main", image:product.images.main, textIndex:0, group:"main"});
  (["scenes","details","dimensions","drawings","prototypes"] as const).forEach((group) => product.images[group].forEach((image,index) => result.push({field:`images.${group}[${index}]`,image,textIndex:index,group})));
  return result;
}

function getImageText(translation: ProductTranslation, entry: ImageEntry) {
  if (entry.group === "main") return translation.imageTexts.main;
  return translation.imageTexts[entry.group][entry.textIndex];
}

export function validateProducts(products: Product[]) {
  const errors: string[] = [];
  const ids = new Map<string, number>();
  const slugs = new Map<string, number>();

  products.forEach((product,index) => {
    const label = describeProduct(product,index);
    if (!hasText(product.id)) errors.push(`${label} · id：不能为空。`);
    else if (ids.has(product.id)) errors.push(`${label} · id：与第 ${(ids.get(product.id) ?? 0)+1} 条产品记录重复。`);
    else ids.set(product.id,index);
    if (!hasText(product.slug)) errors.push(`${label} · slug：不能为空。`);
    else {
      if (!productSlugPattern.test(product.slug)) errors.push(`${label} · slug：只能使用小写英文字母、数字和连字符，且不能以连字符开头或结尾。`);
      if (slugs.has(product.slug)) errors.push(`${label} · slug：与第 ${(slugs.get(product.slug) ?? 0)+1} 条产品记录重复。`);
      else slugs.set(product.slug,index);
    }
    if (product.developmentOnly && product.status === "published") errors.push(`${label} · status：开发演示产品不能设置为 published。`);
    if (!Number.isFinite(product.sortOrder)) errors.push(`${label} · sortOrder：必须是有效数字。`);

    const imageEntries = getImages(product);
    imageEntries.forEach(({field,image}) => {
      const source = image.src.trim();
      if (!source) errors.push(`${label} · ${field}.src：图片路径不能为空。`);
      else if (source.startsWith("/") && !source.startsWith("/images/")) errors.push(`${label} · ${field}.src：本地图片路径必须以 /images/ 开头。`);
    });

    Object.entries(product.translations).forEach(([rawLocale, translation]) => {
      if (!translation) return;
      const locale = rawLocale as AppLocale;
      imageEntries.forEach((entry) => {
        const text = getImageText(translation, entry);
        if (!text || !hasText(text.alt)) errors.push(`${label} · ${locale}.${entry.field}.alt：图片 alt 不能为空。`);
        if (entry.image.sourceType === "ai-render" && (!text || !hasText(text.caption))) errors.push(`${label} · ${locale}.${entry.field}.caption：AI效果图必须填写真实性说明。`);
      });
    });

    if (product.status === "published") {
      locales.forEach((locale) => {
        const translation = product.translations[locale];
        if (!translation) {
          errors.push(`${label} · ${locale}：已发布产品缺少该语言的完整翻译。`);
          return;
        }
        const required = [
          ["name","名称",translation.name],
          ["series","产品系列",translation.series],
          ["summary","简介",translation.summary],
          ["inquiryLabel","咨询按钮",translation.inquiryLabel],
          ["seoTitle","SEO标题",translation.seoTitle],
          ["seoDescription","SEO描述",translation.seoDescription],
        ] as const;
        required.forEach(([field,name,value]) => {if (!hasText(value)) errors.push(`${label} · ${locale}.${field}：发布前必须填写${name}。`);});
        if (!product.images.main) errors.push(`${label} · ${locale}.images.main：发布前必须配置产品主图。`);
        else {
          if (!hasText(translation.imageTexts.main?.alt)) errors.push(`${label} · ${locale}.images.main.alt：发布前必须填写产品主图 alt。`);
          if (product.images.main.publicApproved === false) errors.push(`${label} · images.main.publicApproved：未获公开许可的图片不能作为已发布产品主图。`);
        }
      });
    }
  });
  return errors;
}

export function assertValidProducts(products: Product[]) {
  const errors = validateProducts(products);
  if (!errors.length) return;
  throw new Error(`产品数据校验失败，共发现 ${errors.length} 个问题：\n${errors.map((error,index) => `${index+1}. ${error}`).join("\n")}`);
}
