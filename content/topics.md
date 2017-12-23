## Introduction

The Freshcom API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). The API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients. We support [cross-origin resource sharing](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing), allowing you to interact securely with our API from a client-side web application. JSON is returned by all API responses, including errors.

The Freshcom API tries to follow [JSONAPI v1.0 Specification](http://jsonapi.org/) as much as possible. It is recommended you briefly read through the spec to understand the general format of the API.

## Authentication

The Freshcom API handles authentication through OAuth2. The client must first obtain an access token using a resource owner's credential or refresh token, then authenticate each request by sending the access token in the HTTP `Authorization` header.

- **Access Token**: Access token are short lived token that usually expires in 1 hour. The client send the access token through the `Authorization` HTTP header to authenticate itself. Access token are considered secret and cannot be revoked easily so the client should never store it anywhere, only keep it in memory.

- **Refresh Token**: Refresh token are long lived token that by default expires in 2 weeks. The client use refresh token to get a new access token. Refresh token can be revoked easily in case it is compromised. Refresh token can either be obtained using resource owner's credential or from the Freshcom Dashboard.

There are 2 types access token in Freshcom and each type of access token have a corresponding refresh token:

- **Publishable Access Token (PAT)**: Using a publishable access token, the client can access the account's resources that is available to the public. For example listing all active products.

- **User Access Token (UAT)**: Using a user access token the client can access a subset or all resources of an account as defined by the user's role in the Freshcom Dashboard.

### Obtain a PAT

To obtain a publishable access token, the client must have the publishable refresh token which can be obtained from the Freshcom Dashboard. The publishable refresh token is considered public and it never expires, so this can be hard coded to the client-side code as desired. With the publishable refresh token available, the client can now make a POST request to `/v1/token` to get a publishable access token.

The publishable access token that the client get back will be valid for 1 hour, before it expires it is the client's responsiblity to get a new publishable access token using the same process as above.

#### Example Request

```http
POST /v1/token HTTP/1.1
Host: api.freshcom.io
Content-Type: application/x-www-form-urlencoded
```

```http
grant_type=refresh_token&refresh_token=prt-test-827ae785-1502-4489-8a97-609c4840168f
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
  "refresh_token": "prt-test-827ae785-1502-4489-8a97-609c4840168f"
}
```

### Obtain a UAT

To obtain a user access token for the first time, the client must make a POST request to `/v1/token` passing in the user's credentials.

The response that the client get back will contain a user access token and a user refresh token. The client should store both tokens, user access token should only be stored in memory, user refresh token can be stored in cookie or local storage if the client needs remember the user.

By default the user access token that the client get back will be for the default account of that user. However, a user may have access to multiple accounts, to request a user access token for a specific account the client need to set the `scope` parameter accordingly: `scope=account_id:{account_id}`. The `account_id` can be found through the Freshcom Dashboard.

The user access token will be valid for 1 hour, before it expires it is the client's responsiblity to get a new user access token using the user refresh token through the same endpoint as above. When requesting using user refresh token, the `scope` parameter can be omitted and the response that the client get back is the same as requesting using user's credential. The client may get a new user refresh token, so it is important that the client always store and use the newest user refresh token.

By default a user refresh token is valid for 2 weeks, which means the longest time the client can remember a user without needing them to provide their credential again is 2 weeks. However, this duration can be changed through the Freshcom Dashboard to maximum 1 year.


#### Example Request

```http
POST /v1/token HTTP/1.1
Host: api.freshcom.io
Content-Type: application/x-www-form-urlencoded
```

```http
grant_type=password&scope=account_id:aid-test-827ae785-1502-4489-8a97-609c4840169f&username=test1@example.com&password=A3ddj3w
```

#### Example Request

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

Freshcom uses role based authorization, each user of Freshcom is assigned a single
role. You are free to change the user's role through the API or Freshcom Dashboard.
For a list of available roles please see ...

Through out the API reference we may refer to a user with a specific role simply as
"{role} user" where {role} can be any of the available roles. For example a guest user
means a user with role `guest` and customer user means a user with role `customer`.

### PAT

Using a Publishable Access Token, the client have the following access:

Endpoints                         |
----------------------------------|----------------------
`GET /v1/products`                | Only Product with status `active` will be returned
`GET /v1/product_collections`     | Only Product Collection with status `active` will be returned
`POST /v1/orders`                 | Only Order with status `cart` will be successfully created
`GET /v1/orders/:id`              | Only Order with status `cart` will be returned


### UAT

## Custom Data

Freshcom API allow you to add custom data to any resources you create. Custom Data can be any valid JSON object. Custom Data can be translated as well.

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

Freshcom API provides full support for I18n. Resources that support i18n can be have their attributes in unlimited number of languages. The default language is `en` and language can be changed by setting the `locale` query parameter. Every resources have a `locale` attribute, its value will always match the `locale` query parameter that used to get that resource. The `locale` attribute can be useful for caching purpose so that client can know which language the resource is in.

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