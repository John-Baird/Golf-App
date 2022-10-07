
let id = ''
let golfData = []
let par = []
let hcp = []
let yards = []

    function getAvailableCourses() {
        fetch('https://golf-courses-api.herokuapp.com/courses/' ,
        {method: 'GET' ,
            headers: { 'Content-Type': 'application/json'},
        })
            .then(res => {
            return res.json()
        })
            .then(data =>  {
               resolve(data.courses)
            })
        }
        getAvailableCourses();



function resolve (courses) {
let courseOptionsHtml = ''
courses.forEach((course) => {
 courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`
});

document.getElementById('course-select').innerHTML = courseOptionsHtml
id = document.getElementById('course-select').value
console.log(id)
getGolfCourse()
}



function getId(){
    id = document.getElementById('course-select').value
    console.log(id)
}

const getGolfCourse = () => {
    getId()
    url = "https://golf-courses-api.herokuapp.com/courses/"+id
    fetch(url).then((data) => data.json()).then((data) => golfData = data.data.holes)
    for (let i = 0; i < golfData.length; i++){
        let a = golfData[i].teeBoxes[1]
        // teebox[1] is the champion one
        par.push(a.par)
        hcp.push(a.hcp)
        yards.push(a.yards)
    }
}

