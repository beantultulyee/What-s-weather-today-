(function () {
    const monthSelector = document.getElementById('month-selector');
    const calendarDisplay = document.getElementById('calendar-display');
    const monthItems = document.querySelectorAll('.month-item');

    const mockCalendarData = {
        '1': `<p>01월 달력 데이터</p>`,
        '2': `<p>02월 달력 데이터</p>`,
        '3': `<p>03월 달력 데이터</p>`,
        '4': `<p>04월 달력 데이터</p>`,
        '5': `<p>05월 달력 데이터</p>`,
        '6': `<p>06월 달력 데이터</p>`,
        '7': `<p>07월 달력 데이터</p>`,
        '8': `<p>08월 달력 데이터</p>`,
        '9': `<p>09월 달력 데이터</p>`,
        '10': `<table>
            <thead>
                <tr class="day-of-week"><th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr>
            </thead>
            <tbody>
                <tr><td></td><td></td><td>01</td><td>02</td><td>03</td><td>04</td><td>05</td></tr>
                <tr><td>06</td><td>07</td><td>08</td><td>09</td><td>10</td><td>11</td><td>12</td></tr>
                <tr><td>13</td><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td></tr>
                <tr><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td></tr>
                <tr><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td><td></td><td></td></tr>
            </tbody>
        </table>`,
        '11': `<table>
            <thead>
                <tr class="day-of-week"><th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr>
            </thead>
            <tbody>
                <tr><td></td><td></td><td></td><td></td><td></td><td>01</td><td>02</td></tr>
                <tr><td>03</td><td>04</td><td>05</td><td>06</td><td>07</td><td>08</td><td>09</td></tr>
                <tr><td>10</td><td>11</td><td>12</td><td>13</td><td>14</td><td>15</td><td>16</td></tr>
                <tr><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td></tr>
                <tr><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td></tr>
            </tbody>
        </table>`,
        '12': `<p>12월 달력 데이터는 곧 업데이트됩니다.</p>`
    };

    function renderCalendar(month) {
        monthItems.forEach(item => item.classList.remove('active'));

        const selectedItem = document.querySelector(`.month-item[data-month="${month}"]`);
        if (selectedItem) {
            selectedItem.classList.add('active');
        }

        if (mockCalendarData[month]) {
            calendarDisplay.innerHTML = mockCalendarData[month];
        } else {
            calendarDisplay.innerHTML = `<p style="text-align: center; color: #999;">${month}월 달력 데이터가 없습니다.</p>`;
        }
    }

    monthSelector.addEventListener('click', (event) => {
        const monthElement = event.target.closest('.month-item');
        if (monthElement) {
            const month = monthElement.dataset.month;
            renderCalendar(month);
        }
    });

    renderCalendar('10');
})();
