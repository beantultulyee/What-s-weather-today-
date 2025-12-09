document.addEventListener("DOMContentLoaded", () => {
    const modalOverlay = document.getElementById("modal-overlay");
    const addScheduleBtn = document.getElementById("add-schedule-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const saveBtn = document.getElementById("save-btn");

    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");

    //일정 추가 버튼 클릭 시 모달 열기
    if (addScheduleBtn) {
        addScheduleBtn.addEventListener("click", () => {
            if (!window.selectedDateString) {
                alert("먼저 날짜를 선택해주세요.");
                return;
            }
            modalOverlay.style.display = "flex";
            // 입력창 초기화
            modalTitle.value = "";
            modalContent.value = "";
        });
    }

    // 취소 버튼 클릭 시 모달 닫기
    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            modalOverlay.style.display = "none";
        });
    }

    // 저장 버튼 클릭 
    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            const title = modalTitle.value;
            const content = modalContent.value;
            const date = window.selectedDateString; // calendar.js에서 선택된 날짜 가져옴

            if (!title) {
                alert("일정 제목을 입력해주세요.");
                return;
            }

            // 서버로 데이터 전송
            fetch('add_schedule.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                    date: date
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // 성공 시 모달 닫기
                    modalOverlay.style.display = "none";
                    
                    // 캘린더를 다시 그려서 최신 데이터를 반영 
                    if (window.renderCalendar) {
                        window.renderCalendar(); 
                    }
                    
                    alert("일정이 추가되었습니다.");
                } else {
                    alert("오류 발생: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("저장 중 문제가 발생했습니다.");
            });
        });
    }
});