let player1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
let player2 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
let player3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
let player4 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

let r = 1
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
    document.getElementById('player1').innerHTML = ` <th scope="row">Player 1</th>`
    document.getElementById('player2').innerHTML = ` <th scope="row">Player 2</th>`
    document.getElementById('player3').innerHTML = ` <th scope="row">Player 3</th>`
    document.getElementById('player4').innerHTML = ` <th scope="row">Player 4</th>`

    //Holes
for (let i = 1; i <= 18; i++) {
    document.getElementById('holes').innerHTML += `<td>${i}</td>`
    if(i==9){
        document.getElementById('holes').innerHTML += `<th></th>`
    }
}
document.getElementById('holes').innerHTML += `<th scope="row">Total</th>`

    //Yards
for (let i = 0; i < 18; i++) {
    document.getElementById('yards').innerHTML += `<td>${yards[i]}</td>`
    if(i==8){
        document.getElementById('yards').innerHTML += `<th></th>`
    }
}
document.getElementById('yards').innerHTML += `<th scope="row">${addArray(yards)}</th>`

    //Par
for (let i = 0; i < 18; i++) {
    document.getElementById('par').innerHTML += `<td>${par[i]}</td>`
    if(i==8){
        document.getElementById('par').innerHTML += `<th></th>`
    }
}
document.getElementById('par').innerHTML += `<th scope="row">${addArray(par)}</th>`

    //Handicap
for (let i = 0; i < 18; i++) {
    document.getElementById('hcp').innerHTML += `<td>${hcp[i]}</td>`
    if(i==8){
        document.getElementById('hcp').innerHTML += `<th ></th>`
    }
}
document.getElementById('hcp').innerHTML += `<th scope="row">${addArray(hcp)}</th>`






    //Players
for (let i = 1; i <= 18; i++) {
    document.getElementById('player1').innerHTML += `<td class='change' value="${i}">${player1[(i-1)]}</td>`
    if(i==9){
        document.getElementById('player1').innerHTML += `<th id='array11'></th>`
    }
}
document.getElementById('player1').innerHTML += `<th id='array1' scope="row">${addArray(player1)}</th>`

for (let i = 1; i <= 18; i++) {
    document.getElementById('player2').innerHTML += `<td class='change' value="${i}">${player2[(i-1)]}</td>`
    if(i==9){
        document.getElementById('player2').innerHTML += `<th id='array22'></th>`
    }
}
document.getElementById('player2').innerHTML += `<th id='array2' scope="row">${addArray(player2)}</th>`

for (let i = 1; i <= 18; i++) {
    document.getElementById('player3').innerHTML += `<td class='change' value="${i}">${player3[(i-1)]}</td>`
    if(i==9){
        document.getElementById('player3').innerHTML += `<th id='array33'></th>`
    }
}
document.getElementById('player3').innerHTML += `<th id='array3' scope="row">${addArray(player3)}</th>`

for (let i = 1; i <= 18; i++) {
    document.getElementById('player4').innerHTML += `<td class='change' value="${i}">${player4[(i-1)]}</td>`
    if(i==9){
        document.getElementById('player4').innerHTML += `<th id='array44'></th>`
    }
}
document.getElementById('player4').innerHTML += `<th id='array4' scope="row">${addArray(player4 )}</th>`

document.querySelectorAll('td.change').forEach((td) => {
    td.onclick = (e) => {
      console.log(e.target.innerText);
      
      if(parseInt(e.target.innerText)+1*r < 0){

      }
      else{
        e.target.innerText = parseInt(e.target.innerText)+1*r
        setArray()
      }
    };
  });
}

function setArray(){

    for (let i = 0; i < 19; i++) {
        if(i==9){
            i=10
        }
        player1[i] = parseInt(document.getElementById('player1').children[(i+1)].innerText)
        player2[i] = parseInt(document.getElementById('player2').children[(i+1)].innerText)
        player3[i] = parseInt(document.getElementById('player3').children[(i+1)].innerText)
        player4[i] = parseInt(document.getElementById('player4').children[(i+1)].innerText)
    }
    document.getElementById('array1').innerText = addArray(player1)
    document.getElementById('array2').innerText = addArray(player2)
    document.getElementById('array3').innerText = addArray(player3)
    document.getElementById('array4').innerText = addArray(player4)
    let a1 = []
    let b2 = []
    let c3 = []
    let d4 = []
    
    for (let i = 0; i < 9; i++){
        a1.push(player1[i])
        b2.push(player2[i])
        c3.push(player3[i])
        d4.push(player4[i])
    }
    document.getElementById('array11').innerText = addArray(a1)
    document.getElementById('array22').innerText = addArray(b2)
    document.getElementById('array33').innerText = addArray(c3)
    document.getElementById('array44').innerText = addArray(d4)


}

document.getElementById('sign').addEventListener('click', function () {
    let wait = 0
    if (this.innerText == "+"){
        this.innerText = "-"
        wait = 1
        r = -1
    }
    if (this.innerText == "-" && wait==0){
        this.innerText = "+"
        r = 1
    }

})

function addArray(array){
    const sum = array.reduce((accumulator, value) => {
        return accumulator + value;
      }, 0);
    return sum
}