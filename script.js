
let once = false
let duo = 0
let id = ''
let golfData = []
let par = []
let hcp = []
let yards = []
let teeType = []
//let teeName = []
let boxName = []
let players = [,,,, ]

function getAvailableCourses() {
    fetch('https://golf-courses-api.herokuapp.com/courses/',
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            resolve(data.courses)
        })
}
getAvailableCourses();



function resolve(courses) {
    let courseOptionsHtml = ''
    courses.forEach((course) => {
        courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`
    });
    

    document.getElementById('course-select').innerHTML = courseOptionsHtml
    
    id = document.getElementById('course-select').value
    console.log(id)
    getGolfCourse()

}



function getId() {
    id = document.getElementById('course-select').value
    console.log(id)
}

const getGolfCourse = () => {
    getId()
    url = "https://golf-courses-api.herokuapp.com/courses/" + id
    fetch(url).then((data) => data.json()).then((data) => data.data.holes).then(golfData => {
    par = []
    hcp = []
    yards = []
    //teeName = []

    teeType=[]
    for (let i = 0; i < 18; i++) {
        let b = golfData[i].teeBoxes
        let num = 0
        if(i==1 && once == false){
            document.getElementById('tee-box').innerHTML = ''
            teeType.push(b)
            teeType = teeType[0]
            let teeBoxHtml = ''
            teeType.forEach((teeType) => {
                teeBoxHtml += `<option value="${num}" teeBox="${teeType.teeTypeId}">${teeType.teeType}</option>`
                //teeName.push(teeType.teeTypeId)
                num++
            });
            document.getElementById('tee-box').innerHTML = teeBoxHtml
            once = true
            
            
        }
        let c = document.getElementById('tee-box').value
        while(c>=golfData[i].teeBoxes.length){
            c--
        }
        let a = golfData[i].teeBoxes[c]
        //teeName.push(a.teeType)

        boxName = a.teeType
        // teeBoxes[1] is the champion one
        // teeBoxes[0] is the pro one
        par.push(a.par)
        hcp.push(a.hcp)
        yards.push(a.yards)
    }
    Table()
    })

}


document.getElementById('course-select').addEventListener('change', function () {
    once = false
    getGolfCourse()

})

document.getElementById('tee-box').addEventListener('change', function () {
    once = true
    getGolfCourse()

})



//Flow

function Table(){
    let f = document.getElementById('content')
    f.classList = ''
    if (boxName == "auto change location"){
        boxName = "auto"
    }
    f.classList.toggle(boxName)
    document.getElementById('holes').innerHTML = `<th scope="row">Holes</th>`
    document.getElementById('yards').innerHTML = `<th scope="row">Yards</th>`
    document.getElementById('par').innerHTML = `<th scope="row">Par</th>`
    document.getElementById('hcp').innerHTML = `<th scope="row">Handicap</th>`

    //Holes
for (let i = 1; i <= 18; i++) {
    document.getElementById('holes').innerHTML += `<td>${i}</td>`
}
document.getElementById('holes').innerHTML += `<th scope="row">Out</th>`

    //Yards
for (let i = 0; i < 18; i++) {
    document.getElementById('yards').innerHTML += `<td>${yards[i]}</td>`
}
document.getElementById('yards').innerHTML += `<th scope="row">${addArray(yards)}</th>`

    //Par
for (let i = 0; i < 18; i++) {
    document.getElementById('par').innerHTML += `<td>${par[i]}</td>`
}
document.getElementById('par').innerHTML += `<th scope="row">${addArray(par)}</th>`

    //Handicap
for (let i = 0; i < 18; i++) {
    document.getElementById('hcp').innerHTML += `<td>${hcp[i]}</td>`
}
document.getElementById('hcp').innerHTML += `<th scope="row">${addArray(hcp)}</th>`
}








function addArray(array){
    const sum = array.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
    return sum
}