"use client";

import { useEffect, useMemo, useState } from "react";

type Category = "Tous" | "Homme" | "Femme";
type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "Tous">;
  price: number;
  image: string;
  gallery: string[];
};

const products: Product[] = [
  {
    id: 1,
    name: "Débardeur noir classique",
    category: "Femme",
    price: 49000,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 2,
    name: "T-shirt blanc essentiel",
    category: "Homme",
    price: 49000,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 3,
    name: "T-shirts manches courtes",
    category: "Homme",
    price: 36000,
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 4,
    name: "T-shirt moderne",
    category: "Homme",
    price: 77000,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 5,
    name: "Ensemble détente vintage",
    category: "Homme",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 6,
    name: "Lunettes ovales années 90",
    category: "Femme",
    price: 28000,
    image:
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 7,
    name: "Baskets blanches rétro",
    category: "Homme",
    price: 60000,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85",
    ],
  },
  {
    id: 8,
    name: "Veste workwear écrue",
    category: "Femme",
    price: 72000,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85",
    ],
  },
];

function SearchIcon() {
  return (
    <svg
      className="search-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <circle cx="10.8" cy="10.8" r="6.5" />
      <path d="m16 16 4.3 4.3" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg
      className="bag-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 8.5h13l1 12h-15l1-12Z" />
      <path d="M9 8.5V6a3 3 0 0 1 6 0v2.5" />
    </svg>
  );
}

function ProductCard({ product, onOpen, onAddToCart, onBuy }: { product: Product; onOpen: () => void; onAddToCart: () => void; onBuy: () => void }) {
  return (
    <article className="product-card">
      <button className="product-image-wrap" onClick={onOpen} aria-label={`Ouvrir ${product.name}`}>
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="card-actions">
          <span className="card-cart" onClick={(event) => { event.stopPropagation(); onAddToCart(); }}>Ajouter au panier</span>
          <span className="card-buy" onClick={(event) => { event.stopPropagation(); onBuy(); }}>Acheter</span>
        </div>
      </button>
      <h2>{product.name}</h2>
      <p className="price">{product.price.toLocaleString("fr-FR")} XOF</p>
    </article>
  );
}

