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

    drawCustomFeelingsBtn()
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

    saveCustomFeelings()
}

window.addEventListener("load",()=>{
    goMenuPage()
    closeMenuCloud()
})

function saveCustomFeelings(){
    // let allCustomFeelings = {}
    let allCustomFeelings = JSON.parse(localStorage.getItem("customFeelings"))
    let page = pageCustomFeelings
    for (i=0;i<page.children[1].childElementCount-1;i++){
        let original = page.children[1].children[i].firstElementChild.value
        let represent = page.children[1].children[i].lastElementChild.value

        if (original.trim()==="" || represent.trim()==="") continue
    
        // allCustomFeelings.push([original,represent])
        allCustomFeelings[original] = represent
    }
    
    localStorage.setItem("customFeelings",JSON.stringify(allCustomFeelings))
}

function addNewCustomFeelingsInput(thisBtn){
    let newDivInput = document.createElement("div")
    newDivInput.classList.add("menu-btn")
    newDivInput.innerHTML = `<input class="short-input" type="text" maxLength="20" placeholder="original..">  <input class="long-input" type="text" placeholder="represent to..." maxlength="20">`

    thisBtn.parentElement.insertBefore(newDivInput,thisBtn)
}

pageCustomFeelings.children[1].lastElementChild.addEventListener('click',()=>{
    addNewCustomFeelingsInput(pageCustomFeelings.children[1].lastElementChild)
})

function removeAllCustomFeelingsBtn(){
    let addBtn = pageCustomFeelings.children[1].lastElementChild
    pageCustomFeelings.children[1].innerHTML = ""

    pageCustomFeelings.children[1].appendChild(addBtn)
}

function drawCustomFeelingsBtn(){
    removeAllCustomFeelingsBtn()

    let allCustomFeelings = JSON.parse(localStorage.getItem("customFeelings"))

    for (key in allCustomFeelings){
        let newDivInput = document.createElement("div")
        newDivInput.classList.add("menu-btn")
        newDivInput.innerHTML = `<input class="short-input" type="text" maxLength="20" placeholder="original..">  <input class="long-input" type="text" placeholder="represent to..." maxlength="20">`
        newDivInput.children[0].value = key
        newDivInput.children[1].value = allCustomFeelings[key]

        let menuList = pageCustomFeelings.children[1]
        menuList.insertBefore(newDivInput,menuList.lastElementChild)
    }

}

pageCustomFeelings.children[1].addEventListener("focusout",saveCustomFeelings)