let searchInput = document.querySelector('#search-input');
let srHeading = document.querySelector('#sr-heading');
let accessToken = '2420549754755473';
let url =  `https://www.superheroapi.com/api.php/${accessToken}/search/`;
console.log(url);
searchInput.addEventListener('keyup',(e)=>{

    let searchText = e.target.value;
  
    if(searchText.length < 2){
        srHeading.textContent = 'Enter Atleast 2 letters';
    }else{
        srHeading.textContent = `Search Results for : ${searchText}` ;
        fetchData(searchText);
    }

})
let fetchData = async (searchText) => {
    
    await fetch(url+searchText)
    .then(res => res.json())
    .then(data => renderData(data))
    .catch(error => console.log(error))
}

let renderData = (data)=> {
    var searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = '';
  for(let hero of data.results){
       let newDiv = document.createElement('div');
       newDiv.className = 'results';
       newDiv.id = hero.id;
       newDiv.innerHTML =
       `
       <div class="hero-search">
       <div class="hero-pic">
       <img src="${hero.image.url}">
       </div>
       <div class="hero-details">
       <h4 class="get-hero">${hero.name}</h4>
       </div>
       </div>
       `;
       searchResults.appendChild(newDiv);
   }  
}