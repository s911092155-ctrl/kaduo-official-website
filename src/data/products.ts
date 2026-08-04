import {assertValidProducts} from "@/data/product-validation";
import type {AppLocale} from "@/i18n/routing";

export type ProductStatus = "draft" | "published" | "archived";
export type ProductImageSourceType = "ai-render" | "prototype-photo" | "design-drawing";

export type ProductImageAsset = {
  src: string;
  sourceType?: ProductImageSourceType;
  publicApproved?: boolean;
};

export type ProductImageText = {alt: string; caption?: string};
export type ProductImage = ProductImageAsset & ProductImageText;
export type ProductFeature = {title: string; description: string};
export type ProductModule = {name: string; description: string | null; image: ProductImage | null};
export type ProductColor = {name: string; value: string | null};
export type ProductImages<TImage> = {
  main: TImage | null;
  scenes: TImage[];
  details: TImage[];
  dimensions: TImage[];
  drawings: TImage[];
  prototypes: TImage[];
};

export type ProductConsultation = {title: string; description: string; primaryLabel: string; secondaryLabel: string | null};

export type ProductTranslation = {
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
  dimensionsDisplay: string | null;
  dimensionsNote: string | null;
  modules: Array<{name: string; description: string | null}>;
  moduleNote: string | null;
  colors: ProductColor[];
  prototypeNote: string | null;
  standardExclusions: string[];
  cushionNote: string | null;
  displayNotice: string | null;
  consultation: ProductConsultation | null;
  seoTitle: string | null;
  seoDescription: string | null;
  inquiryLabel: string | null;
  imageTexts: ProductImages<ProductImageText>;
};

export type Product = {
  id: string;
  slug: string;
  status: ProductStatus;
  developmentOnly: boolean;
  sortOrder: number;
  featuredOnHome: boolean;
  overallDimensions: string | null;
  weight: string | null;
  suitableCats: string | null;
  images: ProductImages<ProductImageAsset>;
  moduleImages: Array<ProductImageAsset | null>;
  video: {cover: ProductImageAsset | null; url: string | null};
  translations: Partial<Record<AppLocale, ProductTranslation>>;
};

export type LocalizedProduct = Omit<Product, "translations" | "images" | "moduleImages" | "video"> &
  Omit<ProductTranslation, "modules" | "imageTexts"> & {
    images: ProductImages<ProductImage>;
    modules: ProductModule[];
    video: {cover: ProductImage | null; url: string | null};
  };

const aiCaption = {
  "zh-CN": "AI产品效果示意图，最终外观、颜色、配置与细节以实际交付产品为准。",
  "zh-TW": "AI 產品效果示意圖，最終外觀、顏色、配置與細節以實際交付產品為準。",
  en: "AI product concept render. Final appearance, colour, configuration and details are subject to the delivered product.",
} satisfies Record<AppLocale, string>;
const drawingCaption = {
  "zh-CN": "设计图依据当前设计方案整理，最终尺寸、结构与配置以确认版工程图为准。",
  "zh-TW": "設計圖依據目前設計方案整理，最終尺寸、結構與配置以確認版工程圖為準。",
  en: "Design drawing based on the current proposal. Final dimensions, structure and configuration are subject to the approved engineering drawings.",
} satisfies Record<AppLocale, string>;
const prototypeCaption = {
  "zh-CN": "产品打样照片，保护膜、临时包装、局部颜色和组件状态不代表最终交付外观。",
  "zh-TW": "產品打樣照片；保護膜、臨時包裝、局部顏色與組件狀態不代表最終交付外觀。",
  en: "Prototype photograph. Protective film, temporary packaging, local colour and component condition do not represent the final delivered appearance.",
} satisfies Record<AppLocale, string>;

