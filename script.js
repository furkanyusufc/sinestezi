/*let cart = []; // Sepetteki ürünleri burada tutacağız

function handleOrder(itemName, price) {
    // 1. Ürünü sepete ekle
    cart.push({ name: itemName, price: price });
    
    // 2. Sepet sayısını güncelle (Opsiyonel)
    updateCartUI();
    
    // 3. Ağaç ilerlemesini güncelle (Zaten sendeki fonksiyon)
    //visitCount++;
    //updateTreeDisplay();

    alert(itemName + " sepete eklendi!");
}

function updateCartUI() {
    console.log("Sepetiniz:", cart);
    // Buraya ilerde sepet ikonundaki rakamı güncelleyen kod gelecek
    // Örn: document.getElementById('cart-count').innerText = cart.length;
}*/
let cartCount = 0;

function handleOrder() {
    // 1. Sayacı artır
    cartCount++;
    
    // 2. Ekrandaki rakamı güncelle
    document.getElementById('cart-count').innerText = cartCount;
    
    // 3. Ağaç ilerlemesini güncelle (Zaten sendeki fonksiyon)
    if (typeof visitCount !== 'undefined') {
        visitCount++;
        updateTreeDisplay();
    }

    // Hafif bir bildirim (İsteğe bağlı)
    console.log("Sepete eklendi! Toplam: " + cartCount);
}

function showCartDetails() {
    alert("Sepetinizde " + cartCount + " adet ürün var. Siparişi onaylıyor musunuz?");
}

function openMenu(categoryName) {
    // 1. Ana sayfayı gizle
    document.getElementById('home-page').style.display = 'none';
    
    // 2. Menü sayfasını göster
    document.getElementById('menu-page').style.display = 'block';

    // 2. Başlığı güncelle
    const titles = {
        'main': 'MAIN COURSES',
        'drinks': 'BEVERAGES',
        'salads': 'SALADS',
        'desserts': 'DESSERTS'
    };
    document.getElementById('category-title').innerText = titles[categoryName];
    
    const groups = document.querySelectorAll('.category-group');
    groups.forEach(g => g.style.display = 'none');

    // 3. SADECE tıklanan kategori grubunu göster
    const selectedGroup = document.getElementById('group-' + categoryName);
    if(selectedGroup) {
        selectedGroup.style.display = 'block';
    } 
    // 3. Başlığı güncelle
    //document.getElementById('category-title').innerText = categoryName.toUpperCase();
    
    // 4. Menü içeriğini yükle (Zaten yazdığımız fonksiyon)
    //displayMenu(categoryName);
    
}
function goBack() {
    // 1. Menü sayfasını gizle
    document.getElementById('menu-page').style.display = 'none';
    
    // 2. Ana sayfayı tekrar göster
    document.getElementById('home-page').style.display = 'block';
}

// Sipariş fonksiyonu (Ağaç için)
let visitCount = 0; // Başlangıç değeri
function handleOrder() {
    //visitCount++;
    //updateTreeDisplay();
    //alert("Order added! Tree progress updated.");
}

function updateTreeDisplay() {
    document.getElementById('visit-count').innerText = `${visitCount}/20 Orders`;
    let treeImg = document.getElementById('tree-image');

    if(visitCount >= 15 && visitCount < 20) {
        treeImg.src = "assets/tree-stages/sapling.png";
    } else if(visitCount >= 20) {
        treeImg.src = "assets/tree-stages/tree.png";
    } else if(visitCount == 0) {
        treeImg.src = "assets/torba.png";
    }
}
// Örnek Menü Verisi (Senin görselindeki gibi İngilizce)
const menuItems = {
    main: [
        {
            id: 101,
            name: "Grilled Salmon",
            isVegan: false,
            isGlutenFree: true, // Somon glutensizdir
            price: "$18.50",
            stars: "⭐⭐⭐⭐",
            img: "assets/food/salmon.png",
            type: "non-vegan",
            ingredients: ["Salmon", "Asparagus", "Olive Oil", "Lemon", "Dill", "Garlic"]
        },
        {
            id: 102,
            name: "Vegan Quinoa Bowl",
            isVegan: true, 
            isGlutenFree: true,
            price: "$16.00",
            stars: "⭐⭐⭐⭐⭐",
            img: "assets/food/curry.png",
            type: "vegan",
            ingredients: ["Lentils", "Spinach", "Spices"]
        },
        // Buraya 2 ana yemek daha ekle...
    ],
    drinks: [ /* İçecekler listesi buraya... */ ],
    desserts: [ /* Tatlılar listesi buraya... */ ],
    salads: [ /* Salatalar listesi buraya... */ ]
};

