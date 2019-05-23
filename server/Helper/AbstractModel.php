<?php

namespace Helper;

use Helper\PdoConnexion;

/**
 * Class AbstractModel
 */
abstract class AbstractModel
{
    /** @var null|\PDO $pdo */
    protected $pdo;

    /**
     * PageModel constructor.
     * gets PDO connection
     */
    public function __construct()
    {
        $this->pdo = PdoConnexion::get();
    }

    /**
     * @param \PDOStatement $stmt
     */
    public function handleError(\PDOStatement $stmt): void
    {
        if ($stmt->errorCode() !== '00000') {
            die("Mamaannn....");
        }
    }

    /**
     * @param array $data
     */
    protected function cleanUp(array &$data): void
    {
        $data = array_map("self::cleanUpCallBack", $data);
    }

    /**
     * @param $element
     * @return string
     */
    function cleanUpCallBack($element)
    {
        return \htmlentities($element);
    }

    /**
     * Return all records or null.
     *
     * @return array|null
     */
    abstract public function findAll(): ?array;

    /**
     * Insert a new record.
     *
     * @param array $data
     *
     * @return int|null
     */
    abstract public function add(array $data): ?array;
}
