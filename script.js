let cartCount = 0;

function handleOrder() {
    
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    console.log("Sepete eklendi! Toplam sepetteki: " + cartCount);
}

function showCartDetails() {
    alert("Sepetinizde " + cartCount + " adet ürün var. Siparişi onaylıyor musunuz?");
    visitCount++; // Her tıkta 1 artar
    updateCartUI(); // Sepet rakamını günceller
    updateTreeDisplay(); // Ağaç görselini kontrol eder ve günceller
}

function updateCartUI() {
    cartCount = 0;
    document.getElementById('cart-count').innerText = cartCount;
}

function openMenu(categoryName) {
    // 1. Ana sayfayı gizle
    document.getElementById('home-page').style.display = 'none';
    
    // 2. Menü sayfasını göster
    document.getElementById('menu-page').style.display = 'block';
    document.getElementById('filters-bar').style.display = 'flex';
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
}
function goBack() {
    // 1. Menü sayfasını gizle
    document.getElementById('menu-page').style.display = 'none';
    // 2. Ana sayfayı tekrar göster
    document.getElementById('home-page').style.display = 'block';
    // Sayfayı en yukarı kaydır ki kullanıcı en üstten başlasın
    window.scrollTo(0, 0);
}

let visitCount = 0; // Başlangıç değeri/*

function updateTreeDisplay() {
    document.getElementById('visit-count').innerText = `${visitCount}/20 Orders`;
    
    let treeImg = document.getElementById('tree-image');

    // 5 Siparişte bir görsel değişimi (0, 5, 10, 15, 20)
    if (visitCount === 0) {
        treeImg.src = "assets/tree-stages/empty-pot.png"; // 0: Boş saksı/toprak
    } 
    else if (visitCount >= 1 && visitCount < 7) {
        treeImg.src = "assets/tree-stages/seed.png";      // 5: Tohum
    } 
    else if (visitCount >= 7 && visitCount < 13) {
        treeImg.src = "assets/tree-stages/sprout.png";    // 10: Filiz
    } 
    else if (visitCount >= 13 && visitCount < 20) {
        treeImg.src = "assets/tree-stages/sapling.png";   // 15: Fidan
    } 
    else if (visitCount === 20) {
        treeImg.src = "assets/tree-stages/tree.png";      // 20: Tam ağaç
        alert("Harika! Doğaya bir ağaç kazandırdınız!");
    }
}
// Sayfa ilk yüklendiğinde 0. aşama görselini göstermek için fonksiyonu bir kez çağır
updateTreeDisplay();

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

// Filtreleme Fonksiyonu (Bunu arkadaşın tamamlayabilir, şimdilik veganı ekledim)
function filterByCategory() {

    const isVeganChecked = document.getElementById('vegan-checkbox').checked;
    const isGFChecked = document.getElementById('gf-checkbox').checked;
    const isLFChecked = document.getElementById('lf-checkbox').checked;
    
    // Sadece şu an açık olan kategorideki (örn: main) kartları seç
    const activeGroup = document.querySelector('.category-group[style*="display: block"]');
    if (!activeGroup) return;

    const cards = activeGroup.querySelectorAll('.card-container');

    cards.forEach(card => {
        const isVegan = card.classList.contains('vegan');
        const isGF = card.classList.contains('gluten-free');
        const isLF = card.classList.contains('lactoz-free');
        
        // Filtreleme mantığı
        let show = true;
        if (isVeganChecked && !isVegan) show = false;
        if (isGFChecked && !isGF) show = false;
        if (isLFChecked && !isLF) show = false;
        
        card.style.display = show ? 'block' : 'none';
    });
}
function showChefTips(imagePath) {
    const popup = document.getElementById('chef-popup');
    const tipImg = document.getElementById('tip-image');
    
    // 1. Gelen resim yolunu <img> etiketine bas
    tipImg.src = imagePath;
    
    // 2. Pop-up'ı görünür yap
    popup.style.display = 'block';
}
function closeChefTip() {
    document.getElementById('chef-popup').style.display = 'none';
}
