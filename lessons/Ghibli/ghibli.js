// Funksjon som henter et tilfeldig berry-bilde
async function getRandomBerryImage() {
    // 1. Hent listen av alle berries
    const res = await fetch("https://pokeapi.co/api/v2/berry/");
    const data = await res.json();
    const berries = data.results; // array med berry-navn og url
  
    // 2. Velg en tilfeldig berry
    const randomIndex = Math.floor(Math.random() * berries.length);
    const randomBerry = berries[randomIndex];
  
    // 3. Hent berry-detaljer for å finne item URL
    const berryRes = await fetch(randomBerry.url);
    const berryData = await berryRes.json();
  
    // 4. Hent item data for å få bildet
    const itemRes = await fetch(berryData.item.url);
    const itemData = await itemRes.json();
  
    // 5. Returner bildet
    return itemData.sprites.default; // <-- URL til berry-bildet
  }
  
  // Eksempel på bruk:
  getRandomBerryImage().then(imgUrl => {
    console.log("Tilfeldig berry-bilde:", imgUrl);
  
    // Eksempel: vis det i HTML
    const img = document.createElement("img");
    img.src = imgUrl;
    document.body.appendChild(img);
  });
  