document.addEventListener('DOMContentLoaded', () => {
    const cachedData = localStorage.getItem('instagramData');
    if (cachedData) {
        updateDOM(JSON.parse(cachedData));
    }
    fetchData(); // Fetch new data to keep the cache updated
});

async function fetchData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzKMsCKJlrewGKigDpV81kVD7OQGv7u98raItSL890dNF-pa_uyqLpPUTIjJRz1Vddk/exec'); // Replace this with your actual web app URL
        const data = await response.json();
        localStorage.setItem('instagramData', JSON.stringify(data));
        updateDOM(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateDOM(data) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'embed-container';
        div.innerHTML = item.embedCode;
        contentDiv.appendChild(div);
    });
    loadInstagramEmbedScript(); // Ensure Instagram script is loaded
}

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

    script.onload = function() {
        if (window.instgrm) {
            window.instgrm.Embeds.process(); // Explicitly process all Instagram embeds
        }
    };

    script.onerror = function() {
        console.error("Instagram embed script failed to load. Retrying...");
        loadInstagramEmbedScript(); // Retry loading the script
    };
}
