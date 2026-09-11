import Header from '@/components/layout/Header';
export default function ProductDetails() {
  return (
    <div className="bg-background min-h-screen pb-20 font-body-md text-on-surface antialiased">
      <Header />
      <main className="w-full pt-[11rem] bg-background min-h-screen">
        <div className="flex flex-col w-full">
{/* Top Utility Sub-Header & Breadcrumb Bar */}
<section className="w-full bg-surface-container-lowest shadow-[0_1px_4px_rgba(15,23,42,0.03)]">
<div className="max-w-container-max-width mx-auto px-grid-gutter py-space-sm flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
{/* Breadcrumb trail */}
<div className="flex items-center gap-space-2xs text-body-sm overflow-x-auto min-w-0">
<a className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 shrink-0 font-body-sm" href="#">
<span className="material-symbols-outlined text-[16px]">home</span>
          Home
        </a>
<span className="material-symbols-outlined text-outline-variant text-[14px] shrink-0">chevron_right</span>
<a className="text-on-surface-variant hover:text-primary transition-colors shrink-0 font-body-sm" href="#">Dairy, Bread &amp; Eggs</a>
<span className="material-symbols-outlined text-outline-variant text-[14px] shrink-0">chevron_right</span>
<a className="text-on-surface-variant hover:text-primary transition-colors shrink-0 font-body-sm" href="#">Milk</a>
<span className="material-symbols-outlined text-outline-variant text-[14px] shrink-0">chevron_right</span>
<span className="text-on-surface font-headline-sm text-body-sm font-semibold truncate">Amul Gold Full Cream Milk</span>
</div>
{/* Action Utilities: Share, Wishlist, Report Issue */}
<div className="flex items-center gap-space-sm shrink-0">
<button className="flex items-center gap-1.5 px-space-sm py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-error transition-all text-body-sm" id="wishlistBtn" data-data-onclick="toggleWishlist()">
<span className="material-symbols-outlined text-[18px]" id="wishlistIcon">favorite_border</span>
<span className="hidden md:inline font-label-button text-body-sm">Wishlist</span>
</button>
<button className="flex items-center gap-1.5 px-space-sm py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-primary transition-all text-body-sm" data-data-onclick="shareProduct()">
<span className="material-symbols-outlined text-[18px]">share</span>
<span className="hidden md:inline font-label-button text-body-sm">Share</span>
</button>
<a className="flex items-center gap-1 text-outline hover:text-on-surface font-body-sm transition-colors text-body-sm pl-space-xs" href="#specifications">
<span className="material-symbols-outlined text-[16px]">flag</span>
<span className="hidden lg:inline">Report Issue</span>
</a>
</div>
</div>
</section>
{/* Main Hero Split Grid Section */}
<section className="w-full max-w-container-max-width mx-auto px-grid-gutter py-space-xl">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
{/* LEFT COLUMN: Product Visuals & Cold-Chain Badges (5 Cols) */}
<div className="lg:col-span-5 flex flex-col gap-space-md lg:sticky lg:top-48">
{/* Main Product Card */}
<div className="relative w-full rounded-xl bg-surface-container-lowest shadow-[0_2px_12px_rgba(15,23,42,0.06)] overflow-hidden p-space-md flex flex-col items-center">
{/* Badges Floating Header */}
<div className="w-full flex items-center justify-between gap-2 mb-space-sm z-10">
<span className="inline-flex items-center gap-1 bg-secondary text-on-secondary px-space-xs py-1 rounded-full font-label-badge text-label-badge shadow-sm">
<span className="material-symbols-outlined text-[14px]">bolt</span>
              10 MIN DELIVERY
            </span>
<div className="flex items-center gap-1.5">
<span className="inline-flex items-center gap-1 bg-tertiary-fixed text-on-tertiary-fixed px-space-xs py-1 rounded-full font-label-badge text-label-badge font-bold">
                21% OFF
              </span>
<span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant px-space-xs py-1 rounded-full font-label-badge text-label-badge">
<span className="material-symbols-outlined text-primary text-[14px]">ac_unit</span>
                3.8Â°C Pod
              </span>
</div>
</div>
{/* Product Image Canvas */}
<div className="relative w-full aspect-square max-h-[420px] rounded-lg bg-surface-container-low flex items-center justify-center overflow-hidden p-space-lg group">
<div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none"></div>
<img className="w-full h-full object-contain transform transition-transform duration-500 group-hover:scale-105" data-alt="Commercial studio shot of Amul Gold fresh milk 500ml polypack with realistic chilled water condensation droplets, vibrant royal blue and metallic gold typography, pristine white studio gradient background, hyper-detailed dairy commercial lighting." id="mainProductImg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvjb8Q-wam5XV9q5w1GqouLrR9dTlmOEcQ1jRtCL58Pr4Fm6VOOFS4cRc_SfVOLXO8JUdGXl1EcSazb2EE6U8jxnxzxeeSPoLFfAdcaUKYo-xySJOxxTeqR2X6U7ty2OwrGBZPkzdQq9PovYiRO6Mptb280_rZ24gytCpwKPMYBUz6LAyIKqB2i3gvGkLsab136MRiBmx1pcTx9Ocn63R0VSuELq8A5DqpOfiaVA6ikA2TTMQjS0_ZtQ"/>
{/* Live Temperature Tracker Indicator */}
<div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
<span className="font-label-badge text-label-badge text-primary uppercase font-bold">Cold Chain Intact â€¢ 3.8Â°C</span>
</div>
</div>
{/* Thumbnails Strip */}
<div className="grid grid-cols-4 gap-space-xs w-full mt-space-md">
<button className="thumbnail-btn rounded-lg p-1.5 bg-surface-container-high ring-2 ring-primary transition-all flex flex-col items-center" data-data-onclick="changeThumbnail(0, this)">
<div className="w-full aspect-square rounded overflow-hidden bg-surface-container-low mb-1">
<img className="w-full h-full object-contain" data-alt="Front facing retail packaging pouch of Amul Gold Full Cream Milk with clear branding and 6% fat indicator." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiuKxSpRO6iOmRfatEkmQ-D2-NfFiHWITJYr7QmPB4yEbsqThJ71hVUzDMLv-9-YGWQ4_pOXi_kg_R077ZIadQrBFj93fDoGJ7fgsr58StWldtO0G6GYqTc49sMmP2ew3r-NHO6KIagIxfuVfem1fZlCLxTkXe5qIo5AayxOz1F48uDhOpcWRswmw31q0XQOqGqciDPz5AO2gcNtYSV0wA-7hyLblEgHtFSLyZkudO26ZCjwqoqGj9sg"/>
</div>
<span className="font-label-badge text-label-badge text-on-surface truncate">Front Pack</span>
</button>
<button className="thumbnail-btn rounded-lg p-1.5 bg-surface-container-low hover:bg-surface-container transition-all flex flex-col items-center" data-data-onclick="changeThumbnail(1, this)">
<div className="w-full aspect-square rounded overflow-hidden bg-surface-container-low mb-1">
<img className="w-full h-full object-contain" data-alt="Close up high resolution typography photo of Amul Gold milk nutritional breakdown facts table and pasteurization seals." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZpYJEmnGKlWWZNtwq6bNE3BNVdhAiFmaHEvTd88vpkj6OW12f_wv0S8nKgoP8ShwkMeYeXzuFObUf8VQa1FASMGR1kL1m9Gv5Ed98nrkzeeYkw6sx7Auu3K0_kR5AZHvFzpH_N-ZmNgV-7AetjHsdLgJ9TWx60AlkTQvN5k0MhVEji-vbKsG-mcj1Dzl5uMe7ocWBreqGXRahTVI60hPGNiuykOxvpcwB030-bl37pA1-xDRfbLdwuQ"/>
</div>
<span className="font-label-badge text-label-badge text-on-surface-variant truncate">Nutrition</span>
</button>
<button className="thumbnail-btn rounded-lg p-1.5 bg-surface-container-low hover:bg-surface-container transition-all flex flex-col items-center" data-data-onclick="changeThumbnail(2, this)">
<div className="w-full aspect-square rounded overflow-hidden bg-surface-container-low mb-1">
<img className="w-full h-full object-contain" data-alt="Lush green dairy farm cooperative certification stamp with gold holographic quality seal on clean white surface." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUGjsBDFouGUyRxtgOfnvAJ3obP_uCHPta8wz4GNxAPNr-RaYtpOMGVSM4tbN4pMXReKW5VK5-lv9l0qBIL2zTRPaM74bMtGhFHTrvFUIQcNlN5ICwGjQ0i_sAMZZBKfFh2ldmx1s9SEEPiSoBRoHJZTIVCeRNUZnOXPy8a3MmU-HpOVkDTvyzyE4n6f5ZhKqWxxa9LPDLz7MqJfCqGzFyR2bbWi2yoiaBszAOwRslqvdaOjOcz7yA4Q"/>
</div>
<span className="font-label-badge text-label-badge text-on-surface-variant truncate">Farm Origin</span>
</button>
<button className="thumbnail-btn rounded-lg p-1.5 bg-surface-container-low hover:bg-surface-container transition-all flex flex-col items-center" data-data-onclick="changeThumbnail(3, this)">
<div className="w-full aspect-square rounded overflow-hidden bg-surface-container-low mb-1">
<img className="w-full h-full object-contain" data-alt="Frothy steaming cup of Indian masala chai tea poured alongside fresh Amul Gold cream milk pitcher on marble table." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeWkb3AgdXonFTCEYQanZevfIPBadD94mHUgvF3PysOoocJE9Q_nG8GrtzSjOBmS0Yq0HRjdXwfeshUGS5l87ebmRLkdqrJaAdqslCeGGxHbMizptV3fEVEz0qgyjWnfmGNSn6O1GRe1eiBFxghifrKSGwrFg0XG8LwKlmtrm25gTsYA91cfo-6QVxbokFxTk0TVfjBm07x7vFTEluil36AiquNvqzZIO4xu984fvfPFsPgq0Oe8ibTg"/>
</div>
<span className="font-label-badge text-label-badge text-on-surface-variant truncate">Tea / Coffee</span>
</button>
</div>
</div>
{/* Trust & Freshness Assurance Matrix */}
<div className="grid grid-cols-3 gap-space-xs p-space-sm rounded-xl bg-surface-container-low shadow-[0_1px_4px_rgba(15,23,42,0.02)]">
<div className="flex flex-col items-center text-center p-2">
<span className="material-symbols-outlined text-primary text-[22px] mb-1">verified_user</span>
<span className="font-label-badge text-label-badge text-on-surface font-bold">100% Genuine</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-tight">Direct Amul Plant</span>
</div>
<div className="flex flex-col items-center text-center p-2 bg-surface-container-lowest rounded-lg shadow-sm">
<span className="material-symbols-outlined text-primary text-[22px] mb-1">ac_unit</span>
<span className="font-label-badge text-label-badge text-on-surface font-bold">4Â°C Cold Chain</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-tight">Chilled Micro-Hub</span>
</div>
<div className="flex flex-col items-center text-center p-2">
<span className="material-symbols-outlined text-tertiary text-[22px] mb-1">schedule</span>
<span className="font-label-badge text-label-badge text-on-surface font-bold">Morning Batch</span>
<span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-tight">Packed 4:30 AM Today</span>
</div>
</div>
</div>
{/* RIGHT COLUMN: Buy Box, Fast Delivery & Offers (7 Cols) */}
<div className="lg:col-span-7 flex flex-col gap-space-lg">
{/* Header Info Box */}
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_2px_12px_rgba(15,23,42,0.04)] space-y-space-md">
{/* Brand and Rating Row */}
<div className="flex items-center justify-between gap-space-sm flex-wrap">
<a className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-high text-primary font-label-badge text-label-badge font-extrabold uppercase tracking-wider hover:bg-surface-container-highest transition-colors" href="#">
<span className="material-symbols-outlined text-[14px]">storefront</span>
              AMUL OFFICIAL STORE
            </a>
<div className="flex items-center gap-2">
<div className="flex items-center gap-1 bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-label-badge text-label-badge font-bold">
<span className="material-symbols-outlined text-[14px]" >star</span>
                4.8
              </div>
<span className="font-body-sm text-body-sm text-on-surface-variant">14,820 ratings</span>
<span className="text-outline-variant">â€¢</span>
<span className="font-label-badge text-label-badge text-tertiary font-bold uppercase">#1 Bestseller in Dairy</span>
</div>
</div>
{/* Product Title */}
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
              Amul Gold Full Cream Fresh Milk
            </h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Pasteurised &amp; Homogenised Cow-Buffalo blend with minimum 6.0% Fat &amp; 9.0% SNF.
            </p>
</div>
{/* Pricing Block with Pill Discount */}
<div className="flex items-baseline gap-space-sm flex-wrap">
<span className="font-price-lg text-headline-lg font-extrabold text-on-surface" id="productPrice">â‚¹33</span>
<span className="font-price-strike text-price-strike text-outline line-through" id="productMrp">MRP â‚¹42</span>
<span className="bg-secondary-container text-on-secondary-container font-label-badge text-label-badge font-bold px-2 py-1 rounded-md uppercase" id="productSavings">
              Save â‚¹9 (21% OFF)
            </span>
<span className="font-body-sm text-body-sm text-outline-variant">Inclusive of all taxes</span>
</div>
{/* Unit / Quantity Variant Selector */}
<div className="space-y-space-xs pt-space-2xs">
<span className="font-label-button text-label-button text-on-surface-variant uppercase tracking-wider">Select Pack Size</span>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
{/* 500ml Variant */}
<button className="variant-btn flex flex-col p-space-sm rounded-lg bg-surface-container-high ring-2 ring-primary text-left transition-all relative overflow-hidden" data-data-onclick="selectVariant(this, 33, 42, 9, '500 ml')">
<div className="flex items-center justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface">500 ml</span>
<span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
</div>
<div className="flex items-baseline gap-1 mt-1">
<span className="font-price-lg text-body-lg font-bold text-on-surface">â‚¹33</span>
<span className="font-price-strike text-body-sm text-outline line-through">â‚¹42</span>
</div>
<span className="font-label-badge text-[10px] text-primary mt-1 font-bold">Standard Single Pouch</span>
</button>
{/* 1 Litre Variant */}
<button className="variant-btn flex flex-col p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-left transition-all relative overflow-hidden" data-data-onclick="selectVariant(this, 66, 84, 18, '1 Litre')">
<div className="flex items-center justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface">1 Litre</span>
<span className="material-symbols-outlined text-outline-variant text-[18px]">radio_button_unchecked</span>
</div>
<div className="flex items-baseline gap-1 mt-1">
<span className="font-price-lg text-body-lg font-bold text-on-surface">â‚¹66</span>
<span className="font-price-strike text-body-sm text-outline line-through">â‚¹84</span>
</div>
<span className="font-label-badge text-[10px] text-on-surface-variant mt-1 font-medium">Family Pack (1L)</span>
</button>
{/* Twin Pack Variant */}
<button className="variant-btn flex flex-col p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-left transition-all relative overflow-hidden" data-data-onclick="selectVariant(this, 64, 84, 20, 'Pack of 2 x 500ml')">
<span className="absolute top-0 right-0 bg-tertiary text-on-tertiary font-label-badge text-[9px] px-1.5 py-0.5 rounded-bl font-bold uppercase">SAVE EXTRA â‚¹2</span>
<div className="flex items-center justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface">2 x 500ml</span>
<span className="material-symbols-outlined text-outline-variant text-[18px]">radio_button_unchecked</span>
</div>
<div className="flex items-baseline gap-1 mt-1">
<span className="font-price-lg text-body-lg font-bold text-on-surface">â‚¹64</span>
<span className="font-price-strike text-body-sm text-outline line-through">â‚¹84</span>
</div>
<span className="font-label-badge text-[10px] text-tertiary mt-1 font-bold">Combo Saver Pack</span>
</button>
</div>
</div>
{/* Live 10-Minute Dark Store Fulfillment Widget */}
<div className="p-space-sm rounded-xl bg-secondary-container/30 flex items-start gap-space-sm">
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
<span className="material-symbols-outlined text-[22px] animate-pulse">electric_bolt</span>
</div>
<div className="flex-1 min-w-0">
<div className="flex items-center gap-2 flex-wrap">
<span className="font-headline-sm text-headline-sm text-on-surface">Lightning Delivery in 9 Mins</span>
<span className="inline-flex items-center px-2 py-0.5 rounded bg-primary text-on-primary font-label-badge text-[10px] uppercase font-bold">LIVE HUB</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Dispatched from <span className="font-semibold text-on-surface">Indiranagar 100ft Hub</span> (0.9 km away)
              </p>
<div className="flex items-center gap-2 mt-2">
<div className="w-full bg-surface-container-highest rounded-full h-1.5 max-w-[140px] overflow-hidden">
<div className="bg-primary h-full rounded-full" ></div>
</div>
<span className="font-body-sm text-[11px] text-error font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-[13px]">alarm</span>
                  Only 18 units left in current slot
                </span>
</div>
</div>
</div>
{/* Call to Action Buttons: Stepper + Subscription */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
{/* Stepper / Instant Add */}
<div className="flex items-center justify-between bg-primary text-on-primary rounded-xl p-1.5 shadow-[0_4px_16px_rgba(0,105,72,0.25)]">
<button className="w-12 h-11 rounded-lg bg-primary-container hover:bg-secondary flex items-center justify-center text-on-primary transition-colors" data-data-onclick="decrementQty()">
<span className="material-symbols-outlined text-[20px]">remove</span>
</button>
<div className="flex flex-col items-center">
<span className="font-headline-sm text-headline-sm text-on-primary font-bold" id="qtyCounter">1</span>
<span className="font-label-badge text-[10px] text-primary-fixed uppercase tracking-wider">In Cart</span>
</div>
<button className="w-12 h-11 rounded-lg bg-primary-container hover:bg-secondary flex items-center justify-center text-on-primary transition-colors" data-data-onclick="incrementQty()">
<span className="material-symbols-outlined text-[20px]">add</span>
</button>
</div>
{/* Daily Subscription Button */}
<button className="flex items-center justify-center gap-space-xs bg-surface-container-low hover:bg-surface-container text-primary font-label-button text-label-button rounded-xl py-3 px-space-md transition-all shadow-[0_1px_4px_rgba(15,23,42,0.04)]" data-data-onclick="openSubscriptionModal()">
<span className="material-symbols-outlined text-[20px] text-primary">calendar_month</span>
<span>Subscribe for 6:00 AM Daily</span>
</button>
</div>
{/* Special Offers & Discount Coupons Accordion */}
<div className="pt-space-xs space-y-space-xs">
<span className="font-label-button text-label-button text-on-surface-variant uppercase tracking-wider">Available Offers for this Item</span>
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between gap-space-sm hover:bg-surface-container transition-colors">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-tertiary text-[20px]">local_offer</span>
<div className="flex flex-col">
<span className="font-headline-sm text-body-sm font-bold text-on-surface">Use Code: QUICKMILK</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">Flat 10% cashback up to â‚¹50 on dairy orders over â‚¹199</span>
</div>
</div>
<button className="px-2.5 py-1 rounded bg-surface-container-lowest hover:bg-surface-container-high text-primary font-label-badge text-label-badge font-bold uppercase transition-colors" data-data-onclick="applyCoupon('QUICKMILK')">
                Apply
              </button>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between gap-space-sm hover:bg-surface-container transition-colors">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[20px]">credit_card</span>
<div className="flex flex-col">
<span className="font-headline-sm text-body-sm font-bold text-on-surface">Axis &amp; HDFC Card Offer</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">Instant 5% discount on checkout via UPI or cards</span>
</div>
</div>
<span className="font-label-badge text-label-badge text-on-surface-variant uppercase font-bold">Auto Applied</span>
</div>
</div>
</div>
</div>
</div>
</section>
{/* SECTION: Nutritional Information & Health Facts (Key Requested Feature) */}
<section className="w-full max-w-container-max-width mx-auto px-grid-gutter py-space-xl">
<div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
{/* Section Title & Serving Toggle Header */}
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-lg">
<div>
<div className="flex items-center gap-2">
<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container">
<span className="material-symbols-outlined text-[20px]">health_and_safety</span>
</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Nutritional Information &amp; Health Facts</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Standardized laboratory analysis per batch. 100% pure milk without synthetic thickeners or starch.
          </p>
</div>
{/* Metric Toggle: 100ml vs 250ml Glass */}
<div className="inline-flex p-1 rounded-xl bg-surface-container-low self-start md:self-auto">
<button className="px-space-md py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-button text-label-button shadow-sm transition-all font-bold" id="toggle100ml" data-data-onclick="setServingMode('100ml')">
            Per 100 ml
          </button>
<button className="px-space-md py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface font-label-button text-label-button transition-all" id="toggle250ml" data-data-onclick="setServingMode('250ml')">
            Per Glass (250 ml)
          </button>
</div>
</div>
{/* Nutrients Bento Grid */}
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-sm mb-space-lg">
{/* Energy Card */}
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between">
<div className="flex items-center justify-between text-outline">
<span className="material-symbols-outlined text-[20px] text-tertiary">bolt</span>
<span className="font-label-badge text-[10px] uppercase font-bold text-tertiary">Energy</span>
</div>
<div className="mt-space-md">
<span className="font-headline-lg text-headline-md text-on-surface font-extrabold" id="nutrEnergy">87</span>
<span className="font-body-sm text-body-sm text-on-surface-variant ml-0.5">kcal</span>
</div>
<span className="font-body-sm text-[11px] text-outline mt-1">4.3% of daily intake</span>
</div>
{/* Protein Card */}
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between">
<div className="flex items-center justify-between text-outline">
<span className="material-symbols-outlined text-[20px] text-primary">fitness_center</span>
<span className="font-label-badge text-[10px] uppercase font-bold text-primary">Protein</span>
</div>
<div className="mt-space-md">
<span className="font-headline-lg text-headline-md text-on-surface font-extrabold" id="nutrProtein">3.5</span>
<span className="font-body-sm text-body-sm text-on-surface-variant ml-0.5">g</span>
</div>
<span className="font-body-sm text-[11px] text-secondary font-semibold mt-1">7% Adult RDA</span>
</div>
{/* Total Fat Card */}
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between">
<div className="flex items-center justify-between text-outline">
<span className="material-symbols-outlined text-[20px] text-tertiary">opacity</span>
<span className="font-label-badge text-[10px] uppercase font-bold text-tertiary">Milk Fat</span>
</div>
<div className="mt-space-md">
<span className="font-headline-lg text-headline-md text-on-surface font-extrabold" id="nutrFat">6.0</span>
<span className="font-body-sm text-body-sm text-on-surface-variant ml-0.5">g</span>
</div>
<span className="font-body-sm text-[11px] text-outline mt-1">Full Cream Homogenised</span>
</div>
{/* Saturated Fat */}
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between">
<div className="flex items-center justify-between text-outline">
<span className="material-symbols-outlined text-[20px] text-on-surface-variant">shield</span>
<span className="font-label-badge text-[10px] uppercase font-bold text-on-surface-variant">Sat Fat</span>
</div>
<div className="mt-space-md">
<span className="font-headline-lg text-headline-md text-on-surface font-extrabold" id="nutrSatFat">3.8</span>
<span className="font-body-sm text-body-sm text-on-surface-variant ml-0.5">g</span>
</div>
<span className="font-body-sm text-[11px] text-outline mt-1">Naturally occurring</span>
</div>
{/* Natural Carbs / Sugar */}
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between">
<div className="flex items-center justify-between text-outline">
<span className="material-symbols-outlined text-[20px] text-primary">grain</span>
<span className="font-label-badge text-[10px] uppercase font-bold text-primary">Lactose</span>
</div>
<div className="mt-space-md">
<span className="font-headline-lg text-headline-md text-on-surface font-extrabold" id="nutrCarbs">5.0</span>
<span className="font-body-sm text-body-sm text-on-surface-variant ml-0.5">g</span>
</div>
<span className="font-body-sm text-[11px] text-secondary font-semibold mt-1">0g Added Sugars</span>
</div>
{/* Calcium & Micronutrients */}
<div className="p-space-md rounded-xl bg-surface-container-low flex flex-col justify-between">
<div className="flex items-center justify-between text-outline">
<span className="material-symbols-outlined text-[20px] text-secondary">format_h4</span>
<span className="font-label-badge text-[10px] uppercase font-bold text-secondary">Calcium</span>
</div>
<div className="mt-space-md">
<span className="font-headline-lg text-headline-md text-on-surface font-extrabold" id="nutrCalcium">125</span>
<span className="font-body-sm text-body-sm text-on-surface-variant ml-0.5">mg</span>
</div>
<span className="font-body-sm text-[11px] text-secondary font-semibold mt-1">15% Daily Calcium</span>
</div>
</div>
{/* Vitamins & Certification Highlights Row */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-space-md pt-space-xs">
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-high">
<div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
<span className="material-symbols-outlined text-[18px]">verified</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-body-sm font-bold text-on-surface">Vitamin A &amp; D Fortified</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">FSSAI +F endorsed standard</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-high">
<div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shrink-0">
<span className="material-symbols-outlined text-[18px]">sanitizer</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-body-sm font-bold text-on-surface">Pasteurized at 72Â°C</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">Safe to consume without boiling</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-high">
<div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-tertiary shrink-0">
<span className="material-symbols-outlined text-[18px]">eco</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-body-sm font-bold text-on-surface">Grass-Fed Dairy Blend</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">Ethically raised buffalo &amp; cow milk</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-high">
<div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
<span className="material-symbols-outlined text-[18px]">block</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-body-sm font-bold text-on-surface">0% Preservatives</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">Pure, zero adulteration guarantee</span>
</div>
</div>
</div>
</div>
</section>
{/* SECTION: Frequently Bought Together / Morning Recipe Bundle (Key Requested Feature) */}
<section className="w-full max-w-container-max-width mx-auto px-grid-gutter py-space-xl">
<div className="p-space-xl rounded-xl bg-surface-container-lowest shadow-[0_2px_12px_rgba(15,23,42,0.04)]">
{/* Section Header */}
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs mb-space-lg">
<div>
<div className="flex items-center gap-2">
<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
<span className="material-symbols-outlined text-[20px]">breakfast_dining</span>
</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Classic Morning Tea &amp; Toast Breakfast Bundle</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Frequently paired together by 74% of customers ordering Amul Gold in Indiranagar.
          </p>
</div>
<span className="inline-flex items-center gap-1 text-tertiary font-label-badge text-label-badge font-extrabold uppercase bg-tertiary-fixed/40 px-space-sm py-1 rounded-full self-start sm:self-auto">
<span className="material-symbols-outlined text-[14px]">savings</span>
          SAVE â‚¹36 ON COMBO
        </span>
</div>
{/* Bundle Items Interactive Grid & Calculation Card */}
<div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-center">
{/* Interactive Items Chain (8 Cols) */}
<div className="xl:col-span-8 flex flex-col md:flex-row items-center gap-space-sm flex-wrap">
{/* Item 1: Amul Gold Milk */}
<div className="w-full md:w-44 p-space-sm rounded-xl bg-surface-container-low flex flex-col items-center text-center relative group">
<label className="absolute top-2 left-2 cursor-pointer">
<input defaultChecked={true} className="w-4 h-4 accent-primary rounded cursor-not-allowed" disabled={true} type="checkbox"/>
</label>
<div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container-lowest p-1 mb-2">
<img className="w-full h-full object-contain" data-alt="Pouch of Amul Gold Milk on white backdrop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9uk6Z9RHNmLDnWo27vP6KpmAp8FCrvJb9rxmBXjO_3VIcU-cx15nJOAs7SFId9fNzVNkTs7HQGgZ67tACTXV6lFF44Bwttn1IaRG2UM3-zZcButOYwVl7igsmv2KOPMWAgbNY8M5gf5tuoghFExX5nVeYauy4ii1plWMon71GdUeLLB4ikejkdRtoYrKIZ4JVMJ-AwULRsb4lgNnj6CFa45RjD-bgdX_g-sAIkOZpTlsjPUE4sLUjsw"/>
</div>
<span className="font-headline-sm text-body-sm font-semibold text-on-surface line-clamp-1">Amul Gold Milk</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">500 ml</span>
<span className="font-headline-sm text-body-md font-bold text-primary mt-1">â‚¹33</span>
</div>
{/* Plus Sign */}
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant shrink-0 font-bold">
<span className="material-symbols-outlined text-[18px]">add</span>
</div>
{/* Item 2: Wagh Bakri Premium Tea */}
<div className="w-full md:w-44 p-space-sm rounded-xl bg-surface-container-low flex flex-col items-center text-center relative group">
<label className="absolute top-2 left-2 cursor-pointer">
<input defaultChecked={true} className="w-4 h-4 accent-primary rounded cursor-pointer" id="bundleItem2" data-onchange="updateBundleTotal()" type="checkbox"/>
</label>
<div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container-lowest p-1 mb-2">
<img className="w-full h-full object-contain" data-alt="Packaging carton of Wagh Bakri Premium CTC Tea 250g with golden brew teacup" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSK0CvncUKyeKIASc_rXPQeT86Gh8K-AyoINVvFbp5xC3wdxZsCFeX7ZReXQ93PIoCz6vSCSJJ4Ae8Ue5-RS8ojH8dpBPkzj-wdghuHAqWwXUUgwBqbQxSgdZ0DDaePymOxgs7Skj_c-WHYgyIM6sPaJuaaz351GnS_5hE4U_J6phEfX_j9jFYWoOWfT0b2Tkm9gV2LmktMGavmDz0rY0fwVrIDgkRG8lYL6OhWs-bX4sRD4HlJR9hhA"/>
</div>
<span className="font-headline-sm text-body-sm font-semibold text-on-surface line-clamp-1">Wagh Bakri Tea</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">250 g</span>
<span className="font-headline-sm text-body-md font-bold text-primary mt-1">â‚¹152</span>
</div>
{/* Plus Sign */}
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant shrink-0 font-bold">
<span className="material-symbols-outlined text-[18px]">add</span>
</div>
{/* Item 3: Britannia Fresh Bread */}
<div className="w-full md:w-44 p-space-sm rounded-xl bg-surface-container-low flex flex-col items-center text-center relative group">
<label className="absolute top-2 left-2 cursor-pointer">
<input defaultChecked={true} className="w-4 h-4 accent-primary rounded cursor-pointer" id="bundleItem3" data-onchange="updateBundleTotal()" type="checkbox"/>
</label>
<div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container-lowest p-1 mb-2">
<img className="w-full h-full object-contain" data-alt="Loaf of freshly baked soft white Britannia Daily Fresh sliced bread pack" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuD-RqC7fnpHTrpff5G5p0P0ZVt3NjIZlGdb9SFG8MGHXGNcyeeAtssnZoVyxUBlBbsK4y2SwAYp5Sb3GgiqIhcFzQGEXVz8N2XQLMWVsZ-JZiPxucAzrhxKygxbTq-qtbhBzD6fJs6RF3Nlw_PGlfM4WKFsFisIwPmfUutDYUymn2OIxjkLMGe0UDLt8m7ekcfqV-iREADBcuks4afV7K0n6JGk3tzuttv8chuC0LsD9a0y17JnJqCQ"/>
</div>
<span className="font-headline-sm text-body-sm font-semibold text-on-surface line-clamp-1">Britannia Bread</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">400 g</span>
<span className="font-headline-sm text-body-md font-bold text-primary mt-1">â‚¹40</span>
</div>
{/* Plus Sign */}
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant shrink-0 font-bold">
<span className="material-symbols-outlined text-[18px]">add</span>
</div>
{/* Item 4: Amul Salted Butter */}
<div className="w-full md:w-44 p-space-sm rounded-xl bg-surface-container-low flex flex-col items-center text-center relative group">
<label className="absolute top-2 left-2 cursor-pointer">
<input defaultChecked={true} className="w-4 h-4 accent-primary rounded cursor-pointer" id="bundleItem4" data-onchange="updateBundleTotal()" type="checkbox"/>
</label>
<div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container-lowest p-1 mb-2">
<img className="w-full h-full object-contain" data-alt="Classic iconic golden yellow box of Amul Salted Butter 100g with cheerful Amul butter girl mascot illustration" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt0M9fwOgIGZua7Q0jkv7urtGw7gos2z1c-hbubFXNAZgzbh_EMlDcojfJZXApOnLB-6KooGBXFvskkRliYq_VLl7ss7YzGvFQ2McjDOT5WU6rxaYYkYE5AO2Y6-L_J0nnWq_biyGSgIItx2qvSHXHQWmZe50Jv2OaoynT1pVKxbWWFKDm5XciNUEPhKR5Y2OCmkybUVcXOViLz5sZeyRn6LfVhFmvNo8uVIEwoSLVQR8ZrLDfXUX1fg"/>
</div>
<span className="font-headline-sm text-body-sm font-semibold text-on-surface line-clamp-1">Amul Butter</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">100 g</span>
<span className="font-headline-sm text-body-md font-bold text-primary mt-1">â‚¹56</span>
</div>
</div>
{/* Bundle Pricing & Single-Click CTA (4 Cols) */}
<div className="xl:col-span-4 p-space-lg rounded-xl bg-surface-container-high/60 flex flex-col justify-between gap-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between text-body-sm text-on-surface-variant">
<span>Combined MRP:</span>
<span className="line-through" id="bundleRegularPrice">â‚¹281</span>
</div>
<div className="flex items-center justify-between text-body-sm text-tertiary font-bold">
<span>Combo Discount:</span>
<span>- â‚¹36</span>
</div>
<div className="pt-space-xs flex items-baseline justify-between">
<span className="font-headline-sm text-headline-sm text-on-surface">Bundle Total:</span>
<span className="font-price-lg text-headline-lg font-extrabold text-primary" id="bundleSpecialPrice">â‚¹245</span>
</div>
<span className="font-body-sm text-[11px] text-on-surface-variant block">All items dispatched together in 1 temperature-controlled bag.</span>
</div>
<button className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-button text-label-button py-3.5 px-space-md rounded-xl shadow-[0_4px_16px_rgba(0,105,72,0.25)] flex items-center justify-center gap-space-xs transition-all" id="addBundleBtn" data-data-onclick="addBundleToCart()">
<span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
<span id="bundleBtnText">Add All 4 Items (â‚¹245)</span>
</button>
</div>
</div>
</div>
</section>
{/* SECTION: Complete the Recipe / Cold-Chain Recommendations Carousel */}
<section className="w-full max-w-container-max-width mx-auto px-grid-gutter py-space-xl">
<div className="space-y-space-md">
{/* Section Header with Arrows */}
<div className="flex items-center justify-between">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Complete the Recipe: Cold-Chain Fresh Picks</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Recommended based on everyday breakfast &amp; cooking combinations</p>
</div>
<div className="flex items-center gap-space-xs">
<button className="w-9 h-9 rounded-full bg-surface-container-lowest hover:bg-surface-container shadow-sm flex items-center justify-center text-on-surface transition-colors" data-data-onclick="scrollRecommendations(-1)">
<span className="material-symbols-outlined text-[18px]">chevron_left</span>
</button>
<button className="w-9 h-9 rounded-full bg-surface-container-lowest hover:bg-surface-container shadow-sm flex items-center justify-center text-on-surface transition-colors" data-data-onclick="scrollRecommendations(1)">
<span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</div>
{/* Scrollable Product Matrix */}
<div className="flex gap-space-md overflow-x-auto pb-space-sm scroll-smooth" id="recSlider">
{/* Rec Card 1 */}
<div className="w-56 shrink-0 p-space-sm rounded-xl bg-surface-container-lowest shadow-[0_1px_4px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all flex flex-col justify-between">
<div>
<div className="relative w-full aspect-square rounded-lg bg-surface-container-low p-2 overflow-hidden mb-space-xs">
<span className="absolute top-2 left-2 bg-secondary text-on-secondary font-label-badge text-[10px] px-1.5 py-0.5 rounded-full font-bold">10 MINS</span>
<img className="w-full h-full object-contain" data-alt="Bru Instant Coffee glass jar 100g with rich dark roasted coffee granules and green cap" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_hORm6l5a1tZyfW4iHDVdbDUxFXN7ug8B5RpPA_seXzFx8EmW-0j1tgy0Fpqp7Qg8DJNG6zfemWYHf6B-9o7nBQL6apRueMKVcEUKsf_FL-_-6kdM8a8YnnlmxsccwAOlSf5a2jFukhd2kshryfB1W2-OyIgEbQsoJEE4_70sf0LLxCW94tgyNvid81P4qq7mE0RBpL6w1bkG50Z3cY2VyGLVEoP5RKiTJICJs54GGbsdu7KUl7ddow"/>
</div>
<span className="font-body-sm text-[12px] text-on-surface-variant block">Bru</span>
<h3 className="font-headline-sm text-body-md font-bold text-on-surface line-clamp-2">Instant Coffee Powder</h3>
<span className="font-body-sm text-[12px] text-on-surface-variant">100 g</span>
</div>
<div className="mt-space-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-price-lg text-body-lg font-bold text-on-surface">â‚¹155</span>
<span className="font-price-strike text-[11px] text-outline line-through">â‚¹175</span>
</div>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-primary hover:text-on-primary text-primary font-label-button text-label-button transition-colors font-bold" data-data-onclick="quickAddRec(this, 'Bru Instant Coffee', 155)">
              + ADD
            </button>
</div>
</div>
{/* Rec Card 2 */}
<div className="w-56 shrink-0 p-space-sm rounded-xl bg-surface-container-lowest shadow-[0_1px_4px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all flex flex-col justify-between">
<div>
<div className="relative w-full aspect-square rounded-lg bg-surface-container-low p-2 overflow-hidden mb-space-xs">
<span className="absolute top-2 left-2 bg-tertiary text-on-tertiary font-label-badge text-[10px] px-1.5 py-0.5 rounded-full font-bold">15% OFF</span>
<img className="w-full h-full object-contain" data-alt="Gowardhan Fresh Soft Malai Paneer 200g vacuum sealed pack on mint green background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDigXJODnjEfS4ONnYp7FvmigVfju-rTbXLvUSnYM0ajn0YUx0qDkofGNLu-feeEg4H0DNicgtufO6hJpG6mq8JO1jW04XYryemLJp5oU9HZrBAXeQC6C4h1KnIJgkx5wEjrkZ9ek_rZwCsklTzUgO90i0g6tZ9f3DDZ4W_bFidNUHpFyG8b2qOqZauSb2R0wFGwq37Ua6Z4McXfocWKux56RV52r1Xw8B0r-v1uraMDd53cQpCGC2vJQ"/>
</div>
<span className="font-body-sm text-[12px] text-on-surface-variant block">Gowardhan</span>
<h3 className="font-headline-sm text-body-md font-bold text-on-surface line-clamp-2">Fresh Classic Malai Paneer</h3>
<span className="font-body-sm text-[12px] text-on-surface-variant">200 g</span>
</div>
<div className="mt-space-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-price-lg text-body-lg font-bold text-on-surface">â‚¹77</span>
<span className="font-price-strike text-[11px] text-outline line-through">â‚¹90</span>
</div>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-primary hover:text-on-primary text-primary font-label-button text-label-button transition-colors font-bold" data-data-onclick="quickAddRec(this, 'Gowardhan Paneer', 77)">
              + ADD
            </button>
</div>
</div>
{/* Rec Card 3 */}
<div className="w-56 shrink-0 p-space-sm rounded-xl bg-surface-container-lowest shadow-[0_1px_4px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all flex flex-col justify-between">
<div>
<div className="relative w-full aspect-square rounded-lg bg-surface-container-low p-2 overflow-hidden mb-space-xs">
<span className="absolute top-2 left-2 bg-secondary text-on-secondary font-label-badge text-[10px] px-1.5 py-0.5 rounded-full font-bold">FARM FRESH</span>
<img className="w-full h-full object-contain" data-alt="Safal farm fresh white eggs 6 pack in protective moulded pulp egg carton" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChzNPn0I_lD6y_BrWgSGBc6YHBhE9AMkfziHzVncGy1-rZSmtHAaDsPKjAwz2IZ7TdmaPz4SU89I33-CZWoeIDOm90zYu1tOST_9D6ie0xCV-Msh8H343rU-T8ZmmYx4ufjRJVUu5SV36cbw3muhy5L76T8zVMGmO4yfUYsoJAGH47NAmBqHt0Nb0mFkEXG3vprRlziIYGZO4b1mk-RViW61AKPhG_5_B6eP-SP2-h9LY_qFxM0_P32g"/>
</div>
<span className="font-body-sm text-[12px] text-on-surface-variant block">Safal Bio</span>
<h3 className="font-headline-sm text-body-md font-bold text-on-surface line-clamp-2">Farm Fresh Table Eggs</h3>
<span className="font-body-sm text-[12px] text-on-surface-variant">Pack of 6</span>
</div>
<div className="mt-space-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-price-lg text-body-lg font-bold text-on-surface">â‚¹45</span>
<span className="font-price-strike text-[11px] text-outline line-through">â‚¹55</span>
</div>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-primary hover:text-on-primary text-primary font-label-button text-label-button transition-colors font-bold" data-data-onclick="quickAddRec(this, 'Safal Eggs 6-pack', 45)">
              + ADD
            </button>
</div>
</div>
{/* Rec Card 4 */}
<div className="w-56 shrink-0 p-space-sm rounded-xl bg-surface-container-lowest shadow-[0_1px_4px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all flex flex-col justify-between">
<div>
<div className="relative w-full aspect-square rounded-lg bg-surface-container-low p-2 overflow-hidden mb-space-xs">
<img className="w-full h-full object-contain" data-alt="Parrys Pure sparkling white refined sulphur free sugar transparent 1kg pouch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQgzfbFoNKx380czevSFJX16F1mAvjuf6AaUcCFqeNsdJBXg-hf7ReKx-Q7ZjQbHF0CuMYcAwbF0nHRgbuTD69A40zpf44Un98pHcQR_wiWdUHHKdUlzqbp-C2riD__9IshQ7X96mNqq04DYi5MuSVcEeEndyKa5i2wL6RTLrzOVxbCjKx7_qbGyuCMuzlHJTQUycNaVjHBQKKf4wG7C9RmIsjmVdU3R-Ya9Gth3xBVhp1nizMsq_wOQ"/>
</div>
<span className="font-body-sm text-[12px] text-on-surface-variant block">Parrys</span>
<h3 className="font-headline-sm text-body-md font-bold text-on-surface line-clamp-2">Pure Refined Cane Sugar</h3>
<span className="font-body-sm text-[12px] text-on-surface-variant">1 kg</span>
</div>
<div className="mt-space-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-price-lg text-body-lg font-bold text-on-surface">â‚¹51</span>
<span className="font-price-strike text-[11px] text-outline line-through">â‚¹60</span>
</div>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-primary hover:text-on-primary text-primary font-label-button text-label-button transition-colors font-bold" data-data-onclick="quickAddRec(this, 'Parrys Sugar', 51)">
              + ADD
            </button>
</div>
</div>
{/* Rec Card 5 */}
<div className="w-56 shrink-0 p-space-sm rounded-xl bg-surface-container-lowest shadow-[0_1px_4px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)] transition-all flex flex-col justify-between">
<div>
<div className="relative w-full aspect-square rounded-lg bg-surface-container-low p-2 overflow-hidden mb-space-xs">
<span className="absolute top-2 left-2 bg-secondary text-on-secondary font-label-badge text-[10px] px-1.5 py-0.5 rounded-full font-bold">ORGANIC</span>
<img className="w-full h-full object-contain" data-alt="Organic Tattva unpolished high protein toor dal yellow pigeon peas bag 1kg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnVQDAZG-Nc3b4SQb8K_o4opewAmfvMNPQTakKadDfzerQo1qA6_oZ9GzanLfPjARGgpCNvsfSe0Rgu-2iSv6n3oN6n9A9FEstikOx-ZPbreKVj6K4vcEwu2P53BZ7h0RiXbHeUrhsqtv8d94RLsvyG6dVwGePGEfXVUAbJCedOzAEfRa9KF01AEzine-OfxJa_0SbLE0_VHWNyPId-H38b8dYzbNx8ARspfgSD0WleQI9EbdqQJ6gUg"/>
</div>
<span className="font-body-sm text-[12px] text-on-surface-variant block">Organic Tattva</span>
<h3 className="font-headline-sm text-body-md font-bold text-on-surface line-clamp-2">Unpolished Toor Dal</h3>
<span className="font-body-sm text-[12px] text-on-surface-variant">1 kg</span>
</div>
<div className="mt-space-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-price-lg text-body-lg font-bold text-on-surface">â‚¹177</span>
<span className="font-price-strike text-[11px] text-outline line-through">â‚¹210</span>
</div>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-primary hover:text-on-primary text-primary font-label-button text-label-button transition-colors font-bold" data-data-onclick="quickAddRec(this, 'Organic Toor Dal', 177)">
              + ADD
            </button>
</div>
</div>
</div>
</div>
</section>
{/* SECTION: Product Specifications & Storage Instructions */}
<section className="w-full max-w-container-max-width mx-auto px-grid-gutter py-space-xl" id="specifications">
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
{/* Card: Storage & Handling */}
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_1px_4px_rgba(15,23,42,0.03)] space-y-space-md">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[24px]">kitchen</span>
<h3 className="font-headline-md text-headline-sm text-on-surface">Storage &amp; Handling Instructions</h3>
</div>
<div className="space-y-space-sm text-body-md text-on-surface-variant">
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">thermostat</span>
<div>
<strong className="text-on-surface block font-headline-sm text-body-sm">Cold Temperature Storage</strong>
              Store continuously refrigerated below 4Â°C. Do not expose to direct sunlight or ambient warmth.
            </div>
</div>
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-tertiary text-[20px] mt-0.5">timelapse</span>
<div>
<strong className="text-on-surface block font-headline-sm text-body-sm">Shelf Life &amp; Consumption</strong>
              Consume within 48 hours (2 days) from delivery time. Pouch once opened must be kept in clean airtight glass or stainless vessel.
            </div>
</div>
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5">local_fire_department</span>
<div>
<strong className="text-on-surface block font-headline-sm text-body-sm">Boiling Recommendation</strong>
              Since this milk is pasteurized &amp; homogenized at Amul's automated processing facility, it is hygienic and ready to drink directly without mandatory boiling.
            </div>
</div>
</div>
</div>
{/* Card: Compliance, License & Manufacturer */}
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-[0_1px_4px_rgba(15,23,42,0.03)] space-y-space-md">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-primary text-[24px]">verified</span>
<h3 className="font-headline-md text-headline-sm text-on-surface">Regulatory Compliance &amp; Manufacturer</h3>
</div>
<div className="space-y-space-sm">
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-badge text-[11px] text-outline uppercase font-bold">FSSAI License No.</span>
<span className="font-headline-sm text-body-sm font-bold text-on-surface">10014021001010</span>
</div>
<span className="material-symbols-outlined text-secondary text-[24px]">security</span>
</div>
<div className="grid grid-cols-2 gap-space-sm text-body-sm">
<div className="p-space-xs rounded bg-surface-container-low">
<span className="text-on-surface-variant block text-[11px]">Type of Milk</span>
<span className="font-bold text-on-surface">Full Cream (Pasteurised)</span>
</div>
<div className="p-space-xs rounded bg-surface-container-low">
<span className="text-on-surface-variant block text-[11px]">Country of Origin</span>
<span className="font-bold text-on-surface">India (100% Sourced)</span>
</div>
</div>
<div className="text-body-sm text-on-surface-variant pt-space-2xs">
<strong className="text-on-surface block font-headline-sm text-body-sm">Marketed By:</strong>
            Gujarat Cooperative Milk Marketing Federation Ltd. (GCMMF), Amul Dairy Road, Anand - 388001, Gujarat, India.
          </div>
</div>
</div>
</div>
</section>
{/* Sticky Bottom Slide-Up Quick Commerce Anchor Bar */}
<aside className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-[620px]">
<div className="bg-surface-container-lowest/95 backdrop-blur-xl p-space-sm rounded-full shadow-[0_12px_32px_rgba(15,23,42,0.18)] flex items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-sm pl-space-xs">
<div className="relative w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined text-[20px]">shopping_bag</span>
<span className="absolute -top-1 -right-1 bg-tertiary text-on-tertiary font-label-badge text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold" id="floatingBadge">3</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-body-sm text-on-surface font-bold" id="floatingCartSummary">3 items â€¢ â‚¹398</span>
<span className="font-body-sm text-[11px] text-primary flex items-center gap-1 font-semibold">
<span className="material-symbols-outlined text-[13px]">bolt</span>
            Add â‚¹101 for FREE Instant Delivery
          </span>
</div>
</div>
<button className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-label-button text-label-button px-space-lg py-2.5 rounded-full transition-all shadow-[0_4px_12px_rgba(0,105,72,0.3)]" data-data-onclick="openMiniCart()">
<span>View Cart</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</aside>
{/* Subscription Modal (Hidden by Default) */}
<div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-sm hidden items-center justify-center p-space-md" id="subModal">
<div className="bg-surface-container-lowest rounded-xl max-w-md w-full p-space-lg shadow-2xl space-y-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[24px]">event_repeat</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Daily Morning Delivery</h3>
</div>
<button className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-outline hover:text-on-surface" data-data-onclick="closeSubscriptionModal()">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
        Have chilled Amul Gold Milk placed at your doorstep fresh every morning before 6:30 AM without ringing the bell.
      </p>
<div className="space-y-space-xs">
<label className="font-label-button text-body-sm text-on-surface block">Delivery Frequency</label>
<div className="grid grid-cols-3 gap-2">
<button className="py-2 text-center rounded-lg bg-secondary-container text-on-secondary-container font-label-badge text-label-badge font-bold">Daily</button>
<button className="py-2 text-center rounded-lg bg-surface-container-low text-on-surface-variant font-label-badge text-label-badge font-bold">Alternate Days</button>
<button className="py-2 text-center rounded-lg bg-surface-container-low text-on-surface-variant font-label-badge text-label-badge font-bold">Weekdays Only</button>
</div>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<span className="text-body-sm font-semibold">Doorstep drop time</span>
<span className="text-body-sm text-primary font-bold">6:00 AM - 6:30 AM</span>
</div>
<button className="w-full py-3 rounded-xl bg-primary text-on-primary font-label-button text-label-button shadow-md" data-data-onclick="confirmSubscription()">
        Start Subscription (â‚¹33/day)
      </button>
</div>
</div>
{/* Toast Notification Pill */}
<div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-xl shadow-xl flex items-center gap-2 transform translate-y-[-100px] opacity-0 transition-all duration-300 pointer-events-none" id="toastNotification">
<span className="material-symbols-outlined text-secondary-fixed text-[20px]">check_circle</span>
<span className="font-body-sm text-body-sm font-medium" id="toastMsg">Action successful</span>
</div>
{/* Vanilla JavaScript Micro-Interactions */}

</div>
      </main>
    </div>
  );
}