document.addEventListener('DOMContentLoaded', () => {
    const cachedData = localStorage.getItem('instagramData');
    if (cachedData) {
        const data = JSON.parse(cachedData);
        updateDOM(data.slice(0, 5)); // Initially load only the first 5 entries
        setupLoadMoreButton(data);
    } else {
        fetchData();
    }
});

async function fetchData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbzKMsCKJlrewGKigDpV81kVD7OQGv7u98raItSL890dNF-pa_uyqLpPUTIjJRz1Vddk/exec');
        const data = await response.json();
        data.reverse(); // Assuming new links are added to the end and should be shown first
        localStorage.setItem('instagramData', JSON.stringify(data));
        updateDOM(data.slice(0, 5)); // Initially load only the first 5 entries
        setupLoadMoreButton(data);
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
    loadInstagramEmbedScript();
}

function loadInstagramEmbedScript() {
    const existingScript = document.querySelector('script[src="//www.instagram.com/embed.js"]');
    if (existingScript) {
        existingScript.remove(); 
    }
    const script = document.createElement('script');
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = function() {
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
    };
}

function setupLoadMoreButton(data) {
    const loadMoreButton = document.getElementById('load-more');
    let currentIndex = 5; // Start after the first 5 already displayed

    loadMoreButton.onclick = () => {
        const nextItems = data.slice(currentIndex, currentIndex + 5);
        updateDOM(nextItems);
        currentIndex += 5;
        if (currentIndex >= data.length) {
            loadMoreButton.style.display = 'none'; // Hide the button if no more items to load
        }
    };
}
