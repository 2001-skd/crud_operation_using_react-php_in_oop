<?php
class User{
    private $conn;
    private $table = "users";

    public $id;
    public $name;
    public $email;
    public $mobile;

    public function __construct($db){
        $this->conn = $db;
    }

    // create user function starts
    public function createUser($data){
        $query = "INSERT INTO ".$this->table." (name,email,mobile) VALUES (:name,:email,:mobile)";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":name",$data->name);
        $stmt->bindParam(":email",$data->email);
        $stmt->bindParam(":mobile",$data->mobile);

        if($stmt->execute()){
            return true;
        }
        return false;
    }
    // create user function ends

    // read user function starts
    public function readUser(){
        $query = "SELECT * FROM ".$this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    // read user function ends

    // delete user function starts
    public function deleteUser($id){
        $query = "DELETE FROM ".$this->table." WHERE id = :id";
        $stmt=$this->conn->prepare($query);
        $stmt->bindParam(":id",$id);

        if ($stmt->execute()) {
        return true;
    }
    return false;
    }
    // delete user function ends
}

?>