<?php
header("Access-Control-Allow-Origin: *");  // Permite solicitudes desde cualquier origen
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type"); // Cabeceras permitidas
session_start(); 

if (isset($_SESSION['username'])) {

    session_unset();
    session_destroy(); 


    echo json_encode(["status" => "success", "mensaje" => "Sesión cerrada exitosamente."]);
} else {

    echo json_encode(["status" => "error", "mensaje" => "No hay sesión activa."]);
}