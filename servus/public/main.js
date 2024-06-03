const htmlNewHeroName = document.getElementById('new-hero-name');
const htmlNewHeroLevel = document.getElementById('new-hero-level');
const htmlCreate = document.getElementById('hero-form');
const htmlDelete = document.getElementById('delete');
const htmlHeroesList = document.getElementById('heroes');

window.addEventListener('load', loadHeroes);
htmlHeroesList.addEventListener('click', onHeroesClick);
htmlCreate.addEventListener('submit', onAddHeroSubmit);
htmlDelete.addEventListener('click', onDeleteClick);

let selectedHero;

async function loadHeroes() {
  const response = await performRequest('GET', '/api/heroes/', { 'text-to-search': '' }, {});
  const heroes = response.body;
  loadHeroesInPage(heroes);
  selectedHero = null;
}

async function onHeroesClick(event) {
  if (event.target.tagName === 'TD') {
    const selectedRow = event.target.parentNode;
    for (const row of htmlHeroesList.rows) {
      row.classList.remove('selected');
    }
    selectedRow.classList.add('selected');
    selectedHero = selectedRow.cells[0].innerText;
  }
}

async function onAddHeroSubmit(event) {
  event.preventDefault(); // Prevent form submission
  const newHeroName = htmlNewHeroName.value;
  const newHeroLevel = htmlNewHeroLevel.value;
  const response = await performRequest('POST', '/api/heroes/', {}, { name: newHeroName, level: newHeroLevel });
  if (response.statusCode === 200) {
    loadHeroes(); // Reload heroes list after adding a new hero
    htmlNewHeroName.value = ''; // Clear input fields after successful submission
    htmlNewHeroLevel.value = '';
  } else {
    console.log(response.body); // Log any errors
  }
}

async function onDeleteClick() {
  const response = await performRequest('DELETE', '/api/heroes/', {}, { hero: selectedHero });
  if (response.statusCode === 200) {
    loadHeroes();
  } else {
    console.log(response.body);
  }
}

async function performRequest(method, url, queryStringObject, bodyObject) {
  url += '?';
  for (const property in queryStringObject) {
    url += `${property}=${queryStringObject[property]}&`;
  }
  let response;
  if (method === 'GET') {
    response = await fetch(url);
  } else {
    response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyObject),
    });
  }
  const body = await response.json();
  const statusCode = response.status;
  return { body, statusCode };
}

function loadHeroesInPage(heroes) {
  const tbody = document.querySelector('#heroes tbody');
  tbody.innerHTML = '';
  for (const hero of heroes) {
    const tr = document.createElement('tr');
    const nameCell = document.createElement('td');
    const levelCell = document.createElement('td');
    nameCell.innerText = hero.name;
    levelCell.innerText = hero.level;
    tr.appendChild(nameCell);
    tr.appendChild(levelCell);
    tbody.appendChild(tr);
  }
}
