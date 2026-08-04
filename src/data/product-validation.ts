import type { Product, ProductImage } from "@/data/products";

const productSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type ProductImageEntry = {
  field: string;
  image: ProductImage;
};

function hasText(value: string | null | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function describeProduct(product: Product, index: number) {
  const identity = product.id || product.slug || product.name || `第 ${index + 1} 条记录`;
  return `产品 "${identity}"`;
}

function getProductImages(product: Product): ProductImageEntry[] {
  const images: ProductImageEntry[] = [];

  if (product.images.main) {
    images.push({ field: "images.main", image: product.images.main });
  }

  product.images.scenes.forEach((image, index) => {
    images.push({ field: `images.scenes[${index}]`, image });
  });

  product.images.details.forEach((image, index) => {
    images.push({ field: `images.details[${index}]`, image });
  });

  product.images.dimensions.forEach((image, index) => {
    images.push({ field: `images.dimensions[${index}]`, image });
  });

  product.images.drawings.forEach((image, index) => {
    images.push({ field: `images.drawings[${index}]`, image });
  });

  product.images.prototypes.forEach((image, index) => {
    images.push({ field: `images.prototypes[${index}]`, image });
  });

  if (product.video.cover) {
    images.push({ field: "video.cover", image: product.video.cover });
  }

  product.modules.forEach((module, index) => {
    if (module.image) {
      images.push({ field: `modules[${index}].image`, image: module.image });
    }
  });

  return images;
}

export function validateProducts(products: Product[]) {
  const errors: string[] = [];
  const idOwners = new Map<string, number>();
  const slugOwners = new Map<string, number>();

  products.forEach((product, index) => {
    const productLabel = describeProduct(product, index);

    if (!hasText(product.id)) {
      errors.push(`${productLabel} · id：不能为空。`);
    } else if (idOwners.has(product.id)) {
      errors.push(
        `${productLabel} · id：与第 ${(idOwners.get(product.id) ?? 0) + 1} 条产品记录重复。`,
      );
    } else {
      idOwners.set(product.id, index);
    }

    if (!hasText(product.slug)) {
      errors.push(`${productLabel} · slug：不能为空。`);
    } else {
      if (!productSlugPattern.test(product.slug)) {
        errors.push(
          `${productLabel} · slug：只能使用小写英文字母、数字和连字符，且不能以连字符开头或结尾。`,
        );
      }

      if (slugOwners.has(product.slug)) {
        errors.push(
          `${productLabel} · slug：与第 ${(slugOwners.get(product.slug) ?? 0) + 1} 条产品记录重复。`,
        );
      } else {
        slugOwners.set(product.slug, index);
      }
    }

    if (product.developmentOnly && product.status === "published") {
      errors.push(
        `${productLabel} · status：开发演示产品不能设置为 published。`,
      );
    }

    if (!Number.isFinite(product.sortOrder)) {
      errors.push(`${productLabel} · sortOrder：必须是有效数字。`);
    }

    getProductImages(product).forEach(({ field, image }) => {
      const source = image.src.trim();

      if (!source) {
        errors.push(`${productLabel} · ${field}.src：图片路径不能为空。`);
      } else if (source.startsWith("/") && !source.startsWith("/images/")) {
        errors.push(
          `${productLabel} · ${field}.src：本地图片路径必须以 /images/ 开头。`,
        );
      }

      if (!hasText(image.alt)) {
        errors.push(`${productLabel} · ${field}.alt：图片 alt 不能为空。`);
      }

      if (image.sourceType === "ai-render" && !hasText(image.caption)) {
        errors.push(
          `${productLabel} · ${field}.caption：AI效果图必须填写真实性说明。`,
        );
      }
    });

    if (product.status === "published") {
      const requiredPublishedFields = [
        { field: "name", label: "中文名称", value: product.name },
        { field: "slug", label: "slug", value: product.slug },
        { field: "series", label: "产品系列", value: product.series },
        { field: "summary", label: "简短介绍", value: product.summary },
        {
          field: "inquiryLabel",
          label: "咨询按钮文案",
          value: product.inquiryLabel,
        },
      ];

      requiredPublishedFields.forEach(({ field, label, value }) => {
        if (!hasText(value)) {
          errors.push(`${productLabel} · ${field}：发布前必须填写${label}。`);
        }
      });

      if (!product.images.main) {
        errors.push(`${productLabel} · images.main：发布前必须配置产品主图。`);
      } else if (!hasText(product.images.main.alt)) {
        errors.push(
          `${productLabel} · images.main.alt：发布前必须填写产品主图 alt。`,
        );
      } else if (product.images.main.publicApproved === false) {
        errors.push(
          `${productLabel} · images.main.publicApproved：未获公开许可的图片不能作为已发布产品主图。`,
        );
      }
    }
  });

  return errors;
}

export function assertValidProducts(products: Product[]) {
  const errors = validateProducts(products);

  if (errors.length === 0) {
    return;
  }

  const details = errors.map((error, index) => `${index + 1}. ${error}`).join("\n");

  throw new Error(
    `产品数据校验失败，共发现 ${errors.length} 个问题：\n${details}`,
  );
}
