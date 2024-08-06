// 웹앱 URL
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxwKmVmoz8ZjM2HlQOD8-6ejo6vDsHrIwCM9UdZir47a7Xpyeq0G_JFHDo4pEitOOoC/exec';

// Fetch API를 사용하여 웹앱에서 JSON 데이터 가져오기
fetch(WEB_APP_URL)
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('instagram-embeds');
        data.forEach(row => {
            const embedCode = row['임베드 코드'];
            if (embedCode) {
                const div = document.createElement('div');
                div.classList.add('embed-container');
                div.innerHTML = embedCode;
                container.appendChild(div);
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));
