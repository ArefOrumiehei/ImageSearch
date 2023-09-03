const key = "RcIIZ7x1ZjhWp-l5_7A5t30nwcIQq8lEF2YHd_RgXAc"

const form = document.querySelector("form")
const input = document.querySelector("#search-input")
const searchResults = document.querySelector(".search-results")
const searchBtn = document.querySelector("#search-btn")
const showMoreBtn = document.querySelector("#show-more-btn")


let inputData = ''
let page = 1


eventListeners()
function eventListeners (){
    form.addEventListener("submit" , showResult)
    showMoreBtn.addEventListener("click" , () => {
        searchImage()
    })
}

function showResult (e){
    e.preventDefault()
    page = 1
    searchImage()
}


async function searchImage (){
    inputData = input.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${key}`


    let response = await fetch(url)
    let data = await response.json()

    let results = data.results

    if (page === 1){
        searchResults.innerHTML = ""
    }

    results.map((result) => {
        const imageCard = document.createElement("div");
        imageCard.classList.add("search-result");
    
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;
    
        imageCard.appendChild(image);
        imageCard.appendChild(imageLink);
    
        // Attach the imageCard element to the desired parent element
        searchResults.appendChild(imageCard);
    });
    

    page++

    if(page > 1){
        showMoreBtn.style.display = "block"
    }
}

