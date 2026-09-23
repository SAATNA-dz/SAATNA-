/**
 * SAATNA Luxury Watches E-Commerce
 * Main Application Logic
 * 
 * الميزات المدمجة:
 * - كتالوج الساعات مع سهولة التعديل والإضافة
 * - سلة مشتريات حقيقية وتفاعلية مع التخزين المحلي LocalStorage
 * - تطبيق الحد الأقصى الحقيقي (4 ساعات فقط في الطلب الواحد)
 * - تحميل قائمة الولايات الجزائرية الـ 58 كاملة
 * - التحقق من صحة بيانات الزبون ورقم الهاتف الجزائري
 * - توليد رابط ورسالة WhatsApp منظمة واحترافية إلى الرقم (+213 655 96 87 33)
 */

// ==========================================================================
// 1. الإعدادات والبيانات الأساسية
// ==========================================================================
const STORE_CONFIG = {
    storeName: "SAATNA",
    whatsappNumber: "213655968733", // رقم واتساب صاحب المتجر بصيغة دولية
    currency: "دج",
    maxOrderItems: 4 // الحد الأقصى الفعلي للطلب الواحد
};

// قائمة الولايات الـ 58 الجزائرية مرتبة رسمياً
const ALGERIA_WILAYAS = [
    "01 - أدرار (Adrar)",
    "02 - الشلف (Chlef)",
    "03 - الأغواط (Laghouat)",
    "04 - أم البواقي (Oum El Bouaghi)",
    "05 - باتنة (Batna)",
    "06 - بجاية (Béjaïa)",
    "07 - بسكرة (Biskra)",
    "08 - بشار (Béchar)",
    "09 - البليدة (Blida)",
    "10 - البويرة (Bouira)",
    "11 - تمنراست (Tamanrasset)",
    "12 - تبسة (Tébessa)",
    "13 - تلمسان (Tlemcen)",
    "14 - تيارت (Tiaret)",
    "15 - تيزي وزو (Tizi Ouzou)",
    "16 - الجزائر (Alger)",
    "17 - الجلفة (Djelfa)",
    "18 - جيجل (Jijel)",
    "19 - سطيف (Sétif)",
    "20 - سعيدة (Saïda)",
    "21 - سكيكدة (Skikda)",
    "22 - سيدي بلعباس (Sidi Bel Abbès)",
    "23 - عنابة (Annaba)",
    "24 - قالمة (Guelma)",
    "25 - قسنطينة (Constantine)",
    "26 - المدية (Médéa)",
    "27 - مستغانم (Mostaganem)",
    "28 - المسيلة (M'Sila)",
    "29 - معسكر (Mascara)",
    "30 - ورقلة (Ouargla)",
    "31 - وهران (Oran)",
    "32 - البيض (El Bayadh)",
    "33 - إليزي (Illizi)",
    "34 - برج بوعريريج (Bordj Bou Arreridj)",
    "35 - بومرداس (Boumerdès)",
    "36 - الطارف (El Tarf)",
    "37 - تندوف (Tindouf)",
    "38 - تيسمسيلت (Tissemsilt)",
    "39 - الوادي (El Oued)",
    "40 - خنشلة (Khenchela)",
    "41 - سوق أهراس (Souk Ahras)",
    "42 - تيبازة (Tipaza)",
    "43 - ميلة (Mila)",
    "44 - عين الدفلى (Aïn Defla)",
    "45 - النعامة (Naâma)",
    "46 - عين تموشنت (Aïn Témouchent)",
    "47 - غرداية (Ghardaïa)",
    "48 - غليزان (Relizane)",
    "49 - تيميمون (Timimoun)",
    "50 - برج باجي مختار (Bordj Badji Mokhtar)",
    "51 - أولاد جلال (Ouled Djellal)",
    "52 - بني عباس (Béni Abbès)",
    "53 - عين صالح (In Salah)",
    "54 - عين قزام (In Guezzam)",
    "55 - تقرت (Touggourt)",
    "56 - جانت (Djanet)",
    "57 - المغير (El M'Ghair)",
    "58 - المنيعة (El Meniaa)"
];

