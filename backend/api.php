<?php
require_once 'DataBase.php';
require_once 'Users.php';
include 'cors.php';

$db = new Database();
$database = $db->dbConnect();
var_dump($database);

$user = new User($database);
$request_method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input",true));


switch($request_method){
    case 'POST':
        if($user->createUser($data)){
            echo json_encode(['status'=>1,'message'=>"Record created Successfully"]);
        }
        else{
    echo json_encode(['status'=>0,'message'=>"Something Went Wrong While Creating New User, Please Try Again Later"]);
}

}


?>