import {assertValidProducts} from "@/data/product-validation";
import type {AppLocale} from "@/i18n/routing";

export type ProductStatus = "draft" | "published" | "archived";
export type ProductImageSourceType = "ai-render" | "prototype-photo" | "design-drawing" | "concept-render";

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

const conceptCaption = {
  "zh-CN": "产品效果示意图，当前画面用于展示设计概念与家居场景，最终结构、颜色与配置以确认版产品为准。",
  "zh-TW": "產品效果示意圖，目前畫面用於呈現設計概念與居家情境，最終結構、顏色與配置以確認版產品為準。",
  en: "Product concept visual. This image illustrates the design idea and home setting; final structure, colour and configuration are subject to the confirmed product.",
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

const blushHavenImages: ProductImages<ProductImageAsset> = {
  main: {src:"/_local-preview/blush-haven/hero/blush-haven-hero-desktop.png",sourceType:"concept-render",publicApproved:false},
  scenes: [
    {src:"/_local-preview/blush-haven/hero/blush-haven-hero-mobile.png",sourceType:"concept-render",publicApproved:false},
    {src:"/_local-preview/blush-haven/lifestyle/blush-haven-cat-lifestyle.png",sourceType:"concept-render",publicApproved:false},
    {src:"/_local-preview/blush-haven/gallery/blush-haven-shared-living.png",sourceType:"concept-render",publicApproved:false},
  ],
  details: [
    {src:"/_local-preview/blush-haven/details/blush-haven-acrylic-detail.png",sourceType:"concept-render",publicApproved:false},
    {src:"/_local-preview/blush-haven/product/blush-haven-card.png",sourceType:"concept-render",publicApproved:false},
  ],
  dimensions: [], drawings: [], prototypes: [],
};

function blushHavenImageTexts(locale: AppLocale, alts: {main:string; scenes:string[]; details:string[]}): ProductImages<ProductImageText> {
  return {main:{alt:alts.main,caption:conceptCaption[locale]},scenes:alts.scenes.map((alt)=>({alt,caption:conceptCaption[locale]})),details:alts.details.map((alt)=>({alt,caption:conceptCaption[locale]})),dimensions:[],drawings:[],prototypes:[]};
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

const blushHavenZhCN: ProductTranslation = {
  name:"粉色猫茶几", englishName:"Blush Haven Cat Coffee Table", shortName:"Blush Haven", series:"人猫共居家具系列", englishSeries:"Shared Living Furniture Collection", productType:"人猫共居茶几",
  summary:"把猫咪的休憩空间融入客厅茶几，让一件家具同时回应人的使用与猫的生活。",
  detailIntroduction:["粉色猫茶几从人与猫共同使用客厅的方式出发，将日常茶几与猫咪的休息、躲藏和共处空间结合在同一件家具中。","对人而言，它保持茶几应有的日常使用方式；对猫而言，家具内部则成为可以进入、停留和观察家庭环境的空间。人与猫不需要各自占据一套家具，而是在同一个客厅场景中自然地共享生活。"],
  designConceptTitle:"一张茶几，也是猫的角落", designConcept:"粉色猫茶几把人的茶几使用方式与猫咪的日常停留放在同一个客厅尺度中。\n\n内部围合空间与顶部中心区域来自当前设计方案；它们让猫咪能够进入、坐卧并观察周围，而人的日常使用也仍留在同一张家具上。",
  features:[
    {title:"人猫共用",description:"人的茶几功能与猫咪使用空间融合在一件家具中，减少传统宠物用品与家居家具彼此割裂的感觉。"},
    {title:"安静躲藏",description:"内部围合空间为猫咪提供进入、停留和观察家庭环境的位置。"},
    {title:"自在休憩",description:"产品设计包含供猫咪停留和坐卧的内部空间及顶部中心区域。"},
    {title:"陪伴互动",description:"猫咪进入家具后仍处在人与猫共同使用的客厅区域，让陪伴自然发生在日常生活中。"}
  ],
  materials:["粉色透明亚克力"], materialDescription:"V6设计方案以粉色透明亚克力构成主要视觉结构，并根据不同部位设置不同设计厚度。最终材质规格与厚度以打样确认结果为准。", materialNote:"顶层台面、底层垫面、猫兜、中层腰线、装饰柱、门扇、造型花朵与品牌 Logo 的厚度均为 V6 设计阶段标注，不作为最终生产参数。",
  dimensionsDisplay:"V6设计参考尺寸\nW800 × D800 × H410 mm", dimensionsNote:"当前尺寸依据V6设计阶段图纸整理，图纸仍注明“产品需打样确认”。最终生产尺寸以打样及确认版工程资料为准。",
  modules:[{name:"顶部中心开孔设计",description:"V6设计阶段图纸中可见顶部中心开孔；图纸同时提供猫兜方案，最终配置尚未确认。"}], moduleNote:"V6原始图纸脚轮示意待设计方修订，品牌最终配置为无脚轮。猫兜或活动板、连接件、防滑垫、安装工具、Logo 与造型花朵均未列入当前标准配置。", colors:[{name:"粉色透明",value:null}], prototypeNote:null,
  standardExclusions:["坐垫","猫咪","家居场景陈设"], cushionNote:"图片中的坐垫仅作使用场景示意，不包含在产品标准配置中。消费者可根据实际内部空间自行选择适配软垫，其材质和清洁方式以所购买坐垫说明为准。", displayNotice:"本页图片均为产品效果示意图，当前画面用于展示设计概念与家居场景，最终结构、颜色与配置以确认版产品为准。",
  consultation:{title:"让一张茶几，留出猫的角落",description:"告诉我们你的客厅空间与使用需求，我们将为你提供产品配置、尺寸确认和摆放建议。",primaryLabel:"预约产品咨询",secondaryLabel:"获取尺寸与摆放建议"}, seoTitle:"粉色猫茶几 | 凯朵 CATDOW", seoDescription:"凯朵CATDOW粉色猫茶几将日常茶几与猫咪的躲藏、休憩和共居空间融入同一件家具，以透明结构回应现代客厅中的人猫共同生活。", inquiryLabel:"预约产品咨询",
  imageTexts:blushHavenImageTexts("zh-CN",{main:"粉色透明猫茶几置于明亮客厅中的产品效果示意图",scenes:["猫咪停留在粉色透明猫茶几顶部中心区域的产品效果示意图","猫咪靠近粉色透明猫茶几的家居场景效果示意图","黑白猫停留在粉色透明猫茶几上的家居场景效果示意图"],details:["粉色透明猫茶几的亚克力边缘和圆拱结构效果示意图","粉色透明猫茶几与猫咪共同使用的场景效果示意图"]})
};

const blushHavenZhTW: ProductTranslation = {
  ...blushHavenZhCN,
  name:"粉色貓茶几", series:"人貓共居傢俱系列", productType:"人貓共居茶几", summary:"把貓咪的休憩空間融入客廳茶几，讓一件傢俱同時回應人的使用與貓的生活。",
  detailIntroduction:["粉色貓茶几從人與貓共同使用客廳的方式出發，將日常茶几與貓咪的休息、躲藏和共處空間結合在同一件傢俱中。","對人而言，它保有茶几應有的日常使用方式；對貓而言，傢俱內部則是可以進入、停留並觀察家中環境的空間。人與貓不需要各自佔據一套傢俱，而是在同一個客廳裡自然共享生活。"],
  designConceptTitle:"一張茶几，也是貓的角落", designConcept:"粉色貓茶几把人的茶几使用方式與貓咪的日常停留放在同一個客廳尺度中。\n\n內部圍合空間與頂部中心區域來自目前設計方案；它們讓貓咪能夠進入、坐臥並觀察周圍，而人的日常使用也仍留在同一張傢俱上。",
  features:[{title:"人貓共用",description:"人的茶几功能與貓咪使用空間融合在一件傢俱中，減少傳統寵物用品與居家傢俱彼此割裂的感覺。"},{title:"安靜躲藏",description:"內部圍合空間為貓咪提供進入、停留和觀察家中環境的位置。"},{title:"自在休憩",description:"產品設計包含供貓咪停留和坐臥的內部空間及頂部中心區域。"},{title:"陪伴互動",description:"貓咪進入傢俱後仍處在人與貓共同使用的客廳區域，讓陪伴自然發生在日常生活中。"}],
  materials:["粉色透明壓克力"], materialDescription:"V6設計方案以粉色透明壓克力構成主要視覺結構，並依不同部位設定不同設計厚度。最終材質規格與厚度以打樣確認結果為準。", materialNote:"頂層檯面、底層墊面、貓兜、中層腰線、裝飾柱、門扇、造型花朵與品牌 Logo 的厚度皆為 V6 設計階段標註，不作為最終生產參數。",
  dimensionsDisplay:"V6設計參考尺寸\nW800 × D800 × H410 mm", dimensionsNote:"目前尺寸依 V6 設計階段圖紙整理，圖紙仍註明「產品需打樣確認」。最終生產尺寸以打樣及確認版工程資料為準。",
  modules:[{name:"頂部中心開孔設計",description:"V6設計階段圖紙中可見頂部中心開孔；圖紙同時提供貓兜方案，最終配置尚未確認。"}], moduleNote:"V6原始圖紙腳輪示意待設計方修訂，品牌最終配置為無腳輪。貓兜或活動板、連接件、防滑墊、安裝工具、Logo 與造型花朵均未列入目前標準配置。", colors:[{name:"粉色透明",value:null}],
  standardExclusions:["坐墊","貓咪","居家情境陳設"], cushionNote:"圖片中的坐墊僅作使用情境示意，不包含在產品標準配置中。消費者可依實際內部空間自行選擇適配軟墊，其材質和清潔方式以所購買坐墊說明為準。", displayNotice:"本頁圖片皆為產品效果示意圖，目前畫面用於呈現設計概念與居家情境，最終結構、顏色與配置以確認版產品為準。",
  consultation:{title:"讓一張茶几，留出貓的角落",description:"告訴我們你的客廳空間與使用需求，我們將提供產品配置、尺寸確認和擺放建議。",primaryLabel:"預約產品諮詢",secondaryLabel:"取得尺寸與擺放建議"}, seoTitle:"粉色貓茶几 | 凱朵 CATDOW", seoDescription:"凱朵CATDOW粉色貓茶几將日常茶几與貓咪的躲藏、休憩和共居空間融入同一件傢俱，以透明結構回應現代客廳中的人貓共同生活。", inquiryLabel:"預約產品諮詢",
  imageTexts:blushHavenImageTexts("zh-TW",{main:"粉色透明貓茶几置於明亮客廳中的產品效果示意圖",scenes:["貓咪停留在粉色透明貓茶几頂部中心區域的產品效果示意圖","貓咪靠近粉色透明貓茶几的居家情境效果示意圖","黑白貓停留在粉色透明貓茶几上的居家情境效果示意圖"],details:["粉色透明貓茶几的壓克力邊緣和圓拱結構效果示意圖","粉色透明貓茶几與貓咪共同使用的情境效果示意圖"]})
};

const blushHavenEn: ProductTranslation = {
  ...blushHavenZhCN,
  name:"Blush Haven Cat Coffee Table", englishName:"Blush Haven Cat Coffee Table", series:"Shared Living Furniture Collection", englishSeries:"Shared Living Furniture Collection", productType:"Cat Coffee Table", summary:"A coffee table that brings a cat's place to rest into the living room, so one piece can serve everyday life for both people and cats.",
  detailIntroduction:["Blush Haven begins with how people and cats share a living room, bringing an everyday coffee table together with places for a cat to rest, retreat and stay close by.","For people, it keeps the familiar role of a coffee table. For cats, the interior becomes a place to enter, pause and observe the room. Both uses sit naturally within the same living space."],
  designConceptTitle:"A coffee table, and a corner for the cat", designConcept:"Blush Haven places everyday table use and a cat's place to pause within the same living-room scale.\n\nThe enclosed interior and central top area come from the current design proposal. They give cats room to enter, sit and observe, while everyday table use remains part of the same piece.",
  features:[{title:"Shared use",description:"The coffee-table function and a cat's place to stay are brought together in one piece, reducing the separation between pet equipment and home furniture."},{title:"A quiet retreat",description:"The enclosed interior gives cats a place to enter, stay and observe the home."},{title:"Everyday rest",description:"The design includes an interior area and a central top area where cats can pause and sit."},{title:"Living alongside",description:"When a cat enters the piece, it remains within the shared living-room setting, where companionship is part of everyday life."}],
  materials:["Pink transparent acrylic"], materialDescription:"The V6 design proposal uses pink transparent acrylic for the main visual structure, with different design thicknesses assigned to different parts. Final material specification and thickness are subject to prototype confirmation.", materialNote:"Thicknesses shown for the top, lower pad, cat hammock, waist band, decorative columns, door panels, flower shapes and logo are V6 design-stage notes, not final production specifications.",
  dimensionsDisplay:"V6 design reference dimensions\nW800 × D800 × H410 mm", dimensionsNote:"These dimensions are drawn from the V6 design-stage drawing, which still notes that a prototype confirmation is required. Final production dimensions are subject to prototype and approved engineering information.",
  modules:[{name:"Central opening in the top",description:"The V6 design-stage drawing shows a central opening in the top and a hammock option; final configuration remains unconfirmed."}], moduleNote:"The caster illustration in the original V6 drawing awaits revision by the designer. The confirmed brand configuration has no casters. The hammock or movable panel, connections, anti-slip pads, installation tools, logo and flower shapes are not listed in the current standard configuration.", colors:[{name:"Transparent blush",value:null}],
  standardExclusions:["Cushions","Cats","Home furnishings shown in scenes"], cushionNote:"Cushions shown in images are for use-scene illustration only and are not included with the standard product. Customers may select a suitable cushion for the interior; material and care follow the cushion purchased.", displayNotice:"All images on this page are product concept visuals. They illustrate the design idea and home setting; final structure, colour and configuration are subject to the confirmed product.",
  consultation:{title:"Leave a corner for the cat",description:"Tell us about your living room and how you plan to use it. We can share configuration, dimension confirmation and placement advice.",primaryLabel:"Product Inquiry",secondaryLabel:"Get Sizing & Placement Advice"}, seoTitle:"Blush Haven Cat Coffee Table | CATDOW", seoDescription:"CATDOW Blush Haven brings a coffee table and a cat-friendly retreat into one shared piece of living-room furniture.", inquiryLabel:"Product Inquiry",
  imageTexts:blushHavenImageTexts("en",{main:"Product concept visual of the pink transparent Blush Haven Cat Coffee Table in a bright living room",scenes:["Product concept visual of a cat resting in the central top area of Blush Haven","Product concept visual of a cat beside the pink transparent Blush Haven Cat Coffee Table","Product concept visual of a black-and-white cat on the pink transparent Blush Haven Cat Coffee Table"],details:["Product concept visual of the acrylic edges and arched structure of Blush Haven","Product concept visual of Blush Haven shared with a cat"]})
};

function developmentTranslation(name: string, summary: string, mainAlt: string): ProductTranslation {
  return {name,englishName:null,shortName:null,series:"页面布局演示",englishSeries:null,productType:null,summary,detailIntroduction:[],designConceptTitle:null,designConcept:null,features:[],materials:[],materialDescription:null,materialNote:null,dimensionsDisplay:null,dimensionsNote:null,modules:[],moduleNote:null,colors:[],prototypeNote:null,standardExclusions:[],cushionNote:null,displayNotice:null,consultation:null,seoTitle:null,seoDescription:null,inquiryLabel:"联系咨询",imageTexts:{main:{alt:mainAlt},scenes:[],details:[],dimensions:[],drawings:[],prototypes:[]}};
}

export const products: Product[] = [
  {id:"cactus-haven-acrylic-cat-tree",slug:"cactus-haven-acrylic-cat-tree",status:"draft",developmentOnly:false,sortOrder:10,featuredOnHome:false,overallDimensions:"W1500 × D980 × H2110 mm",weight:null,suitableCats:null,images:cactusImages,moduleImages:Array(11).fill(null),video:{cover:null,url:null},translations:{"zh-CN":cactusZhCN,"zh-TW":cactusZhTW,en:cactusEn}},
  {id:"blush-haven-cat-coffee-table",slug:"blush-haven-cat-coffee-table",status:"draft",developmentOnly:false,sortOrder:20,featuredOnHome:false,overallDimensions:null,weight:null,suitableCats:null,images:blushHavenImages,moduleImages:[],video:{cover:null,url:null},translations:{"zh-CN":blushHavenZhCN,"zh-TW":blushHavenZhTW,en:blushHavenEn}},
  {id:"development-transparent-home",slug:"development-transparent-home",status:"draft",developmentOnly:true,sortOrder:30,featuredOnHome:false,overallDimensions:null,weight:null,suitableCats:null,images:{main:{src:"/images/homepage/hero-living-room.png"},scenes:[],details:[],dimensions:[],drawings:[],prototypes:[]},moduleImages:[],video:{cover:null,url:null},translations:{"zh-CN":developmentTranslation("透明共居家具（开发演示）","这条记录只用于检查产品中心与详情页布局，不代表凯朵已经发布的正式产品。","明亮客厅中的透明宠物家具与猫咪开发演示图，不代表正式产品")}},
  {id:"development-shared-space",slug:"development-shared-space",status:"draft",developmentOnly:true,sortOrder:40,featuredOnHome:false,overallDimensions:null,weight:null,suitableCats:null,images:{main:{src:"/images/cats/cat-family-living-room.png"},scenes:[],details:[],drawings:[],dimensions:[],prototypes:[]},moduleImages:[],video:{cover:null,url:null},translations:{"zh-CN":developmentTranslation("共居空间单元（开发演示）","用于验证增加多款产品后的卡片排序与前后导航，生产环境不会显示。","猫咪在现代客厅中的共居空间开发演示图")}}
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
