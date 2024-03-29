const menuCloud = document.getElementsByClassName("menu-cloud")[0];
const menuIcon = document.getElementsByClassName("menu-icon")
const cross = document.getElementsByClassName("menu-icon")[0];
const burger = document.getElementsByClassName("setting")[0]
// let saveBtn = document.getElementsByClassName("save-btn")[0]

burger.addEventListener('click',openMenuCloud)
cross.addEventListener('click',closeMenuCloud)

function openMenuCloud(){
    menuCloud.style.width="15vw"
    cross.style.height="70px"
    burger.style.height="0px"
    saveBtn.style.right="-200px"
}

function closeMenuCloud(){
    menuCloud.style.width="0%"
    cross.style.height="0px"
    burger.style.height="70px"
    saveBtn.style.right="0px"
}

const pageMenu = document.getElementsByClassName("page-menu")[0]
const pageCustomFeelings = document.getElementsByClassName("page-custom-feelings")[0]
const customFeelings = document.getElementById("custom-feelings")
const backButton = document.getElementsByClassName("back-icon")
const pageDiv = document.getElementsByClassName("page")
const jumpToDate = document.getElementById("jump-to-date")
const pagejumpToDate = document.getElementsByClassName("page-jump-to-date")[0]
const pagejumpToDateInput = document.getElementById("jump-to-date-input")

jumpToDate.addEventListener('click',goJumpToDatePage)

function goJumpToDatePage(){
    pageMenu.style.display="none"
    pagejumpToDate.style.display="block"
    backButton[0].style.height="70px"
}

pagejumpToDateInput.parentElement.nextElementSibling.addEventListener('click',()=>{
    let nonFormatDate = pagejumpToDateInput.value 
    // 2022-12-29
    todayDate.setDate(`${nonFormatDate.slice(8)}/${nonFormatDate.slice(5,7)}/${nonFormatDate.slice(0,4)}`)
    // console.log(`${nonFormatDate.slice(8)}/${nonFormatDate.slice(5,7)}/${nonFormatDate.slice(0,4)}`)
    localStorage.setItem("todayDate",todayDate.getDate())
    location.reload()
})

customFeelings.addEventListener('click',goCustomFeelingsPage)

function goCustomFeelingsPage(){
    pageMenu.style.display="none"
    pageCustomFeelings.style.display="block"
    backButton[1].style.height="70px"

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

}

function setJumpToDefault(){
    let d = new Date()
    let date = `${d.getDate()}`
    let month = `${d.getMonth()+1}`
    if (month.length<2){
        month = "0"+month
    }
    if (date.length<2){
        date = "0"+date
    }
    pagejumpToDateInput.value=`${d.getFullYear()}-${month}-${date}`
}


window.addEventListener("load",()=>{
    setJumpToDefault()    

    goMenuPage()
    closeMenuCloud()
})

function saveCustomFeelings(){
    let inputFeelings = {}
    let page = pageCustomFeelings
    for (i=0;i<page.children[1].childElementCount-1;i++){
        let original = page.children[1].children[i].firstElementChild.value
        let represent = page.children[1].children[i].lastElementChild.value

        if (original.trim()==="" || represent.trim()==="") continue
    
        inputFeelings[original] = represent
    }

    localStorage.setItem("customFeelings",JSON.stringify(inputFeelings))

    drawTodayFeel()
}

function addNewCustomFeelingsInput(thisBtn){
    let newDivInput = document.createElement("div")
    newDivInput.classList.add("menu-btn")
    newDivInput.innerHTML = `<input class="short-input" type="text" maxLength="20" placeholder="original..">  <input class="long-input" type="text" placeholder="short form..." maxlength="20">`

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