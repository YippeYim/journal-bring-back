const addBtnElements = document.getElementsByClassName("add-bullet")

for(let i=0;i<addBtnElements.length;i++){
    addBtnElements[i].addEventListener('click',()=>{
        addBullet(addBtnElements[i])
    })
}

const ul = document.getElementById("bullet-list")

function addBullet(elementLi){
    const newBullet = document.createElement("li")
    newBullet.innerHTML = "<input type='text' class='input-bullet' onkeydown='bulletOnKeyDown(this,event)' onkeyup='bulletOnKeyUp(this,event)'>"

    if (elementLi.classList.contains("above")){
        // add bullet above
        ul.insertBefore(newBullet, ul.children[2])
        ul.children[2].firstElementChild.focus()
    }else if (elementLi.classList.contains("bottom")){
        // add bullet above
        ul.insertBefore(newBullet, ul.children[ul.childElementCount-1])
        ul.children[ul.childElementCount-2].firstElementChild.focus()
    }else if (elementLi.firstElementChild.classList.contains("input-bullet")){
        // if use function from other => append bullet after self
        elementLi.parentElement.insertBefore(newBullet, elementLi.nextSibling)
        elementLi.nextSibling.firstElementChild.focus()
    }
}
function addNoteBullet(elementLi){
    if (elementLi.parentElement.matches(".note-container")){
        alert("Sorry, you can't make note bullet inside note bullet")
        return
    }
    if (elementLi.firstElementChild.saveText.length<1){
        alert("Please type note's title before make note => <title/note>")
        return
    }
    
    const newBullet = document.createElement("li")
    const title = elementLi.firstElementChild.saveText

    newBullet.innerHTML = title + "<ul class='note-container'><li><input type='text' class='input-bullet' onkeydown='bulletOnKeyDown(this,event)' onkeyup='bulletOnKeyUp(this,event)'></li></ul>"

    elementLi.parentElement.insertBefore(newBullet, elementLi.nextSibling)

    deleteThisBullet(elementLi.firstElementChild)

    moveCursorOnBullet(document.activeElement,"down")

    document.activeElement.parentElement.parentElement.parentElement.noteTitle = title
    console.log( document.activeElement.parentElement.parentElement.parentElement.noteTitle )
}
function deleteThisBullet(bulletInput){
    let bulletLi = bulletInput.parentElement

    // (not note bullet) if have only 1 bullet left => return
    if (bulletLi.parentElement.childElementCount==4 && !(bulletInput.parentElement.parentElement.matches(".note-container"))) return

    // (for note bullet) if have only 1 bullet left => remove note-container
    if (bulletLi.parentElement.childElementCount==1){
        if (!(confirm("<Delete note> Are you sure?"))) return
        moveCursorOnBullet(bulletLi.firstElementChild,"up")
        let noteUl = bulletLi.parentElement
        noteUl.parentElement.parentElement.removeChild(noteUl.parentElement)
        return
    }

    // move cursor to other bullet
    let direction = "up"
    // (for note bullet)
    if (bulletLi.parentElement.matches(".note-container") && bulletLi == bulletLi.parentElement.firstElementChild){
        direction = "down"
    }
    else if (bulletLi.previousElementSibling.matches(".add-bullet")){
        direction = "down"
    }

    moveCursorOnBullet(bulletInput,direction)

    // remove this bullet
    bulletLi.parentElement.removeChild(bulletLi)
}
function moveCursorOnNoteBullet(bulletInput,dest){
    let bulletLi = bulletInput.parentElement

    if(dest=="down" ){
        // skip if is last child
        if (!(bulletLi==bulletLi.parentElement.lastElementChild)){
            bulletLi.nextElementSibling.firstElementChild.focus()
        }else{
            // if is last go on normal bullet
            moveCursorOnBullet(bulletLi.parentElement,"down")
        }
    }

    if(dest=="up"){
        // skip if is first child
        if (!(bulletLi==bulletLi.parentElement.firstElementChild)){
            bulletLi.previousElementSibling.firstElementChild.focus()
        }else{
            // if is last go on normal bullet
            moveCursorOnBullet(bulletLi.parentElement,"up")
        }
    }
}

function moveCursorOnBullet(bulletInput, dest){
    let bulletLi = bulletInput.parentElement

    // spacific case (note bullet)
    if (bulletLi.parentElement.matches(".note-container")){
        moveCursorOnNoteBullet(bulletInput, dest)
        return
    }

    if(dest=="down" && !bulletLi.nextElementSibling.matches(".add-bullet")){
        // if below bullet is note-container
        if (bulletLi.nextElementSibling.firstElementChild.matches(".note-container")){
            bulletLi.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.focus()
            return
        }

        bulletLi.nextElementSibling.firstElementChild.focus()
    }
    if(dest=="up" && !bulletLi.previousElementSibling.matches(".add-bullet")){
        // if bullet on top is note-container
        if (bulletLi.previousElementSibling.firstElementChild.matches(".note-container")){
            bulletLi.previousElementSibling.firstElementChild.lastElementChild.firstElementChild.focus()
            return
        }

        bulletLi.previousElementSibling.firstElementChild.focus()
    }

}
function renameNoteTitle(bulletLi,isAfterAddFeeling=false){
    const bulletLiLi = bulletLi.parentElement.parentElement
    let save =bulletLiLi.firstElementChild

    let noteFeelings = ""

    if (isAfterAddFeeling){ 
        noteFeelings = "["

        console.log(bulletLi.parentElement)

        for (i=0;i<bulletLi.parentElement.feelings.length;i++){
            noteFeelings += bulletLi.parentElement.feelings[i]
            if (i!=bulletLi.parentElement.feelings.length-1){
                noteFeelings += ","
            }else{
                noteFeelings += "]"
            }
        }
        if (noteFeelings.length==1){
            noteFeelings =""
        }
    }else{
        bulletLiLi.noteTitle = bulletLi.firstElementChild.saveText
        // console.log("renamed")
    }
    bulletLiLi.innerText = (bulletLiLi.noteTitle + "  " + noteFeelings)
    bulletLiLi.appendChild(save)

    bulletLi.firstElementChild.saveText=""
    bulletLi.firstElementChild.focus()
}

