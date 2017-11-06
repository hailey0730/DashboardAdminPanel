<?php
header("Content-Type:text/html;charset=utf-8");
header('Access-Control-Allow-Origin: http://localhost:4200', false);

$url = 'http://hayhay0730.000webhostapp.com/test.json';

$json = file_get_contents($url);

$results = json_decode($json, true);

echo json_encode($results);

?>