const cactusImages: ProductImages<ProductImageAsset> = {
  main: {src: "/images/products/cactus-haven/ai/ai-living-room-scene.jpg", sourceType: "ai-render", publicApproved: true},
  scenes: [
    {src: "/images/products/cactus-haven/ai/ai-product-overview.jpg", sourceType: "ai-render", publicApproved: true},
    {src: "/images/products/cactus-haven/ai/ai-cat-interaction.jpg", sourceType: "ai-render", publicApproved: true}
  ],
  details: [
    {src: "/images/products/cactus-haven/ai/ai-module-overview.jpg", sourceType: "ai-render", publicApproved: true},
    {src: "/images/products/cactus-haven/ai/ai-feeding-and-scratch.jpg", sourceType: "ai-render", publicApproved: true}
  ],
  dimensions: [{src: "/images/products/cactus-haven/drawings/drawing-overall-dimensions.png", sourceType: "design-drawing", publicApproved: true}],
  drawings: [
    {src: "/images/products/cactus-haven/drawings/drawing-module-system.png", sourceType: "design-drawing", publicApproved: true},
    {src: "/images/products/cactus-haven/drawings/drawing-assembly-steps.png", sourceType: "design-drawing", publicApproved: true}
  ],
  prototypes: [{src: "/images/products/cactus-haven/prototype/prototype-platform-panels.jpg", sourceType: "prototype-photo", publicApproved: true}]
};

function cactusImageTexts(locale: AppLocale, alts: {main: string; scenes: string[]; details: string[]; dimension: string; drawings: string[]; prototype: string}): ProductImages<ProductImageText> {
  return {
    main: {alt: alts.main, caption: aiCaption[locale]},
    scenes: alts.scenes.map((alt) => ({alt, caption: aiCaption[locale]})),
    details: alts.details.map((alt) => ({alt, caption: aiCaption[locale]})),
    dimensions: [{alt: alts.dimension, caption: drawingCaption[locale]}],
    drawings: alts.drawings.map((alt) => ({alt, caption: drawingCaption[locale]})),
    prototypes: [{alt: alts.prototype, caption: prototypeCaption[locale]}],
  };
}