// كتالوج الساعات (مقسم حسب طلبك بدقة، ويمكن تعديله أو الإضافة عليه مستقبلاً)
const PRODUCTS = [
    {
        id: 1,
        brand: "TISSOT 1853",
        name: "ساعة Tissot Classic Silver",
        price: 1900,
        oldPrice: 2800,
        badge: "الأكثر طلباً 🔥",
        description: "تصميم سويسري كلاسيكي فاخر، ميناء فضي مشع مع نافذة لعرض التاريخ، إطار وسوار ستانلس ستيل مصقول عالي الجودة.",
        image: "images/tissot-silver.jpg"
    },
    {
        id: 2,
        brand: "TISSOT 1853",
        name: "ساعة Tissot Emerald Green",
        price: 1900,
        oldPrice: 2800,
        badge: "إصدار زمردي 💚",
        description: "إطلالة ملكية ساحرة بميناء أخضر زمردي داكن، زجاج مقاوم للخدش، حزام فولاذي متين وتصميم أنيق يبرز معصمك في كافة المناسبات.",
        image: "images/tissot-green.jpg"
    },
    {
        id: 3,
        brand: "TISSOT 1853",
        name: "ساعة Tissot Midnight Blue",
        price: 1900,
        oldPrice: 2800,
        badge: "أناقة فاخرة ✨",
        description: "تناغم راقٍ واستثنائي بين الأزرق الليلي والستانلس ستيل اللامع، عقارب مضيئة ودقة متناهية تعكس الذوق الرفيع.",
        image: "images/tissot-blue.jpg"
    },
    {
        id: 4,
        brand: "HUGO BOSS",
        name: "ساعة Boss Chronograph Royal Blue",
        price: 1900,
        oldPrice: 3200,
        badge: "كرونوغراف مميز 💎",
        description: "كرونوغراف رجالي فخم بميناء كحلي ملكي وثلاثة عدادات فرعية فضية، أزرار توقيت جانبية وهيبة رياضية لا مثيل لها.",
        image: "images/boss-blue.jpg"
    },
    {
        id: 5,
        brand: "CASIO EDIFICE",
        name: "ساعة Casio Sport Silver WR 50M",
        price: 3000,
        oldPrice: 4200,
        badge: "مقاومة للماء 💧",
        description: "طابع رياضي وديناميكي قوي، إطار أسود مدرج مع ميناء أبيض ميتاليك وعدادات توقيت دقيقة، مقاومة للماء حتى عمق 50 متر.",
        image: "images/casio-silver.jpg"
    },
    {
        id: 6,
        brand: "CASIO EDIFICE",
        name: "ساعة Casio Elegance Blue & Rose Gold",
        price: 3000,
        oldPrice: 4400,
        badge: "إصدار روز جولد ⭐",
        description: "مزيج فاخر يخطف الأنظار بين إطار الذهب الوردي والميناء الأزرق الداكن، سوار فولاذي صلب وتصميم يجمع بين القوة والأناقة.",
        image: "images/casio-gold-blue.jpg"
    }
];

// ==========================================================================
// 2. إدارة حالة السلة (State Management)
// ==========================================================================
let cart = [];

// تحميل السلة المحفوظة من المتصفح
function initCartState() {
    try {
        const storedCart = localStorage.getItem("saatna_cart");
        if (storedCart) {
            cart = JSON.parse(storedCart);
            // التأكد من عدم تجاوز الحد الأقصى 4 ساعات
            if (getCartTotalItems() > STORE_CONFIG.maxOrderItems) {
                cart = trimCartToMax(cart, STORE_CONFIG.maxOrderItems);
                saveCart();
            }
        }
    } catch (e) {
        console.error("خطأ في قراءة السلة:", e);
        cart = [];
    }
}

// حفظ السلة في التخزين المحلي
function saveCart() {
    try {
        localStorage.setItem("saatna_cart", JSON.stringify(cart));
    } catch (e) {
        console.error("خطأ في حفظ السلة:", e);
    }
}

function trimCartToMax(cartArray, max) {
    let count = 0;
    const trimmed = [];
    for (const item of cartArray) {
        if (count + item.qty <= max) {
            trimmed.push(item);
            count += item.qty;
        } else {
            const allowed = max - count;
            if (allowed > 0) {
                trimmed.push({ ...item, qty: allowed });
                count += allowed;
            }
            break;
        }
    }
    return trimmed;
}

