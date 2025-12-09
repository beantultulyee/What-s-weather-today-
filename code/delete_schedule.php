<?php
session_start();
include 'db_conn.php';
header('Content-Type: application/json; charset=utf-8');

// 로그인 체크
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => '로그인 필요']);
    exit;
}

// 데이터 받기
$input = json_decode(file_get_contents('php://input'), true);
$sno = $input['id'];
$uid = $_SESSION['user_id'];

// DB 삭제 실행
$sql = "DELETE FROM schedules WHERE sno = $sno AND uid = '$uid'";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
}
?>