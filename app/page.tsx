"use client";

import { useMemo, useState } from "react";
import { Category, Product, products } from "@/lib/products";

type CartLine = { product: Product; size: string; quantity: number };
const categories: Category[] = ["All", "Tops", "Dresses", "Footwear", "Accessories"];
const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

function SearchGlyph() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="icon"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.2 4.2"/></svg>;
}
function BagGlyph() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="icon"><path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>;
}
function HeartGlyph({ filled = false }: { filled?: boolean }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="icon" fill={filled ? "currentColor" : "none"}><path d="M20.4 8.8c0 5-8.4 10.1-8.4 10.1S3.6 13.8 3.6 8.8A4.5 4.5 0 0 1 12 6.4a4.5 4.5 0 0 1 8.4 2.4Z"/></svg>;
}

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [sort, setSort] = useState("featured");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery = !normalized || `${product.name} ${product.category} ${product.color}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
    if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);
    if (sort === "newest") filtered.sort((a, b) => (a.badge === "NEW DROP" ? -1 : 0) - (b.badge === "NEW DROP" ? -1 : 0));
    return filtered;
  }, [query, category, sort]);

  const itemCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  function addToBag(product: Product) {
    const size = sizes[product.id] || product.sizes[Math.min(2, product.sizes.length - 1)];
    setCart((previous) => {
      const found = previous.find((line) => line.product.id === product.id && line.size === size);
      if (found) return previous.map((line) => line.product.id === product.id && line.size === size ? { ...line, quantity: line.quantity + 1 } : line);
      return [...previous, { product, size, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function updateQuantity(productId: string, size: string, change: number) {
    setCart((previous) => previous
      .map((line) => line.product.id === productId && line.size === size ? { ...line, quantity: line.quantity + change } : line)
      .filter((line) => line.quantity > 0));
  }

  function toggleFavorite(productId: string) {
    setFavorites((previous) => previous.includes(productId) ? previous.filter((id) => id !== productId) : [...previous, productId]);
  }

  return (
    <main className="min-h-screen bg-white text-[#191919]">
      <div className="announcement flex items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:text-sm">
        <span className="announcement-star">✳</span><span>GOOD FITS. BETTER PRICES.</span><span className="hidden sm:inline">Free shipping on orders over ₹1,499</span><span className="announcement-star">✳</span>
      </div>

      <header className="site-header">
        <div className="header-top mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-4 sm:px-7 lg:px-10">
          <button className="menu-word" aria-label="Open navigation" onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}>MENU</button>
          <a className="brand" href="#top" aria-label="Threadline home">threadline<span>®</span></a>
          <div className="header-actions flex items-center gap-4">
            <label className="search-box hidden md:flex" aria-label="Search styles">
              <SearchGlyph />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the good stuff" />
            </label>
            <button className="icon-button bag-button" aria-label={`Open bag, ${itemCount} items`} onClick={() => setCartOpen(true)}>
              <BagGlyph /><span className="bag-label hidden sm:inline">BAG</span><span className="bag-count">{itemCount}</span>
            </button>
          </div>
        </div>
        <nav className="category-nav flex items-center justify-center gap-6 overflow-x-auto px-4 py-3 sm:gap-10" aria-label="Product categories">
          <a href="#shop" onClick={() => setCategory("All")}>NEW & NOTEWORTHY <span className="nav-dot">●</span></a>
          <a href="#shop" onClick={() => setCategory("Tops")}>TOPS</a>
          <a href="#shop" onClick={() => setCategory("Dresses")}>DRESSES</a>
          <a href="#shop" onClick={() => setCategory("Footwear")}>SNEAKERS</a>
          <a href="#shop" onClick={() => setCategory("Accessories")}>ACCESSORIES</a>
        </nav>
      </header>

      <section id="top" className="hero mx-auto max-w-[1440px] px-4 pb-8 pt-7 sm:px-7 sm:pt-10 lg:px-10">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> THE NEW EVERYDAY</div>
          <h1>Your next<br /><span>favourite</span> is here.</h1>
          <div className="hero-bottom flex flex-wrap items-end justify-between gap-4">
            <p>Good style should feel like you.<br />Find the pieces you’ll keep reaching for.</p>
            <a className="shop-cta" href="#shop">SHOP THE DROP <span aria-hidden="true">↘</span></a>
          </div>
        </div>
        <div className="hero-stamp"><span>FRESH</span><b>FINDS</b><span>FOR EVERY DAY</span><i>✳</i></div>
      </section>

      <section id="shop" className="shop-section mx-auto max-w-[1440px] px-4 py-8 sm:px-7 lg:px-10">
        <div className="section-heading flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div><div className="eyebrow"><span className="eyebrow-line" /> CURATED FOR YOU</div><h2>Fresh picks<span> (and good prices)</span></h2></div>
          <p className="item-number">{visibleProducts.length.toString().padStart(2, "0")} STYLES TO LOVE</p>
        </div>

        <div className="mobile-search md:hidden">
          <SearchGlyph /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search styles, colours, categories" aria-label="Search styles" />
        </div>

        <div className="toolbar flex flex-col justify-between gap-4 py-5 md:flex-row md:items-center">
          <div className="filter-row flex flex-wrap gap-2" aria-label="Filter by category">
            {categories.map((item) => <button key={item} className={`filter-chip ${category === item ? "active" : ""}`} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}
          </div>
          <label className="sort-select">SORT BY <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select><span aria-hidden="true">⌄</span></label>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="product-grid grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
            {visibleProducts.map((product, index) => {
              const saved = favorites.includes(product.id);
              const selectedSize = sizes[product.id] || product.sizes[Math.min(2, product.sizes.length - 1)];
              return (
                <article key={product.id} className="product-card" style={{ animationDelay: `${index * 45}ms` }}>
                  <div className={`product-image image-${index % 4}`}>
                    <img src={product.image} alt={`${product.name} in ${product.color}`} loading={index > 3 ? "lazy" : "eager"} />
                    {product.badge && <span className="product-badge">{product.badge}</span>}
                    <button className={`favorite-button ${saved ? "saved" : ""}`} onClick={() => toggleFavorite(product.id)} aria-label={saved ? `Remove ${product.name} from favourites` : `Add ${product.name} to favourites`} aria-pressed={saved}><HeartGlyph filled={saved} /></button>
                    <div className="image-index">0{products.findIndex((p) => p.id === product.id) + 1}</div>
                  </div>
                  <div className="product-info">
                    <div className="product-category">{product.category} <span>·</span> {product.color}</div>
                    <h3>{product.name}</h3>
                    <div className="price-row"><strong>{money(product.price)}</strong>{product.originalPrice && <><del>{money(product.originalPrice)}</del><span className="discount">{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span></>}</div>
                    <div className="product-buy-row">
                      <label className="size-select"><span className="sr-only">Size for {product.name}</span><select value={selectedSize} onChange={(event) => setSizes((previous) => ({ ...previous, [product.id]: event.target.value }))}>{product.sizes.map((size) => <option key={size} value={size}>{size}</option>)}</select><span aria-hidden="true">⌄</span></label>
                      <button className="add-button" onClick={() => addToBag(product)} aria-label={`Add ${product.name}, size ${selectedSize}, to bag`}>ADD <span>+</span></button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state"><span>✳</span><h3>No matches just yet.</h3><p>Try another search or browse all styles.</p><button onClick={() => { setQuery(""); setCategory("All"); }}>CLEAR FILTERS</button></div>
        )}
      </section>

      <section className="bottom-note mx-auto max-w-[1440px] px-4 pb-10 pt-5 sm:px-7 lg:px-10">
        <div className="note-mark">✳</div><p>LOOK GOOD. FEEL GOOD. <span>KEEP IT MOVING.</span></p><a href="#top">BACK TO TOP ↑</a>
      </section>

      <footer className="site-footer flex flex-col items-start justify-between gap-4 px-4 py-6 sm:flex-row sm:items-center sm:px-10">
        <span className="footer-brand">threadline®</span><span>FRONTEND PORTFOLIO DEMO · PRODUCT DATA IS MOCKED</span><span>MADE FOR THE EVERYDAY.</span>
      </footer>

      {cartOpen && <div className="drawer-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
        <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div className="drawer-header"><div><p className="eyebrow">YOUR PICKS</p><h2 id="cart-title">The bag <span>({itemCount})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close bag">×</button></div>
          {cart.length ? <>
            <div className="cart-lines">{cart.map((line) => <div className="cart-line" key={`${line.product.id}-${line.size}`}>
              <img src={line.product.image} alt="" />
              <div className="cart-line-main"><h3>{line.product.name}</h3><p>Size: {line.size}</p><strong>{money(line.product.price)}</strong><div className="quantity-controls"><button onClick={() => updateQuantity(line.product.id, line.size, -1)} aria-label={`Decrease ${line.product.name} quantity`}>−</button><span>{line.quantity}</span><button onClick={() => updateQuantity(line.product.id, line.size, 1)} aria-label={`Increase ${line.product.name} quantity`}>+</button></div></div>
            </div>)}</div>
            <div className="cart-summary"><div><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p>Shipping and taxes are calculated at checkout.</p><button className="checkout-button" disabled>CHECKOUT · DEMO ONLY</button><button className="continue-button" onClick={() => setCartOpen(false)}>KEEP BROWSING</button></div>
          </> : <div className="empty-bag"><span>✳</span><h3>Your bag is taking a break.</h3><p>Add something you love and it’ll show up here.</p><button onClick={() => setCartOpen(false)}>EXPLORE THE DROP</button></div>}
        </aside>
      </div>}
    </main>
  );
}
