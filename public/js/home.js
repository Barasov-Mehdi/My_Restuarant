document.addEventListener('DOMContentLoaded', function () {
    const menuItemsContainer = document.querySelector('.menu_items');
    let cart = []; // Sepet verilerini tutacak array

    // Menü öğelerini yükleme
    if (window.allProduct && window.allProduct.foods) {
        window.allProduct.foods.forEach(food => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu_item');

            menuItem.innerHTML = `
                <h3>${food.fName}</h3>
                <p>${food.terkib}</p>
                <span class="price">${food.price} ₼</span>
                <button class="addCart">+</button>
            `;

            menuItemsContainer.appendChild(menuItem);

            // Her menü öğesine olay dinleyicisi ekle
            menuItem.querySelector('.addCart').addEventListener('click', function () {
                addFoodToCart(food); // Sepete ekleme fonksiyonunu çağır
            });
        });
    }

    // Sepete ekleme işlemi
    function addFoodToCart(food) {
        const existingItem = cart.find(item => item.fName === food.fName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                fName: food.fName,
                price: food.price,
                quantity: 1
            });
        }
        updateCartUI();
    }

    // Sepet arayüzünü güncelleme
    function updateCartUI() {
        const orderFoodsContainer = document.querySelector('.order_foods');
        orderFoodsContainer.innerHTML = ''; // Önceki içeriği temizle

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart_item');
            cartItem.innerHTML = `
                <span>${item.fName} - ${item.price} ₼ </span>
                <span> - ${item.quantity} Ədəd</span>
                <button class="increase">+</button>
                <button class="decrease">-</button>
                <button class="remove"><i class="fa-solid fa-trash" style="color: red;"></i></button>
            `;

            orderFoodsContainer.appendChild(cartItem);

            // Miktar artırma
            cartItem.querySelector('.increase').addEventListener('click', function () {
                increaseQuantity(item.fName);
            });

            // Miktar azaltma
            cartItem.querySelector('.decrease').addEventListener('click', function () {
                decreaseQuantity(item.fName);
            });

            // Sepetten çıkarma
            cartItem.querySelector('.remove').addEventListener('click', function () {
                removeFromCart(item.fName);
            });
        });

        // Toplam fiyatı göster
        const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const totalPriceElement = document.querySelector('.total_price');
        totalPriceElement.textContent = `${totalPrice.toFixed(2)} ₼ `;
    }

    // Miktarı artırma
    function increaseQuantity(fName) {
        const item = cart.find(i => i.fName === fName);
        if (item) {
            item.quantity++;
        }
        updateCartUI();
    }

    // Miktarı azaltma
    function decreaseQuantity(fName) {
        const item = cart.find(i => i.fName === fName);
        if (item) {
            item.quantity--;
            if (item.quantity <= 0) {
                removeFromCart(fName);
            }
        }
        updateCartUI();
    }

    // Ürünü sepetten çıkarma
    function removeFromCart(fName) {
        cart = cart.filter(item => item.fName !== fName);
        updateCartUI();
    }

    // Sepeti temizleme fonksiyonu
    function clearCart() {
        cart = [];
        updateCartUI();
    }

    // Sepeti temizle butonuna olay ekleme
    const clearCartButton = document.querySelector('.clear_cart');
    clearCartButton.addEventListener('click', clearCart);

    // Masa kutusu işlemleri
    var main_button = document.querySelector('.main_button');
    var table_box = document.querySelector('.table_box');
    table_box.classList.remove('open');

    main_button.addEventListener('click', () => {
        table_box.classList.toggle('open'); // Toggle class
    });

    // Menü aç/kapa işlemleri
    var container = document.querySelector('.container');
    var menu_open_close = document.querySelector('.menu_open_close');
    var menu_box = document.querySelector('.menu_box');
    menu_box.style.display = 'none';

    menu_open_close.addEventListener('click', () => {
        if (!menu_box.classList.contains('show')) {
            menu_box.style.display = 'flex';
            setTimeout(() => {
                menu_box.classList.add('show');
            }, 10);
            container.style.overflowY = 'hidden';

            menu_open_close.classList.remove('fa-bars');
            menu_open_close.classList.add('fa-times');
        } else {
            menu_box.classList.remove('show');
            container.style.overflowY = 'visible';
            setTimeout(() => {
                menu_box.style.display = 'none';
            }, 300);
            menu_open_close.classList.remove('fa-times');
            menu_open_close.classList.add('fa-bars');
        }
    });
});

function callGarson(tableNumber) {
    // Garson çağrıldığına dair POST isteği gönderilir
    $.post(`/call-garson/${tableNumber}`, function (response) {
        if (response.success) {
            const notification = document.querySelector('.notification');
            const notificationMessage = document.getElementById('notificationMessage');
            notificationMessage.innerText = `Masa ${tableNumber}'ya garson çağrıldı.`;

            // Eğer notification görünmüyorsa göster, görünüyorsa gizle
            if (notification.style.display === 'none' || notification.style.display === '') {
                notification.style.display = 'flex'; // Mesaj divini göster

                // 5 saniye sonra mesajı gizle
                setTimeout(() => {
                    notification.style.display = 'none'; // Mesaj divini gizle
                }, 5000);
            }
        }
    });
}

