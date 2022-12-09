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
        ul.children[2].firstChild.focus()
    }else if (elementLi.classList.contains("bottom")){
        // add bullet above
        ul.insertBefore(newBullet, ul.children[ul.childElementCount-1])
        ul.children[ul.childElementCount-2].firstChild.focus()
    }else if (elementLi.firstChild.classList.contains("input-bullet")){
        // if use function from other => append bullet after self
        elementLi.parentElement.insertBefore(newBullet, elementLi.nextSibling)
        elementLi.nextSibling.firstChild.focus()
    }
}
function addNoteBullet(elementLi){
    const newBullet = document.createElement("li")
    newBullet.innerHTML = "<ul class='note-container'><li><input type='text' class='input-bullet' onkeydown='bulletOnKeyDown(this,event)' onkeyup='bulletOnKeyUp(this,event)'></li></ul>"
    
    elementLi.parentElement.insertBefore(newBullet, elementLi.nextSibling)
    moveCursorOnBullet(elementLi.firstElementChild,"down")

    deleteThisBullet(elementLi.firstElementChild)
    
}
function deleteThisBullet(bulletInput){
    let bulletLi = bulletInput.parentElement

    // if have only 1 bullet left => return
    if (bulletLi.parentElement.childElementCount==4) return
        // spacific case (note bullet)
    if (bulletLi.parentElement.childElementCount==1) return

    // move cursor to other bullet
    let direction = "up"
    if (bulletLi.previousElementSibling.matches(".add-bullet")){
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
            bulletLi.nextElementSibling.firstChild.focus()
        }else{
            // if is last go on normal bullet
            moveCursorOnBullet(bulletLi.parentElement,"down")
        }
    }

    if(dest=="up"){
        // skip if is first child
        if (!(bulletLi==bulletLi.parentElement.firstElementChild)){
            bulletLi.previousElementSibling.firstChild.focus()
        }else{
            // if is last go on normal bullet
            moveCursorOnBullet(bulletLi.parentElement,"up")
        }
    }
}

function moveCursorOnBullet(bulletInput, dest){
    let bulletLi = bulletInput.parentElement

    // spacific case (note bullet)
    if (bulletLi.parentElement.classList.contains("note-container")){
        moveCursorOnNoteBullet(bulletInput, dest)
        return
    }

    if(dest=="down" && !bulletLi.nextElementSibling.matches(".add-bullet")){
        // if below bullet is note-container
        if (bulletLi.nextElementSibling.firstElementChild.matches(".note-container")){
            bulletLi.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.focus()
            return
        }

        bulletLi.nextElementSibling.firstChild.focus()
    }
    if(dest=="up" && !bulletLi.previousElementSibling.matches(".add-bullet")){
        // if bullet on top is note-container
        if (bulletLi.previousElementSibling.firstElementChild.matches(".note-container")){
            bulletLi.previousElementSibling.firstElementChild.lastElementChild.firstElementChild.focus()
            return
        }

        bulletLi.previousElementSibling.firstChild.focus()
    }

}

var waitForCommand = false
var command = ""

function clearCommand(bulletInput){
    bulletInput.value = bulletInput.saveText
    waitForCommand = false
    command =""
}

function bulletOnKeyDown(element,event){
    // console.log(event.key)
    if (event.key=="Enter"){
        // while getting command
        if (waitForCommand){
            // console.log(command)
            if (command = "note"){
                addNoteBullet(element.parentElement)
            }
            clearCommand(element)
            return
        }

        // add new bullet after this
        addBullet(element.parentElement)
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
        moveCursorOnBullet(element,"down")
    }
    if (event.key=="ArrowUp"){
        // cursor up
        moveCursorOnBullet(element,"up")
    }
    if (event.key=="/"){
        element.saveText = element.value
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