document.addEventListener('DOMContentLoaded', () => {
    const cachedData = localStorage.getItem('instagramData');
    if (cachedData) {
        const data = JSON.parse(cachedData);
        console.log("Cached data:", data); // 데이터 로드 확인 로그
        updateDOM(data.slice(0, 5)); // 처음 5개의 항목만 로드
        setupLoadMoreButton(data);
    } else {
        fetchData();
    }
});

async function fetchData() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwEZarp9VLKvblXuejuJme-x_arHlfPeS6QWSybr3ns_d7if5AVK055o_nRKvJD7p7tyw/exec'); // 웹앱 URL로 교체
        const data = await response.json();
        console.log("Fetched data:", data); // 데이터 페칭 확인 로그
        data.reverse(); // 새로 추가된 링크가 처음에 보이도록 순서 변경
        localStorage.setItem('instagramData', JSON.stringify(data));
        updateDOM(data.slice(0, 5)); // 처음 5개의 항목만 로드
        setupLoadMoreButton(data);
    } catch (error) {
        console.error('Error fetching data:', error); // 오류 로그
    }
}

function updateDOM(data) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // 이전 내용 삭제
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'embed-container';
        div.innerHTML = item.embedCode; // 임베드 코드를 그대로 HTML로 삽입
        console.log("Embed Code:", item.embedCode); // 임베드 코드 확인
        contentDiv.appendChild(div);
    });
    loadInstagramEmbedScript();
}

function loadInstagramEmbedScript() {
    const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');
    if (existingScript) {
        existingScript.remove();
    }
    const script = document.createElement('script');
    script.src = "https://www.instagram.com/embed.js"; // https 추가
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
    let currentIndex = 5;

    loadMoreButton.onclick = () => {
        const nextItems = data.slice(currentIndex, currentIndex + 5);
        updateDOM(nextItems);
        currentIndex += 5;
        if (currentIndex >= data.length) {
            loadMoreButton.style.display = 'none';
        }
    };
}
