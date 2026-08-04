import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

const featuredProduct = products.find((product) => product.id === "cactus-cat-tree");

const imageSlots = [
  { code: "01 / MAIN", title: "产品主图", note: "完整轮廓与结构" },
  { code: "02 / SPACE", title: "空间场景", note: "尺度、摆放与光线" },
  { code: "03 / DETAIL", title: "材质细节", note: "边缘、连接与反射" },
];

export default function Home() {
  return (
    <div className="home-future">
      <section className="future-hero">
        <Image
          alt="透明亚克力宠物家具空间视觉示意，非实际产品图"
          className="future-hero__image"
          fill
          priority
          sizes="100vw"
          src="/images/concepts/acrylic-cat-furniture-concept.png"
        />
        <div className="future-hero__shade" />
        <div className="future-hero__topline">
          <p>KADUO / ACRYLIC PET FURNITURE</p>
          <p>SPACE · OBJECT · LIGHT</p>
        </div>
        <div className="future-hero__copy">
          <p className="future-kicker">高端宠物家具 / 亚克力空间设计</p>
          <h1>
            透明，
            <span>构筑共居空间。</span>
          </h1>
          <div className="future-hero__footer">
            <p>
              让宠物家具拥有建筑的秩序、家具的尺度，
              <br className="hidden sm:block" />
              以及透明材质独有的光影关系。
            </p>
            <Link className="future-button" href="/products">
              查看产品中心 <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <p className="future-visual-note">空间与材质视觉示意 / 实物图待替换</p>
      </section>

      <section className="future-intro future-shell">
        <div>
          <p className="future-index">01 / PRODUCT FIRST</p>
          <h2>产品先被看见，<br />再谈故事。</h2>
        </div>
        <div className="future-intro__body">
          <p>
            凯朵不是生活方式装饰品牌。首页首先呈现产品的结构、透明度与它在空间中的存在方式。品牌叙事退后一步，让作品成为真正的第一视觉主体。
          </p>
          <p className="future-caption">
            本轮使用概念视觉审核版式。正式上线前，将替换为经过确认的真实产品图片。
          </p>
        </div>
      </section>

      <section className="future-object future-shell">
        <figure className="future-object__visual">
          <Image
            alt="亚克力宠物家具概念主图，非实际产品图"
            fill
            sizes="(min-width: 900px) 68vw, 100vw"
            src="/images/concepts/acrylic-cat-furniture-concept.png"
          />
          <figcaption>CONCEPT VISUAL 01 / REAL PRODUCT IMAGE TO REPLACE</figcaption>
        </figure>
        <aside className="future-object__data">
          <p className="future-index">OBJECT / 01</p>
          <h2>{featuredProduct?.name ?? "产品资料整理中"}</h2>
          <p className="future-object__summary">
            当前仅确认产品名称。英文名称、系列、材质、尺寸和功能参数仍保持为空，不在视觉稿中预设。
          </p>
          <dl>
            <div>
              <dt>发布状态</dt>
              <dd>草稿 / 资料整理中</dd>
            </div>
            <div>
              <dt>材质信息</dt>
              <dd>待确认</dd>
            </div>
            <div>
              <dt>尺寸信息</dt>
              <dd>待确认</dd>
            </div>
            <div>
              <dt>当前图像</dt>
              <dd>空间与材质视觉示意</dd>
            </div>
          </dl>
          <Link className="future-text-link" href="/products">
            进入产品中心 <span aria-hidden="true">↗</span>
          </Link>
        </aside>
      </section>

      <section className="future-material">
        <div className="future-material__image">
          <Image
            alt="透明亚克力边缘与连接细节视觉示意"
            fill
            sizes="(min-width: 900px) 55vw, 100vw"
            src="/images/concepts/acrylic-material-detail.png"
          />
          <p>CONCEPT DETAIL / MATERIAL &amp; LIGHT</p>
        </div>
        <div className="future-material__copy">
          <p className="future-index">02 / CLEAR ACRYLIC</p>
          <h2>光线，是透明材质的第二结构。</h2>
          <p>
            亚克力家具的视觉不只来自外轮廓。边缘、厚度、连接方式与环境光共同决定它如何进入空间。正式产品信息将在样品和资料确认后补充。
          </p>
        </div>
      </section>

      <section className="future-space future-shell">
        <div className="future-space__heading">
          <p className="future-index">03 / IMAGE SYSTEM</p>
          <h2>一件产品，<br />需要三种真实视角。</h2>
        </div>
        <div className="future-slots">
          {imageSlots.map((slot) => (
            <article key={slot.code}>
              <p>{slot.code}</p>
              <h3>{slot.title}</h3>
              <span>{slot.note}</span>
            </article>
          ))}
        </div>
        <div className="future-space__scene">
          <Image
            alt="亚克力宠物家具与建筑空间关系视觉示意"
            fill
            sizes="100vw"
            src="/images/concepts/acrylic-cat-furniture-concept.png"
          />
          <div>
            <p>SPACE SCENE / CONCEPT VISUAL</p>
            <h3>空间不是背景，<br />产品必须回应它。</h3>
          </div>
        </div>
      </section>

      <section className="future-closing future-shell">
        <p>KADUO / PET FURNITURE AS SPATIAL OBJECT</p>
        <h2>为宠物设计，也为建筑与家具之间的空间关系设计。</h2>
        <Link className="future-button future-button--light" href="/design">
          查看设计理念 <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
