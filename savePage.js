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
// todayDate.setDate("25/12/2022")
todayDate.setDate(localStorage.getItem("todayDate"))

function findMissing(mainArr,compairArr){
    let missing = []
    for (let i in mainArr){
        if (compairArr.indexOf(mainArr[i])===-1){
            missing.push(mainArr[i])
        }
    }
    return missing
}

function compairArray(mainArr,compairArr){
    return {
        missing:findMissing(mainArr,compairArr),
        added:findMissing(compairArr,mainArr)
    }
}

function savePageValue(){
    // console.log(bulletList.children)
    let title = document.getElementById("input-title").value
    const allBulletValue = []
    const allNoteBullet = []

    for (let i=0;i<bulletList.childElementCount;i++){
        let bulletFirstChild = bulletList.children[i].firstElementChild
        // console.log(bulletFirstChild)
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
            if (bulletFirstChild.feelings===undefined || bulletFirstChild.feelings.length==0){
                alert("Please set feeling of your note bullet before save. <use /feel <yourFeeling> >")
                return false
            }
            noteObject.feelings = bulletFirstChild.feelings

            let allInnerBullet = []
            for (let j=0;j<bulletFirstChild.childElementCount;j++){
                allInnerBullet.push(bulletFirstChild.children[j].firstElementChild.value)
            }

            noteObject.innerBullet = allInnerBullet
            noteObject.originBulletOrder = i-2

            // console.log(noteObject)
            allNoteBullet.push(noteObject)

            allBulletValue.push(Object.keys(allNoteBullet).length)

            // * check if ever save => compair with previous save => what is missing
            let noteFeelingsBeforeChanged = JSON.parse(localStorage.getItem("noteBulletData"))[todayDate.getDate()][Object.keys(allNoteBullet).length-1]
            if (noteFeelingsBeforeChanged===undefined){
                noteFeelingsBeforeChanged = []    
            }else{
                noteFeelingsBeforeChanged = noteFeelingsBeforeChanged["feelings"]
            }
            let missingThing =compairArray(noteFeelingsBeforeChanged,noteObject.feelings).missing 

            let lsFeelingsList = JSON.parse(localStorage.getItem("feelings"))
            for (let index in missingThing){
                lsFeelingsList[missingThing[index]].splice(lsFeelingsList[missingThing[index]].indexOf( `${todayDate.getDate()}/${Object.keys(allNoteBullet).length}`),1)
            }
            localStorage.setItem("feelings",JSON.stringify(lsFeelingsList))
            

            for(let m=0;m<noteObject.feelings.length;m++){

                // * adding to localStorage[feelings] individual
                let oldFeelingsList = JSON.parse(localStorage.getItem("feelings"))
                let newFeelingsList = oldFeelingsList
                if (newFeelingsList==null){
                    newFeelingsList={}
                }

                // console.log(i)
                // console.log(noteObject.feelings[i])
                if (newFeelingsList[noteObject.feelings[m]]===undefined){
                    newFeelingsList[noteObject.feelings[m]]=[]
                }
                let valueToPush = `${todayDate.getDate()}/${Object.keys(allNoteBullet).length}`

                if (! newFeelingsList[noteObject.feelings[m]].includes(valueToPush)){
                    newFeelingsList[noteObject.feelings[m]].push(valueToPush)
                }
                
                localStorage.setItem("feelings",JSON.stringify(newFeelingsList))
            }

            continue
        }
        
    }
    

    let todayPageData = {
        title:title,
        date: todayDate.getDate(),
        feelings: todayFeel,
        allBulletValue:allBulletValue
    }
    // console.log(todayPageData)
    // console.log(allNoteBullet)

    // load old data to add new data
    let oldData = JSON.parse(localStorage.getItem("journalData"))
    let noteBulletData = JSON.parse(localStorage.getItem("noteBulletData"))

    noteBulletData[todayDate.getDate()] = allNoteBullet
    oldData[todayDate.getDate()] = todayPageData
    localStorage.setItem("journalData",JSON.stringify(oldData))
    localStorage.setItem("noteBulletData",JSON.stringify(noteBulletData))

    return true
}
// let data = JSON.parse(localStorage.getItem("journalData"))
// let ndata = JSON.parse(localStorage.getItem("noteBulletData"))
// console.log(data[todayDate.getDate()])
// console.log(ndata[todayDate.getDate()])

let sveBtn = document.getElementsByClassName("save-btn")[0]

saveBtn.addEventListener("click",()=>{
    if (savePageValue()){
        saveBtn.classList.remove("not-save")
        saveBtn.classList.add("save")
    }

    // drawBringNote()
})

function loadPageValue(){
    let title = document.getElementById("input-title")
    title.value

    const data = JSON.parse(localStorage.getItem("journalData"))
    let todayBulletData = data[todayDate.getDate()]

    if (todayBulletData["feelings"]!==undefined){
        todayFeel = todayBulletData["feelings"]
    }

    const todayNoteData = JSON.parse(localStorage.getItem("noteBulletData"))[todayDate.getDate()]

    document.getElementById("input-title").value = todayBulletData["title"]

    // console.log(todayBulletData)
    for (let i=0;i<todayBulletData["allBulletValue"].length;i++){
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
            for (let j=0;j<todayNoteData[bulletValue-1]["innerBullet"].length;j++){
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

            continue
        }
        let newBullet = document.createElement("li")
        newBullet.innerHTML = "<input type='text' class='input-bullet' onkeydown='bulletOnKeyDown(this,event)' onkeyup='bulletOnKeyUp(this,event)'>"
        newBullet.firstElementChild.value = bulletValue

        ul.insertBefore(newBullet, ul.children[ul.childElementCount-1])

    }

    // remore first bullet
    ul.removeChild(ul.children[2])

    for (let k=0;k<todayNoteData.length;k++){
        renameNoteTitle(ul.children[todayNoteData[k]["originBulletOrder"]+2].firstElementChild.lastElementChild, true)
        ul.children[todayNoteData[k]["originBulletOrder"]+2].firstElementChild.removeChild(ul.children[todayNoteData[k]["originBulletOrder"]+2].firstElementChild.lastElementChild)
        
    }
    
}