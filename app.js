const addBtnElements = document.getElementsByClassName("add-bullet")

for(let i=0;i<addBtnElements.length;i++){
    addBtnElements[i].addEventListener('click',()=>{
        // tell dest by element's classname
        addBullet(addBtnElements[i].classList[1])
    })
}

function addBullet(dest){
    console.log(dest)
}