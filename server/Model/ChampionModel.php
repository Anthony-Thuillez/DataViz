<?php

namespace Model;

use Helper\AbstractModel;

class ChampionModel extends AbstractModel
{
    public function add(array $data): void
    {
        $sql = "INSERT INTO
                `champion`
                SET 
                `name` = :name,
                `win` = :win,
                `pick` = :pick,
                `ban` = :ban
                ;";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':name', $data['name']);
        $stmt->bindValue(':win', $data['win']);
        $stmt->bindValue(':pick', $data['pick']);
        $stmt->bindValue(':ban', $data['ban']);
        $stmt->execute();
    }
};
