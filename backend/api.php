<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require_once 'DataBase.php';
require_once 'Users.php';
include 'cors.php';

$db = new Database();
$database = $db->dbConnect();
// var_dump($database);

$user = new User($database);
$request_method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input",true));


switch($request_method){
    // post method starts
    case 'POST':
        if($user->createUser($data)){
            echo json_encode(['status'=>1,'message'=>"Record created Successfully"]);
        }
        else{
    echo json_encode(['status'=>0,'message'=>"Something Went Wrong While Creating New User, Please Try Again Later"]);
}

    break;
    // post method ends

    


    // get method starts
    case "GET":

        if(isset($_GET['id'])){
            $id = $_GET['id'];
            $users = $user->fetchFormDetailsBasedOnId($id);
        }
        else{
            $users = $user->readUser();
        }

        echo json_encode($users);
        break;
    // get method ends


    // put method starts
    case "PUT":
    parse_str(file_get_contents("php://input"), $put_vars);
    
    
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    
    $name = isset($put_vars['name']) ? $put_vars['name'] : null;
    $email = isset($put_vars['email']) ? $put_vars['email'] : null;
    $mobile = isset($put_vars['mobile']) ? $put_vars['mobile'] : null;

    
    if ($id && $name && $email && $mobile) {
        
        if ($user->updateUser($id, $name, $email, $mobile)) {
            echo json_encode(['status' => 1, 'message' => "Record Updated Successfully"]);
        } else {
            echo json_encode(['status' => 0, 'message' => "Error While Updating Record"]);
        }
    } else {
        echo json_encode(['status' => 0, 'message' => "Invalid data provided"]);
    }
    break;

    // put method ends

    // delete method starts
    case "DELETE":
       $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
       
        if($id && $user->deleteUser( $id )){
            echo json_encode(["status"=> 1,"message"=> "Record Deleted Successfully"]);
        }
        else{
            echo json_encode(["status"=> 0,"message"=> "Something Went Wrong While Deleting Record, Please Try Again Later"]);
        }
        break;
    // delete method ends


    


        

}


?>