const cactusZhCN: ProductTranslation = {
  name: "仙人掌乐园亚克力猫爬架",
  englishName: "Cactus Haven Modular Acrylic Cat Tree",
  shortName: "Cactus Haven",
  series: "一体化猫家具系列",
  englishSeries: "Integrated Cat Furniture Collection",
  productType: "模块化亚克力猫爬架 / 人宠共居家具",
  summary: "以仙人掌向上生长的形态为灵感，将攀爬、休憩、躲藏、喂食与互动功能整合进一件适合现代客厅陈列的模块化猫家具。",
  detailIntroduction: [
    "仙人掌乐园亚克力猫爬架，以垂直生长的仙人掌轮廓组织猫咪的探索动线。绿色透明亚克力减轻大型猫家具的视觉体量，浅色木质平台为透明结构加入温暖的家居质感。",
    "开放平台、半包裹猫兜、透明猫房、底层猫窝和顶部瞭望猫屋，为猫咪提供不同高度、不同开放程度的活动空间，满足攀爬、观察、休息、躲藏和互动需求。"
  ],
  designConceptTitle: "向上生长的猫咪乐园",
  designConcept: "设计以仙人掌向上生长的自然形态为原型，将猫咪的垂直活动路径转化为一组层层递进的家具模块。\n\n透明舱体让猫咪休息时仍能观察家庭环境，也让主人能够近距离感受猫咪的状态。开放平台、半封闭空间和包裹式猫窝共同形成不同安全感层级，使大型猫爬架不再只是宠物设备，而成为人与猫共同生活的空间家具。",
  features: [
    {title:"分层垂直攀爬",description:"多层平台形成由低到高的活动路径，满足猫咪跳跃、登高和观察空间的需求。"},
    {title:"多种休憩空间",description:"开放猫椅、半包裹猫兜、透明中舱、底层猫窝和顶部瞭望猫屋，为猫咪提供不同高度与包裹程度的休息选择。"},
    {title:"一体化喂食区域",description:"底层预留喂食空间，可用于放置适配的食盆、饮水机或自动喂食设备。"},
    {title:"躲藏与观察",description:"透明和半封闭舱体兼顾安全感、躲藏需求和环境观察。"},
    {title:"抓挠与互动",description:"设计包含抓球、抓柱和悬挂互动组件的位置，用于回应猫咪磨爪、扑抓和游戏需求。"},
    {title:"模块化组合",description:"产品由支撑系统、分层平台和多个功能舱体组合构成，便于生产、安装、维护和后续模块调整。"},
    {title:"家具化表达",description:"透明亚克力、自然木色和仙人掌造型共同降低传统猫爬架的设备感，使产品能够进入现代客厅。"}
  ],
  materials:["主体采用10mm高透亚克力","绿色透明渐变效果","浅色木质饰面平台","连接与固定结构"],
  materialDescription:"10mm高透亚克力构成产品主要透明结构，使大型猫家具能够以更轻盈的视觉状态进入家居空间。浅色木质平台平衡透明材质的冷感，为猫咪的踩踏和休息区域增加温暖的家具质感。",
  materialNote:"主体采用10mm高透亚克力，局部结构和装饰组件以最终生产配置为准。",
  dimensionsDisplay:"宽约1500mm × 深约980mm × 高约2110mm",
  dimensionsNote:"尺寸根据当前确认版设计图汇总，最终生产尺寸以确认版工程图和交付产品为准。",
  modules:[
    {name:"垂直支撑柱系统",description:"连接各层平台，形成产品主要攀爬高度。"},{name:"一层底层生活平台",description:"承载底层喂食、休息和活动模块。"},{name:"二层中层活动平台",description:"连接猫房、踏步和互动区域。"},{name:"三层高层过渡平台",description:"连接顶部猫屋和高层休息模块。"},{name:"一体化喂食房",description:"用于集中放置用户自行配置的喂食与饮水设备。"},{name:"底层休憩猫窝",description:"提供较低位置、具有包裹感的休息空间。"},{name:"透明中舱猫房",description:"兼顾观察、躲藏和中层休息。"},{name:"开放式猫椅",description:"具有仙人掌轮廓的开放坐卧平台。"},{name:"悬浮猫兜",description:"半开放碗形休息空间。"},{name:"顶部瞭望猫屋",description:"位于产品最高位置的仙人掌造型透明舱体。"},{name:"抓球与悬挂互动组件",description:"用于抓挠、扑抓和日常互动。"}
  ],
  moduleNote:"模块名称及组合方式依据当前设计与打样方案整理，最终配置以订单确认内容为准。",
  colors:[{name:"绿色透明渐变",value:null}],
  prototypeNote:"以下照片记录产品打样和组装验证过程。照片中的保护膜、临时包装、局部颜色和组件状态不代表最终交付外观。",
  standardExclusions:["自动喂食器","饮水机","食盆","所有图片中展示的坐垫","猫咪","家居陈设"],
  cushionNote:"产品预留坐垫放置空间，但标准产品不包含坐垫。坐垫是否可拆洗、是否可机洗及具体清洁方式，应以消费者自行购买的坐垫说明为准。",
  displayNotice:"图片中的猫咪、坐垫、自动喂食器、饮水机、食盆及家居陈设仅作场景展示，不包含在产品标准配置中。",
  consultation:{title:"让仙人掌乐园进入你的家",description:"告诉我们你的居住空间、猫咪数量与使用需求，我们将为你提供产品配置、尺寸确认和摆放建议。",primaryLabel:"预约产品咨询",secondaryLabel:"获取尺寸与摆放建议"},
  seoTitle:"仙人掌乐园亚克力猫爬架 | 凯朵 CATDOW",
  seoDescription:"仙人掌乐园亚克力猫爬架以透明亚克力、木质平台和模块化结构，将攀爬、休憩、躲藏、喂食与互动功能融入现代家居空间。",
  inquiryLabel:"预约产品咨询",
  imageTexts:cactusImageTexts("zh-CN",{main:"明亮现代客厅中的仙人掌乐园亚克力猫爬架与猫咪AI效果示意图",scenes:["仙人掌乐园亚克力猫爬架整体结构与猫咪AI效果示意图","猫咪在透明底层猫窝中的AI互动效果示意图"],details:["仙人掌乐园不同休憩模块AI效果示意图","底层喂食空间、抓球与休憩位置AI效果示意图"],dimension:"仙人掌乐园整体尺寸与分层支撑设计图",drawings:["仙人掌乐园各功能舱体与模块设计图","仙人掌乐园由底层至顶部的组装步骤设计图"],prototype:"打样阶段包裹保护膜的浅色木质平台和底板组件"})
};

