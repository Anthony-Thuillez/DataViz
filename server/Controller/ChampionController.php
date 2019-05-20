<?php

namespace Controller;

use Helper\AbstractController;
use Model\ChampionModel;

class ChampionController extends AbstractController
{
    /**
     * PageController constructor.
     */
    public function __construct()
    {
        $this->model = new ChampionModel();
    }

    /**
     *
     */
    public function add()
    {
        // secure data
        if (!isset($_POST['page'])) {
            throw new \Exception('Form data not found');
        }
        // get form data
        $data = $_POST['page'];
        // insert form data
        $id = $this->model->add($data);
        if (is_null($id)) {
            throw new \Exception('Insertion failed');
        }
        // redirect to index
        // header("Location: " . \KANDT_ROOT_URI . \KANDT_ACTION_PARAM . "=" . \KANDT_DEFAULT_ROUTE);
        // exit();
    }
}
