

async function getApi() {
const data  = await new Promise((resolve, reject) => {
    fetch('https://golf-courses-api.herokuapp.com/courses/')
        .then((response) => response.json())
        .then((data) => {
            resolve(data)
        });
})

const array = data

return array
}


async function runOnLoad() {
    bruh = await getApi();
    counter = 1
    
          
}
counter = 0
bruh = ''
window.onload = runOnLoad();