const cactusZhTW: ProductTranslation = {
  ...cactusZhCN,
  name:"仙人掌樂園壓克力貓爬架", series:"一體化貓傢俱系列", productType:"模組化壓克力貓爬架 / 人寵共居傢俱",
  summary:"以仙人掌向上生長的形態為靈感，將攀爬、休憩、躲藏、餵食與互動功能整合成一件適合現代客廳陳列的模組化貓傢俱。",
  detailIntroduction:["仙人掌樂園壓克力貓爬架，以垂直生長的仙人掌輪廓組織貓咪的探索動線。綠色透明壓克力減輕大型貓傢俱的視覺量體，淺色木質平台則為透明結構加入溫暖的居家質感。","開放平台、半包覆貓兜、透明貓屋、底層貓窩與頂部瞭望貓屋，提供不同高度與開放程度的活動空間，回應攀爬、觀察、休息、躲藏與互動需求。"],
  designConceptTitle:"向上生長的貓咪樂園", designConcept:"設計以仙人掌向上生長的自然形態為原型，將貓咪的垂直活動路徑轉化為層層遞進的傢俱模組。\n\n透明艙體讓貓咪休息時仍能觀察家中環境，也讓主人能近距離感受牠的狀態。開放平台、半封閉空間與包覆式貓窩共同形成不同安全感層級，讓大型貓爬架不只是寵物設備，也成為人與貓共同生活的空間傢俱。",
  features:[{title:"分層垂直攀爬",description:"多層平台形成由低至高的活動路徑，回應貓咪跳躍、登高與觀察空間的需求。"},{title:"多種休憩空間",description:"開放貓椅、半包覆貓兜、透明中艙、底層貓窩與頂部瞭望貓屋，提供不同高度與包覆程度的休息選擇。"},{title:"一體化餵食區域",description:"底層預留餵食空間，可放置相容的食盆、飲水機或自動餵食設備。"},{title:"躲藏與觀察",description:"透明與半封閉艙體兼顧安全感、躲藏需求與環境觀察。"},{title:"抓撓與互動",description:"設計保留抓球、抓柱與懸掛互動組件的位置，回應磨爪、撲抓與遊戲需求。"},{title:"模組化組合",description:"產品由支撐系統、分層平台與多個功能艙體組成，方便生產、安裝、維護與後續模組調整。"},{title:"傢俱化表達",description:"透明壓克力、自然木色與仙人掌造型共同降低傳統貓爬架的設備感，讓產品融入現代客廳。"}],
  materials:["主體採用10mm高透壓克力","綠色透明漸層效果","淺色木質飾面平台","連接與固定結構"], materialDescription:"10mm高透壓克力構成主要透明結構，讓大型貓傢俱能以更輕盈的視覺狀態融入居家空間。淺色木質平台平衡透明材質的冷感，為貓咪踩踏與休息區域加入溫暖的傢俱質感。", materialNote:"主體採用10mm高透壓克力，局部結構與裝飾組件以最終生產配置為準。",
  dimensionsDisplay:"寬約1500mm × 深約980mm × 高約2110mm", dimensionsNote:"尺寸依目前確認版設計圖彙整，最終生產尺寸以確認版工程圖與交付產品為準。",
  modules:[{name:"垂直支撐柱系統",description:"連接各層平台，形成產品主要攀爬高度。"},{name:"一層底層生活平台",description:"承載底層餵食、休息與活動模組。"},{name:"二層中層活動平台",description:"連接貓屋、踏階與互動區域。"},{name:"三層高層過渡平台",description:"連接頂部貓屋與高層休息模組。"},{name:"一體化餵食房",description:"集中放置使用者自行配置的餵食與飲水設備。"},{name:"底層休憩貓窩",description:"提供較低位置且具包覆感的休息空間。"},{name:"透明中艙貓屋",description:"兼顧觀察、躲藏與中層休息。"},{name:"開放式貓椅",description:"具有仙人掌輪廓的開放坐臥平台。"},{name:"懸浮貓兜",description:"半開放碗形休息空間。"},{name:"頂部瞭望貓屋",description:"位於產品最高位置的仙人掌造型透明艙體。"},{name:"抓球與懸掛互動組件",description:"用於抓撓、撲抓與日常互動。"}],
  moduleNote:"模組名稱與組合方式依目前設計及打樣方案整理，最終配置以訂單確認內容為準。", colors:[{name:"綠色透明漸層",value:null}], prototypeNote:"以下照片記錄產品打樣與組裝驗證過程。照片中的保護膜、臨時包裝、局部顏色與組件狀態不代表最終交付外觀。", standardExclusions:["自動餵食器","飲水機","食盆","所有圖片中展示的坐墊","貓咪","居家陳設"], cushionNote:"產品預留坐墊放置空間，但標準產品不包含坐墊。坐墊是否可拆洗、可否機洗及具體清潔方式，應以消費者自行購買的坐墊說明為準。", displayNotice:"圖片中的貓咪、坐墊、自動餵食器、飲水機、食盆及居家陳設僅供情境展示，不包含在產品標準配置中。",
  consultation:{title:"讓仙人掌樂園走進你的家",description:"告訴我們你的居住空間、貓咪數量與使用需求，我們將提供產品配置、尺寸確認與擺放建議。",primaryLabel:"預約產品諮詢",secondaryLabel:"取得尺寸與擺放建議"}, seoTitle:"仙人掌樂園壓克力貓爬架 | 凱朵 CATDOW", seoDescription:"仙人掌樂園壓克力貓爬架以透明壓克力、木質平台與模組化結構，將攀爬、休憩、躲藏、餵食與互動功能融入現代居家空間。", inquiryLabel:"預約產品諮詢",
  imageTexts:cactusImageTexts("zh-TW",{main:"明亮現代客廳中的仙人掌樂園壓克力貓爬架與貓咪 AI 效果示意圖",scenes:["仙人掌樂園壓克力貓爬架整體結構與貓咪 AI 效果示意圖","貓咪在透明底層貓窩中的 AI 互動效果示意圖"],details:["仙人掌樂園不同休憩模組 AI 效果示意圖","底層餵食空間、抓球與休憩位置 AI 效果示意圖"],dimension:"仙人掌樂園整體尺寸與分層支撐設計圖",drawings:["仙人掌樂園各功能艙體與模組設計圖","仙人掌樂園由底層至頂部的組裝步驟設計圖"],prototype:"打樣階段包覆保護膜的淺色木質平台與底板組件"})
};

