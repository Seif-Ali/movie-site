/// <reference types="../@types/jquery" />
let arr = []
rowData = document.getElementById('rowData')

//////////////////////////////////
let input = document.getElementById('input')
function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 6; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 6) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})





function getStars(rating) {
    const fullStars = Math.floor(rating / 2); // Number of full stars
    const halfStar = rating % 2 >= 1; // Whether there's a half star
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fa-solid fa-star"></i>'; // Full star
    }
    if (halfStar) {
        stars += '<i class="fa-solid fa-star-half-stroke"></i>'; // Half star
    }
    for (let i = fullStars + halfStar; i < 5; i++) {
        stars += '<i class="fa-regular fa-star"></i>'; // Empty star
    }
    return stars;
}

async function getData() {
    try {

        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=38cac00ec17141c892cd146aa3f582a3');
    const data = await response.json();
    const arr = data.results;
    displayData(arr);
    document.getElementById('loading').remove('d-none')
    $('body').removeClass('overflow-hidden')


    console.log(arr);
    } catch (error) {
      console.log('error')  
    }finally{

    }
    
}

function displayData(arr) { 
    let cartona = ``;
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-md-4 con3 position-relative my-3 px-3">
                        <img src="${imageBaseUrl + arr[i].poster_path}" class="img-fluid image" alt="${arr[i].title}">
                        <div class="movie-layer position-absolute d-flex justify-content-center align-items-center flex-column">
                            <h2 class="py-5">${arr[i].original_title}</h2>  

                            <p>${arr[i].overview}</p>
                            <div class="text-warning">${getStars(arr[i].vote_average)}</div>
                            <div>
                                <h1>${arr[i].vote_average}</h1>
                            </div>
                        </div>
                    </div>`;
    }
    document.getElementById("rowData").innerHTML = cartona;
}

getData();


async function getPopular() {
    try {
        rowData.innerHTML=""
        const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=38cac00ec17141c892cd146aa3f582a3');
    const data = await response.json();
    const arr = data.results;
    displayData(arr);
    console.log(arr);
    document.getElementById('loading').remove('d-none')
    $('body').removeClass('overflow-hidden')

    } catch (error) {
        console.log('error')
    }finally{
    }
    
}



async function getTopRated() {
    try {
        rowData.innerHTML=""

        const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=38cac00ec17141c892cd146aa3f582a3');
    const data = await response.json();
    const arr = data.results;
    displayData(arr);
    console.log(arr);
    document.getElementById('loading').remove('d-none')
    $('body').removeClass('overflow-hidden')

    } catch (error) {
        console.log('error')
        
    }finally{

    }
    
}


async function getTrending() {
    try {
        rowData.innerHTML=""

         const response = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    const data = await response.json();
    const arr = data.results;
    displayData(arr);
    console.log(arr);
    document.getElementById('loading').add('d-none')
    document.getElementById('loading').add('d-none')

    } catch (error) {
        console.log('error')
        
    }finally{


    }
   
}




async function getUpcoming() {
    

    try {
        rowData.innerHTML=""

        const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44');
    const data = await response.json();
    const arr = data.results;
    displayData(arr);
    console.log(arr);
    document.getElementById('loading').add('d-none')
    document.getElementById('loading').add('d-none')
    } catch (error) {
        console.log('error')
        
    }finally{

    }
    
}





input.addEventListener('input',async function(){
    let search = input.value
    getSearch(search)
})
async function getSearch(term) {
    rowData.innerHTML=""

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44&query=${term}`);
    const data = await response.json();
    const arr = data.results;
    displaySearch(arr);
    console.log(arr);
}

function displaySearch(arr) { 
    let cartona = ``;
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
    
    for (let i = 0; i < arr.length; i++) {
        cartona += `<div class="col-md-4 con3 position-relative my-3 px-3">
                        <img src="${imageBaseUrl + arr[i].poster_path}" class="img-fluid image" alt="${arr[i].title}">
                        <div class="movie-layer position-absolute d-flex justify-content-center align-items-center flex-column">
                          
                            <p>${arr[i].overview}</p>
                            <div>${getStars(arr[i].vote_average)}</div>
                            <div>
                                <h1>${arr[i].vote_average}</h1>
                                
                            </div>
                        </div>
                    </div>`;
    }
    document.getElementById("rowData").innerHTML = cartona;
}
document.addEventListener('DOMContentLoaded', () => {
    let name = document.getElementById('name');
    let phone = document.getElementById('phone');
    let email = document.getElementById('email');
    let age = document.getElementById('age');
    let password = document.getElementById('password');
    let repassword = document.getElementById('repassword');
    let msgName = document.getElementById('msgName');
    let msgPhone = document.getElementById('msgPhone');
    let msgEmail = document.getElementById('msgEmail');
    let msgAge = document.getElementById('msgAge');
    let msgPassword = document.getElementById('msgPassword');
    let msgRepassword = document.getElementById('msgRepassword');

    function checkValidation(regex, msg, element) {
        if (regex.test(element.value)) {
            msg.classList.add('d-none');
            return true;
        } else {
            msg.classList.remove('d-none');
            return false;
        }
    }

    function checkIfAllAreTrue() {
        return (
            checkValidation(/^[A-Za-z]+(?: [A-Za-z]+)*$/, msgName, name) &&
            checkValidation(/^(?:1[01][0-9]|120|[1-9]?[0-9])$/, msgAge, age) &&
            checkValidation(/^\+?(\d{1,3})?[-.\s]?(\(?\d{1,4}\)?)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/, msgPhone, phone) &&
            checkValidation(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, msgPassword, password) &&
            checkValidation(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, msgRepassword, repassword) &&
            checkValidation(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/, msgEmail, email)
        );
    }

    let form = document.getElementById('form');
    form.addEventListener('input', function (e) {
        e.preventDefault();
        checkIfAllAreTrue();
    });

    form.addEventListener('submit', function (e) {
        if (!checkIfAllAreTrue()) {
            e.preventDefault();
            alert('Please correct the errors in the form');
        }
    });
});
