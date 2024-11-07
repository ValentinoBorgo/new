<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

// Incluir la conexión
include 'conexion2.php';

$data = json_decode(file_get_contents("php://input"));

// Verificar que la solicitud sea POST y que los datos estén presentes y no sean vacíos
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (empty($data->username) || empty($data->password) || empty($data->email)) {
        echo json_encode(["status" => "error", "mensaje" => "Todos los campos son requeridos"]);
        exit();
    }

    $username = $data->username;
    $password = $data->password;
    $email = $data->email;
    
    // Conexión a la base de datos
    $conn = db_connect();

    // Verificar si el nombre de usuario ya existe
    $checkSql = "SELECT * FROM usuarios WHERE username = ?";
    $stmt = $conn->prepare($checkSql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["status" => "error", "mensaje" => "El nombre de usuario ya existe."]);
    } else {
        // Insertar el nuevo usuario con nombre completo
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        $insertSql = "INSERT INTO usuarios (email, username, password) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($insertSql);
        $stmt->bind_param("sss", $email, $username, $hashedPassword);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "mensaje" => "Registro exitoso"]);
        } else {
            echo json_encode(["status" => "error", "mensaje" => "Error en el registro"]);
        }
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "mensaje" => "Método de solicitud no permitido"]);
}
?>


