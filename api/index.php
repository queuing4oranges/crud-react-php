<?php
header("Access-Control-Allow-Origin: *");  //solving CORS issue
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *"); //spec allowing methods other than post/get (we have put)

// echo "halloTesting";

//create an obj of db class
include 'DbConnection.php';
$objDb = new DbConnection;
$conn = $objDb->connect();      //make obj, use method on it
// var_dump($conn);

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET": //modifying here for the update method
        $sql = "SELECT * FROM products";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        // $path = explode('/', $_SERVER['REQUEST_URI']);  //checking on which position is the ID being used
        // print_r($path);

        if (isset($path[5]) && is_numeric($path[5])) {        //if this id is set, then go and cocatenate sth to the sql above
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            //now we have to bind a parameter here:
            $stmt->bindParam(':id', $path[5]);
            $stmt->execute();
            $products = $stmt->fetch(PDO::FETCH_ASSOC);     //this time only fetch (nocht fetchAll)
        } else {            //else - do what we do when fetching all (instead of one)
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC); //so it will return assoc array response
        }
        echo json_encode($products); //when we get data - encode it 
        break;


        // case "GET":
        //     $sql = "SELECT * FROM products";        //this is for all products - above it is modified to get it for one product as well
        //     $stmt = $conn->prepare($sql);
        //     $stmt->execute();
        //     $products = $stmt->fetchAll(PDO::FETCH_ASSOC); //so it will return assoc array response
        //     echo json_encode($products);
        //     //when we get data - encode it
        //     break;


    case "POST":
        $product = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO products(id, sku, title, price) VALUES (null, :sku, :title, :price)"; //use ? or :name
        $stmt = $conn->prepare($sql);   //use conn obj and call prepare fct on it, it will then return a stmt obj

        $stmt->bindParam(':sku', $product->sku);
        $stmt->bindParam(':title', $product->title);    //binding data
        $stmt->bindParam(':price', $product->price);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => "Product added successfully."];
        } else {
            $response = ['status' => 0, 'message' => "Could not add product."];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $product = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE products SET sku=:sku, title=:title, price=:price WHERE id = :id";
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':id', $product->id);

        $stmt->bindParam(':sku', $product->sku);
        $stmt->bindParam(':title', $product->title);
        $stmt->bindParam(':price', $product->price);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => "Product updated successfully."];
        } else {
            $response = ['status' => 0, 'message' => "Could not update product."];
        }
        echo json_encode($response);
        break;

    case "DELETE":

        $sql = "DELETE FROM products WHERE id=:id";
        $path = explode('/', $_SERVER['REQUEST_URI']);  //finding id with explode method

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[5]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => "Product deleted successfully."];
        } else {
            $response = ['status' => 0, 'message' => "Could not delete product."];
        }
        echo json_encode($response);
        break;
}