// حساب مجموع قطع الساعات داخل السلة
function getCartTotalItems() {
    return cart.reduce((total, item) => total + item.qty, 0);
}

// حساب السعر الإجمالي
function getCartTotalPrice() {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
}

// تنسيق الأسعار بالدينار الجزائري
function formatCurrency(amount) {
    return amount.toLocaleString("ar-DZ") + " " + STORE_CONFIG.currency;
}

// ==========================================================================
// 3. عرض المنتجات والسلة
// ==========================================================================
function renderProducts() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    grid.innerHTML = PRODUCTS.map(product => {
        const totalItemsInCart = getCartTotalItems();
        const isCartFull = totalItemsInCart >= STORE_CONFIG.maxOrderItems;

        return `
            <article class="product-card" data-id="${product.id}">
                <div class="product-image-wrap">
                    <img src="${product.image}" 
                         alt="${product.name}" 
                         class="product-img" 
                         loading="lazy"
                         onerror="this.onerror=null; this.src='https://placehold.co/600x680/0e1529/00c6ff?text=SAATNA+WATCH';">
                    <span class="product-brand-tag">${product.brand}</span>
                    <span class="product-badge">${product.badge}</span>
                </div>
                
                <div class="product-details">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    
                    <div class="product-price-row">
                        <span class="current-price">${formatCurrency(product.price)}</span>
                        ${product.oldPrice ? `<span class="old-price">${formatCurrency(product.oldPrice)}</span>` : ''}
                    </div>

                    <button class="btn-add-cart ${isCartFull ? 'max-reached' : ''}" 
                            onclick="handleAddToCart(${product.id})"
                            aria-label="إضافة ${product.name} إلى السلة">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                        <span>أضف إلى السلة</span>
                    </button>
                </div>
            </article>
        `;
    }).join("");
}

function updateCartUI() {
    const totalItems = getCartTotalItems();
    const totalPrice = getCartTotalPrice();

    // تحديث الشارة في القائمة العلوية
    const cartBadge = document.getElementById("cartBadge");
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.classList.add("bump");
        setTimeout(() => cartBadge.classList.remove("bump"), 300);
    }

    // تحديث عداد السلة
    const cartHeaderCount = document.getElementById("cartHeaderCount");
    if (cartHeaderCount) {
        cartHeaderCount.textContent = `${totalItems} منتجات`;
    }

    const limitRemaining = document.getElementById("limitItemsRemaining");
    if (limitRemaining) {
        limitRemaining.textContent = totalItems;
    }

    const totalItemsEl = document.getElementById("cartTotalItemsCount");
    if (totalItemsEl) {
        totalItemsEl.textContent = `${totalItems} ساعات`;
    }

    const totalPriceEl = document.getElementById("cartTotalPrice");
    if (totalPriceEl) {
        totalPriceEl.textContent = formatCurrency(totalPrice);
    }

    // تحديث قائمة السلع في السلة
    const cartItemsList = document.getElementById("cartItemsList");
    const cartFooter = document.getElementById("cartFooter");

    if (!cartItemsList) return;

    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="cart-empty-state">
                <div class="empty-icon">🛒</div>
                <h4>سلة المشتريات فارغة</h4>
                <p>لم تقم بإضافة أي ساعة بعد. اختر ساعتك المفضلة الآن واستفد من عروض التوصيل لـ 58 ولاية!</p>
            </div>
        `;
        if (cartFooter) {
            const proceedBtn = document.getElementById("proceedToCheckoutBtn");
            if (proceedBtn) {
                proceedBtn.disabled = true;
                proceedBtn.style.opacity = "0.5";
                proceedBtn.style.cursor = "not-allowed";
            }
        }
    } else {
        if (cartFooter) {
            const proceedBtn = document.getElementById("proceedToCheckoutBtn");
            if (proceedBtn) {
                proceedBtn.disabled = false;
                proceedBtn.style.opacity = "1";
                proceedBtn.style.cursor = "pointer";
            }
        }

        cartItemsList.innerHTML = cart.map(item => {
            const canIncrease = totalItems < STORE_CONFIG.maxOrderItems;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://placehold.co/100x100/0e1529/00c6ff?text=SAATNA';">
                    
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">${formatCurrency(item.price)}</div>
                        
                        <div class="cart-item-controls">
                            <button class="qty-btn" onclick="handleDecreaseQty(${item.id})" aria-label="تقليل الكمية">-</button>
                            <span class="qty-display">${item.qty}</span>
                            <button class="qty-btn" onclick="handleIncreaseQty(${item.id})" ${!canIncrease ? 'disabled' : ''} aria-label="زيادة الكمية">+</button>
                        </div>
                    </div>

                    <button class="cart-item-remove" onclick="handleRemoveFromCart(${item.id})" title="حذف من السلة">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </div>
            `;
        }).join("");
    }
}