const cactusEn: ProductTranslation = {
  ...cactusZhCN,
  name:"Cactus Haven Modular Acrylic Cat Tree", englishName:"Cactus Haven Modular Acrylic Cat Tree", series:"Integrated Cat Furniture Collection", englishSeries:"Integrated Cat Furniture Collection", productType:"Modular acrylic cat tree / Furniture for shared living",
  summary:"Inspired by the upward growth of a cactus, Cactus Haven brings climbing, resting, hiding, feeding and play into one modular piece designed for a modern living room.",
  detailIntroduction:["Cactus Haven uses the vertical outline of a growing cactus to organise a cat's path of exploration. Transparent green acrylic reduces the visual weight of the large structure, while light wood-finish platforms bring warmth to the furniture.","Open platforms, a semi-enclosed hammock, a transparent middle chamber, a low resting pod and a lookout house offer activity spaces at different heights and degrees of enclosure—for climbing, observing, resting, hiding and interaction."],
  designConceptTitle:"A cat's playground, growing upward", designConcept:"The design begins with the natural form of a cactus growing upward, translating a cat's vertical route into a progressive family of furniture modules.\n\nTransparent chambers let cats observe the household while they rest and allow people to stay close to their state. Open platforms, semi-enclosed spaces and enveloping pods offer different levels of security, shifting the cat tree from pet equipment towards furniture for a life shared by people and cats.",
  features:[{title:"Layered vertical climbing",description:"Platforms form a path from low to high, supporting jumping, climbing and observing the room."},{title:"Varied resting spaces",description:"An open chair, semi-enclosed hammock, transparent middle chamber, low pod and upper lookout house offer different heights and levels of enclosure."},{title:"Integrated feeding area",description:"The lower level reserves space for compatible bowls, a water fountain or an automatic feeder supplied by the owner."},{title:"Hiding and observation",description:"Transparent and semi-enclosed chambers balance security, retreat and a view of the surroundings."},{title:"Scratching and play",description:"The design provides positions for scratching balls, posts and hanging play elements."},{title:"Modular composition",description:"A support system, layered platforms and functional chambers combine for production, installation, maintenance and later module adjustment."},{title:"Furniture-led expression",description:"Transparent acrylic, natural wood tones and the cactus form reduce the equipment-like character of a conventional cat tree."}],
  materials:["Primary structure in 10 mm clear acrylic","Transparent green gradient effect","Light wood-finish platforms","Connection and fixing structure"], materialDescription:"The main transparent structure uses 10 mm clear acrylic, helping a large piece of cat furniture sit more lightly within the home. Light wood-finish platforms temper the coolness of the transparent material and add warmth where cats step and rest.", materialNote:"The primary structure uses 10 mm clear acrylic. Local structural and decorative components are subject to the final production configuration.",
  dimensionsDisplay:"Approx. W1500 × D980 × H2110 mm", dimensionsNote:"Dimensions are compiled from the current confirmed design drawing. Final production dimensions are subject to approved engineering drawings and the delivered product.",
  modules:[{name:"Vertical support-column system",description:"Connects the platforms and establishes the main climbing height."},{name:"Lower living platform",description:"Supports feeding, resting and activity modules at floor level."},{name:"Middle activity platform",description:"Connects the chamber, steps and interaction area."},{name:"Upper transition platform",description:"Connects the lookout house and upper resting modules."},{name:"Integrated feeding house",description:"Reserves a central area for feeding and drinking equipment selected by the owner."},{name:"Lower resting pod",description:"Offers a lower, more enveloping place to rest."},{name:"Transparent middle chamber",description:"Combines observation, retreat and mid-level rest."},{name:"Open cat chair",description:"An open sitting and resting platform shaped by the cactus outline."},{name:"Suspended hammock",description:"A semi-open bowl-shaped resting space."},{name:"Upper lookout house",description:"A transparent cactus-shaped chamber at the highest point."},{name:"Scratching ball and hanging play elements",description:"Positions for scratching, pouncing and everyday play."}],
  moduleNote:"Module names and combinations are organised from the current design and prototype plan. Final configuration is subject to the confirmed order.", colors:[{name:"Transparent green gradient",value:null}], prototypeNote:"The following photographs document prototype and assembly validation. Protective film, temporary packaging, local colour and component condition do not represent the final delivered appearance.", standardExclusions:["Automatic feeder","Water fountain","Food bowls","Cushions shown in images","Cats","Home furnishings"], cushionNote:"Space is reserved for cushions, but cushions are not included with the standard product. Removability, machine washing and care depend on the cushion selected by the customer.", displayNotice:"Cats, cushions, automatic feeders, water fountains, food bowls and home furnishings shown in images are for scene presentation only and are not included in the standard product configuration.",
  consultation:{title:"Bring Cactus Haven into your home",description:"Tell us about your living space, number of cats and intended use. We will help with product configuration, dimension confirmation and placement advice.",primaryLabel:"Book a product consultation",secondaryLabel:"Request sizing and placement advice"}, seoTitle:"Cactus Haven Modular Acrylic Cat Tree | CATDOW", seoDescription:"Cactus Haven combines transparent acrylic, wood-finish platforms and a modular structure for climbing, resting, hiding, feeding and play within a modern home.", inquiryLabel:"Book a product consultation",
  imageTexts:cactusImageTexts("en",{main:"AI concept render of Cactus Haven and a cat in a bright contemporary living room",scenes:["AI concept render of the complete Cactus Haven structure with a cat","AI concept render of a cat inside the transparent lower resting pod"],details:["AI concept render showing Cactus Haven resting modules","AI concept render showing the lower feeding area, scratching ball and resting spaces"],dimension:"Design drawing of Cactus Haven overall dimensions and layered supports",drawings:["Design drawing of Cactus Haven functional chambers and modules","Design drawing of the Cactus Haven assembly sequence from lower to upper levels"],prototype:"Light wood-finish platforms and base panels wrapped in protective film during prototyping"})
};

