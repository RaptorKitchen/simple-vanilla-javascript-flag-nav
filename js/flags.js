import { countries, continentArray } from "/js/countries_continents.js";

const menu = document.getElementById('menu');
const countryName = document.getElementById('countryName');
const mapImg = document.getElementById('map_img');
const population = document.getElementById('population');
const continent = document.getElementById('continent');
const languages = document.getElementById('languages');

function updateActiveCountry(country) {
    document.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    addActiveClassToTarget(country.name);
}

function swapCountry(country, click = false) {

    if (country) {
        document.getElementById("loadingIcon").style = "display:block";
        document.querySelector("#map_img").style="display: none";
    
        setTimeout(() => {
            document.getElementById("loadingIcon").style = "display:none";
            document.querySelector("#map_img").style="display: block";
            document.getElementById("map_img").src = country.map_img;
        }, 1000);
    
        countryName.innerHTML = `${country.name}`;
        continent.innerHTML =  `<h3>${continentArray[country.continent_id]}</h3>`;
        population.innerHTML = `<strong>Population:</strong> ${country.population.toLocaleString()}`;
        languages.innerHTML = `<strong>Languages:</strong> ${country.languages.join(', ')}`;

        if (click) {
            console.log(`${country.name} clicked`);
            //set active class on click only
            addActiveClassToTarget(country.name);
        }
    }
}

window.onload = function() {
    
    //sort countries alphabetically
    countries.sort((a, b) => a.name.localeCompare(b.name));
    let activeCountry = countries[0];

    countries.forEach(country => {
        //build flag menu array
        let menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.setAttribute('data-country', country.name);
        menuItem.innerHTML = `<img src="${country.flag_img}" alt="Flag of ${country.name}"> ${country.name}`;
        menuItem.onclick = function(event) { swapCountry(country, true), updateActiveCountry(country), activeCountry = country };
        menuItem.onmouseover = function(event) { swapCountry(country, false); };
        menuItem.onmouseout = function(event) { swapCountry(activeCountry, false); };
        menu.appendChild(menuItem);
    });

    //set a default country, selecting first in array for now
    const defaultCountry = countries[0];
    mapImg.src = defaultCountry.map_img;
    countryName.innerHTML =  `${defaultCountry.name}`;
    continent.innerHTML =  `<h3>${continentArray[defaultCountry.continent_id]}</h3>`;
    population.innerHTML = `<strong>Population:</strong> ${defaultCountry.population.toLocaleString()}`;
    languages.innerHTML = `<strong>Languages:</strong> ${defaultCountry.languages.join(', ')}`;
    addActiveClassToTarget(defaultCountry.name);
};

function addActiveClassToTarget(target) {
    document.querySelector(`[data-country="${target}"]`).classList.add('active');
}