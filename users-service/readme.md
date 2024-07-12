# users-service API Docs

## Endpoints :

List of available endpoints:
​

- `POST /login`
- `POST /findUser`

## GET /api

Request:
- Body: 
```json
{
    "email": "string",
    "password": "string"
}
```

_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "data": {
        "email": "string",
        "companyName": "string"
    }
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Bad Request"
}
```

_Response (401 - Invalid)_
```json
{
  "message": "Invalid"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Unauthorized"
}
```