let allPosts = [];

async function loadPosts(){

const response = await fetch("posts.json");
allPosts = await response.json();

if(document.getElementById("destination-container")){
showDestinations();
}

if(document.getElementById("blog-container")){
showBlogs();
}

}

function showDestinations(){

const container = document.getElementById("destination-container");

container.innerHTML = "";

const params = new URLSearchParams(window.location.search);
const selectedContinent = params.get("continent");

let continents = [...new Set(allPosts.map(post => post.continent))];

if(selectedContinent){
continents = continents.filter(c => c === selectedContinent);
}

continents.forEach(continent => {

let section = document.createElement("div");

section.innerHTML = `<h2 style="margin-top:40px">${continent.toUpperCase()}</h2>`;

container.appendChild(section);

let destinations = {};

allPosts
.filter(post => post.continent === continent)
.forEach(post => {

if(!destinations[post.destination]){
destinations[post.destination] = post.destinationImage;
}

});

let grid = document.createElement("div");
grid.className="grid";

Object.keys(destinations).forEach(dest => {

let card = document.createElement("div");

card.className="card";

card.onclick = ()=>{
window.location.href=`blog.html?destination=${dest}`;
};

card.innerHTML=` <img src="${destinations[dest]}">

<h3>${dest}</h3>
`;

grid.appendChild(card);

});

container.appendChild(grid);

});

}



function showBlogs(){

const container = document.getElementById("blog-container");

const params = new URLSearchParams(window.location.search);
const destination = params.get("destination");

let filtered = allPosts;

if(destination){
filtered = allPosts.filter(post => post.destination === destination);
}

filtered.forEach(post => {

let card = document.createElement("div");

card.className="blog-card";

card.onclick = ()=>{
window.location.href = post.file;
};

card.innerHTML = ` <img src="${post.image}">

<h3>${post.title}</h3>
<p>${post.description}</p>
`;

container.appendChild(card);

});

}

loadPosts();