// ==========================================================================
// 4. تطبيق نظام الحد الأقصى (4 ساعات كحد أقصى لكل طلب)
// ==========================================================================
function handleAddToCart(productId) {
    const totalCurrentItems = getCartTotalItems();

    // التحقق الصارم من الحد الأقصى
    if (totalCurrentItems >= STORE_CONFIG.maxOrderItems) {
        showToast("⚠️ عذراً! الحد الأقصى المسموح به في الطلب الواحد هو 4 ساعات فقط لضمان سرعة التوصيل.", "warning");
        return;
    }

    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingCartItem = cart.find(item => item.id === productId);

    if (existingCartItem) {
        existingCartItem.qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            qty: 1
        });
    }

    saveCart();
    updateCartUI();
    showToast(`✓ تمت إضافة "${product.name}" إلى السلة`, "success");
    openCartDrawer();
}

function handleIncreaseQty(productId) {
    const totalCurrentItems = getCartTotalItems();

    if (totalCurrentItems >= STORE_CONFIG.maxOrderItems) {
        showToast("⚠️ لقد بلغت الحد الأقصى المسموح به (4 ساعات كحد أقصى لكل طلب).", "warning");
        return;
    }

    const item = cart.find(i => i.id === productId);
    if (item) {
        item.qty += 1;
        saveCart();
        updateCartUI();
    }
}

function handleDecreaseQty(productId) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.qty -= 1;
    if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== productId);
        showToast("تم إزالة المنتج من السلة", "info");
    }

    saveCart();
    updateCartUI();
}

function handleRemoveFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateCartUI();
    showToast("تم حذف المنتج من السلة", "info");
}

// ==========================================================================
// 5. فتح وإغلاق النوافذ (السلة والطلب)
// ==========================================================================
function openCartDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const backdrop = document.getElementById("cartBackdrop");
    if (drawer && backdrop) {
        drawer.classList.add("active");
        backdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeCartDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const backdrop = document.getElementById("cartBackdrop");
    if (drawer && backdrop) {
        drawer.classList.remove("active");
        backdrop.classList.remove("active");
        document.body.style.overflow = "";
    }
}

