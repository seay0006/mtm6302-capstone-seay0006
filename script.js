// form for date picker
const form = document.getElementById('apod-form');
// apod data
const apodImage = document.getElementById('apod-Image');
// apod title
const apodTitle = document.getElementById('apod-title');
// apod explanation
const apodExplanation = document.getElementById('apod-explanation');
// apod credit
const apodCredit = document.getElementById('apod-credit');

// my api key (DO NOT SHOW THIS IN PUBLIC REPO)
const apiKey = 'jlenSpstq2o0AyuxyfIeUoxfbNrCci1nu8bWzVEC';

// Handle form submission (async because we call API)
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // prevents empty submissions

    const date = document.getElementById('date-picker').value;
    if (!date) return;

    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('API request failed');

        const data = await response.json();
        console.log(data);

        // Show image if media type is image
        if (data.media_type === 'image') {
            apodImage.src = data.url;
            apodImage.alt = data.title;
            apodImage.style.display = 'block';
        } else {
            apodImage.style.display = 'none';
        }

        // Fill in text content
        apodTitle.textContent = data.title;
        apodExplanation.textContent = data.explanation;
        apodCredit.textContent = data.copyright
            ? `Credit: ${data.copyright}`
            : 'Credit: Public Domain';

        // Store the current APOD data so favourites button can use it
        currentApod = data;

    } catch (error) {
        console.error('Error fetching APOD data:', error);
        apodTitle.textContent = 'Error fetching APOD data';
        apodExplanation.textContent = '';
        apodImage.style.display = 'none';
    }
});

// Favourites button functionality (this MUST be outside)
document.addEventListener('DOMContentLoaded', () => {
    const favouriteBtn = document.getElementById('favourite-btn'); // Make sure this button exists
    const favouritesContainer = document.getElementById('favourites-container');

    // Save image to favourites
    const saveToFavourites = (apodData) => {
        if (!apodData) return;
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if (!favourites.some(item => item.date === apodData.date)) {
            favourites.push(apodData);
            localStorage.setItem('favourites', JSON.stringify(favourites));
            alert('Added to favourites!');
        } else {
            alert('Already in favourites!');
        }
    };

    favouriteBtn.addEventListener('click', () => {
        saveToFavourites(currentApod);
    });

// selecting the html elements for the favourites page
    const form = document.getElementById('apod-form');
    const apodImage = document.getElementById('apod-Image');
    const apodTitle = document.getElementById('apod-title');
    const apodExplanation = document.getElementById('apod-explanation');
    const apodCredit = document.getElementById('apod-credit');
    const favouriteBtn = document.getElementById('favourite-button');
    const favouritesList = document.getElementById('favourites-list');

    // Load and display favourites
    const apiKey = 'jlenSpstq2o0AyuxyfIeUoxfbNrCci1nu8bWzVEC';
    let currentApod = null;

    //fetching the apod data
    form.addEvemntListener('submit', async (event) => {
        event.preventDefault(); // prevents empty submissions

        const date = document.getElementById('date-picker').value;
        if (!date) return;
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();
            console.log(data);

    // Show image if media type is image
            if (data.media_type === 'image') {
                apodImage.src = data.url;
                apodImage.alt = data.title;
                apodImage.style.display = 'block';
            } else {
                apodImage.style.display = 'none';
            }
            apodTitle.textContent = data.title;
            apodExplanation.textContent = data.explanation;
            apodCredit.textContent = data.copyright
                ? `Credit: ${data.copyright}`
                : 'Credit: Public Domain';
            currentApod = data;
    // Store the current APOD data so favourites button can use it

        } catch (error) {
            console.error('Error fetching APOD data:', error);
            apodTitle.textContent = 'Error fetching APOD data';
            apodExplanation.textContent = '';
            apodImage.style.display = 'none';
        }
    //save to favourites button
    if (!apodData) return;
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if (!favourites.some(item => item.date === apodData.date)) {
            favourites.push(apodData);
            localStorage.setItem('favourites', JSON.stringify(favourites));
            alert('Added to favourites!');
        }renderFavourites();
        else {
            alert('Already in favourites!');
        }

    });
    function removeFromFavourites(date) {
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        favourites = favourites.filter(item => item.date !== date);
        localStorage.setItem('favourites', JSON.stringify(favourites));
        renderFavourites();

    function renderFavourites() {
        favouritesList.innerHTML = '';
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if (favourites.length === 0) {
            favouritesList.innerHTML = '<p>No favourites yet!</p>';
            return;
        }
        favourites.forEach(apod => {
            const img = document.createElement('img');
            img.src = apod.url;
            img.alt = apod.title;
            img.style.width = '200px';
            img.style.height = 'auto';
            const title = document.createElement('p');
            title.textContent = apod.title;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove from Favourites';
            removeBtn.addEventListener('click', () => removeFromFavourites(apod.date));

            FileList.appendChild(img);
            FileList.appendChild(title);
            FileList.appendChild(removeBtn);
            FileList.appendChild(document.createElement('hr'));
        }
        favouriteBtn.addEventListener('click', () => {
            saveToFavourites(currentApod);
});
    }document.addEventListener('DOMContentLoaded', renderFavourites);
    

});
