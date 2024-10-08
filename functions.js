
const openMenuButton = document.querySelector(".header__logo");//selecciona logo de menu
const menuLateralSection = document.querySelector(".menuLateral");//selecciona el contenido del menu lateral
const closeMenuButton = document.querySelector(".menu__x");//selecciona el logo de cerrar 

openMenuButton.addEventListener("click", () => {  //Agrega la funcion de click
    menuLateralSection.classList.add("menuLateral--show"); //agrega una clase para mostrar el contenido 
})

closeMenuButton.addEventListener("click", () => {
    menuLateralSection.classList.remove("menuLateral--show");//quita la clase que muestra el contenido del carrito 
})

const openCartButton = document.querySelector(".header__logo--carrito");
const cartSection = document.querySelector(".cart");
const closeCartButton = document.querySelector (".cart__x");

openCartButton.addEventListener("click", () => {
    cartSection.classList.add("cart--show");
});

closeCartButton.addEventListener("click", () => {
    cartSection.classList.remove("cart--show");
});


//agregar productos, quitar productos y modificar contador de carrito 
const addProductButtons = document.querySelectorAll(".product__cart"); // Obtener todos los botones de "Agregar al carrito"
const cart = document.querySelector(".cart");
let cartCount = 0;

function updateCartBadge() {
    const badge = document.querySelector(".carrito__badge");
    if (badge) {
        badge.textContent = cartCount; // Actualiza el badge con la cantidad de productos
    }
}

function initializeCartItems() {
    const existingCartItems = cart.querySelectorAll(".cart__div"); // Selecciona los productos existentes en el carrito
    existingCartItems.forEach(item => {
        const quantity = parseInt(item.dataset.quantity,10) || 1; //obtiene la cantidad del dataset
        cartCount += quantity; // Incrementa el contador por cada producto existente
        updateCartBadge(); //Actualiza el contador badge
        const deleteButton = item.querySelector(".cart__delete"); // Selecciona el botón de eliminar
        deleteButton.addEventListener("click", () => {
            if (confirm("¿Estás seguro de eliminar este producto?")) {
                cartCount -= quantity; //resta la cantidad del contador
                item.remove(); // Elimina el producto del carrito
                updateCartBadge(); // Actualiza el badge
            }
        });
    });
    updateCartBadge(); // Actualiza el badge después de inicializar
}

addProductButtons.forEach(button => {
    button.addEventListener("click", (event) => {

        const productArticle = event.target.closest(".products__article"); // Selecciona el artículo de producto relacionado al botón clickeado
        const productName = productArticle.querySelector(".products__name").textContent;
        const productPrice = productArticle.querySelector(".products__price").textContent;
        const productImageSrc = productArticle.querySelector(".products__img").src;

        const quantityInput = productArticle.querySelector(".product__quantity"); //obtiene el input de cantidad
        let quantity = parseInt(quantityInput.value, 10) || 1; //obtiene la cantidad o si no se usa 1 si no hay

        cartCount += quantity; //incrementa la cantidad total de productos 
        updateCartBadge();

        // Crear un nuevo elemento de producto en el carrito
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart__div");
        cartItem.dataset.quantity = quantity; //almacena la cantidad en dataset
        cartItem.innerHTML = `
            <img class="cart__img" src="${productImageSrc}" alt="${productName}" width="300">
            <p class="cart__product">${productName}</p>
            <p class="cart__price">${productPrice}</p>
            <p class="cart__quantity">Cantidad: ${quantity}</p> 
            <i class="cart__delete"><img src="img/trash.svg" alt="Icono quitar"></i>
        `;

        // Agregar el nuevo producto al carrito
        cart.appendChild(cartItem);

        // Funcionalidad de eliminar el producto
        const deleteButton = cartItem.querySelector(".cart__delete"); // Selecciona el botón de eliminar en el nuevo cartItem
        deleteButton.addEventListener("click", () => {
            if (confirm("¿Estás seguro de eliminar este producto?")) {
                cartCount -= quantity; //resta la cantidad del contador
                cartItem.remove(); // Elimina el producto del carrito
                updateCartBadge(); // Actualiza el badge
            }
        });
    });
});


// Inicializa los productos existentes en el carrito cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
    initializeCartItems(); // Llama a la función para inicializar los productos existentes
});

