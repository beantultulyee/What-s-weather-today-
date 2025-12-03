addScheduleBtn.addEventListener('click', () => {
    const newScheduleText = prompt("추가할 일정을 입력하세요");

    if (!newScheduleText || newScheduleText.trim() === "") {
        return; 
    }

    const newListItem = document.createElement('li');
    newListItem.textContent = newScheduleText.trim(); 
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×'; 
    deleteBtn.classList.add('delete-schedule-btn');
    
    deleteBtn.addEventListener('click', (event) => {
        event.target.parentNode.remove();
    })
    newListItem.appendChild(deleteBtn);
    scheduleList.appendChild(newListItem);
});

document.querySelectorAll('#daily-schedule-list li').forEach(item => {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.classList.add('delete-schedule-btn');
    
    deleteBtn.addEventListener('click', (event) => {
        event.target.parentNode.remove();
    });
    
    item.appendChild(deleteBtn);
});