//let visitCount = 0; // Toplam sipariş sayacı (Green Loyalty Program)

// Menüyü Listeleme Fonksiyonu
function displayMenu(categoryName) {
    document.getElementById('filters-bar').style.display = 'block'; // Filtreleri göster
    const items = menuItems[categoryName];
    const grid = document.getElementById('menu-grid');
    
    if(!items) {
        grid.innerHTML = "<p>No items in this category.</p>";
        return; 
    }

    grid.innerHTML = items.map(item => `
        <div class="detailed-card">
            <div class="card-header">
                <h2 class="card-title">${item.name}</h2>
            </div>

            <img src="${item.img}" class="card-main-img">

            <div class="card-bottom-section">
                <div class="bottom-left">
                    <img src="assets/icons/chef.png" class="chef-stamp">
                    <div class="stars-row">${item.stars}</div>
                </div>

                <div class="bottom-center">
                    <h3>Ingredients</h3>
                    <ul class="ing-list">
                        ${item.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="bottom-right">
                    <span class="price-bubble">${item.price}</span>
                    <button class="add-btn" onclick="handleOrder()">+</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Şefin Tavsiyesi Fonksiyonu (Hangi yemekle ne gider)
function showChefRecommendation(itemName) {
    if(itemName === "Grilled Salmon with Asparagus") {
        alert("Chef's Recommendation: We suggest pairing this with our Elderflower Sparkler!");
    } else {
        alert("Chef recommends a light side salad!");
    }
}

// Malzemeleri Aç/Kapat (Görsele tıklanınca)
function toggleIngredients(itemId) {
    const list = document.getElementById(`ingredients-${itemId}`);
    list.style.display = list.style.display === 'none' ? 'block' : 'none';
}
/*
// Sipariş Verme ve Ağaç Büyütme (Ana sayfadaki ağacı günceller)
function handleOrder() {
    visitCount++;
    updateTreeDisplay(); // Ağacı günceller
}*/
/*
// Ağaç Durumunu Güncelleyen Fonksiyon (Sipariş sayısına göre görseli değiştirir)
function updateTreeDisplay() {
    document.getElementById('visit-count').innerText = `${visitCount}/20 Orders`;
    
    let treeImg = document.getElementById('tree-image');
    let status = document.getElementById('tree-status'); // HTML'e küçük bir not eklemiştik

    // Bu koşulları senin tasarımına göre değiştirebilirsin
    if(visitCount >= 5 && visitCount < 11) {
        treeImg.src = "assets/tree-stages/sprout.png";
    } else if(visitCount >= 11 && visitCount < 20) {
        treeImg.src = "assets/tree-stages/sapling.png";
    } else if(visitCount >= 20) {
        treeImg.src = "assets/tree-stages/tree.png";
        alert("Congratulations! A tree has been planted in your name!");
    }
}
*/
// Filtreleme Fonksiyonu (Bunu arkadaşın tamamlayabilir, şimdilik veganı ekledim)
function filterByCategory(type) {
    const activeCards = document.querySelectorAll('.menu-card');
    activeCards.forEach(card => {
        // Kartın id'sinden yemeği bul ve filtrele
        card.style.display = (type === 'all' || card.id === '...'); // Burayı arkadaşın tamamlayabilir
    });
}
