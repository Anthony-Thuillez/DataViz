<?php

namespace Controller;

use Controller\ChampionController;

class FrontController
{
    public function __construct()
    {
        \session_start();
        $action = $_POST[\DATA_ACTION_PARAM] ?? $_GET[\DATA_ACTION_PARAM] ?? '';
        switch ($action) {
            case "page.add":
                $controller = new ChampionController();
                $output = $controller->add();
                break;

            default:
                $output = "It works!";
                break;
        }
        echo $output;
    }
}
