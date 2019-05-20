<?php

define("DATA_ROOT_DIR", __DIR__ . "/");
define("DATA_ROOT_URI", "index.php?");
define("DATA_ACTION_PARAM", "a");
define("DATA_PAGE_PARAM", "p");
define("DATA_DEFAULT_ROUTE", "page.index");

define("APP_ROUTE_COLLECTION", [
    "page.show" => [
        "controller" => "Page",
        "method" => "show"
    ],
]);
