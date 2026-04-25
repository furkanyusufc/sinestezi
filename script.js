function openMenu(categoryName) {
    // 1. Ana sayfayı gizle
    document.getElementById('home-page').style.display = 'none';
    
    // 2. Menü sayfasını göster
    document.getElementById('menu-page').style.display = 'block';
    
    // 3. Başlığı güncelle
    document.getElementById('category-title').innerText = categoryName.toUpperCase();
    
    // 4. Menü içeriğini yükle (Zaten yazdığımız fonksiyon)
    displayMenu(categoryName);
}
function goBack() {
    // 1. Menü sayfasını gizle
    document.getElementById('menu-page').style.display = 'none';
    
    // 2. Ana sayfayı tekrar göster
    document.getElementById('home-page').style.display = 'block';
}

// Örnek Menü Verisi (Senin görselindeki gibi İngilizce)
const menuItems = {
    main: [
        { id: 101, name: "Grilled Salmon with Asparagus", price: "$18.50", stars: "⭐⭐⭐⭐", img: "assets/food/salmon.png", type: "non-vegan", ingredients: ["Salmon", "Asparagus", "Olive Oil", "Lemon", "Dill", "Garlic"] },
        { id: 102, name: "Lentil & Spinach Curry", price: "$16.00", stars: "⭐⭐⭐⭐⭐", img: "assets/food/curry.png", type: "vegan", ingredients: ["Lentils", "Spinach", "Spices"] },
        // Buraya 2 ana yemek daha ekle...
    ],
    drinks: [ /* İçecekler listesi buraya... */ ],
    desserts: [ /* Tatlılar listesi buraya... */ ],
    salads: [ /* Salatalar listesi buraya... */ ]
};

let visitCount = 0; // Toplam sipariş sayacı (Green Loyalty Program)

// Menüyü Listeleme Fonksiyonu
function displayMenu(categoryName) {
    document.getElementById('filters-bar').style.display = 'block'; // Filtreleri göster
    const items = menuItems[categoryName];
    const grid = document.getElementById('menu-grid');
    
    if(!items) { grid.innerHTML = "<p>No items in this category.</p>"; return; }

    modal.innerHTML = `
        <div class="menu-card" id="card-${item.id}">

            <div class="modal-header-section">
                <h2 class="modal-title">${item.name}</h2>
            </div>
            
            <img src="${item.img}" class="modal-img">
    
            <div class="modal-content-grid">
                <div class="left-side">
                    <img src="assets/icons/chef.png" class="chef-stamp">
                    <div class="modal-stars">${item.stars}</div>
                </div>
            
                <div class="center-side">
                    <h3 class="ingredients-title">Ingredients</h3>
                    <ul class="ingredients-list-modal">
                        ${item.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
        
                <div class="right-side">
                    <span class="modal-price-tag">${item.price}</span>
                    <button class="plus-order-btn" onclick="handleOrder()">
                        <span>+</span>
                    </button>
                </div>
            </div>
        `;
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

// Sipariş Verme ve Ağaç Büyütme (Ana sayfadaki ağacı günceller)
function handleOrder() {
    visitCount++;
    updateTreeDisplay(); // Ağacı günceller
}

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

// Filtreleme Fonksiyonu (Bunu arkadaşın tamamlayabilir, şimdilik veganı ekledim)
function filterByCategory(type) {
    const activeCards = document.querySelectorAll('.menu-card');
    activeCards.forEach(card => {
        // Kartın id'sinden yemeği bul ve filtrele
        card.style.display = (type === 'all' || card.id === '...'); // Burayı arkadaşın tamamlayabilir
    });
}
