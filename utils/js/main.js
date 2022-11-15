


const products = [
    {
        id: 1,
        name: "RTX 3060",
        imgUrl: "./utils/img/rtx3060_1000x1000.png",
        price: 335
    },
    {
        id: 2,
        name: "RTX 3070",
        imgUrl: "./utils/img/rtx3070_1000x1000.png",
        price: 465
    },
    {
        id: 3,
        name: "RTX 3080",
        imgUrl: "./utils/img/rtx3080_1000x1000.png",
        price: 769 
    }
]

async function setItemsPrice() {
    const result = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    const dolares = await result.json()
    const dolarBlue = parseInt(dolares[1].casa.compra) 

    products.forEach(e => {
        e.price = e.price * dolarBlue
    })

    renderAllProducts()
}

setItemsPrice()

const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(cart))
}

const cart = JSON.parse(localStorage.getItem("carrito")) || []

// ----------- Renderizar los productos ---------------

const renderProduct = (_, element) => {

    const productsView = document.querySelector('#productsView')
    const renderTheProduct = 
        productsView.innerHTML += `
            <div class="productItem">
                <img class="productItem__img" src="${element.imgUrl}" alt="">
                <div class="productItem__info">$ ${element.price}</div>
                <div class="productItem__info">${element.name}</div>
                <button id = "button-addCart" class="productItem__button">Agregar al carrito</button>
            </div>
        `

    return renderTheProduct
}

const renderAllProducts = () => {
    products.forEach(element  => {
        renderProduct(products, element)
    });
}

// ----------- ./Renderizar los productos ---------------



// ----------- Render Product In Cart -----------------
const itemContainer = document.querySelector('#carritoModal-itemsContainer')
const iconCartCant = document.querySelector('#cart-cantidad')


const recoverCart = () => {
    if (cart != []) {
    cart.forEach(element => {
        itemContainer.innerHTML += `
        <div class="item">
        <div class="item-name">${element.name}</div>
        <div class="item-price">${element.price}</div>
        </div>
        `
    });
    }
}

const recoverCartCant = () => {
    if (JSON.parse(localStorage.getItem('carritoLenght') === null )) {
        iconCartCant.textContent = 0;
    } else {
        iconCartCant.textContent = JSON.parse(localStorage.getItem('carritoLenght')) 
    }
}

recoverCartCant()
recoverCart()

const renderProductInCart = (item) => {
    itemContainer.innerHTML += `
    <div class="item">
    <div class="item-name">${item.name}</div>
    <div class="item-price">${item.price}</div>
    </div>
    `
}
// ----------- ./Render Product In Cart -----------------



// ----------- Agregar al carrito ---------------

const iconCart = document.querySelector('#cart')
let itemsInCart;

const addItemToCart = (buttonIndex) =>  {
    let itemsInCart = (cart.length + 1)

    const setCantCarritoInLocalStorage = localStorage.setItem('carritoLenght', JSON.stringify(itemsInCart))

    const isValidItem = products.find((_, productIndex) => productIndex === buttonIndex)

    const incrementItemInCar = () => {iconCartCant.textContent = JSON.parse(localStorage.getItem('carritoLenght'))}

    const addProducInCart = () => {
        cart.push(isValidItem)
        renderProductInCart(isValidItem)
        saveLocal()

    }
    
    if (isValidItem) {
        addProducInCart()
        incrementItemInCar()
        console.log(cart)

    }
}

setTimeout(() => {
    const botones = document.querySelectorAll('.button-addCart');
    console.log(botones)
    botones.forEach( (element, index) => {
        element.addEventListener('click', () => {addItemToCart(index)})
    })
}, 1000)

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



// ------------------- Finalizar compra ---------------------

const buttomCheckout = document.querySelector('#carritoModal-checkout')

const checkout = () => {
    swal({
        title: "Estas seguro que quieres finalizar la compra",
        text: "Ten encuenta que si le das que si se realizara automaticamente el pago",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
        swal("Felicidadaes! acabas de finalizar la compra", {
            icon: "success",
        });

        cart.length = 0
        openAndCloseModalCart("close")
        localStorage.clear()
        itemContainer.innerHTML = ``
        iconCartCant.textContent = 0

        }
    });
};

    buttomCheckout.addEventListener('click', () => {
        if(cart.length > 0) {
            checkout()
        } else {
            swal({
                title: "No tienes nada en el carrito",
                text: "Ve a comprar algo!",
                icon: "error",
            });
        }
    })


// ------------------- ./Finalizar compra ---------------------