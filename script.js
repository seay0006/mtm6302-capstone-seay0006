// Shared elements
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

const apiKey = 'jlenSpstq2o0AyuxyfIeUoxfbNrCci1nu8bWzVEC';
let currentApod = null;

// Fetch APOD
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const date = document.getElementById('date-picker').value;
        if (!date) return;

        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error('API request failed');
            const data = await response.json();

            // Show container
            if (apodContainer) apodContainer.style.display = 'block';

            // Display image if media_type is image
            if (apodImage) {
                if (data.media_type === 'image') {
                    apodImage.src = data.url;
                    apodImage.alt = data.title;
                    apodImage.style.display = 'block';
                } else {
                    apodImage.style.display = 'none';
                }
            }

            // Text content
            if (apodTitle) apodTitle.textContent = data.title;
            if (apodExplanation) apodExplanation.textContent = data.explanation;
            if (apodCredit) {
                apodCredit.textContent = data.copyright
                    ? `Credit: ${data.copyright}`
                    : 'Credit: Public Domain';
            }

            currentApod = data;

        } catch (error) {
            console.error('Error fetching APOD data:', error);
            if (apodTitle) apodTitle.textContent = 'Error fetching APOD data';
            if (apodExplanation) apodExplanation.textContent = '';
            if (apodImage) apodImage.style.display = 'none';
        }
    });
}

// Add to favourites
if (favouriteBtn) {
    favouriteBtn.addEventListener('click', () => {
        if (!currentApod) return;
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if (!favourites.some(item => item.date === currentApod.date)) {
            favourites.push(currentApod);
            localStorage.setItem('favourites', JSON.stringify(favourites));
            alert('Added to favourites!');
        } else {
            alert('Already in favourites!');
        }
    });
}

// Remove from favourites
function removeFromFavourites(date) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    favourites = favourites.filter(item => item.date !== date);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    renderFavourites();
}

// Render favourites
function renderFavourites() {
    if (!favouritesList) return;
    favouritesList.innerHTML = '';

    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    if (favourites.length === 0) {
        favouritesList.innerHTML = '<p>No favourites yet!</p>';
        return;
    }

    favourites.forEach(apod => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('favourite-item');

        const img = document.createElement('img');
        img.src = apod.url;
        img.alt = apod.title;

        const title = document.createElement('h3');
        title.textContent = apod.title;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => removeFromFavourites(apod.date));

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
    } else if (section === 'favourites') {
        apodSection.style.display = 'none';
        favouritesSection.style.display = 'block';
        linkFavourites.classList.add('active');
        linkApod.classList.remove('active');
        renderFavourites();
    }
}

showSection('apod');

linkApod.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('apod');
});

linkFavourites.addEventListener('click', (e) => {
    e.preventDefault();
    showSection('favourites');
});
