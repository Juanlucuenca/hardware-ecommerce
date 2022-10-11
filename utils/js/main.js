const moreInfo = document.querySelector('#moreInfo')
const popup = document.querySelector('#popup')
const popupBack = document.querySelector('#popup-back')

const displayPopUp = () => {
    console.log('gola')
    popup.classList.add("popup")
    popupBack.classList.add("black")
    
}

const delPopUp = () => {
    popup.classList.remove("popup")
    popupBack.classList.remove("black")
}

moreInfo.addEventListener('click', displayPopUp)
popupBack.addEventListener('click', delPopUp)
