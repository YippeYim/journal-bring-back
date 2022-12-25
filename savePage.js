const date = new Date()
const bulletList = document.getElementById("bullet-list")

function loadBulletValue(){
    console.log(bulletList.children)
    let title = document.getElementById("input-title").value
    const allBulletValue = []
    const allNoteBullet = []

    for (i=0;i<bulletList.childElementCount;i++){
        let bulletFirstChild = bulletList.children[i].firstElementChild
        console.log(i)

        if (bulletList.children[i].matches(".add-bullet")){
            console.log("skiped")
            continue
        }

        if (bulletFirstChild.matches(".input-bullet")){
            console.log("add")
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
    // console.log(title)
    // console.log(allBulletValue)
    let todayPageData = {
        title:title,
        date:`${date.getDate()}/${ date.getMonth()+1 }/${ date.getFullYear() }`,
        allBulletValue:allBulletValue
    }
    console.log(todayPageData)
    console.log(allNoteBullet)


    let todayDate = `${date.getDate()}/${ date.getMonth()+1 }/${ date.getFullYear() }`
    let tosave = {}
    // * not have to load just set new one instand

    let noteBulletData = {}
    // todo: load noteBulletData form localStorage

    noteBulletData[todayDate] = allNoteBullet
    tosave[todayDate] = todayPageData
    localStorage.setItem("journalData",JSON.stringify(tosave))
    localStorage.setItem("noteBulletData",JSON.stringify(noteBulletData))
}
let data = JSON.parse(localStorage.getItem("journalData"))
let ndata = JSON.parse(localStorage.getItem("noteBulletData"))
console.log(data)
console.log(ndata)
