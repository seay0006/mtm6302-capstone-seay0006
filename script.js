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

// below is the what makes the submit button work
// this is async since we are searching from an api 
form.addEventListener('submit', async (event) => {
// this makes it so you cant submit nothing on the date picker
    event.preventDefault();


// this is retrieving the date from my api call
    const date = document.getElementById('date-picker').value;
// this is the url for the api call
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
// this is the script saying "if you get a date selected then return the data from the api call"
    if (!date) return;
// now i need too fetch teh datat from the api
    try {
        // "apiUrl" is the variable name
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('API request failed');
        }
// this is the actual data from the api call "data" is the variable name
        const data = await response.json();
        console.log(data);
    
// 
    if (data.media_type === 'image') {
        apodImage.src = data.url;
        apodImage.alt = data.title;
        apodImage.style.display = "block";
    } else {
        apodImage.style.display = "none";
    }
    // this is displaying the data from the api call
        apodTitle.textContent = data.title;
    // this explaination is from the api call
        apodExplanation.textContent = data.explanation;
    // this is giving credit from the api call
        apodCredit.textContent = data.copyright ? `Credit: ${data.copyright}` : 'Credit: Public Domain';
    // this is the error message that shows whenever the input doesn't work
    } catch (error) {
        console.error ('Error fetching APOD data:', error);
        apodTitle.textContent = 'Error fetching APOD data';
        apodExplanation.textContent = '';
        apodImage.style.display = 'none';
    }
});