# REST API in Go 

This project is a simple REST API created with languaje GO that allows managing the SHIPPMENT domain, specifically for the CREATE microservice. The API offers the basic operation such as creating a new shippment, displaying the SWAGGER documentation technology screen as the main page.
## Project Structure

- **`main.go`**: The main class that runs the Go application and defines the API controller.

- `POST /api/shippment/create`: Allows you to create the customer, under the required columns.

## Requirements

- **GO 1.19** o superior
- **Gestor de dependencias como go mod.**

## Installation

1. **Clone the repository**

    ```bash
    git clone <https://github.com/kevinseya/microservicio-logistic-shipment-assigment.git>
    ```

2. **Install dependencies**

    ```bash
    go mod tidy
    ```

3. The application run on: `http://localhost:8080`.

## Use of endpoint

### 1. POST /api/shippment/create

Create a new customer. The request body must contain the user details in JSON format.
POST request example:
```bash
POST /api/shippment/create Content-Type: application/json
    
    {
    "orderID": '6f80dd84-1db7-4382-8188-70ce9158c3f1',
    "carrierID": '6f80dd84-1db7-4382-8188-70ce9158c3f1'
    }
```
**Response:**
```plaintext
    {
        "message": "Shipment created successfully",
        "shipment-assignment": {
        "shipmentID": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "orderID": "6f80dd84-1db7-4382-8188-70ce9158c3f1",
        "carrierID": "6f80dd84-1db7-4382-8188-70ce9158c3f1",
        "state": "Asigned",
        "dateAsignment": "2025-01-27T19:02:26.434Z"
        }
    }
```
**Response code:**
- **`201 Created:`** Shippment created successfully.
- **`400 Bad Request:`** OrderID and CarrierID are required.
- **`500 Internal Server Error:`** Server error.
