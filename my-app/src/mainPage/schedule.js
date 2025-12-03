(function () {
    const addScheduleBtn = document.getElementById('add-schedule-btn');
    const scheduleList = document.getElementById('daily-schedule-list');

    function createScheduleItem(text) {
        const newListItem = document.createElement('li');
        const textNode = document.createTextNode(text);
        newListItem.appendChild(textNode);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.classList.add('delete-schedule-btn');

        deleteBtn.addEventListener('click', (event) => {
            event.target.parentNode.remove();
        });

        newListItem.appendChild(deleteBtn);

        return newListItem;
    }

    addScheduleBtn.addEventListener('click', () => {
        const newScheduleText = prompt("추가할 일정을 입력하세요");

        if (!newScheduleText || newScheduleText.trim() === "") {
            return;
        }

        const newItem = createScheduleItem(newScheduleText.trim());
        scheduleList.appendChild(newItem);
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
})();
