"use client";

import gsap from "gsap";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Category = "Tous" | "Homme" | "Femme";
type ProductType =
  | "Débardeur"
  | "T-shirt"
  | "Chemise"
  | "Jean"
  | "Ensemble"
  | "Lunettes"
  | "Baskets"
  | "Veste";
type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "Tous">;
  type: ProductType;
  price: number;
  stock: number;
  image: string;
  gallery: string[];
};

const products: Product[] = [
  {
    id: 1,
    name: "Débardeur noir classique",
    category: "Femme",
    type: "Débardeur",
    price: 49000,
    stock: 1,
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
    type: "T-shirt",
    price: 49000,
    stock: 2,
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
    type: "T-shirt",
    price: 36000,
    stock: 3,
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
    type: "T-shirt",
    price: 77000,
    stock: 4,
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
    type: "Ensemble",
    price: 45000,
    stock: 2,
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
    type: "Lunettes",
    price: 28000,
    stock: 1,
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
    type: "Baskets",
    price: 60000,
    stock: 3,
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
    type: "Veste",
    price: 72000,
    stock: 1,
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

function ProductCard({
  product,
  onOpen,
  onAddToCart,
  onBuy,
}: {
  product: Product;
  onOpen: () => void;
  onAddToCart: () => boolean;
  onBuy: () => void;
}) {
  const cardRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!cardRef.current) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: reducedMotion ? 0 : 24,
        duration: reducedMotion ? 0.24 : 0.65,
        ease: "power3.out",
      });
    }, cardRef);

    return () => context.revert();
  }, []);

  return (
    <article ref={cardRef} className="product-card">
      <div
        className="product-image-wrap"
        onClick={onOpen}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onOpen();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Ouvrir ${product.name}`}
      >
        <span className="card-topline" aria-hidden="true">
          <span className="card-category">{product.category}</span>
        </span>
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="card-image-shade" aria-hidden="true" />
        <span className="card-open-label" aria-hidden="true">
          <span>Voir la pièce</span>
          <span>↗</span>
        </span>
        <div
          className="card-actions"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type="button"
            className="card-cart"
            onClick={onAddToCart}
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <span aria-hidden="true">+</span>
          </button>
          <button type="button" className="card-buy" onClick={onBuy}>
            Acheter
            <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
      <span className="card-frame" aria-hidden="true">
        <span className="frame-corner frame-corner-top" />
        <span className="frame-corner frame-corner-bottom" />
      </span>
      <div className="card-meta">
        <div>
          <p className="card-eyebrow">
            {product.stock === 1
              ? "Pièce unique"
              : `${product.stock} exemplaires`}
          </p>
          <h2>{product.name}</h2>
        </div>
        <p className="price">{product.price.toLocaleString("fr-FR")} XOF</p>
      </div>
    </article>
  );
}

function ProductModal({
  product,
  gallery,
  selectedImage,
  onImageChange,
  onClose,
  onAddToCart,
}: {
  product: Product;
  gallery: string[];
  selectedImage: number;
  onImageChange: (index: number) => void;
  onClose: () => void;
  onAddToCart: () => boolean;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const galleryImageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (!backdropRef.current || !modalRef.current) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: reducedMotion ? 0.18 : 0.28,
          ease: "power2.out",
        },
      );
      gsap.fromTo(
        modalRef.current,
        {
          opacity: 0,
          y: reducedMotion ? 0 : 28,
          scale: reducedMotion ? 1 : 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: reducedMotion ? 0.22 : 0.55,
          ease: "power3.out",
        },
      );
    }, backdropRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!galleryImageRef.current) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.fromTo(
      galleryImageRef.current,
      { opacity: 0.35, scale: reducedMotion ? 1 : 1.025 },
      {
        opacity: 1,
        scale: 1,
        duration: reducedMotion ? 0.2 : 0.4,
        ease: "power2.out",
      },
    );
  }, [selectedImage]);

  return (
    <div
      ref={backdropRef}
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div ref={modalRef} className="product-modal">
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          ×
        </button>

        <div className="gallery-panel">
          <div className="gallery-main">
            <img
              ref={galleryImageRef}
              src={gallery[selectedImage]}
              alt={product.name}
            />
            <button
              className="carousel-button previous"
              onClick={() =>
                onImageChange(
                  (selectedImage - 1 + gallery.length) % gallery.length,
                )
              }
              aria-label="Photo précédente"
            >
              ←
            </button>
            <button
              className="carousel-button next"
              onClick={() =>
                onImageChange((selectedImage + 1) % gallery.length)
              }
              aria-label="Photo suivante"
            >
              →
            </button>
            <span className="carousel-index">
              {String(selectedImage + 1).padStart(2, "0")} /{" "}
              {String(gallery.length).padStart(2, "0")}
            </span>
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
          <p className="detail-kicker">
            {product.stock === 1
              ? "Pièce unique"
              : `${product.stock} exemplaires`}{" "}
            · {product.category}
          </p>
          <h2>{product.name}</h2>
          <p className="detail-price">
            {product.price.toLocaleString("fr-FR")} XOF
          </p>
          <p className="detail-copy">
            Une pièce sélectionnée avec soin, disponible immédiatement. Chaque
            article est contrôlé avant son départ.
          </p>

          <div className="detail-actions">
            <button
              className="action-primary"
              onClick={() => {
                if (onAddToCart()) onClose();
              }}
            >
              Ajouter au panier
            </button>
            <button
              className="action-secondary"
              onClick={() => {
                if (onAddToCart()) onClose();
              }}
            >
              Commander
            </button>
          </div>

          <p className="detail-note">
            Livraison et retrait disponibles selon votre zone.
          </p>
        </div>
      </div>
    </div>
  );
}

function CartPanel({
  items,
  onClose,
  onRemove,
}: {
  items: Product[];
  onClose: () => void;
  onRemove: (index: number) => void;
}) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!backdropRef.current || !panelRef.current) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const context = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: reducedMotion ? 0.18 : 0.25,
          ease: "power2.out",
        },
      );
      gsap.fromTo(
        panelRef.current,
        { x: reducedMotion ? 0 : 42, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: reducedMotion ? 0.22 : 0.5,
          ease: "power3.out",
        },
      );
    }, backdropRef);

    return () => context.revert();
  }, []);

  return (
    <div
      ref={backdropRef}
      className="cart-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Votre panier"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside ref={panelRef} className="cart-panel">
        <button
          className="cart-close"
          onClick={onClose}
          aria-label="Fermer le panier"
        >
          ×
        </button>

        <div className="cart-summary">
          <p className="detail-kicker">Votre sélection</p>
          <h2>Panier</h2>
          <p className="cart-summary-copy">
            Vérifiez votre sélection avant de passer au paiement.
          </p>

          <div className="cart-total">
            <span>Total</span>
            <strong>{total.toLocaleString("fr-FR")} XOF</strong>
          </div>

          <button className="checkout-button" disabled={!items.length}>
            Passer au paiement <span>→</span>
          </button>
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
                <button
                  type="button"
                  className="cart-remove"
                  onClick={() => onRemove(index)}
                  aria-label={`Retirer ${item.name} du panier`}
                >
                  ×
                </button>
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
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortClosing, setSortClosing] = useState(false);
  const [filterClosing, setFilterClosing] = useState(false);
  const [productType, setProductType] = useState<ProductType | "Tous">("Tous");
  const [sort, setSort] = useState("Recommandés");
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cartMessage, setCartMessage] = useState("");
  const [toastClosing, setToastClosing] = useState(false);
  const toastClosingRef = useRef(false);
  const toastExitTimeoutRef = useRef<number | null>(null);
  const sortWrapRef = useRef<HTMLDivElement>(null);
  const filterWrapRef = useRef<HTMLDivElement>(null);
  const menuCloseTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const isOverlayOpen = Boolean(selectedProduct || cartOpen);
    document.body.style.overflow = isOverlayOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct, cartOpen]);

  const dismissToast = useCallback(() => {
    if (toastClosingRef.current) return;

    toastClosingRef.current = true;
    setToastClosing(true);
    toastExitTimeoutRef.current = window.setTimeout(() => {
      setCartMessage("");
      setToastClosing(false);
      toastClosingRef.current = false;
    }, 360);
  }, []);

  useEffect(() => {
    if (!cartMessage) return;

    const timeout = window.setTimeout(dismissToast, 4640);

    return () => window.clearTimeout(timeout);
  }, [cartMessage, dismissToast]);

  const closeSortMenu = useCallback(() => {
    if (!sortOpen || sortClosing) return;

    setSortClosing(true);
    menuCloseTimeoutRef.current = window.setTimeout(() => {
      setSortOpen(false);
      setSortClosing(false);
    }, 180);
  }, [sortClosing, sortOpen]);

  const closeFilterMenu = useCallback(() => {
    if (!filterOpen || filterClosing) return;

    setFilterClosing(true);
    menuCloseTimeoutRef.current = window.setTimeout(() => {
      setFilterOpen(false);
      setFilterClosing(false);
    }, 180);
  }, [filterClosing, filterOpen]);

  useEffect(() => {
    const handleOutsidePointer = (event: PointerEvent) => {
      const target = event.target as Node;

      if (filterOpen && !filterWrapRef.current?.contains(target)) {
        closeFilterMenu();
      }

      if (sortOpen && !sortWrapRef.current?.contains(target)) {
        closeSortMenu();
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointer);

    return () => document.removeEventListener("pointerdown", handleOutsidePointer);
  }, [closeFilterMenu, closeSortMenu, filterOpen, sortOpen]);

  useEffect(() => {
    return () => {
      if (menuCloseTimeoutRef.current) {
        window.clearTimeout(menuCloseTimeoutRef.current);
      }
    };
  }, []);

  const showToast = (message: string) => {
    if (toastExitTimeoutRef.current) {
      window.clearTimeout(toastExitTimeoutRef.current);
    }

    toastClosingRef.current = false;
    setToastClosing(false);
    setCartMessage(message);
  };

  const getProductQuantity = (product: Product) =>
    cartItems.filter((item) => item.id === product.id).length;

  const addToCart = (product: Product) => {
    const quantityInCart = getProductQuantity(product);

    if (quantityInCart >= product.stock) {
      showToast(
        product.stock === 1
          ? `${product.name} est une pièce unique et est déjà dans votre panier.`
          : `Stock épuisé : seulement ${product.stock} exemplaires disponibles pour ${product.name}.`,
      );
      return false;
    }

    setCartItems((items) => [...items, product]);
    showToast("Article ajouté au panier");
    return true;
  };

  const handleBuy = (product: Product) => {
    if (addToCart(product)) setCartOpen(true);
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
      const matchesType =
        productType === "Tous" || product.type === productType;
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLocaleLowerCase("fr-FR").includes(normalizedSearch);
      return matchesCategory && matchesType && matchesSearch;
    });

    return [...visible].sort((a, b) =>
      sort === "Prix croissant"
        ? a.price - b.price
        : sort === "Prix décroissant"
          ? b.price - a.price
          : a.id - b.id,
    );
  }, [category, productType, search, sort]);

  return (
    <div className="site-frame">
      <header className="site-header">
        <a className="logo" href="#catalogue" aria-label="Fripiz, accueil">
          Fripiz
        </a>

        <button
          className="header-cart"
          onClick={() => setCartOpen(true)}
          aria-label={`Ouvrir le panier, ${cartItems.length} articles`}
        >
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

            <div ref={filterWrapRef} className="sort-wrap">
              <button
                className={`pill-button${productType !== "Tous" ? " active" : ""}`}
                onClick={() => {
                  if (filterOpen) {
                    closeFilterMenu();
                    return;
                  }

                  setSortOpen(false);
                  setSortClosing(false);
                  setFilterClosing(false);
                  setFilterOpen(true);
                }}
                aria-expanded={filterOpen}
              >
                Filtrer{productType !== "Tous" ? ` · ${productType}` : ""}
                {productType !== "Tous" && (
                  <span
                    className="control-clear"
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      setProductType("Tous");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        event.stopPropagation();
                        setProductType("Tous");
                      }
                    }}
                    aria-label="Retirer le filtre actif"
                  >
                    ×
                  </span>
                )}
                <span className="sort-icon">↓</span>
              </button>

              {filterOpen && (
                <div className={`sort-menu filter-menu${filterClosing ? " is-closing" : ""}`}>
                  {(["Tous", "Débardeur", "T-shirt", "Chemise", "Jean", "Ensemble", "Lunettes", "Baskets", "Veste"] as const).map(
                    (option) => (
                      <button
                        key={option}
                        className={productType === option ? "selected" : ""}
                        onClick={() => {
                          setProductType(option);
                          closeFilterMenu();
                        }}
                      >
                        {option === "Tous" ? "Tous les types" : option}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>

            <div ref={sortWrapRef} className="sort-wrap">
              <button
                className={`pill-button${sort !== "Recommandés" ? " active" : ""}`}
                onClick={() => {
                  if (sortOpen) {
                    closeSortMenu();
                    return;
                  }

                  setFilterOpen(false);
                  setFilterClosing(false);
                  setSortClosing(false);
                  setSortOpen(true);
                }}
                aria-expanded={sortOpen}
              >
                Trier par{sort !== "Recommandés" ? ` · ${sort}` : ""}{" "}
                {sort !== "Recommandés" && (
                  <span
                    className="control-clear"
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      setSort("Recommandés");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        event.stopPropagation();
                        setSort("Recommandés");
                      }
                    }}
                    aria-label="Réinitialiser le tri actif"
                  >
                    ×
                  </span>
                )}
                <span className="sort-icon">↓</span>
              </button>

              {sortOpen && (
                <div className={`sort-menu${sortClosing ? " is-closing" : ""}`}>
                  {["Recommandés", "Prix croissant", "Prix décroissant"].map(
                    (option) => (
                      <button
                        key={option}
                        className={sort === option ? "selected" : ""}
                        onClick={() => {
                          setSort(option);
                          closeSortMenu();
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
          <p className="empty-state">
            Aucun article ne correspond à votre recherche.
          </p>
        )}
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          gallery={selectedProduct.gallery}
          selectedImage={selectedImage}
          onImageChange={setSelectedImage}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={() => addToCart(selectedProduct)}
        />
      )}

      {cartOpen && (
        <CartPanel
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={(index) => {
            setCartItems((items) =>
              items.filter((_, itemIndex) => itemIndex !== index),
            );
          }}
        />
      )}
      {cartMessage && !cartOpen && (
        <button
          className={`cart-toast${toastClosing ? " is-closing" : ""}`}
          onClick={dismissToast}
        >
          {cartMessage} <span>×</span>
        </button>
      )}
    </div>
  );
}
