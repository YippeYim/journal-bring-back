const addBtnElements = document.getElementsByClassName("add-bullet")

for(let i=0;i<addBtnElements.length;i++){
    addBtnElements[i].addEventListener('click',()=>{
        addBullet(addBtnElements[i])
    })
}

const ul = document.getElementById("bullet-list")

function addBullet(element){
    const newBullet = document.createElement("li")
    newBullet.innerHTML = "<input type='text' class='input-bullet' onkeydown='bulletOnKeyDown(this,event)' onkeyup='bulletOnKeyUp(this,event)'>"

    if (element.classList.contains("above")){
        // add bullet above
        ul.insertBefore(newBullet, ul.children[2])
        ul.children[2].firstChild.focus()
    }else if (element.classList.contains("bottom")){
        // add bullet above
        ul.insertBefore(newBullet, ul.children[ul.childElementCount-1])
        ul.children[ul.childElementCount-2].firstChild.focus()
    }else if (element.firstChild.classList.contains("input-bullet")){
        // if use function from other => append bullet after self
        element.parentElement.insertBefore(newBullet, element.nextSibling)
        element.nextSibling.firstChild.focus()
    }
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
    if(dest=="down" ){
        // skip if is last child
        if (!(bulletInput.parentElement==bulletInput.parentElement.parentElement.lastElementChild)){
            bulletInput.parentElement.nextElementSibling.firstChild.focus()
        }else{
            // if is last go on normal bullet
            moveCursorOnBullet(bulletInput.parentElement.parentElement,"down")
        }
    }
    if(dest=="up"){
        // skip if is first child
        if (!(bulletInput.parentElement==bulletInput.parentElement.parentElement.firstElementChild)){
            bulletInput.parentElement.previousElementSibling.firstChild.focus()
        }else{
            // if is last go on normal bullet
            moveCursorOnBullet(bulletInput.parentElement.parentElement,"up")
        }
    }
}

function moveCursorOnBullet(bulletInput, dest){
    // spacific case (note bullet)
    if (bulletInput.parentElement.parentElement.classList.contains("note-container")){
        moveCursorOnNoteBullet(bulletInput, dest)
        return
    }

    if(dest=="down" && !bulletInput.parentElement.nextElementSibling.matches(".add-bullet")){
        // if below bullet is note-container
        if (bulletInput.parentElement.nextElementSibling.firstElementChild.matches(".note-container")){
            bulletInput.parentElement.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.focus()
            return
        }

        bulletInput.parentElement.nextElementSibling.firstChild.focus()
    }
    if(dest=="up" && !bulletInput.parentElement.previousElementSibling.matches(".add-bullet")){
        // if bullet on top is note-container
        if (bulletInput.parentElement.previousElementSibling.firstElementChild.matches(".note-container")){
            bulletInput.parentElement.previousElementSibling.firstElementChild.lastElementChild.firstElementChild.focus()
            return
        }

        bulletInput.parentElement.previousElementSibling.firstChild.focus()
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