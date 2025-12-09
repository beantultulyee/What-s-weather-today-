<?php
session_start();
?>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>What's the weather today?</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="login.css">
</head>

<body>

    <header id="login-area">
        <?php if (!isset($_SESSION['user_id'])) { ?>
            <h3>🔑 로그인</h3>
            <form id="login-form-group" method="post" action="login.php">
                <label for="username">아이디:</label>
                <input type="text" id="username" name="uid" placeholder="아이디" required>

                <label for="password">비밀번호:</label>
                <input type="password" id="password" name="pwd" placeholder="비밀번호" required>

                <button type="submit">로그인</button>
            </form>
            <div id="signup-link">
                <a href="signup.html">회원가입</a>
            </div>

        <?php } else { ?>
            <h3>👋 환영합니다, <strong><?php echo $_SESSION['user_id']; ?></strong>님!</h3>

            <div style="margin-left: auto;">
                <button onclick="location.href='logout.php'" style="
                    background-color: #ff6b6b; 
                    color: white; 
                    border: none; 
                    padding: 8px 15px; 
                    border-radius: 5px; 
                    cursor: pointer;
                    font-weight: bold;">
                    로그아웃
                </button>
            </div>
        <?php } ?>
    </header>

    <div id="site-title">
        <h1>What's the weather today?</h1>
    </div>

    <main id="main-content">
        <?php if (!isset($_SESSION['user_id'])) { ?>
            <div style="grid-column: span 2; text-align: center; padding: 50px;">
                <h2>로그인이 필요한 서비스입니다.</h2>
                <p>상단에서 로그인하거나 회원가입을 해주세요.</p>
            </div>
        <?php } else { ?>
            <section id="calendar-area">
                <h2>🗓️ 캘린더</h2>
                <div class="calendar">
                    <div class="calendar-header">
                        <button onclick="changeMonth(-1)">◀</button>
                        <h2 id="monthHeader"></h2>
                        <button onclick="changeMonth(1)">▶</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>일</th>
                                <th>월</th>
                                <th>화</th>
                                <th>수</th>
                                <th>목</th>
                                <th>금</th>
                                <th>토</th>
                            </tr>
                        </thead>
                        <tbody id="calendar-body"></tbody>
                    </table>
                </div>
            </section>

            <div id="right-sidebar">
                <section id="schedule-area">
                    <h2>📝 <span id="schedule-date-display"><?php echo date('m/d'); ?></span>의 일정</h2>

                    <ul id="daily-schedule-list"></ul>

                    <button id="add-schedule-btn">일정 추가</button>
                </section>

                <section id="weather-outfit-area">
                    <h2><span id="weather-date-display"><?php echo date('m/d'); ?></span>의 날씨 & 옷차림</h2>
                    <div id="weather-info">
                        <p><strong>현재 기온:</strong> <span id="current-temp">로딩중...</span></p>
                        <p><strong>옷차림 추천:</strong> <span id="outfit-recommendation">잠시만 기다려주세요</span></p>
                    </div>
                </section>
            </div>
        <?php } ?>
    </main>

    <script src="calendar.js"></script>
    <script src="schedule.js"></script>

    <?php if (isset($_SESSION['user_id'])) { ?>
        <script src="weather_api.js"></script>
    <?php } ?>

    <!-- 일정 팝업창 -->
    <div id="modal-overlay">
        <div id="modal-box">
            <h3 style="margin-top:0;">일정 추가</h3>

            <label>일정 제목</label>
            <input type="text" id="modal-title" placeholder="예: 팀 회의">

            <label>일정 내용</label>
            <textarea id="modal-content" rows="3" placeholder="예: 회의 자료 준비하기"></textarea>

            <div id="modal-buttons">
                <button id="cancel-btn">취소</button>
                <button id="save-btn">저장</button>
            </div>
        </div>
    </div>
</body>
</html>