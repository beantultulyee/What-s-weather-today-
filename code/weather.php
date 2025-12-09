<?php
header('Content-Type: application/json; charset=utf-8');

$apiKey = "8f1cdb32434a58e14865c537782829f6"; 
$city = "Busan";
$lang = "kr";
$units = "metric";

$apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q={$city}&appid={$apiKey}&lang={$lang}&units={$units}";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

$data = json_decode($response, true);

if (isset($data['cod']) && $data['cod'] == 200) {
    $dailyForecasts = [];

    // 3시간 간격 데이터를 '날짜별'로 정리하기
    foreach ($data['list'] as $item) {
        // 날짜만 자르기 (예: "2025-12-06 15:00:00" -> "2025-12-06")
        $date = substr($item['dt_txt'], 0, 10);
        $temp = $item['main']['temp'];

        // 로직: 그 날짜의 데이터가 없거나, 지금 데이터가 더 따뜻하면 덮어쓰기
        // (즉, 하루 중 가장 따뜻한 낮 시간대의 날씨를 대표로 씀)
        if (!isset($dailyForecasts[$date]) || $temp > $dailyForecasts[$date]['temp']) {
            $dailyForecasts[$date] = [
                'temp' => round($temp, 1),
                'desc' => $item['weather'][0]['description'],
                'icon' => $item['weather'][0]['icon']
            ];
        }
    }

    echo json_encode(['success' => true, 'data' => $dailyForecasts]);
} else {
    echo json_encode(['success' => false, 'message' => '날씨 정보를 가져오지 못했습니다.']);
}
?>