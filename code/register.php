<?php
include 'db_conn.php'; 

$uid = $_POST['user-id'];
$pwd = $_POST['password'];

//비밀번호 암호화
$encrypted_pwd = password_hash($pwd, PASSWORD_DEFAULT);

//중복 아이디 체크
$check_query = "SELECT * FROM users WHERE uid = '$uid'";
$result = mysqli_query($conn, $check_query);

if (mysqli_num_rows($result) > 0) {
    echo "<script>alert('이미 존재하는 아이디입니다.'); history.back();</script>";
} else {
  
    $sql = "INSERT INTO users (uid, pwd) VALUES ('$uid', '$encrypted_pwd')";
    
    if (mysqli_query($conn, $sql)) {
        echo "<script>alert('회원가입 성공! 로그인해주세요.'); location.href='index.php';</script>";
    } else {
        echo "가입 실패: " . mysqli_error($conn);
    }
}
?>