## Authentication

The FreshCom API handles authentication through OAuth2. The client must first obtain an Access Token using a Resource Owner's credential or Refresh Token, then authenticate each request by sending the Access Token in the HTTP `Authorization` header.

- **Access Token**: Access Token are short lived token (usually expires in 1 hour) that the client send through the `Authorization` HTTP header to authenticate itself. Access Token are considered secret and cannot be revoked easily so the client should never store it anywhere, only keep it in memory.

- **Refresh Token**: Refresh Token are long lived token (usually expires in 2 weeks) that the client use to get a new Access Token. Refresh Token can be revoked easily in case it is compromised. Refresh Token can either be obtained using Resource Owner's credential or from the FreshCom Dashboard.

There are 3 types Access Token in FreshCom and each Access Token have a corresponding Refresh Token:

- **Storefront Access Token (SAT)**: Using a Storefront Access Token, the client can access the account's resources that is available to the public. For example listing all active products.

- **Customer Access Token (CAT)**: Using a Customer Access Token, the client can access whatever Storefront Access Token allows it to access and in addition to that allow the client to access customer specific resources. For example the customer's orders.

- **User Access Token (UAT)**: Using a User Access token the client can access a subset or all resources of an account as defined by the user's role in the FreshCom Dashboard. User Access Token provides the client with the highest privilege.

### Obtain a SAT

To obtain a Storefront Access Token, the client must have the Storefront Refresh Token which can be obtained from the FreshCom Dashboard. The Storefront Refresh Token is considered public and it never expires, so this can be hard coded to the client-side code as desired. With the Storefront Access Token available, the client can now make a POST request to `/v1/token` using the Storefront Refresh Token to get a Storefront Access Token.

The Storefront Access Token that the client get back will be valid for 1 hour, before it expires it is the client's responsiblity to get a new Storefront Access Token using the same process as above.

#### Example Request

```http
POST /v1/token HTTP/1.1
Host: api.freshcom.io
Content-Type: application/x-www-form-urlencoded
```

```http
grant_type=refresh_token&refresh_token=827ae785-1502-4489-8a97-609c4840168f
```

#### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
Cache-Control: no-store
Pragma: no-cache
```

```http
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "827ae785-1502-4489-8a97-609c4840168f"
}
```

### Obtain a CAT

To obtain a Customer Access Token for the first time, the client must make a POST request to `/v1/token` passing in:

1. the Customer's credential; and

2. `scope=customer`

The Response that the client get back will contain a Customer Access Token and a Customer Refresh Token. The client should store both tokens, Customer Access Token should only be stored in memory, Customer Refresh Token can be stored in cookie or local storage if the client needs remember the Customer.

The Customer Access Token will be valid for 1 hour, before it expires it is the client's responsiblity to get a new Customer Access Token using the Customer Refresh Token through the same endpoint as above. When requesting using Customer Refresh Token, the `scope` parameter can be omitted and the response that the client get back is the same as requesting using Customer's credential. The client may get a new Customer Refresh Token, so it is important that the client always store and use the newest Customer Refresh Token.

By default a Customer Refresh Token is valid for 2 weeks, which means the longest time the client can remember a Customer without needing them to provide their credential again is 2 weeks. However, this duration can be changed through the FreshCom Dashboard to maximum 1 year.


#### Example Request using Customer Credential

```http
POST /v1/token HTTP/1.1
Host: api.freshcom.io
Content-Type: application/x-www-form-urlencoded
```

```http
grant_type=password&scope=customer&username=test1@example.com&password=A3ddj3w
```

#### Example Request using Customer Refresh Token

```http
POST /v1/token HTTP/1.1
Host: api.freshcom.io
Content-Type: application/x-www-form-urlencoded
```

```http
grant_type=refresh_token&refresh_token=827ae785-1502-4489-8a97-609c4840169f
```

#### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
Cache-Control: no-store
Pragma: no-cache
```

```http
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "827ae785-1502-4489-8a97-609c4840168f"
}
```

### Obtain a UAT

To obtain a User Access Token for the first time, the client must make a POST request to `/v1/token` passing in:

1. the User's credential; and

2. `scope=user`

The Response that the client get back will contain a User Access Token and a User Refresh Token. The client should store both tokens, User Access Token should only be stored in memory, User Refresh Token can be stored in cookie or local storage if the client needs remember the User.

By default the User Access Token the client get back will be for the default Account of that User. However, a User may have access to multiple accounts, to request User Access Token for a specific account the client need to set the `scope` parameter accordingly: `scope=user,aid:{account_id}`. The `account_id` can be found through the FreshCom Dashboard.

