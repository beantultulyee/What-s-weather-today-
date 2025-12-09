window.selectedDateString = null; 
window.currentMonthSchedules = []; 

// 캘린더 그리기 함수
window.renderCalendar = async function() {
    const calendarBody = document.getElementById('calendar-body');
    const monthHeader = document.getElementById('monthHeader'); 
    
    if (!window.currentDate) window.currentDate = new Date();
    let year = window.currentDate.getFullYear();
    let month = window.currentDate.getMonth(); // 0~11

    // 뒤에 &t=시간 을 붙여서 캐시를 무시하고 무조건 새 데이터 가져옴
    try {
        const timeStamp = new Date().getTime(); 
        const response = await fetch(`get_schedule.php?year=${year}&month=${month + 1}&t=${timeStamp}`);
        window.currentMonthSchedules = await response.json();
    } catch (error) {
        console.error("일정 불러오기 실패:", error);
    }

    if(monthHeader) monthHeader.textContent = `${year}년 ${month + 1}월`;
    if(calendarBody) calendarBody.innerHTML = "";
    
    let firstDayIndex = new Date(year, month, 1).getDay();
    let lastDate = new Date(year, month + 1, 0).getDate();
    let today = new Date();

    let row = document.createElement("tr");

    // 첫 주 빈칸
    for (let i = 0; i < firstDayIndex; i++) {
        row.appendChild(document.createElement("td"));
    }

    // 날짜 채우기
    for (let day = 1; day <= lastDate; day++) {
        let td = document.createElement("td");
        
        let dateNum = document.createElement('div');
        dateNum.textContent = day;
        td.appendChild(dateNum);

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // DB 일정 필터링 및 제목 표시
        const daysEvents = window.currentMonthSchedules.filter(s => s.start_date === dateStr);
        daysEvents.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.textContent = "• " + event.title;
            eventDiv.className = 'calendar-event-title';
            td.appendChild(eventDiv);
        });

        // 오늘 날짜
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            td.classList.add("today");
        }

        // 선택된 날짜 유지
        if (window.selectedDateString === dateStr) {
            td.classList.add("selected-day");
            //캘린더 그릴 때 패널도 같이 갱신해줌 (저장 직후 바로 반영되게)
            setTimeout(() => updateSidePanel(dateStr), 0); 
        }

        // 클릭 이벤트
        td.onclick = function() {
            document.querySelectorAll('.selected-day').forEach(el => el.classList.remove('selected-day'));
            td.classList.add('selected-day');
            window.selectedDateString = dateStr;
            updateSidePanel(dateStr);
            if (window.updateWeatherPanel) window.updateWeatherPanel(dateStr);
        };

        row.appendChild(td);

        if ((firstDayIndex + day) % 7 === 0) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
    }
    calendarBody.appendChild(row);
};

// 우측 패널 업데이트
function updateSidePanel(dateStr) {
    const scheduleDateDisplay = document.getElementById('schedule-date-display');
    const weatherDateDisplay = document.getElementById('weather-date-display');
    const scheduleList = document.getElementById('daily-schedule-list');

    const [y, m, d] = dateStr.split('-');
    const shortDate = `${m}/${d}`;
    
    if(scheduleDateDisplay) scheduleDateDisplay.textContent = shortDate;
    if(weatherDateDisplay) weatherDateDisplay.textContent = shortDate;
    if(scheduleList) scheduleList.innerHTML = "";

    const events = window.currentMonthSchedules.filter(s => s.start_date === dateStr);

    events.forEach(event => {
        const li = document.createElement('li');
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        
        const textSpan = document.createElement('span');
        textSpan.textContent = event.content ? event.content : event.title;
        li.appendChild(textSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-schedule-btn';
        deleteBtn.onclick = () => deleteSchedule(event.sno);

        li.appendChild(deleteBtn);
        scheduleList.appendChild(li);
    });
}

// 삭제 기능
function deleteSchedule(sno) {
    fetch('delete_schedule.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sno })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            window.renderCalendar(); // 삭제 후 새로고침
        } else {
            alert("삭제 실패");
        }
    });
}

// 달 이동
window.changeMonth = function(step) {
    window.currentDate.setMonth(window.currentDate.getMonth() + step);
    window.renderCalendar();
}

// 초기 실행
document.addEventListener('DOMContentLoaded', () => {
    window.currentDate = new Date();
    const year = window.currentDate.getFullYear();
    const month = String(window.currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(window.currentDate.getDate()).padStart(2, '0');
    const todayStr = `${year}-${month}-${day}`;
    
    window.selectedDateString = todayStr;
    window.renderCalendar();
});