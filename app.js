const addBtnElements = document.getElementsByClassName("add-bullet")

for(let i=0;i<addBtnElements.length;i++){
    addBtnElements[i].addEventListener('click',()=>{
        addBullet(addBtnElements[i])
    })
}

const ul = document.getElementById("bullet-list")

function addBullet(element){
    const newBullet = document.createElement("li")
    if (element.classList.contains("above")){
        // add bullet above
        newBullet.innerHTML = "<input type='text' class='input-bullet'>"
        ul.insertBefore(newBullet, ul.children[2])
        ul.children[2].firstChild.focus()
    }
    if (element.classList.contains("bottom")){
        // add bullet above
        newBullet.innerHTML = "<input type='text' class='input-bullet'>"
        ul.insertBefore(newBullet, ul.children[ul.childElementCount-1])
        ul.children[ul.childElementCount-2].firstChild.focus()
    }
}