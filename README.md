# ScalableServices Assignment

## Run
docker-compose up --build

## Test Order API
POST http://localhost:3003/v1/orders

Headers:
Idempotency-Key: 123

Body:
{
  "items": [
    { "sku": "SKU1", "qty": 1 }
  ]
}