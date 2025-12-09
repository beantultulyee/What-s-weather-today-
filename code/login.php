<?php
session_start();
include 'db_conn.php';

$uid = $_POST['uid'];
$pwd = $_POST['pwd'];

//아이디 존재 여부 확인
$sql = "SELECT * FROM users WHERE uid = '$uid'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) === 1) {
    $row = mysqli_fetch_assoc($result);
    
    // 비밀번호 확인 (암호화된 것과 비교)
    if (password_verify($pwd, $row['pwd'])) {
        $_SESSION['user_id'] = $row['uid'];
        echo "<script>location.href='index.php';</script>";
    } else {
        echo "<script>alert('비밀번호가 틀렸습니다.'); history.back();</script>";
    }
} else {
    echo "<script>alert('존재하지 않는 아이디입니다.'); history.back();</script>";
}

?>