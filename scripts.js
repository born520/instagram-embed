// Fetch Instagram embed data and update local storage
async function fetchData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzKMsCKJlrewGKigDpV81kVD7OQGv7u98raItSL890dNF-pa_uyqLpPUTIjJRz1Vddk/exec'); // Replace with your actual web app URL
        const data = await response.json();
        localStorage.setItem('instagramData', JSON.stringify(data));
        updateDOM(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Update the DOM with the new Instagram embeds
function updateDOM(data) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'embed-container';
        div.innerHTML = item.embedCode;
        contentDiv.appendChild(div);
    });

    loadInstagramEmbedScript(); // Load the Instagram embed script
}

// Load or reload the Instagram embed script
function loadInstagramEmbedScript() {
    const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
    if (existingScript) {
        existingScript.remove(); // Remove existing script to reload it
    }
    const script = document.createElement('script');
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}

// Initial setup: use cached data or fetch new data
document.addEventListener('DOMContentLoaded', () => {
    const cachedData = localStorage.getItem('instagramData');
    if (cachedData) {
        updateDOM(JSON.parse(cachedData));
    }
    fetchData(); // Always fetch to update cache and ensure fresh data
});
