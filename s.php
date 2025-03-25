<?php
// Database connection
$servername = "localhost";
$username = "root";  // Default user for XAMPP
$password = "";      // No password for XAMPP by default
$dbname = "quizresults";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if data is received via POST method
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get user name and score
    $name = $_POST['name'];
    $score = $_POST['score'];

    // Insert data into the database
    $stmt = $conn->prepare("INSERT INTO results (name, score) VALUES (?, ?)");
    $stmt->bind_param("si", $name, $score);

    if ($stmt->execute()) {
        echo "Your result has been saved!";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request!";
}
?>
