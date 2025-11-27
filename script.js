// Elements references
const form = document.getElementById('apod-form');
const apodContainer = document.getElementById('apod-container');
const apodImage = document.getElementById('apod-Image');
const apodTitle = document.getElementById('apod-title');
const apodExplanation = document.getElementById('apod-explanation');
const apodCredit = document.getElementById('apod-credit');
const favouriteBtn = document.getElementById('favourite-button');
const favouritesList = document.getElementById('favourites-list');
const apodSection = document.getElementById('apod-section');
const favouritesSection = document.getElementById('favourites-section');
const linkApod = document.getElementById('link-apod');
const linkFavourites = document.getElementById('link-favourites');

// This is the highlight for button (makes it on normally)
favouriteBtn.classList.add('active');

// Nasa Api
const apiKey = 'jlenSpstq2o0AyuxyfIeUoxfbNrCci1nu8bWzVEC'; 

// Holds the APOD currently displayed
let currentApod = null;

// Fetch APOD - from nasa api
if (form) {
  // stops submission of blank calendar
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // this is what makes you able to get selected date
    const date = document.getElementById('date-picker').value;
    if (!date) return;

    try {
      // Fetch APOD for selected date
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
      
      // this is if the api has an error then state "api request failed" then wait for a responce
      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();

      // show APOD container
      apodContainer.style.display = 'block';

      // this is whats handling the media type, in this case its images
      if (data.media_type === 'image') {
        apodImage.src = data.url;
        apodImage.alt = data.title;
        apodImage.style.display = 'block';
      } else {
        apodImage.style.display = 'none';
      }

      // Fill in deatails about the title, explanation and the copyrights
      apodTitle.textContent = data.title;
      apodExplanation.textContent = data.explanation;
      // giving credits
      apodCredit.textContent = data.copyright ? `Credit: ${data.copyright}` : 'Credit: Public Domain';


      // this saves current APOD data
      currentApod = data;


    } catch (error) {
      console.error(error);
      apodTitle.textContent = 'Error fetching APOD data';
      apodExplanation.textContent = '';
      apodImage.style.display = 'none';
    }
  });
}

// Add to favourites
if (favouriteBtn) {
  favouriteBtn.addEventListener('click', () => {
    // this ensures that the apod is loaded
    if (!currentApod) return;

    // this gets the existing localstorage favourites
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    
    // this avoids duplicates in the favourites
    if (!favourites.some(item => item.date === currentApod.date)) {
      favourites.push(currentApod);
      localStorage.setItem('favourites', JSON.stringify(favourites));
      alert('Added to favourites!');
    } else {
      alert('Already in favourites!');
    }
  });
}

// Remove favourites
function removeFromFavourites(date) {
  let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
  
// this filters out the removed items
  favourites = favourites.filter(item => item.date !== date);
  localStorage.setItem('favourites', JSON.stringify(favourites));
  // this renders the favourites
  renderFavourites();
}
// DISPLAY FAVOURITES LIST

// Render favourites
function renderFavourites() {
  if (!favouritesList) return;

  favouritesList.innerHTML = '';
  const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

  // Show message if you have no favourites saved
  if (favourites.length === 0) {
    favouritesList.innerHTML = '<p>No favourites yet!</p>';
    return;
  }

  favourites.forEach(apod => {

  // creates a favourite card
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('favourite-item');

    const img = document.createElement('img');
    img.src = apod.url;
    img.alt = apod.title;

    const title = document.createElement('h3');
    title.textContent = apod.title;

  // Remove favourite button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => removeFromFavourites(apod.date));

  // building card
    itemDiv.appendChild(img);
    itemDiv.appendChild(title);
    itemDiv.appendChild(removeBtn);

    favouritesList.appendChild(itemDiv);
  });
}

// Load favourites on page load
if (favouritesList) renderFavourites();



// Navigation

function showSection(section) {
  if (section === 'apod') {
    apodSection.style.display = 'block';
    favouritesSection.style.display = 'none';
    linkApod.classList.add('active');
    linkFavourites.classList.remove('active');
  } else {
    apodSection.style.display = 'none';
    favouritesSection.style.display = 'block';
    linkFavourites.classList.add('active');
    linkApod.classList.remove('active');
    renderFavourites();
  }
}
// show the apod by default
showSection('apod');

// navigation click handlers
linkApod.addEventListener('click', e => { e.preventDefault(); showSection('apod'); });
linkFavourites.addEventListener('click', e => { e.preventDefault(); showSection('favourites'); });
