// Fetch Instagram embed data and update local storage
async function fetchData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzKMsCKJlrewGKigDpV81kVD7OQGv7u98raItSL890dNF-pa_uyqLpPUTIjJRz1Vddk/exec'); // Replace with your actual web app URL
        const data = await response.json();
        localStorage.setItem('instagramData', JSON.stringify(data));
        updateDOM(data);
        loadInstagramEmbedScript();
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
}

// Load or reload the Instagram embed script and ensure initialization
function loadInstagramEmbedScript() {
    const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
    if (existingScript) {
        existingScript.remove(); // Remove existing script to force re-initialization
    }
    const script = document.createElement('script');
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = function () {
        if (window.instgrm) {
            window.instgrm.Embeds.process(); // Explicitly process all Instagram embeds
        }
    };
}

// Check for cached data or fetch new data on page load
document.addEventListener('DOMContentLoaded', () => {
    const cachedData = localStorage.getItem('instagramData');
    if (cachedData) {
        updateDOM(JSON.parse(cachedData));
    } else {
        fetchData(); // Fetch new data if no cached data is available
    }
    // Fetch new data periodically to update cache and DOM
    setInterval(fetchData, 300000); // Update data every 5 minutes
});
