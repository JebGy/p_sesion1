//global
let charactersList = [];
let currentPage = 10;

//Obtenemos los personajes
async function getCharacterData(page) {
  const provList = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}`
  ).then((e) => {
    return e.json();
  });

  provList.results.map((value, index, array) => {
    charactersList.push(value);
  });
  //Cargamos los personajes
  drawData();
}

//Llamamos la función

function drawData() {
  const mainContainer = document.getElementById("main");

  // Eliminar todos los elementos hijos del contenedor principal
  while (mainContainer.firstChild) {
    mainContainer.removeChild(mainContainer.firstChild);
  }

  const container = document.createElement("div");
  container.className =
    "grid lg:grid-cols-4 justify-center gap-4 p-4 md:grid-cols-3 grid-cols-2";
  charactersList.map((character, index, array) => {
    const card = document.createElement("div");
    card.className = "flex flex-col justify-center gap-2 shadow shadow-lg";
    card.innerHTML = `<img src="${character.image}" alt="${character.name}"><p class="text-lg font-bold text-center p-2">${character.name}</p>`;
    container.appendChild(card);
  });
  mainContainer.appendChild(container);
}

//Paginación
function pagination() {
  getCharacterData(currentPage);
  const bPrev = document.getElementById("prev");
  const bNext = document.getElementById("next");
  bPrev.onclick = () => {
    if (currentPage > 0) {
      currentPage--;
      charactersList.length = 0;
      getCharacterData(currentPage);
    }
  };
}

pagination();
