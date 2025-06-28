<?php include 'productos.php'; ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda de Productos</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Nuestros Productos</h1>
    </header>

    <main class="product-grid">
        <?php foreach ($productos as $producto): ?>
            <div class="product-card">
                <img src="img/<?php echo htmlspecialchars($producto['imagen']); ?>" alt="<?php echo htmlspecialchars($producto['nombre']); ?>">
                <h2><?php echo htmlspecialchars($producto['nombre']); ?></h2>
                <p class="description"><?php echo htmlspecialchars($producto['descripcion']); ?></p>
                <p class="price">$<?php echo number_format($producto['precio'], 2); ?></p>
                <button class="add-to-cart" data-product-id="<?php echo htmlspecialchars($producto['id']); ?>">Agregar al Carrito</button>
            </div>
        <?php endforeach; ?>
    </main>

    <aside class="cart-sidebar">
        <h2>Carrito de Compras</h2>
        <ul id="cart-items">
            </ul>
        <p>Total: $<span id="cart-total">0.00</span></p>
        <button id="checkout-button">Finalizar Compra</button>
    </aside>

    <script src="script.js"></script>
</body>
</html>