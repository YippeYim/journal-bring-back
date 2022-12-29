function findMatchArrayItem(mainArr, compairArr){
    let matchItem = []
    for (let i in compairArr){
        if (mainArr.indexOf(compairArr[i])!==-1){
            matchItem.push(compairArr[i])
        }
    }
    return matchItem
}

// todayFeel.length
function drawBringNote(){
    let feelingsArrayFromls = []
    for (let i in todayFeel){
        feelingsArrayFromls.push(JSON.parse(localStorage.getItem("feelings"))[todayFeel[i]])
    }
    console.log(feelingsArrayFromls)
}
