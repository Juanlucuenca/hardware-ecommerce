// Creamos la Obj para crear y modificar nuestro productos
class Product {
    constructor(name, price, stock) {
        this.name = name,
        this.price = price,
        this.stock = stock
    }
}


const cart = []


products.push(new Product('RTX 3060', 120000, true))
products.push(new Product('RTX 3070', 140000, false))
products.push(new Product('RTX 3080', 180000, true))
products.push(new Product('RTX 3090', 200000, false))


const simuladorCompra = () => {
    let chooseProduct = Number(prompt("indique que elemento quiere agregar al carrito \n 1 - RTX 3060 \n 2 - RTX 3080 \n 3 - RTX 3080 \n 4 - RTX 3080")) 

    if (chooseProduct > 4 || isNaN(chooseProduct)) {
        alert('Ingrese un producto valido')
        simuladorCompra()
    } else if (chooseProduct === 1) {
        cart.push(products[0])
    } else if (chooseProduct === 2) {
        cart.push(products[1])
    } else if (chooseProduct === 3) {
        cart.push(products[2])
    } else if (chooseProduct === 4) {
        cart.push(products[3])
    }
    
    console.log(cart)

    seguirComprando()
}

const seguirComprando = () => {
    let volveraComprar = confirm('Quieres seguir comprando?')

    if(volveraComprar) {
        simuladorCompra()
    } else {
        finalizarCompra()
    }
}

const finalizarCompra = () => {
    const precioFinal = cart.reduce((total, productBought) => total + productBought.price, 0)
    alert('Has finalizado la compra, el monto a pagar es de ' + precioFinal)
}

simuladorCompra()