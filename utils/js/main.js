class Product {
    constructor(name, price, stock) {
        this.name = name,
        this.price = price,
        this.stock = stock
    }
}

const products = [
    new Product('RTX 3060', 120000, true),
    new Product('RTX 3070', 120000, true),
    new Product('RTX 3080', 120000, true)
]

const cart = []


// ----------- Renderizar los productos ---------------
const renderProduct = ({name, price}, element) => {
    const productsView = document.querySelector('#productsView')
    const renderTheProduct = 
        productsView.innerHTML += `
            <div class="productItem">
                <div class="productItem-name">${element.name}</div>
                <div class="productItem-price">${element.price}</div>
                <button id = "button-addCart" class="button-addCart">Add to cart</button>
            </div>
        `

    return renderTheProduct
}

const renderAllProducts = () => {
    products.forEach(element  => {
        renderProduct(Product, element)
        localStorage.setItem("products", Product)
    });
}

renderAllProducts()

// ----------- ./Renderizar los productos ---------------



// ----------- Render Product In Cart -----------------
const renderProductInCart = (item) => {
    console.log(item.price)
    const itemContainer = document.querySelector('#carritoModal-itemsContainer')
    
    itemContainer.innerHTML += `
    <div class="item">
    <div class="item-name">${item.name}</div>
    <div class="item-price">${item.price}</div>
</div>
    `
}
// ----------- ./Render Product In Cart -----------------



// ----------- Agregar al carrito ---------------
const iconCartCant = document.querySelector('#cart-cantidad')
const iconCart = document.querySelector('#cart')

const addItemToCart = (buttonIndex) =>  {


    const itemsInCart = (cart.length + 1)
    const isValidItem = products.find((_, productIndex) => productIndex === buttonIndex)

    const incrementItemInCar = () => {iconCartCant.textContent = itemsInCart}
    const addProducInCart = () => {cart.push(isValidItem)}
    
    if (isValidItem) {
        addProducInCart()
        incrementItemInCar()
        renderProductInCart(isValidItem)
        console.log(cart)
    }
}

const botones = document.querySelectorAll('.button-addCart')
botones.forEach( (element, index) => {
    element.addEventListener('click', () => {addItemToCart(index)})
})

// ----------- ./Agregar al carrito ---------------



// ------------------ Open Moda Cart ------------------
const closeModal = document.querySelector('#carritoModal-close')

const openAndCloseModalCart = (action) => {

    const carritoModal         = document.querySelector('#carritoModal')
    const shadeBlackBackground = document.querySelector('#shadeBackground')

    if (action === "open") {
        carritoModal.classList.add('carritoModal')
        carritoModal.classList.remove('carritoModal--hidden')

        shadeBlackBackground.classList.add('black-shade')
        shadeBlackBackground.classList.remove('black-shade--hidden')


    }

    if (action === 'close') {
        carritoModal.classList.remove('carritoModal')
        carritoModal.classList.add('carritoModal--hidden')

        shadeBlackBackground.classList.remove('black-shade')
        shadeBlackBackground.classList.add('black-shade--hidden')
    }
}

iconCart.addEventListener('click', () => {
    openAndCloseModalCart("open")

})

closeModal.addEventListener('click', () => openAndCloseModalCart("close"))
// ------------------ ./Open Moda Cart ------------------






