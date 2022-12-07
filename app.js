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

    // move cursor to other bullet
    let direction = "up"
    if (bulletLi.previousElementSibling.matches(".add-bullet")){
        direction = "down"
    }
    moveCursorOnBullet(bulletInput,direction)

    // remove this bullet
    bulletLi.parentElement.removeChild(bulletLi)
}
function moveCursorOnBullet(bulletInput, dest){
    if(dest=="down" && !bulletInput.parentElement.nextElementSibling.matches(".add-bullet")){
        bulletInput.parentElement.nextElementSibling.firstChild.focus()
    }
    if(dest=="up" && !bulletInput.parentElement.previousElementSibling.matches(".add-bullet")){
        bulletInput.parentElement.previousElementSibling.firstChild.focus()
    }

}

function bulletOnKeyDown(element,event){
    // console.log(event.key)
    if (event.key=="Enter"){
        // add new bullet after this
        addBullet(element.parentElement)
    }
    if (event.key=="ArrowDown"){
        // cursor down
        moveCursorOnBullet(element,"down")
    }
    if (event.key=="ArrowUp"){
        // cursor up
        moveCursorOnBullet(element,"up")
    }
}
function bulletOnKeyUp(element,event){
    if (event.key=="Backspace"){
        // if bullet empty => remove this bullet
        if (element.value==""){
            deleteThisBullet(element)
        }
    }

}