function ProductModal({ product, gallery, selectedImage, onImageChange, onClose, onAddToCart }: { product: Product; gallery: string[]; selectedImage: number; onImageChange: (index: number) => void; onClose: () => void; onAddToCart: () => void }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={product.name} onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div className="product-modal">
        <button className="modal-close" onClick={onClose} aria-label="Fermer">×</button>

        <div className="gallery-panel">
          <div className="gallery-main">
            <img src={gallery[selectedImage]} alt={product.name} />
            <button className="carousel-button previous" onClick={() => onImageChange((selectedImage - 1 + gallery.length) % gallery.length)} aria-label="Photo précédente">←</button>
            <button className="carousel-button next" onClick={() => onImageChange((selectedImage + 1) % gallery.length)} aria-label="Photo suivante">→</button>
            <span className="carousel-index">{String(selectedImage + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span>
          </div>

          <div className="gallery-thumbnails">
            {gallery.map((image, index) => (
              <button
                key={`${image}-${index}`}
                className={selectedImage === index ? "selected" : ""}
                onClick={() => onImageChange(index)}
                aria-label={`Photo ${index + 1} de ${product.name}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail">
          <p className="detail-kicker">Pièce unique · {product.category}</p>
          <h2>{product.name}</h2>
          <p className="detail-price">{product.price.toLocaleString("fr-FR")} XOF</p>
          <p className="detail-copy">Une pièce sélectionnée avec soin, disponible immédiatement. Chaque article est contrôlé avant son départ.</p>

          <div className="detail-actions">
            <button className="action-primary" onClick={onAddToCart}>Ajouter au panier</button>
            <button className="action-secondary" onClick={onAddToCart}>Commander</button>
          </div>

          <p className="detail-note">Livraison et retrait disponibles selon votre zone.</p>
        </div>
      </div>
    </div>
  );
}

function CartPanel({ items, onClose }: { items: Product[]; onClose: () => void }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-backdrop" role="dialog" aria-modal="true" aria-label="Votre panier" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <aside className="cart-panel">
        <button className="cart-close" onClick={onClose} aria-label="Fermer le panier">×</button>

        <div className="cart-summary">
          <p className="detail-kicker">Votre sélection</p>
          <h2>Panier</h2>
          <p className="cart-summary-copy">Vérifiez votre sélection avant de passer au paiement.</p>

          <div className="cart-total">
            <span>Total</span>
            <strong>{total.toLocaleString("fr-FR")} XOF</strong>
          </div>

          <button className="checkout-button" disabled={!items.length}>Passer au paiement <span>→</span></button>
        </div>

        <div className="cart-items">
          <div className="cart-items-head">
            <span>Articles</span>
            <b>{items.length}</b>
          </div>

          {items.length ? (
            items.map((item, index) => (
              <article className="cart-item" key={`${item.id}-${index}`}>
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>{item.name}</strong>
                  <small>Pièce unique</small>
                  <span>{item.price.toLocaleString("fr-FR")} XOF</span>
                </div>
              </article>
            ))
          ) : (
            <p className="cart-empty">Votre panier est encore vide.</p>
          )}
        </div>
      </aside>
    </div>
  );
}

export default function Home() {
  const [category, setCategory] = useState<Category>("Tous");
  const [search, setSearch] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState("Recommandés");
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    const isOverlayOpen = Boolean(selectedProduct || cartOpen);
    document.body.style.overflow = isOverlayOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct, cartOpen]);

  const addToCart = (product: Product) => {
    setCartItems((items) => [...items, product]);
    setCartMessage("Article ajouté au panier");
  };

  const handleBuy = (product: Product) => {
    setCartItems((items) => [...items, product]);
    setCartOpen(true);
    setCartMessage("Article ajouté au panier");
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImage(0);
  };

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("fr-FR");
    const visible = products.filter((product) => {
      const matchesCategory =
        category === "Tous" || product.category === category;
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLocaleLowerCase("fr-FR").includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });

    return [...visible].sort((a, b) =>
      sort === "Prix croissant"
        ? a.price - b.price
        : sort === "Prix décroissant"
          ? b.price - a.price
          : a.id - b.id,
    );
  }, [category, search, sort]);

  return (
    <div className="site-frame">
      <header className="site-header">
        <a className="logo" href="#catalogue" aria-label="Fripiz.ai, accueil">
          Fripiz<span className="logo-ai">.ai</span>
        </a>

        <button className="header-cart" onClick={() => setCartOpen(true)} aria-label={`Ouvrir le panier, ${cartItems.length} articles`}>
          <BagIcon />
          <span>Panier</span>
          <b>{cartItems.length}</b>
        </button>
      </header>

      <main id="catalogue">
        <div className="catalogue-toolbar">
          <nav className="category-tabs" aria-label="Catégories">
            {(["Tous", "Homme", "Femme"] as const).map((item) => (
              <button
                key={item}
                className={category === item ? "selected" : ""}
                onClick={() => setCategory(item)}
              >
                {item === "Tous" ? "Tous les articles" : item}
              </button>
            ))}
          </nav>

          <div className="catalogue-actions">
            <label className="search-field">
              <SearchIcon />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher"
                aria-label="Rechercher un article"
              />
            </label>

            <div className="sort-wrap">
              <button
                className="pill-button"
                onClick={() => setSortOpen((open) => !open)}
              >
                Trier par <span className="sort-icon">↓</span>
              </button>

              {sortOpen && (
                <div className="sort-menu">
                  {["Recommandés", "Prix croissant", "Prix décroissant"].map(
                    (option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSort(option);
                          setSortOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <section className="product-grid" aria-label="Articles disponibles">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={() => openProduct(product)}
              onAddToCart={() => addToCart(product)}
              onBuy={() => handleBuy(product)}
            />
          ))}
        </section>

        {filteredProducts.length === 0 && (
          <p className="empty-state">Aucun article ne correspond à votre recherche.</p>
        )}
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          gallery={selectedProduct.gallery}
          selectedImage={selectedImage}
          onImageChange={setSelectedImage}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => {
            addToCart(selectedProduct);
            setSelectedProduct(null);
          }}
        />
      )}

      {cartOpen && <CartPanel items={cartItems} onClose={() => setCartOpen(false)} />}
      {cartMessage && (
        <button className="cart-toast" onClick={() => setCartMessage("")}>
          {cartMessage} <span>×</span>
        </button>
      )}
    </div>
  );
}
