<?php
    // Add this at the very beginning of your api.php file

// Allow access from any origin (you can restrict it to a specific origin)
header("Access-Control-Allow-Origin: *");

// Allow specific methods (add DELETE here)
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allow headers like Content-Type, Authorization, etc.
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// If the request is an OPTIONS request (preflight request), respond and exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

?>