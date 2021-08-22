let searchInput = document.querySelector('#search-input');
let srHeading = document.querySelector('#sr-heading');
let searchResults = document.querySelector('.search-results');
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
    .catch(error =>  searchResults.innerHTML = '<h3>Superhero with given name not found !!!</h3>')
}

//Render Api data on browser
let renderData = (data)=> {
    if(data.length == 0){
        console.log('Results not found');
    }else{
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
          <h3 class="get-details" id=${hero.id}>${hero.name}</h3>
          </div>
          </div>
          `;
          searchResults.appendChild(newDiv);
      }  
    }  
}

//Event listener on the SuperHero name
searchResults.addEventListener('click',(e)=>{
    console.log(e.target);
    let heroId= e.target.id;
    console.log(heroId);
    if(e.target.className == 'get-details'){
        window.open(`pages/superhero.html?id=${heroId}`);
    }
})