function developmentTranslation(name: string, summary: string, mainAlt: string): ProductTranslation {
  return {name,englishName:null,shortName:null,series:"页面布局演示",englishSeries:null,productType:null,summary,detailIntroduction:[],designConceptTitle:null,designConcept:null,features:[],materials:[],materialDescription:null,materialNote:null,dimensionsDisplay:null,dimensionsNote:null,modules:[],moduleNote:null,colors:[],prototypeNote:null,standardExclusions:[],cushionNote:null,displayNotice:null,consultation:null,seoTitle:null,seoDescription:null,inquiryLabel:"联系咨询",imageTexts:{main:{alt:mainAlt},scenes:[],details:[],dimensions:[],drawings:[],prototypes:[]}};
}

export const products: Product[] = [
  {id:"cactus-haven-acrylic-cat-tree",slug:"cactus-haven-acrylic-cat-tree",status:"draft",developmentOnly:false,sortOrder:10,featuredOnHome:false,overallDimensions:"W1500 × D980 × H2110 mm",weight:null,suitableCats:null,images:cactusImages,moduleImages:Array(11).fill(null),video:{cover:null,url:null},translations:{"zh-CN":cactusZhCN,"zh-TW":cactusZhTW,en:cactusEn}},
  {id:"development-transparent-home",slug:"development-transparent-home",status:"draft",developmentOnly:true,sortOrder:20,featuredOnHome:false,overallDimensions:null,weight:null,suitableCats:null,images:{main:{src:"/images/homepage/hero-living-room.png"},scenes:[],details:[],dimensions:[],drawings:[],prototypes:[]},moduleImages:[],video:{cover:null,url:null},translations:{"zh-CN":developmentTranslation("透明共居家具（开发演示）","这条记录只用于检查产品中心与详情页布局，不代表凯朵已经发布的正式产品。","明亮客厅中的透明宠物家具与猫咪开发演示图，不代表正式产品")}},
  {id:"development-shared-space",slug:"development-shared-space",status:"draft",developmentOnly:true,sortOrder:30,featuredOnHome:false,overallDimensions:null,weight:null,suitableCats:null,images:{main:{src:"/images/cats/cat-family-living-room.png"},scenes:[],details:[],dimensions:[],drawings:[],prototypes:[]},moduleImages:[],video:{cover:null,url:null},translations:{"zh-CN":developmentTranslation("共居空间单元（开发演示）","用于验证增加多款产品后的卡片排序与前后导航，生产环境不会显示。","猫咪在现代客厅中的共居空间开发演示图")}}
];

