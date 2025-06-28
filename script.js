document.addEventListener('DOMContentLoaded', () => {
    const productButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    let cart = []; // Array para almacenar los productos en el carrito

    // Función para cargar el carrito desde localStorage al iniciar
    function loadCart() {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            renderCart();
        }
    }

    // Función para guardar el carrito en localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Función para renderizar el carrito en la interfaz de usuario
    function renderCart() {
        cartItemsList.innerHTML = ''; // Limpiar la lista actual
        let total = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li style="text-align: center; color: #888;">El carrito está vacío.</li>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span class="item-name">${item.nombre}</span>
                    <span>$${item.precio.toFixed(2)}</span>
                    <button class="remove-item" data-product-id="${item.id}">X</button>
                `;
                cartItemsList.appendChild(li);
                total += item.precio;
            });
        }
        cartTotalSpan.textContent = total.toFixed(2);
    }

    // Manejador de clic para los botones "Agregar al Carrito"
    productButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            // En una aplicación real, harías una petición AJAX para obtener los detalles
            // del producto desde el servidor usando el productId.
            // Para este ejercicio, recuperaremos la información directamente del DOM o de un array JS si tuvieras.
            // Como tenemos los datos en PHP, en una app real, PHP enviaría estos datos a JS.
            // Para simplificar, asumiremos que los datos del producto están accesibles o los obtenemos de los datos PHP.

            // Aquí simulamos obtener el producto desde los datos PHP (solo para el frontend)
            // Esto es una simplificación, en un caso real se consultaría la base de datos o un endpoint API.
            // Para que esto funcione, necesitamos acceder a los datos de productos desde JS.
            // Una forma simple para este ejercicio es imprimir los datos PHP como un objeto JS global.
            // PERO, para mantener el ejercicio de "baja/media complejidad" simple, vamos a pasar el nombre y precio
            // directamente a través de data attributes o de un mapeo simple si tuviéramos un JSON de productos.

            // Para este ejemplo, vamos a simplificar asumiendo que los datos de los productos ya están disponibles
            // en el frontend de alguna forma (por ejemplo, si PHP los hubiera impreso como un JSON en un script tag).
            // Como no lo hemos hecho aún, vamos a buscar el elemento padre para obtener los detalles.

            const productCard = event.target.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('h2').textContent;
                const productPriceText = productCard.querySelector('.price').textContent;
                const productPrice = parseFloat(productPriceText.replace('$', ''));

                const productToAdd = {
                    id: parseInt(productId),
                    nombre: productName,
                    precio: productPrice
                };

                cart.push(productToAdd);
                saveCart();
                renderCart();
            }
        });
    });

    // Manejador de clic para el botón "X" de eliminar del carrito
    cartItemsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const productIdToRemove = parseInt(event.target.dataset.productId);
            const indexToRemove = cart.findIndex(item => item.id === productIdToRemove);

            if (indexToRemove !== -1) {
                cart.splice(indexToRemove, 1);
                saveCart();
                renderCart();
            }
        }
    });

    // Manejador de clic para el botón "Finalizar Compra"
    document.getElementById('checkout-button').addEventListener('click', () => {
        if (cart.length > 0) {
            alert('¡Gracias por tu compra! Tu pedido será procesado.');
            cart = []; // Vaciar el carrito
            saveCart();
            renderCart();
        } else {
            alert('Tu carrito está vacío. Agrega algunos productos antes de finalizar la compra.');
        }
    });

    // Cargar el carrito al inicio
    loadCart();
});