

// all new code is below this line

//shared elements between index and favourites pages

// searching for the html elements
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

    //checking for the apod data then fetching if form exists
    if (form) {
        // fetching the apod data - async because we call API
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // prevents empty submissions
            const date = document.getElementById('date-picker').value;
            // if no date then return
            if (!date) return;
            // const since apirul never changes - only date changes
            const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
            //trying to fetch the api data
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('API request failed');

                const data = await response.json();
            //if the media type is image then show it
            if (apodImage) {
                if (data.media_type === 'image') {
                    apodImage.src = data.url;
                    apodImage.alt = data.title;
                    apodImage.style.display = 'block';
            // if not image then hide it
                } else {
                    apodImage.style.display = 'none';
                }
            }
            // fill in the text content if the elements exist
            if (apodTitle) apodTitle.textContent = data.title;
            if (apodExplanation) apodExplanation.textContent = data.explanation;
            if (apodCredit) apodCredit.textContent = data.copyright
            // if copyright exists then show it otherwise public domain
                ? `Credit: ${data.copyright}`
                : 'Credit: Public Domain';

            currentApod = data;
            // Store the current APOD data so favourites button can use it
        } catch (error) {
            //if the fetch fails then show error message
            console.error('Error fetching APOD data:', error);
            if (apodTitle) apodTitle.textContent = 'Error fetching APOD data';
            if (apodExplanation) apodExplanation.textContent = '';
            if (apodImage) apodImage.style.display = 'none';
        }
         });
        // adding the current apods to the favourites tab
        
    }

        // adding the favourires page functionality
    function removeFromFavourites(date) {
        // lets the local storage know to remove the item being fetched to avoid duplicates
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        // this filters the item out of the array, this prevents the item from being seen there after use
    favourites = favourites.filter(item => item.date !== date);
        // updates the local storage with the new array
    localStorage.setItem('favourites', JSON.stringify(favourites));
    renderFavourites();
}
if (favouriteBtn) {
        favouriteBtn.addEventListener('click', () => {
            if (!currentApod) return;
            let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        });
            if (!favourites.some(item => item.date === currentApod.date)) {
                favourites.push(currentApod);
                localStorage.setItem('favourites', JSON.stringify(favourites));
                alert('Added to favourites!');
            } else {
                alert('Already in favourites!');
            }
        };

        // this is rending the favourites list
        function renderFavourites() {
        // if its on the favourites list then return it
    if (!favouritesList) return;

    favouritesList.innerHTML = '';
        //this gets the favourites from local storage and or starts with an empty array
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        //if the amount of items favourited is 0 then show message below
    if (favourites.length === 0) {
        favouritesList.innerHTML = '<p>No favourites yet!</p>';
        return;
    }
        // this loops the favourited apods
    favourites.forEach(apod => {
        const img = document.createElement('img');
        img.src = apod.url;
        img.alt = apod.title;
        img.style.width = '200px';
        // this create a paragraph element for the apod title
        const title = document.createElement('p');
        title.textContent = apod.title;

        // this is creating a button to remove this apod from the favourites
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        //adding a click that calls from remove from favourites with the apod presents date
        removeBtn.addEventListener('click', () => removeFromFavourites(apod.date));

        favouritesList.appendChild(img);
        favouritesList.appendChild(title);
        favouritesList.appendChild(removeBtn);
        favouritesList.appendChild(document.createElement('hr'));
        }
    };

