import { useEffect, useState } from 'react';
import ProductCard from '../components/shop/ProductCard.jsx';
import ProductModal from '../components/shop/ProductModal.jsx';
import InquiryForm from '../components/shop/InquiryForm.jsx';
import { PRODUCTS, SHOP_BENEFITS } from '../data/content.js';
import useReveal from '../hooks/useReveal.js';
import '../styles/shop.css';

export default function Shop() {
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    document.title = 'Produkte - CMD Reinigungsprodukte | Professionelle Reinigungsmittel';
  }, []);

  useReveal('#shop-page', []);

  return (
    <main className="shop-page" id="shop-page">
      <header className="shop-header">
        <div className="container">
          <span className="eyebrow reveal">Premium Reinigungslösungen</span>
          <h1 className="reveal">Hochwertige Reinigungsmittel für jeden Bedarf</h1>
        </div>
      </header>

      <section className="section shop-products">
        <div className="container">
          <div className="product-grid">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.slug} product={product} onDetails={setActiveProduct} />
            ))}
          </div>
        </div>
      </section>

      <section className="shop-benefits">
        <div className="container benefits-grid">
          {SHOP_BENEFITS.map((b) => (
            <div className="benefit-item reveal" key={b.title}>
              <i className={b.icon} />
              <div>
                <h4>{b.title}</h4>
                <p>{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section shop-inquiry">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow reveal">Produktanfrage</span>
            <h2 className="reveal">Interesse an unseren Produkten?</h2>
            <p className="reveal">
              Füllen Sie das Formular aus, wir melden uns mit einem individuellen Angebot bei Ihnen.
            </p>
          </div>
          <InquiryForm />
        </div>
      </section>

      <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
    </main>
  );
}
