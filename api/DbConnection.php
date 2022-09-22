<?php

class DbConnection
{
    private $server         = "127.0.0.1";
    private $db_name        = "products_api";
    private $username       = "root";
    private $password       = "";

    public function connect()
    {
        try {
            $conn =  new PDO(
                'mysql:host=' . $this->server . ';dbname=' . $this->db_name,
                $this->username,
                $this->password
            );
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Database Error: " . $e->getMessage();
        }
    }
}
