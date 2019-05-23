<?php

namespace Helper;

class PdoConnexion
{
    /**
     * @var null|\PDO
     */
    private static $conn = null;

    /**
     * PdoConnexion constructor.
     * private visibility prevents instantiation of the class
     */
    private function __construct()
    { }

    /**
     * returns a \PDO instance
     * @return \PDO
     */
    public static function get()
    {
        if (\is_null(self::$conn)) {
            // instantiate PDO connexion
            try {
                self::$conn = new \PDO('mysql:host=localhost;dbname=dataviz;port=3306', 'root', 'root');
                self::$conn->exec("SET NAMES UTF8");
            } catch (\PDOException $exception) {
                die($exception->getMessage());
            }
        }

        return self::$conn;
    }
}
