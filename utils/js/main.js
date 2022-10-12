// E-commerce de una tienda de hardware

// Creamos la Obj para crear y modificar nuestro productos
class Product {
    constructor(name, price, stock) {
        this.name = name,
        this.price = price,
        this.stock = stock
    }
}


const visor = document.querySelector('#visor')

const cart = []

const products = [
    new Product('RTX 3060', 120000, true),
    new Product('RTX 3070', 140000, false),
    new Product('RTX 3080', 180000, true),
    new Product('RTX 3090', 200000, false)
]


// renderizar productos
const renderProducts = () => {
    products.forEach(e  => {
        visor.innerHTML += `
        <div class="productItem">
            <div class="productItem-name">${e.name}</div>
            <div class="productItem-price">${e.price}</div>
            <button id = "button-addCart" class="button-addCart">Add to cart</button>
        </div>
        `
    });
}

renderProducts()



// Agregar al carrito
const botones = document.querySelectorAll('.button-addCart')
const cantidadCart = document.querySelector('#cart-cantidad')

const addToCart = (buttonIndex) => {
    const item = products.find((e, i) => i === buttonIndex)

    cantidadCart.textContent = (cart.length + 1)
    console.log(cart.length)

    cart.push(item)
    console.log(cart)
}

botones.forEach((e, i) => {
    e.addEventListener('click', () => {
        const botonIndex = i
        addToCart(botonIndex)
    })
})



// Render carrito
const carrito = document.querySelector('#cart')
const popupCloseIcon = document.querySelector('#popup-close')
const popup = document.querySelector('#popup')
const itemContainer = document.querySelector('.cart-items-container')
const blackBackground = document.querySelector('#black-back')

const viewCarrito = () => {
    console.log(popup)

    popup.classList.add('cart-view')
    popup.classList.remove('nodisplay')
    
    blackBackground.classList.add('black-body')
    blackBackground.classList.remove('nodisplay')

    cart.forEach(e => {
        itemContainer.innerHTML += `
        <div class="cart-item">
            <div class="productItem-name">${e.name}</div>
            <div class="productItem-price">${e.price}</div>
        </div>
        `
    })
}

const closeCarrito = (e) => {
    console.log('hiciste click')
        popup.classList.add('nodisplay')
        popup.classList.remove('cart-view')
    
        blackBackground.classList.add('nodisplay')
        blackBackground.classList.remove('black-body')
}


popupCloseIcon.addEventListener('click', closeCarrito)
carrito.addEventListener('click', viewCarrito)










