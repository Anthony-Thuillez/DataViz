<?php

namespace Model;

use Helper\AbstractModel;

class PosteModel extends AbstractModel
{
    public function add(array $data): void
    {
        $sql = "INSERT INTO
                `poste`
                SET 
                `id` = :id,
                `name` = :name
                ;";
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':name', $data['name']);
        $stmt->execute();
    }
};