function openCheckoutModal() {
    if (cart.length === 0) {
        showToast("سلة المشتريات فارغة! اختر ساعات أولاً لإتمام الطلب.", "warning");
        return;
    }

    closeCartDrawer();
    populateCheckoutSummary();

    const checkoutModal = document.getElementById("checkoutBackdrop");
    if (checkoutModal) {
        checkoutModal.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById("checkoutBackdrop");
    if (checkoutModal) {
        checkoutModal.classList.remove("active");
        document.body.style.overflow = "";
    }
}

function populateCheckoutSummary() {
    const previewContainer = document.getElementById("checkoutItemsPreview");
    const totalBanner = document.getElementById("checkoutFinalTotal");
    if (!previewContainer) return;

    previewContainer.innerHTML = cart.map(item => `
        <div class="checkout-summary-item">
            <div class="summary-item-name">
                <span>${item.name}</span>
                <span class="summary-item-qty">× ${item.qty}</span>
            </div>
            <div class="summary-item-price">${formatCurrency(item.price * item.qty)}</div>
        </div>
    `).join("");

    if (totalBanner) {
        totalBanner.textContent = formatCurrency(getCartTotalPrice());
    }
}

// ==========================================================================
// 6. تعبئة قائمة الولايات الجزائرية الـ 58
// ==========================================================================
function populateWilayas() {
    const select = document.getElementById("wilaya");
    if (!select) return;

    ALGERIA_WILAYAS.forEach(wilaya => {
        const option = document.createElement("option");
        option.value = wilaya;
        option.textContent = wilaya;
        select.appendChild(option);
    });
}

// ==========================================================================
// 7. التحقق من النموذج وإرسال الطلب عبر WhatsApp إلى (+213 655 96 87 33)
// ==========================================================================
function setupCheckoutForm() {
    const form = document.getElementById("checkoutForm");
    if (!form) return;

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        if (cart.length === 0) {
            showToast("سلة المشتريات فارغة! اختر ساعتك أولاً.", "warning");
            return;
        }

        const firstNameInput = document.getElementById("firstName");
        const lastNameInput = document.getElementById("lastName");
        const phoneInput = document.getElementById("phone");
        const wilayaSelect = document.getElementById("wilaya");
        const baladiyaInput = document.getElementById("baladiya");
        const addressInput = document.getElementById("address");
        const notesInput = document.getElementById("notes");

        let isValid = true;

        // تصفير رسائل الخطأ السابقة
        document.querySelectorAll(".field-error").forEach(el => el.textContent = "");
        document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));

        // التحقق من الاسم
        if (!firstNameInput.value.trim()) {
            showFieldError(firstNameInput, "firstNameError", "يرجى إدخال الاسم");
            isValid = false;
        }

        // التحقق من اللقب
        if (!lastNameInput.value.trim()) {
            showFieldError(lastNameInput, "lastNameError", "يرجى إدخال اللقب");
            isValid = false;
        }

        // التحقق من صحة رقم الهاتف الجزائري
        const rawPhone = phoneInput.value.trim().replace(/\s+/g, '');
        const algerianPhoneRegex = /^(0|\+213|00213)?([567][0-9]{8})$/;
        if (!rawPhone) {
            showFieldError(phoneInput, "phoneError", "يرجى إدخال رقم الهاتف");
            isValid = false;
        } else if (!algerianPhoneRegex.test(rawPhone)) {
            showFieldError(phoneInput, "phoneError", "يرجى كتابة رقم هاتف جزائري صحيح (مثال: 0655968733)");
            isValid = false;
        }

        // التحقق من الولاية
        if (!wilayaSelect.value) {
            showFieldError(wilayaSelect, "wilayaError", "يرجى اختيار الولاية من القائمة");
            isValid = false;
        }

        // التحقق من البلدية
        if (!baladiyaInput.value.trim()) {
            showFieldError(baladiyaInput, "baladiyaError", "يرجى إدخال اسم البلدية");
            isValid = false;
        }

        // التحقق من العنوان
        if (!addressInput.value.trim()) {
            showFieldError(addressInput, "addressError", "يرجى إدخال العنوان بالتفصيل");
            isValid = false;
        }

        if (!isValid) {
            showToast("يرجى ملء جميع الحقول الإلزامية باللون الأحمر بشكل صحيح", "warning");
            return;
        }

        // توليد رقم طلب فريد
        const orderId = `STN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const now = new Date();
        const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} - ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        // تجهيز بيانات الرسالة
        const customerName = `${firstNameInput.value.trim()} ${lastNameInput.value.trim()}`;
        const phone = rawPhone;
        const wilaya = wilayaSelect.value;
        const baladiya = baladiyaInput.value.trim();
        const address = addressInput.value.trim();
        const notes = notesInput.value.trim();
        const totalItemsCount = getCartTotalItems();
        const grandTotal = formatCurrency(getCartTotalPrice());

        let itemsText = "";
        cart.forEach((item, index) => {
            const itemTotal = formatCurrency(item.price * item.qty);
            itemsText += `\n${index + 1}️⃣ *${item.name}*\n   ▫️ الكمية: ${item.qty} × ${formatCurrency(item.price)} = ${itemTotal}`;
        });

        let notesText = notes ? `\n📝 *ملاحظات الزبون:* ${notes}` : "";

        // بناء الرسالة المنسقة للواتساب
        const whatsappMessage = 
`السلام عليكم ورحمة الله،
أود تأكيد طلبي الجديد من متجر *${STORE_CONFIG.storeName}*:

🔖 *رقم الطلب:* #${orderId}
📅 *التاريخ:* ${dateStr}

👤 *معلومات الزبون:*
▫️ *الاسم واللقب:* ${customerName}
▫️ *رقم الهاتف:* ${phone}
▫️ *الولاية:* ${wilaya}
▫️ *البلدية:* ${baladiya}
▫️ *العنوان بالتفصيل:* ${address}${notesText}

