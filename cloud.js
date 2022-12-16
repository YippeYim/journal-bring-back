const menuCloud = document.getElementsByClassName("menu-cloud")[0];
const menuIcon = document.getElementsByClassName("menu-icon")
const cross = document.getElementsByClassName("menu-icon")[0];
const burger = document.getElementsByClassName("setting")[0]

burger.addEventListener('click',openMenuCloud)
cross.addEventListener('click',closeMenuCloud)

function openMenuCloud(){
    menuCloud.style.width="15vw"
    cross.style.height="70px"
    burger.style.height="0px"
}

function closeMenuCloud(){
    menuCloud.style.width="0%"
    cross.style.height="0px"
    burger.style.height="70px"
}

const pageMenu = document.getElementsByClassName("page-menu")[0]
const pageCustomFeelings = document.getElementsByClassName("page-custom-feelings")[0]
const customFeelings = document.getElementById("custom-feelings")
const backButton = document.getElementsByClassName("back-icon")
const pageDiv = document.getElementsByClassName("page")

customFeelings.addEventListener('click',goCustomFeelingsPage)

function goCustomFeelingsPage(){
    pageMenu.style.display="none"
    pageCustomFeelings.style.display="block"
    backButton[0].style.height="70px"
}

for (i=0;i<backButton.length;i++){
    backButton[i].addEventListener('click',goMenuPage)
}

function closeAllPage(){
    for (i=0;i<pageDiv.length;i++){
        pageDiv[i].style.display="none"
    }
    for (i=0;i<menuIcon.length;i++){
        menuIcon[i].style.height="0px"
    }
}

function goMenuPage(){
    closeAllPage()
    pageMenu.style.display="block"
    cross.style.height="70px"
}

window.addEventListener("load",()=>{
    goMenuPage()
    closeMenuCloud()
})
