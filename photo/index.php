<?php

$url = base64_decode($_SERVER['REDIRECT_QUERY_STRING']);

header('Content-Type: image/jpg');

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HEADER, 0);
$response = curl_exec($ch);
$info = curl_getinfo($ch);
curl_close($ch);

if ($info['http_code'] == 200) {
    echo $response;
} else {
    header('HTTP/1.0 404 Not Found');
}
