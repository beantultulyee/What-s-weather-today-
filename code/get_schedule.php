<?php
session_start();
include 'db_conn.php';
header('Content-Type: application/json; charset=utf-8');

// 로그인 안 했으면 빈 리스트 반환
if (!isset($_SESSION['user_id'])) {
    echo json_encode([]);
    exit;
}

$uid = $_SESSION['user_id'];
$year = $_GET['year'];
$month = $_GET['month'];

// DB에서 해당 연도/월의 일정 조회
$sql = "SELECT * FROM schedules WHERE uid = '$uid' AND YEAR(start_date) = '$year' AND MONTH(start_date) = '$month'";
$result = mysqli_query($conn, $sql);

$schedules = [];
while($row = mysqli_fetch_assoc($result)) {
    $schedules[] = $row;
}

// 결과 반환
echo json_encode($schedules);
?>