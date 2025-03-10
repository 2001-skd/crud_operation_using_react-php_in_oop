<?php
class User{
    private $conn;
    private $table = "users";

    public $id;
    public $name;
    public $email;
    public $mobile;

    public function __constructor($db){
        $this->conn = $db;
    }

    // create user function starts
    public function createUser($data){
        $query = "INSERT INTO ".$this->table." (name,email,mobile) VALUES (:name,:email,:mobile)";

        $stmt = $this->conn->prepare($query);

        $stmt->bind_param(":name",$data->name);
        $stmt->bind_param(":email",$data->email);
        $stmt->bind_param(":mobile",$data->mobile);

        if($stmt->execute()){
            return true;
        }
        return false;
    }
    // create user function ends
}

?>