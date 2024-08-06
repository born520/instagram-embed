async function fetchData() {
    try {
        // Fetch data from the web app
        const response = await fetch('https://script.google.com/macros/s/AKfycbzKMsCKJlrewGKigDpV81kVD7OQGv7u98raItSL890dNF-pa_uyqLpPUTIjJRz1Vddk/exec'); // 웹앱 URL로 교체
        const data = await response.json();

        // Update local storage
        localStorage.setItem('instagramData', JSON.stringify(data));

        // Update DOM with fetched data
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

    // Load Instagram script
    const script = document.createElement('script');
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
}

// Check for cached data
document.addEventListener('DOMContentLoaded', () => {
    const cachedData = localStorage.getItem('instagramData');
    if (cachedData) {
        // Use cached data for initial load
        updateDOM(JSON.parse(cachedData));
    } else {
        // Fetch new data if no cache
        fetchData();
    }
    
    // Optionally, fetch new data to update cache in the background
    fetchData();
});
