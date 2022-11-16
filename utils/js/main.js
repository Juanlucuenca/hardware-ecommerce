
/**
 * Generamos el arr de los productos
 * que tendremos en nuestra WEB
 */
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


// ----------- Obtener Dolar Blue ---------------

/**
 * Funcion para obtener el precio del dolarblue al dia de hoy
 */
async function setItemsPrice() {
    /**
     * Llamamos a la api de dolarsi para
     * obtener el valor del dolarblue al dia de hoy
     */
    const result = await fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    const dolares = await result.json()
    const dolarBlue = parseInt(dolares[1].casa.compra) 

    /**
     * Multiplicamos el precio de los productos
     * por el valor del dolarblue
     */
    products.forEach(e => {
        e.price = e.price * dolarBlue
    })

    renderAllProducts()
}
setItemsPrice()

// ----------- ./Obtener Dolar Blue ---------------



// ----------- LocalSotrage ---------------
const itemContainer = document.querySelector('#carritoModal-itemsContainer')
const iconCartCant  = document.querySelector('#cart-cantidad')


/**
 * Array para guardar todos los items
 * que el usuario introduce en el carrito
 * de compras
 */
const cart = JSON.parse(localStorage.getItem("carrito")) || []


/**
 * Funcion para guardar en el localsotrage
 * los items que el usuario va agregando
 * al carrito, y los mantiene si este
 * cierra la sesion.
 */
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(cart))
}

/**
 *  Funcion que toma los datos del carrito
 *  y cuando abrimos el mismo renderiza los 
 *  productos que tenia el usuario antes de 
 *  abandonar la sesion
 */
const recoverCart = () => {
    if (cart != []) {
    cart.forEach(element => {
        itemContainer.innerHTML += `
        <div class="item">
        <img class="item-img" src="${element.imgUrl}" alt="">
        <div class="item-name">${element.name}</div>
        <div class="item-price">$ ${element.price}</div>
        </div>
        `
    });
    }
}

/**
 * Toma los datos guarado en la ultima sesion
 * del usuario sobre la cantidad de items
 * que tenia en el carrito y los usa para
 * volverlo a mostrar al usuario
 */
const recoverCartCant = () => {
    if (JSON.parse(localStorage.getItem('carritoLenght') === null )) {
        iconCartCant.textContent = 0;
    } else {
        iconCartCant.textContent = JSON.parse(localStorage.getItem('carritoLenght')) 
    }
}

recoverCartCant()
recoverCart()

// ----------- ./LocalSotrage ---------------


// ----------- Renderizar los productos ---------------

/**
 * Funcion para renderizar
 * un producto que nosotros
 * le enviaremos por parametro
 */
const renderProduct = (producto) => {
    const productsView     = document.querySelector('#productsView')
    const renderTheProduct = 
        productsView.innerHTML += `
            <div class="productItem">
                <img class="productItem__img" src="${producto.imgUrl}" alt="">
                <div class="productItem__info">$ ${producto.price}</div>
                <div class="productItem__info">${producto.name}</div>
                <button class="productItem__button">Agregar al carrito</button>
            </div>
        `
}

/**
 * Funcion encargada de renderizar
 * con renderProduct(), todos los 
 * items que se encuentren en el array
 * products
 */
const renderAllProducts = () => {
    products.forEach(element  => {
        renderProduct(element)
    });
}



// ----------- ./Renderizar los productos ---------------



// ----------- Carrito de compras -----------------
const iconCart = document.querySelector('#cart')
const removeCartButton = document.querySelector('#carritoModal-deleteCart')



const addItemToCart = (buttonIndex) =>  {

    /**
     * La cantidad de items que tendremos
     * dentro del carrito va a ser igual
     * a el la longitud de nuestro array
     * cart + 1
     */
    let itemsInCart = (cart.length + 1)
    /** 
     * Guardamos la cantidad de items en el
     * carrito en el localstorage para luego
     * mantener el dato
     */
    localStorage.setItem('carritoLenght', JSON.stringify(itemsInCart))

    const incrementItemInCar = () => {
        iconCartCant.textContent = JSON.parse(localStorage.getItem('carritoLenght'))
    }


    const isValidItem = products.find((_, productIndex) => productIndex === buttonIndex)


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

const removeAllItemsFromCart = () => {
    if(cart.length < 1) {
        swal({
            title: "No tienes nada en el carrito",
            text: "Que quieres borrar?",
            icon: "error",
        });
    } else {
        cart.length = 0
        localStorage.clear()
        itemContainer.innerHTML = ``
        iconCartCant.textContent = 0
        openAndCloseModalCart("close")

        swal({
            title: "Borraste el carrito",
            text: "Excelente!",
            icon: "success",
        });
    }


}

removeCartButton.addEventListener('click', removeAllItemsFromCart)

/**
 * Renderiza un elemento en el carrito
 * de compras cuando el usuario agrega
 * uno
 */
const renderProductInCart = (item) => {

    itemContainer.innerHTML += `
    <div class="item">
    <img class="item-img" src="${item.imgUrl}" alt="">
    <div class="item-name">${item.name}</div>
    <div class="item-price">$ ${item.price}</div>
    </div>
    `
}

setTimeout(() => {
    const botones = document.querySelectorAll('.productItem__button');
    console.log(botones)
    botones.forEach( (element, index) => {
        element.addEventListener('click', () => {addItemToCart(index)})
    })
}, 2000)

// ----------- ./Carrito de compras -----------------



// ------------------ Ventana modal (carrito de compras) ------------------

const closeModal = document.querySelector('#carritoModal-close')

/**
 * Funcion que depende del parametro
 * que el enviaremos en un evento a-
 * brira o cerrara la el modal del
 * carrito de compras
 */
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

iconCart.addEventListener('click', () => {openAndCloseModalCart("open")})
closeModal.addEventListener('click', () => openAndCloseModalCart("close"))

// ------------------ ./Ventana modal (carrito de compras) ------------------



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