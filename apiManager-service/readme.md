# apiManager-service API Docs

## Endpoints :

List of available endpoints:
​

- `GET /api`
- `POST /api`

## GET /api

Request:

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

_Response (200 - OK)_

```json
{
    "statusCode": 200,
    "data": [
        {
            "id": "integer",
            "endpointUrl": "string",
            "description": "string",
            "status": "string",
            "apiKey": "string",
            "CompanyId": "integer"
        }
        ,
        ...
    ]
}
```

Error :

_Response (400 - Bad Request)_
_Response (500 - Internal Server Error)_
