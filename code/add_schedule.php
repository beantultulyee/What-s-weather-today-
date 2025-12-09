<?php
session_start();
include 'db_conn.php';

header('Content-Type: application/json; charset=utf-8');

// 로그인 체크
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => '로그인이 필요합니다.']);
    exit;
}

// 프론트엔드에서 보낸 데이터 받기
$input = json_decode(file_get_contents('php://input'), true);
$uid = $_SESSION['user_id'];
$title = $input['title'];
$content = $input['content'];
$date = $input['date'];

if (!$title || !$date) { // 내용은 없어도 제목은 있어야 함
    echo json_encode(['success' => false, 'message' => '제목을 입력해주세요.']);
    exit;
}

// DB 저장 쿼리 수정 (content 컬럼 추가)
$sql = "INSERT INTO schedules (uid, title, content, start_date, end_date) VALUES ('$uid', '$title', '$content', '$date', '$date')";

if (mysqli_query($conn, $sql)) {
    echo json_encode(['success' => true, 'id' => mysqli_insert_id($conn)]);
} else {
    echo json_encode(['success' => false, 'message' => mysqli_error($conn)]);
}
?>