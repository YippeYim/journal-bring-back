const date = new Date()
const bulletList = document.getElementById("bullet-list")

let todayDate = {
    date: `${date.getDate()}/${ date.getMonth()+1 }/${ date.getFullYear() }`,
    setDate(newDate){
        this.date = newDate
    },
    getDate(){
        return this.date
    },
}

function savePageValue(){
    console.log(bulletList.children)
    let title = document.getElementById("input-title").value
    const allBulletValue = []
    const allNoteBullet = []

    for (i=0;i<bulletList.childElementCount;i++){
        let bulletFirstChild = bulletList.children[i].firstElementChild
        // console.log(i)

        if (bulletList.children[i].matches(".add-bullet")){
            // console.log("skiped")
            continue
        }

        if (bulletFirstChild.matches(".input-bullet")){
            // console.log("add")
            allBulletValue.push(bulletFirstChild.value)
            continue
        }

        if (bulletFirstChild.matches(".note-container")){
            // console.log("note bullet")

            let noteObject = {}

            noteObject.title = bulletFirstChild.parentElement.noteTitle
            noteObject.feelings = bulletFirstChild.feelings

            let allInnerBullet = []
            for (j=0;j<bulletFirstChild.childElementCount;j++){
                allInnerBullet.push(bulletFirstChild.children[j].firstElementChild.value)
            }

            noteObject.innerBullet = allInnerBullet
            noteObject.originBulletOrder = i-2

            // console.log(noteObject)
            allNoteBullet.push(noteObject)

            allBulletValue.push(Object.keys(allNoteBullet).length)
            continue
        }
        
    }
    

    let todayPageData = {
        title:title,
        date: todayDate.getDate(),
        allBulletValue:allBulletValue
    }
    console.log(todayPageData)
    console.log(allNoteBullet)



    // load old data to add new data
    let oldData = JSON.parse(localStorage.getItem("journalData"))
    let noteBulletData = JSON.parse(localStorage.getItem("noteBulletData"))

    noteBulletData[todayDate.getDate()] = allNoteBullet
    oldData[todayDate.getDate()] = todayPageData
    localStorage.setItem("journalData",JSON.stringify(oldData))
    localStorage.setItem("noteBulletData",JSON.stringify(noteBulletData))
}
let data = JSON.parse(localStorage.getItem("journalData"))
let ndata = JSON.parse(localStorage.getItem("noteBulletData"))
console.log(data[todayDate.getDate()])
console.log(ndata[todayDate.getDate()])

let sveBtn = document.getElementsByClassName("save-btn")[0]

saveBtn.addEventListener("click",()=>{
    savePageValue()
    saveBtn.classList.remove("not-save")
    saveBtn.classList.add("save")
})