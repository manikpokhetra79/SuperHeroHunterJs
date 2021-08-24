let searchInput = document.querySelector('#search-input');
let srHeading = document.querySelector('#sr-heading');
let searchResults = document.querySelector('.search-results');
//variables for fav button
let ifFav = 'fas';
let ifNotFav = 'far';
// accessToken for Api
let accessToken = '2420549754755473';
//api url
let url =  `https://www.superheroapi.com/api.php/${accessToken}/search/`;

//Event listener on Input element for every letter typed
searchInput.addEventListener('keyup',(e)=>{

    let searchText = e.target.value;
  
    if(searchText.length < 2){
        srHeading.textContent = 'Enter Atleast 2 letters';
        searchResults.innerHTML = '';
    }else{
        srHeading.textContent = `Search Results for : ${searchText}` ;
        fetchData(searchText);
    }

});
//fetch data from Api
let fetchData = async (searchText) => {
    
    await fetch(url+searchText)
    .then(res => res.json())
    .then(data => renderData(data))
    .catch(error =>  searchResults.innerHTML = '<h3 class="mt-4 text-info">Superhero with given name not found !!!</h3>')
}
// initialize empty array for local storage

function initializeLocalstorage(){
    let localArray = [];
    if(localStorage.getItem('superheroes') == null){
        //create a new localStorage
        localStorage.setItem('superheroes',JSON.stringify(localArray));
    }
}

//Render Api data on browser
let renderData = (data)=> {
    let localArray = JSON.parse(localStorage.getItem('superheroes'));
    if(data.length == 0){
        console.log('Results not found');
    }else{
        searchResults.innerHTML = '';
        for(let hero of data.results){
          let newDiv = document.createElement('div');
          newDiv.className = 'results col-lg-3 col-md-4 col-sm-6';
          newDiv.id = hero.id;
        //   check id in local storage
        let isFav ;
        if(localArray.indexOf( hero.id) != -1){
            isFav = true;
        }else{
            isFav = false;
        }
          newDiv.innerHTML =
          `
          <div class="hero-search">
          <div class="hero-pic">
          <img src="${hero.image.url}">
          </div>
          <div class="hero-details" id=${hero.id}>
          <h4 class="get-details wdiv text-center mt-3" >${hero.name}</h4>
          </div>
          <div class="text-center wdiv mt-3 mb-4">
          <i class="${isFav ? 'fas' : 'far'} fa-heart fa-2x fav-btn mb-3"></i>
          </div>
          </div>
          `;
          searchResults.appendChild(newDiv);
      }  
    }  
}

//Event listener on the SuperHero name and fav button
searchResults.addEventListener('click',(e)=>{
console.log(e.target.parentNode.id);
    if(e.target.classList.contains('get-details')){
        let heroId= e.target.parentNode.id;
        window.open(`superhero.html?id=${heroId}`);
    }else if(e.target.classList.contains('fav-btn')){
        let heroId =  e.target.parentNode.previousElementSibling.id;
        let localArray = JSON.parse(localStorage.getItem('superheroes'));

        // if id already exists in localStorage
        if(localArray.indexOf(heroId) != -1){
            //remove the id
            localArray = localArray.filter((item) => item != heroId);
            localStorage.setItem('superheroes',JSON.stringify(localArray));
            e.target.classList.remove('fas');
            e.target.classList.add('far');
            alert('Removed from favourites...');
        }else{
            localArray.push(heroId);
            localStorage.setItem('superheroes',JSON.stringify(localArray));
            e.target.classList.remove('far');
            e.target.classList.add('fas');
            alert('Added to favourites...');
        }
    }
})


//
document.addEventListener('DOMContentLoaded',initializeLocalstorage);