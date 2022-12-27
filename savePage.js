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
todayDate.setDate("24/12/2022")

function savePageValue(){
    // console.log(bulletList.children)
    let title = document.getElementById("input-title").value
    const allBulletValue = []
    const allNoteBullet = []

    for (i=0;i<bulletList.childElementCount;i++){
        let bulletFirstChild = bulletList.children[i].firstElementChild
        console.log(bulletFirstChild)
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
            // todo if not have feelings => you can't save

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

    // TODO: add notebullet to localstorage[feelings]

    // load old data to add new data
    let oldData = JSON.parse(localStorage.getItem("journalData"))
    let noteBulletData = JSON.parse(localStorage.getItem("noteBulletData"))

    noteBulletData[todayDate.getDate()] = allNoteBullet
    oldData[todayDate.getDate()] = todayPageData
    localStorage.setItem("journalData",JSON.stringify(oldData))
    localStorage.setItem("noteBulletData",JSON.stringify(noteBulletData))
}
// let data = JSON.parse(localStorage.getItem("journalData"))
// let ndata = JSON.parse(localStorage.getItem("noteBulletData"))
// console.log(data[todayDate.getDate()])
// console.log(ndata[todayDate.getDate()])

let sveBtn = document.getElementsByClassName("save-btn")[0]

saveBtn.addEventListener("click",()=>{
    savePageValue()
    saveBtn.classList.remove("not-save")
    saveBtn.classList.add("save")
})

function loadPageValue(){
    let title = document.getElementById("input-title")
    title.value

    const data = JSON.parse(localStorage.getItem("journalData"))
    let todayBulletData = data[todayDate.getDate()]

    const todayNoteData = JSON.parse(localStorage.getItem("noteBulletData"))[todayDate.getDate()]

    document.getElementById("input-title").value = todayBulletData["title"]

    console.log(todayBulletData)
    for (i=0;i<todayBulletData["allBulletValue"].length;i++){
        // console.log(todayBulletData["allBulletValue"][i])
        let bulletValue = todayBulletData["allBulletValue"][i] 
        if (typeof(bulletValue)==="number"){
            // create note bullet
            let newBullet = document.createElement("li")
            // !! must fix bulletValue (save start at 0)
            let title = todayNoteData[bulletValue-1]["title"]
            // console.log(title)

            newBullet.innerHTML = title + "<ul class='note-container'></ul>"
            newBullet.noteTitle = title

            if (todayNoteData[bulletValue-1]["feelings"]!=undefined){
                newBullet.firstElementChild.feelings = todayNoteData[bulletValue-1]["feelings"]
            }

            // console.log(todayNoteData[bulletValue-1]["innerBullet"])
            for (j=0;j<todayNoteData[bulletValue-1]["innerBullet"].length;j++){
                let childBullet = document.createElement("li")
                childBullet.innerHTML = "<input type='text' class='input-bullet' onkeydown='bulletOnKeyDown(this,event)' onkeyup='bulletOnKeyUp(this,event)'>"
                childBullet.firstElementChild.value = todayNoteData[bulletValue-1]["innerBullet"][j]
                newBullet.firstElementChild.appendChild(childBullet)
            }            

            // * create free lastchild to rename title
            let childBullet = document.createElement("li")
            childBullet.innerHTML = "<input type='text' class='input-bullet' onkeydown='bulletOnKeyDown(this,event)' onkeyup='bulletOnKeyUp(this,event)'>"
            newBullet.firstElementChild.appendChild(childBullet)


            // console.log(newBullet)
            ul.insertBefore(newBullet, ul.children[ul.childElementCount-1])
            console.log(123)

            continue
        }
        let newBullet = document.createElement("li")
        newBullet.innerHTML = "<input type='text' class='input-bullet' onkeydown='bulletOnKeyDown(this,event)' onkeyup='bulletOnKeyUp(this,event)'>"
        newBullet.firstElementChild.value = bulletValue

        ul.insertBefore(newBullet, ul.children[ul.childElementCount-1])

    }

    // remore first bullet
    ul.removeChild(ul.children[2])

    for (k=0;k<todayNoteData.length;k++){
        renameNoteTitle(ul.children[todayNoteData[k]["originBulletOrder"]+2].firstElementChild.lastElementChild, true)
        ul.children[todayNoteData[k]["originBulletOrder"]+2].firstElementChild.removeChild(ul.children[todayNoteData[k]["originBulletOrder"]+2].firstElementChild.lastElementChild)
        
    }
    
}