assertValidProducts(products);

function mergeImages(assets: ProductImages<ProductImageAsset>, texts: ProductImages<ProductImageText>): ProductImages<ProductImage> {
  const merge = (asset: ProductImageAsset | null, text: ProductImageText | null | undefined) => asset && text ? {...asset, ...text} : null;
  const mergeList = (items: ProductImageAsset[], labels: ProductImageText[]) => items.flatMap((item, index) => {const image = merge(item, labels[index]); return image ? [image] : [];});
  return {main:merge(assets.main,texts.main),scenes:mergeList(assets.scenes,texts.scenes),details:mergeList(assets.details,texts.details),dimensions:mergeList(assets.dimensions,texts.dimensions),drawings:mergeList(assets.drawings,texts.drawings),prototypes:mergeList(assets.prototypes,texts.prototypes)};
}

export function localizeProduct(product: Product, locale: AppLocale): LocalizedProduct | null {
  const translation = product.translations[locale];
  if (!translation) return null;
  const images = mergeImages(product.images, translation.imageTexts);
  return {...product,...translation,images,modules:translation.modules.map((module,index) => ({...module,image: product.moduleImages[index] && translation.imageTexts.details[index] ? {...product.moduleImages[index],...translation.imageTexts.details[index]} : null})),video:{cover:null,url:product.video.url}};
}

function sortProducts(items: Product[]) {return [...items].sort((a,b) => a.sortOrder-b.sortOrder);}
export const publishedProducts = sortProducts(products.filter((product) => product.status === "published" && !product.developmentOnly));

export function getLocalizedProductById(id: string, locale: AppLocale) {const product = products.find((item) => item.id === id); return product ? localizeProduct(product, locale) : null;}
export function getVisibleProducts(locale: AppLocale) {
  const source = publishedProducts.length > 0 ? publishedProducts : process.env.NODE_ENV === "development" ? sortProducts(products.filter((item) => item.developmentOnly)) : [];
  return source.flatMap((product) => {const localized = localizeProduct(product, locale); return localized ? [localized] : [];});
}
export function getVisibleProductBySlug(slug: string, locale: AppLocale) {
  const product = process.env.NODE_ENV === "development" ? products.find((item) => item.slug === slug && item.status !== "archived") : publishedProducts.find((item) => item.slug === slug);
  return product ? localizeProduct(product, locale) : null;
}