The User Access Token will be valid for 1 hour, before it expires it is the client's responsiblity to get a new User Access Token using the User Refresh Token through the same endpoint as above. When requesting using User Refresh Token, the `scope` parameter can be omitted and the response that the client get back is the same as requesting using User's credential. The client may get a new User Refresh Token, so it is important that the client always store and use the newest User Refresh Token.

By default a User Refresh Token is valid for 2 weeks, which means the longest time the client can remember a User without needing them to provide their credential again is 2 weeks. However, this duration can be changed through the FreshCom Dashboard to maximum 1 year.


#### Example Request using User Credential

```http
POST /v1/token HTTP/1.1
Host: api.freshcom.io
Content-Type: application/x-www-form-urlencoded
```

```http
grant_type=password&scope=user,aid:827ae785-1502-4489-8a97-609c4840169f&username=test1@example.com&password=A3ddj3w
```

#### Example Request using User Refresh Token

```http
POST /v1/token HTTP/1.1
Host: api.freshcom.io
Content-Type: application/x-www-form-urlencoded
```

```http
grant_type=refresh_token&refresh_token=827ae785-1502-4489-8a97-609c4840169f
```

#### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
Cache-Control: no-store
Pragma: no-cache
```

```http
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "827ae785-1502-4489-8a97-609c4840168f"
}
```


## Authorization

### SAT

Using a Storefront Access Token, the client have the following access:

Endpoints                         |
----------------------------------|----------------------
`GET /v1/products`                | Only Product with status `active` will be returned
`GET /v1/product_collections`     | Only Product Collection with status `active` will be returned
`POST /v1/orders`                 | Only Order with status `cart` will be successfully created
`GET /v1/orders/:id`              | Only Order with status `cart` will be returned



### CAT

### UAT

## Custom Data

FreshCom API allow you to add custom data to any resources you create. Custom Data can be any valid JSON object. Custom Data can be translated as well.

#### Example Request for adding Custom Data

```http
PATCH /v1/skus/33768c8a-a7e7-448e-ad2c-4279228b5bf4 HTTP/1.1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {token}
```

```json
{
  "data": {
    "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
    "type": "Sku",
    "attributes": {
      "name": "Apple",
      "customData": {
        "kind": "Gala"
      }
    }
  }
}
```

## Errors

## I18n

FreshCom API provides full support for I18n. Resources that support i18n can be have their attributes in unlimited number of languages. The default language is `en` and language can be changed by setting the `locale` query parameter. Every resources have a `locale` attribute, its value will always match the `locale` query parameter that used to get that resource. The `locale` attribute can be useful for caching purpose so that client can know which language the resource is in.

#### Example Request for creating resource with locale

```http
POST /v1/skus?locale=en HTTP/1.1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer jwt.token
```

```json
{
  "data": {
    "type": "Sku",
    "attributes": {
      "name": "Apple"
    }
  }
}
```

#### Example Response for creating resource with locale
```http
HTTP/1.1 201 Created
```

```json
{
  "data": {
    "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
    "type": "Sku",
    "attributes": {
      "name": "Apple",
      "locale": "en"
    }
  }
}
```

#### Example Request for updating resource with a different locale
```http
PATCH /v1/skus/33768c8a-a7e7-448e-ad2c-4279228b5bf4?locale=zh-CN HTTP/1.1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer jwt.token
```

```json
{
  "data": {
    "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
    "type": "Sku",
    "attributes": {
      "name": "苹果"
    }
  }
}
```

#### Example Response for updating resource with a different locale
```http
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
    "type": "Sku",
    "attributes": {
      "name": "苹果",
      "locale": "zh-CN"
    }
  }
}
```

#### Example Response for getting resource with locale

```http
GET /v1/skus/33768c8a-a7e7-448e-ad2c-4279228b5bf4?locale=en HTTP/1.1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer jwt.token
```

#### Example Response for getting resource with locale
```http
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
    "type": "Sku",
    "attributes": {
      "name": "Apple",
      "locale": "en"
    }
  }
}
```

#### Example Request for getting resource with a different locale

```http
GET /v1/skus/33768c8a-a7e7-448e-ad2c-4279228b5bf4?locale=zh-CN HTTP/1.1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer jwt.token
```

#### Example Response for getting resource with a different locale

```http
HTTP/1.1 200 OK
```

```json
{
  "data": {
    "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
    "type": "Sku",
    "attributes": {
      "name": "苹果",
      "locale": "zh-CN"
    }
  }
}
```


## Includes

## Pagination

## Versioning

## Webhook