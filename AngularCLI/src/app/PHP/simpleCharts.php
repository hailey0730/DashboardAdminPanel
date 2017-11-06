<?php

header("Content-Type:text/html;charset=utf-8");
header('Access-Control-Allow-Origin: http://localhost:4200', false);

$json = [
    {
      "labels": [
        "'M'",
        "'T'",
        "'W'",
        "'T'",
        "'F'",
        "'S'",
        "'S'"
      ],
      "series": [
        "12",
        "17",
        "7",
        "17",
        "23",
        "18",
        "38"
      ]
    },
    {},
    {
      "labels": [
        "'M'",
        "'T'",
        "'W'",
        "'T'",
        "'F'",
        "'S'",
        "'S'"
      ],
      "series": [
        "12",
        "17",
        "7",
        "17",
        "23",
        "18",
        "38"
      ]
    }
  ],
  "labels": [
    "'M'",
    "'T'",
    "'W'",
    "'T'",
    "'F'",
    "'S'",
    "'S'"
  ];

echo $json 

?>