var waitForCommand = false
var command = ""
var waitForFeel = false
var todayFeel = []


const feelingsBox = document.getElementsByClassName("feelings-box")[0]
function clearFeelingsBox(){
    feelingsBox.innerHTML = ""
}


function drawTodayFeel(){
    clearFeelingsBox()
    const allCustomFeelings = JSON.parse(localStorage.getItem("customFeelings"))

    for (i=0;i<todayFeel.length;i++){
        let newSpan = document.createElement("span")
        newSpan.classList.add("todayfeeling")
        newSpan.innerText = todayFeel[i]
        let onHoverTitle = todayFeel[i]
        if (allCustomFeelings[todayFeel[i]] != undefined){
            newSpan.classList.add("short-form")
            newSpan.innerText = allCustomFeelings[todayFeel[i]]
            onHoverTitle = todayFeel[i]
        }

        newSpan.setAttribute("title",onHoverTitle)
        feelingsBox.appendChild(newSpan)
    }
}

window.addEventListener("load",()=>{
    if (localStorage.getItem("todayFeel")===null){
        localStorage.setItem("todayFeel","[]")
    }    
    todayFeel = JSON.parse(localStorage.getItem("todayFeel"))
    drawTodayFeel()

    // todo: load page data from localstorage
    loadPageValue();
})


function clearCommand(bulletInput){
    bulletInput.value = bulletInput.saveText
    waitForCommand = false
    command =""
}

let saveBtn = document.getElementsByClassName("save-btn")[0]

function bulletOnKeyDown(elementInput,event){

    saveBtn.classList.add("not-save")
    saveBtn.classList.remove("save")

    // console.log(event.key)
    if (event.key=="Enter"){
        // while getting command
        if (waitForCommand){
            // console.log(command)
            if (command == "note"){
                addNoteBullet(elementInput.parentElement)
            }
            if (command == "rename" && elementInput.parentElement.parentElement.matches(".note-container")){
                renameNoteTitle(elementInput.parentElement)
            }
            if (command.slice(0,4)=="feel"){
                let feel = command.slice(4,command.length)    
                feel = feel.trim()
                if (elementInput.parentElement.parentElement.matches(".note-container")){
                    let noteFeelings = elementInput.parentElement.parentElement.feelings
                    // for first time adding feeling
                    if (noteFeelings===undefined){
                        noteFeelings = []
                    }

                    
                    if (noteFeelings.indexOf(feel)== -1){
                        noteFeelings.push(feel)
                    }else{
                        if (confirm("Do you want to remove <"+feel+"> from note feelings")){
                            noteFeelings.splice(noteFeelings.indexOf(feel),1)
                        }
                    }
                    elementInput.parentElement.parentElement.feelings = noteFeelings

                    renameNoteTitle(elementInput.parentElement,true)

                    clearCommand(elementInput)
                    return
                }
                else{
                    if (todayFeel.indexOf(feel)== -1){
                        todayFeel.push(feel)
                        // console.log(todayFeel)
                        // console.log(localStorage.getItem("todayFeel"))
                    }else{
                        if (confirm("Do you want to remove <"+feel+"> from today feelings list?")){
                            todayFeel.splice(todayFeel.indexOf(feel),1)
                        }
                    }

                    localStorage.setItem("todayFeel",JSON.stringify(todayFeel))
                    drawTodayFeel()
                }
            }
            
            clearCommand(elementInput)
            return
        }

        // add new bullet after this
        addBullet(elementInput.parentElement)
    }
    // get command from typing
    if (waitForCommand){
        if (event.key.length==1){
            command += event.key
        }
        return
    }

    if (event.key=="ArrowDown"){
        // cursor down
        moveCursorOnBullet(elementInput,"down")
    }
    if (event.key=="ArrowUp"){
        // cursor up
        moveCursorOnBullet(elementInput,"up")
    }
    if (event.key=="/"){
        elementInput.saveText = elementInput.value
        waitForCommand = true
    }


}
function bulletOnKeyUp(element,event){
    if (event.key=="Backspace"){

        if (waitForCommand){
            command = command.slice(0,-1)
            if (command.length==0){
                clearCommand(element)
            }
            return
        }

        // if bullet empty => remove this bullet
        if (element.value==""){
            deleteThisBullet(element)
        }
    }

}