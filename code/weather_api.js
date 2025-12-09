document.addEventListener('DOMContentLoaded', () => {
    // 날씨 데이터 저장소 (전역 변수처럼 윈도우에 붙여둠)
    window.weatherDataStore = {}; 

    // 날씨 데이터 가져오기 
    fetch('weather.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.weatherDataStore = data.data; 
                
                // 처음 켜졌을 때 '오늘' 날짜 날씨 띄우기
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() + 1).padStart(2, '0');
                const day = String(today.getDate()).padStart(2, '0');
                updateWeatherPanel(`${year}-${month}-${day}`);
            } else {
                console.error(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
});

// 날짜에 맞춰 화면을 바꾸는 함수 (calendar.js에서 이걸 호출함)
window.updateWeatherPanel = function(dateString) {
    const weatherInfoDiv = document.getElementById('weather-info');
    const currentTempSpan = document.getElementById('current-temp');
    const outfitSpan = document.getElementById('outfit-recommendation');
    
    // 이모지 함수
    function getWeatherEmoji(iconCode) {
        const code = iconCode.substring(0, 2);
        switch(code) {
            case '01': return '☀️'; case '02': return '⛅'; case '03': return '☁️';
            case '04': return '☁️'; case '09': return '🌧️'; case '10': return '☔';
            case '11': return '⚡'; case '13': return '☃️'; case '50': return '🌫️';
            default: return '🌈';
        }
    }

    // 옷차림 함수
    function getOutfit(temp) {
        if (temp >= 28) return "민소매, 반바지, 원피스";
        if (temp >= 23) return "반팔, 얇은 셔츠, 반바지";
        if (temp >= 20) return "얇은 가디건, 긴팔, 면바지";
        if (temp >= 17) return "얇은 니트, 맨투맨, 가디건";
        if (temp >= 12) return "자켓, 야상";
        if (temp >= 9)  return "코트, 가죽자켓";
        if (temp >= 5)  return "두꺼운 코트, 히트텍";
        return "패딩, 목도리, 장갑 필수!";
    }

    // 저장된 데이터에서 날짜(Key)로 찾기
    const data = window.weatherDataStore[dateString];

    if (data) {
        // 데이터가 있으면 보여줌
        currentTempSpan.textContent = `${data.temp}°C`;
        outfitSpan.textContent = getOutfit(data.temp);

        // 이모지 처리
        const oldIcon = document.getElementById('weather-emoji');
        if (oldIcon) oldIcon.remove();
        const emojiSpan = document.createElement('span');
        emojiSpan.textContent = getWeatherEmoji(data.icon) + " ";
        emojiSpan.id = 'weather-emoji';
        emojiSpan.style.fontSize = '1.5em';
        emojiSpan.style.verticalAlign = 'middle';
        currentTempSpan.parentNode.insertBefore(emojiSpan, currentTempSpan);
        
    } else {
        // 데이터가 없으면 대체 텍스트 표시
        const oldIcon = document.getElementById('weather-emoji');
        if (oldIcon) oldIcon.remove();
        
        currentTempSpan.textContent = "정보 없음";
        outfitSpan.textContent = "날씨 데이터를 알 수 없는 날짜입니다.";
    }
};