<?php
/**
 * Created by Alexandr Krivonos
 * Email: krausweb291985@gmail.com
 * Date: 12/15/15
 * Time: 8:51 PM
 */

header("Access-Control-Allow-Origin: *"); // or allowed sites/IP
header("Content-Type: application/json");



if(isset($_GET["dev"]) and $_GET["dev"] == 1) {
    ini_set("display_errors", 1);
    error_reporting(E_ALL);
}

// for POST/PUT/PATCH
$data_json = file_get_contents("php://input");
$data = ($data_json) ? json_decode($data_json, true) : "";



if($_SERVER["REQUEST_METHOD"] == "HEAD") {
    ## check work server
    exit( header("HTTP/1.1 200 Ok") );

}elseif($_SERVER["REQUEST_METHOD"] == "POST"){
    ## some INSERT(CREATE) actions with $data["input_data"]

    // for convert /test '' 'text &#34; data;/ -> /test '' 'text " data/ ($sanitize rest.js)
    // htmlspecialchars_decode($data["input_data"])
    // ...

    $some_flag_success = true;

    if($some_flag_success and !empty($data["input_data"])) {
        header("HTTP/1.1 201 Created");
        header("Location: /frontend/partials/SOME_PAGE_TYPE/SOME_ID");
        $ajax_response_detail = "New SOME_PAGE_TYPE - Created. \n Location: /frontend/partials/SOME_PAGE_TYPE/SOME_ID";
        $ajax_response        = "success";

    }else{
        header("HTTP/1.1 400 Bad Request");
        $ajax_response_detail = "Error: SOME_PAGE_TYPE - Not created.
            Read REST API documentation or example: https://ru.wikipedia.org/wiki/HTTP";
        $ajax_response        = "client error";
    }
    exit( json_encode(array("ajax_response" => $ajax_response, "ajax_response_detail" => $ajax_response_detail)) );

}elseif($_SERVER["REQUEST_METHOD"] == "PUT"){
    ## some UPDATE/else INSERT actions with $data["input_data"]

    // for convert /test '' 'text &#34; data;/ -> /test '' 'text " data/ ($sanitize rest.js)
    // htmlspecialchars_decode($data["input_data"])
    // ...

    $some_flag_success = "insert";

    if($some_flag_success == "update" and !empty($data["input_data"])) {
        header("HTTP/1.1 200 Ok");
        $ajax_response_detail = "SOME_PAGE_TYPE - Updated";
        $ajax_response        = "success";

    }elseif($some_flag_success == "insert" and !empty($data["input_data"])) {
        header("HTTP/1.1 201 Created");
        header("Location: /frontend/partials/SOME_PAGE_TYPE/SOME_ID");
        $ajax_response_detail = "New SOME_PAGE_TYPE - Created. \n Location: /frontend/partials/SOME_PAGE_TYPE/SOME_ID";
        $ajax_response        = "success";

    }else{
        header("HTTP/1.1 405 Method Not Allowed");
        header("Allow: 200, 201");
        $ajax_response_detail = "Error: SOME_PAGE_TYPE - Not created and Not updated. Allowed: update or insert data.
            Read REST API documentation or example: https://ru.wikipedia.org/wiki/HTTP";
        $ajax_response        = "client error";
    }
    exit( json_encode(array("ajax_response" => $ajax_response, "ajax_response_detail" => $ajax_response_detail)) );

}elseif($_SERVER["REQUEST_METHOD"] == "PATCH"){
    ## some UPDATE actions with $data["input_data"]

    // for convert /test '' 'text &#34; data;/ -> /test '' 'text " data/ ($sanitize rest.js)
    // htmlspecialchars_decode($data['input_data'])
    // ...

    $some_flag_success = true;

    if($some_flag_success and !empty($data["input_data"])) {
        header("HTTP/1.1 200 Ok");
        $ajax_response_detail = "SOME_PAGE_TYPE - Updated";
        $ajax_response        = "success";

    }else{
        header("HTTP/1.1 405 Method Not Allowed");
        header("Allow: 200");
        $ajax_response_detail = "Error: SOME_PAGE_TYPE - Not updated. Allowed: update.
            Read REST API documentation or example: https://ru.wikipedia.org/wiki/HTTP";
        $ajax_response        = "client error";
    }
    exit( json_encode(array("ajax_response" => $ajax_response, "ajax_response_detail" => $ajax_response_detail)) );

}elseif($_SERVER["REQUEST_METHOD"] == "DELETE") {
    ## some DELETE actions/elements

    $some_flag_success = true;

    if($some_flag_success) {
        header("HTTP/1.1 204 No Content");
        // 204 does not answer

    }else{
        header("HTTP/1.1 400 Bad Request");
        $ajax_response_detail = "Error: SOME_PAGE_TYPE - Not Deleted.
            Read REST API documentation or example: https://ru.wikipedia.org/wiki/HTTP";
        $ajax_response        = "client error";
    }
    exit( json_encode(array("ajax_response" => $ajax_response, "ajax_response_detail" => $ajax_response_detail)) );

}elseif($_SERVER["REQUEST_METHOD"] == "GET") {
    ## some GET actions/read for one or list elements
    $ajax_response_get = "";

    if(isset($_GET["get"]) and is_numeric($_GET["get"])) {
        // EDIT come ID

        // some select DB
        $data_some_page = "some_select_db";

        if($data_some_page){
            $ajax_response_get = $data_some_page; //$data_some_page[0][0] - array("Yii2");
            $some_flag_success = "edit";
        }else{
            $some_flag_success = "not_found";
        }

    }elseif(isset($_GET["get"]) and $_GET["get"] == 'list'){
        // get LIST

        // some select DB
        $data_some_page = "some_select_db";

        if($data_some_page){
            $ajax_response_get = $data_some_page; //$data_some_page - array("Yii2", "Laravel", "Symphony2");
            $some_flag_success = "list";
        }else{
            $some_flag_success = "not_found";
        }

    }else{
        $some_flag_success = false;
    }


    if($some_flag_success == 'edit' or $some_flag_success == 'list') {
        // one or more get elements
        header("HTTP/1.1 200 Ok");
        $ajax_response_detail = "Get one SOME_PAGE_TYPE or list SOME_PAGE_TYPE.";
        $ajax_response        = "success";

    }elseif($some_flag_success == 'not_found') {
        // one or more get elements
        header("HTTP/1.1 404 Not Found");
        $ajax_response_detail = "SOME_PAGE_TYPE not found.";
        $ajax_response        = "client error";

    }else{
        header("HTTP/1.1 400 Bad Request");
        $ajax_response_detail = "Error: Get SOME_PAGE_TYPE not execute.
            Read REST API documentation or example: https://ru.wikipedia.org/wiki/HTTP";
        $ajax_response        = "client error";
    }
    exit( json_encode(array("ajax_response" => $ajax_response, "ajax_response_detail" => $ajax_response_detail,
                            "ajax_response_get" => $ajax_response_get)) );

}elseif($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    ## some OPTIONS actions

    header("HTTP/1.1 200 Ok");
    header("Allow: HEAD, POST, PUT, PATCH, DELETE, GET, OPTIONS");
    exit( json_encode(array("ajax_response" => "success", "ajax_response_detail" => "Allow methods: HEAD, POST, PUT, PATCH, DELETE, GET, OPTIONS")) );

}else{
    ## Unknown method
    header("HTTP/1.1 456 Unrecoverable Error");
    exit( json_encode(array("ajax_response"=>"client error", "ajax_response_detail"=> "Error: Unknown method or unknown error")) );
}