🛒 *الساعات المطلوبة (${totalItemsCount} ساعات):*${itemsText}

━━━━━━━━━━━━━━━━━━━━
💰 *المجموع الإجمالي للدفع:* *${grandTotal}*
🚚 *طريقة الدفع:* الدفع نقداً عند استلام ومعاينة الطلب
━━━━━━━━━━━━━━━━━━━━
يرجى تأكيد استلام الطلب وتجهيزه للشحن. شكراً لكم!`;

        // ترميز الرابط وفتحه مباشرة في واتساب
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedMessage}`;

        // إغلاق النافذة وعرض بطاقة النجاح
        closeCheckoutModal();
        showSuccessCelebration(whatsappUrl);

        // فتح واتساب مباشرة في تبويب جديد أو في التطبيق
        window.open(whatsappUrl, "_blank");

        // إفراغ السلة بعد إتمام الطلب بنجاح
        cart = [];
        saveCart();
        updateCartUI();
        form.reset();
    });
}

function showFieldError(inputEl, errorId, message) {
    inputEl.classList.add("input-error");
    const errorEl = document.getElementById(errorId);
    if (errorEl) {
        errorEl.textContent = message;
    }
}

function showSuccessCelebration(whatsappUrl) {
    const successBackdrop = document.getElementById("successBackdrop");
    const manualWaLink = document.getElementById("manualWaLink");

    if (manualWaLink) {
        manualWaLink.href = whatsappUrl;
    }

    if (successBackdrop) {
        successBackdrop.classList.add("active");
    }
}

// ==========================================================================
// 8. نظام الإشعارات المنبثقة (Toast System)
// ==========================================================================
function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "🔔";
    if (type === "warning") icon = "⚠️";
    if (type === "success") icon = "✅";

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-msg">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-15px)";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ==========================================================================
// 9. تهيئة وتشغيل الموقع عند تحميل الصفحة
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. استعادة حالة السلة من التخزين
    initCartState();

    // 2. رسم المنتجات وتحديث واجهة السلة
    renderProducts();
    updateCartUI();

    // 3. تعبئة قائمة الولايات الـ 58
    populateWilayas();

    // 4. تفعيل نظام التحقق من النموذج وإرسال الواتساب
    setupCheckoutForm();

    // 5. ربط أزرار فتح وإغلاق السلة
    const openCartBtn = document.getElementById("openCartBtn");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const cartBackdrop = document.getElementById("cartBackdrop");
    const proceedToCheckoutBtn = document.getElementById("proceedToCheckoutBtn");
    const continueShoppingBtn = document.getElementById("continueShoppingBtn");

    if (openCartBtn) openCartBtn.addEventListener("click", openCartDrawer);
    if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);
    if (cartBackdrop) cartBackdrop.addEventListener("click", closeCartDrawer);
    if (proceedToCheckoutBtn) proceedToCheckoutBtn.addEventListener("click", openCheckoutModal);
    if (continueShoppingBtn) continueShoppingBtn.addEventListener("click", closeCartDrawer);

    // 6. ربط إغلاق نافذة إتمام الطلب
    const closeCheckoutBtn = document.getElementById("closeCheckoutBtn");
    const checkoutBackdrop = document.getElementById("checkoutBackdrop");
    if (closeCheckoutBtn) closeCheckoutBtn.addEventListener("click", closeCheckoutModal);
    if (checkoutBackdrop) {
        checkoutBackdrop.addEventListener("click", (e) => {
            if (e.target === checkoutBackdrop) closeCheckoutModal();
        });
    }

    // 7. ربط إغلاق نافذة النجاح
    const closeSuccessBtn = document.getElementById("closeSuccessBtn");
    const successBackdrop = document.getElementById("successBackdrop");
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener("click", () => {
            successBackdrop.classList.remove("active");
        });
    }

    // 8. تفعيل الحركة الانسيابية للزر ثلاثي الأبعاد (Smooth Scrolling)
    const heroCtaBtn = document.getElementById("heroCtaBtn");
    if (heroCtaBtn) {
        heroCtaBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const targetSection = document.getElementById("products-section");
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
});