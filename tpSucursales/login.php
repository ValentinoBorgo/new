<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');

// Incluir la conexión
include 'conexion2.php';

$data = json_decode(file_get_contents("php://input"));

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($data->username) && isset($data->password)) {
    $username = $data->username;
    $password = $data->password;

    // Conexión a la base de datos
    $conn = db_connect();

    // Verificar si el nombre de usuario existe
    $checkSql = "SELECT * FROM usuarios WHERE username = ?";
    $stmt = $conn->prepare($checkSql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Verificar la contraseña
        if (password_verify($password, $user['password'])) {
            // Iniciar sesión
            session_start();
            $_SESSION['user_id'] = $user['id']; // Almacenar el ID del usuario en la sesión
            $_SESSION['username'] = $user['username']; // Almacenar el nombre de usuario

            echo json_encode(["status" => "success", "mensaje" => "Inicio de sesión exitoso"]);
        } else {
            echo json_encode(["status" => "error", "mensaje" => "Nombre de usuario o contraseña incorrectos"]);
        }
    } else {
        echo json_encode(["status" => "error", "mensaje" => "Nombre de usuario o contraseña incorrectos"]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "mensaje" => "Datos incompletos"]);
}
?>


