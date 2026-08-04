export type HomepageImage = {
  alt: string;
  notice: string;
  src: string;
};

const conceptNotice = "家居与产品视觉示意 / 实物图待替换";

export const homepageImages = {
  hero: {
    src: "/images/homepage/hero-living-room.png",
    alt: "明亮现代客厅中的透明宠物家具、自然光与猫咪视觉示意",
    notice: conceptNotice,
  },
  productSeries: {
    src: "/images/homepage/hero-living-room.png",
    alt: "透明宠物家具进入明亮客厅后的家居场景视觉示意",
    notice: conceptNotice,
  },
  catFamily: {
    src: "/images/cats/cat-family-living-room.png",
    alt: "猫咪在明亮客厅的透明家具旁休息，呈现猫与家的生活关系",
    notice: "猫与家生活场景视觉示意 / 实物图待替换",
  },
  materialDetail: {
    src: "/images/homepage/acrylic-material-detail.png",
    alt: "暖色自然光中的透明亚克力边缘与连接细节视觉示意",
    notice: "材质视觉示意 / 实物图待替换",
  },
  sharedSpace: {
    src: "/images/homepage/hero-living-room.png",
    alt: "透明宠物家具、猫咪与现代客厅共同构成的共居空间视觉示意",
    notice: conceptNotice,
  },
} satisfies Record<string, HomepageImage>;
