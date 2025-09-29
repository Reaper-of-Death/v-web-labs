import './style.css'

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен!');
    
    // Инициализация поиска
    initSearch();

    //Переходы по ссылкам
    urlLinks();
});

function urlLinks() {
    document.querySelectorAll('.url-btn').forEach(button => {
        button.addEventListener('click', function() {
            const url = button.getAttribute('data-url');
            window.location.href = url;
        })
    })
}

// Функция инициализации поиска
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchResultsGrid = document.getElementById('searchResultsGrid');
    const mainContent = document.getElementById('mainContent');
    
    // Все товары на странице
    const allProducts = Array.from(document.querySelectorAll('.product-card'));
    
    // Обработчик ввода в поисковую строку
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.trim().toLowerCase();
        
        if (searchTerm.length > 0) {
            // Поиск товаров
            const filteredProducts = allProducts.filter(product => {
                const productName = product.getAttribute('data-name').toLowerCase();
                return productName.includes(searchTerm);
            });
            
            // Показываем результаты поиска
            displaySearchResults(filteredProducts, searchTerm);
            searchResults.style.display = 'block';
            mainContent.classList.add('hide-main');
        } else {
            // Скрываем результаты поиска, если строка пустая
            searchResults.style.display = 'none';
            mainContent.classList.remove('hide-main');
        }
    });
    
    // Обработчик клика по кнопке поиска
    document.querySelector('.search-btn').addEventListener('click', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm.length > 0) {
            searchInput.dispatchEvent(new Event('input'));
        }
    });
    
    // Поиск при нажатии Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm.length > 0) {
                searchInput.dispatchEvent(new Event('input'));
            }
        }
    });
}

// Функция отображения результатов поиска
function displaySearchResults(products, searchTerm) {
    const searchResultsGrid = document.getElementById('searchResultsGrid');
    const searchTitle = document.querySelector('.search-title');
    
    // Обновляем заголовок
    searchTitle.textContent = `Результаты поиска: "${searchTerm}"`;
    
    // Очищаем предыдущие результаты
    while (searchResultsGrid.firstChild) {
        searchResultsGrid.removeChild(searchResultsGrid.firstChild);
    }
    
    if (products.length === 0) {
        // Если товары не найдены
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = 'no-results';
        noResultsDiv.textContent = `По запросу "${searchTerm}" ничего не найдено`;
        searchResultsGrid.appendChild(noResultsDiv);
    } else {
        // Отображаем найденные товары
        products.forEach(product => {
            const productClone = product.cloneNode(true);
            searchResultsGrid.appendChild(productClone);
        });
        
        // Обновляем обработчики для кнопок "В корзину" в результатах поиска
        updateCartButtons();
    }
}

// Функция обновления обработчиков кнопок корзины
function updateCartButtons() {
    const cartButtons = document.querySelectorAll('#searchResultsGrid .add-to-cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            addToCart(productName);
        });
    });
}

// Функция добавления в корзину (заглушка)
function addToCart(productName) {
    console.log(`Товар "${productName}" добавлен в корзину`);
    // Здесь можно добавить логику добавления в корзину
    alert(`Товар "${productName}" добавлен в корзину!`);
}