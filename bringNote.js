function getRandomInt(min,max){
    return Math.floor(Math.random()*(max-min)+min)
}

// todayFeel.length
function findMatchNote(num=3){
    let feelingsArrayFromls = []
    if (todayFeel.length==0){
        return []
    }
    for (let i in todayFeel){
        feelingsArrayFromls.push(JSON.parse(localStorage.getItem("feelings"))[todayFeel[i]])
    }
    // console.log(feelingsArrayFromls)

    let result = []
    for (let i=0; i<num;i++){
        let randint1 = getRandomInt(0,feelingsArrayFromls.length)
        if (feelingsArrayFromls[randint1]===undefined){
            i -= 1
            continue
        }
        let randint2 = getRandomInt(0,feelingsArrayFromls[randint1].length)
        result.push(feelingsArrayFromls[randint1][randint2])
    }
    console.log(result)
    return result
}

const bringContainer = document.getElementsByClassName("bring-container")[0]

function drawBringNote(noteArr){
    if (noteArr.length==0){
        return
    }
    let noteBulletData = JSON.parse(localStorage.getItem("noteBulletData"))
    for(let index in noteArr){

        let newElement = document.createElement("div")
        newElement.classList.add("bring-item")
        newElement.innerHTML = `
                <h2>This is Title</h2>
                <ul>
                </ul>
                <div>
                    <a>${noteArr[index].slice(0,10)}</a>
                </div>`

        // console.log(noteBulletData[noteArr[index].slice(0,10)][noteArr[index].slice(11,12)-1])
        // console.log(noteArr[index].slice(11,12)-1)
        // console.log(noteArr[index].slice(0,10))
        let noteData = noteBulletData[noteArr[index].slice(0,10)][noteArr[index].slice(11,12)-1]
        let allFeelings = "["
        for (let k in noteData["feelings"]){
            allFeelings+=`${noteData["feelings"][k]}, `
        }
        allFeelings = allFeelings.slice(0,allFeelings.length-2)
        allFeelings+="]"
        newElement.children[0].innerText = `${noteData['title']} ${allFeelings}`

        for (let j in noteData["innerBullet"]){
            newElement.children[1].innerHTML += `<li>${noteData['innerBullet'][j]}</li>`
        }
        
        bringContainer.appendChild(newElement)
    }
}

function clearBringNote(){
    bringContainer.innerHTML=""
}