
let id = ''
let golfData = []
let par = []
let hcp = []
let yards = []

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
    for (let i = 0; i < 18; i++) {
        let a = golfData[i].teeBoxes[1]
        // teeBoxes[1] is the champion one
        par.push(a.par)
        hcp.push(a.hcp)
        yards.push(a.yards)
    }
    })

}


document.getElementById('course-select').addEventListener('click', function () {
    getGolfCourse()
})
