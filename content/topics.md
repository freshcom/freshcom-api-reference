## Introduction

The Freshcom API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). The API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients. We support [cross-origin resource sharing](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing), allowing you to interact securely with our API from a client-side web application. JSON is returned by all API responses, including errors.

The Freshcom API tries to follow [JSONAPI v1.0 Specification](http://jsonapi.org/) as much as possible. It is recommended you briefly read through the spec to understand the general format of the API. If you find any of our endpoint that does not comply with [JSONAPI v1.0 Specification](http://jsonapi.org/) please open an issue [here](http://github.com) and we will address it as soon as possible.

## Authentication

The Freshcom API handles authentication through OAuth2. The client must first obtain an access token using a resource owner's credential or refresh token, then authenticate each request by sending the access token in the HTTP `Authorization` header.

- **Access Token**: Access token are short lived token that usually expires in 1 hour. The client send the access token through the `Authorization` HTTP header to authenticate itself. Access token are considered secret and cannot be revoked easily so the client should never store it anywhere, only keep it in memory.

- **Refresh Token**: Refresh token are long lived token. In the alpha version, refresh token will never expires. In the upcoming beta version the expires time can be set through the Freshcom Dashboard. The client can use refresh token to get a new access token. Refresh token can be revoked easily in case it is compromised. Refresh token can either be obtained using user's credential or from the Freshcom Dashboard.

There are 2 types access token in Freshcom and each type of access token have a corresponding refresh token:

- **Publishable Access Token (PAT)**: Using a publishable access token, the client can access the account's resources that is available to the public. For example listing all active products. This access token allow the client to act as a guest user.

- **User Access Token (UAT)**: Using a user access token the client can access a subset or all resources of an account as defined by the user's role in the Freshcom Dashboard.

### Obtain a PAT

To obtain a publishable access token, the client must have the publishable refresh token which can be obtained from the Freshcom Dashboard. The publishable refresh token is considered public and it never expires, so this can be hard coded to the client-side code as desired. With the publishable refresh token available, the client can now make a POST request to `/v1/token` to get a publishable access token.

The publishable access token that the client get back will be valid for 1 hour, before it expires it is the client's responsiblity to get a new publishable access token using the same process as above.

If you are using the Freshcom Javascript SDK then refreshing access token can be handled by the SDK automatically. Please read the SDK guide: [Auto Refreshing Access Token](http://example.com).

#### Definition

```http
POST /v1/token
```

```javascript
freshcom.createToken(data)
```

#### Example Request

```http
POST /v1/token
Host: api.freshcom.io
Content-Type: application/x-www-form-urlencoded
```

```http
grant_type=refresh_token&refresh_token=prt-test-827ae785-1502-4489-8a97-609c4840168f
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.createToken({
  refresh_token: 'prt-test-827ae785-1502-4489-8a97-609c4840168f',
  grant_type: 'refresh_token'
}).then(function (token) {
  console.log(token)
}).catch(function (error) {
  console.log(error)
})
```

#### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "prt-test-827ae785-1502-4489-8a97-609c4840168f"
}
```

### Obtain a UAT

To obtain a user access token for the first time, the client must make a POST request to `/v1/token` passing in the user's credentials and set the scope to `scope=aid:{account_id}`. If the scope is not set or the `account_id` provided is invalid you will get a invalid request response. Your `account_id` can be found through the Freshcom Dashboard.

The user access token will be valid for 1 hour, before it expires it is the client's responsiblity to get a new user access token using the user refresh token through the same endpoint as above.

When requesting access token using user refresh token, the `scope` parameter can be omitted, the resulting access token will always have the same scope as before. However, the client may get a new user refresh token with the new access token, so it is important that the client always store and use the newest user refresh token.

#### Definition

```http
POST /v1/token
```

```javascript
freshcom.createToken(data)
```

#### Example Request

```http
POST /v1/token
Host: api.freshcom.io
Content-Type: application/x-www-form-urlencoded
```

```http
grant_type=password&scope=aid:aid-test-827ae785-1502-4489-8a97-609c4840169f&username=test@example.com&password=supersecurepassword
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.createToken({
  username: 'test@example.com',
  password: 'supersecurepassword',
  grant_type: 'password',
  scope: 'aid:{account_id}'
}).then(function (token) {
  console.log(token)
}).catch(function (error) {
  console.log(error)
})
```

#### Example Request

```http
POST /v1/token
Host: api.freshcom.io
Content-Type: application/x-www-form-urlencoded
```

```http
grant_type=refresh_token&refresh_token=827ae785-1502-4489-8a97-609c4840169f
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.createToken({
  refresh_token: 'urt-test-827ae785-1502-4489-8a97-609c4840168f',
  grant_type: 'refresh_token'
}).then(function (token) {
  console.log(token)
}).catch(function (error) {
  console.log(error)
})
```


#### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "urt-test-827ae785-1502-4489-8a97-609c4840168f"
}
```

### Two Factor Auth

Freshcom also supports two factor authentication (TFA) for business that require extra security for their customer. To enable TFA you must set `authMethod` on the user resource that you want to enable TFA to `tfa_email` or `tfa_sms`. You can also set the `defaultAuthMethod` on the account resource to make user use a specific authentication method by default.

After you enable TFA for a user, obtaining UAT require an one time password (OTP) in addition to the user's username and password. The process for obtaining UAT for a TFA-enabled user is as follow:

1. Try obtain UAT like normal by providing just the username and password.

2. Freshcom API will return an error, with a special header `X-Freshcom-OTP: required; auth_method=tfa_sms`. This means an OTP has been sent using that specific method. If `auth_method=tfa_email` then OTP is sent using email, if using `auth_method=tfa_sms` then OTP is sent using text messages.

3. Prompt the user to enter the OTP they received.

4. Obtain UAT by sending the username, password and an additional header `X-Freshcom-OTP: {otp}`.

5. If everything is valid, Freshcom API will return the UAT.

**Note:** If the username and password the user provide is not valid, then Freshcom API will return an error but there will be no `X-Freshcom-OTP` header. That header will only be set if the usernamd and password provided in step 1 is valid.

#### Example Request for step 1

```http
POST /v1/token
Host: api.freshcom.io
Content-Type: application/x-www-form-urlencoded
```

```http
grant_type=password&scope=aid:aid-test-827ae785-1502-4489-8a97-609c4840169f&username=test@example.com&password=supersecurepassword
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.createToken({
  username: 'test@example.com',
  password: 'supersecurepassword',
  grant_type: 'password',
  scope: 'aid:{account_id}'
}).then(function (token) {
  console.log(token)
}).catch(function (error) {
  console.log(error)
})
```

#### Example Response for step 1

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json
X-Freshcom-OTP: required; auth_method=tfa_sms
```

```json
{
  "error": "invalid_request",
  "error_description": "OTP is invalid, please set OTP using the X-Freshcom-OTP header."
}
```

#### Example Request for step 4

```http
POST /v1/token
Host: api.freshcom.io
Content-Type: application/x-www-form-urlencoded
X-Freshcom-OTP: {OTP}
```

```http
grant_type=password&scope=aid:aid-test-827ae785-1502-4489-8a97-609c4840169f&username=test@example.com&password=supersecurepassword
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.createToken({
  username: 'test@example.com',
  password: 'supersecurepassword',
  grant_type: 'password',
  otp: '{otp}'
}).then(function (token) {
  console.log(token)
}).catch(function (error) {
  console.log(error)
})
```

#### Example Response for step 4

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "urt-test-827ae785-1502-4489-8a97-609c4840168f"
}
```


## Authorization

Freshcom uses role based authorization, each user of Freshcom is assigned a single role and each role have a specific set of permissions. You are free to change the user's role through the API or Freshcom Dashboard. Right now there is no way to create new role or to change the permissin of each role, however such feature may be available in the future. Here is a list of avilable roles:

- `customer`
- `support_specialist`
- `marketing_specialist`
- `goods_specialist`
- `business_analyst`
- `developer`
- `administrator`

If a client is using a PAT to access the API on behalf of a user then we consider the user to have a `guest` role.

Through out the API reference we may refer to a user with a specific role simply as "{role} user" where {role} can be any of the available roles. For example a customer user means a user with role `customer` and a developer user means a user with role `developer`.

**Note**: Freshcom API also has have a resource named "Customer", it is not to be confused with a user with `customer` role. Please see [customer](http://example.com) for more detail.

## Custom Data

Freshcom API allow you to add custom data to most of the resources you create. Custom data can be any valid JSON object. Custom data can be translated as well (see [Internalization](http://example.com)) .

Custom data are allowed for the following resource:

- User
- Account
- Account Membership

#### Example Request

```http
PATCH /v1/stockables/33768c8a-a7e7-448e-ad2c-4279228b5bf4
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {token}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.updateStockable('33768c8a-a7e7-448e-ad2c-4279228b5bf4', {
  name: 'Warp Drive',
  customData: {
    size: 'Micro'
  }
}).then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```

```json
{
  "data": {
    "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
    "type": "Stockable",
    "attributes": {
      "name": "Warp Drive",
      "customData": {
        "size": "Micro"
      }
    }
  }
}
```

## Errors

Freshcom API return errors according to the spec defined in [JSONAPI v1.0 Specification](http://jsonapi.org/). Each error object contains 3 keys:

- `code` - Unique identifier for the type of the error, this key can be used for client side translations.

- `source` - A pointer to the source that caused error if any.

- `title` - A human readable message in English. Client side code should not dependent on this message as Freshcom may change the content of the huamn readable message from time to time. It is recommended client compose their own human readable mssage using the error code.

#### Example Response with errors

```json
{
  "errors": [
    {
      "code": "required",
      "source": {
        "pointer": "/data/attributes/name"
      },
      "title": "Name is required"
    }
  ]
}
```

## Event

Freshcom API fires event for most of the endpoints. These events can be used to trigger [notification](#notification) like [webhook](#webook), [email](#email) or [SMS](#sms). Each event in Freshcom is identified with its name in the format of `{module}.{resource}.{action}.{result}` for example `identity.account.updated.success`.

Each event also comes with associated event data. The event data comes in different format depending on the triggering action.

If the triggering action is a webhook call then the event data will be the same as any Freshcom API response with a few meta info added. If additional information is needed it is up your implementation to make additional request to Freshcom API to get it.

If the triggering action is to send an email or SMS then the event data will be in a deserialize format with as much information as we think fit, since in this case you do not have control over what additional data to retrieve. We use a deserialized format so that you can easily access the information you need in your email or SMS template like `{{account.name}}` instead of `{{data.attributes.name}}`.


#### Example Request to Webhook

```http
POST {your_webhook_path}
Host: {your_webhook_host}
Content-Type: application/vnd.api+json
```

```http
{
  "meta": {
    "locale": "en",
    "eventName": "identity.account.updated.success"
  },
  "data": {
    "type": "Account",
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "attributes": {
      "status": "active",
      "name": "Starship Manufacturing",
      "companyName": "Starship Manufacturing Inc",
      "mode": "live",
      "defaultLocale": "zh-CN",
      "defaultAuthMethod": "simple",
      "websiteUrl": "https://example.com",
      "supportEmail": "",
      "techEmal": "",
      "testAccountId": "9fdd716d-7222-46e4-aaeb-0d798063c463",
      "apiVersion": "20180331",
      "caption": null,
      "description": null,
      "customData": {}
    }
  }
}
```


#### Example Event Data for Email and SMS

```json
{
  "meta": {
    "locale": "en"
  },
  "account": {
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "status": "active",
    "name": "Starship Manufacturing",
    "companyName": "Starship Manufacturing Inc",
    "mode": "live",
    "defaultLocale": "zh-CN",
    "defaultAuthMethod": "simple",
    "websiteUrl": "https://example.com",
    "supportEmail": "",
    "techEmal": "",
    "testAccountId": "9fdd716d-7222-46e4-aaeb-0d798063c463",
    "apiVersion": "20180331",
    "caption": null,
    "description": null,
    "customData": {}
  },
  "user": {
    "name": "Captain Good",
    "email": "cg@example.com",
    "phoneNumber": "1234567890"
  }
}
```



## Internalization

Freshcom API provides full support for internalization (i18n). Resources that support i18n can have their attributes in unlimited number of languages. To request or update a resource under a specific locale just set the `locale` query parameters.

The response from most of the API endpoint will also contain a `meta` object which will have a `locale` key containing the locale of the response. This information can be useful for caching so that client can know which language the response is in.

**Default locale**

When creating a resource, the `locale` query parameter will be ignored and the resource will always be the created in the account's default locale. After the resource is created it can then be updated to have data in other locale using the `locale` query parameter.

#### Example Request for Update
```http
PATCH /v1/stockables/33768c8a-a7e7-448e-ad2c-4279228b5bf4?locale=zh-CN
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
    "type": "Stockable",
    "attributes": {
      "name": "曲速引擎"
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.updateStockable('33768c8a-a7e7-448e-ad2c-4279228b5bf4', {
  name: '曲速引擎',
}, {
  locale: 'zh-CN'
}).then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```

#### Example Response for Update
```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "meta": {
    "locale": "zh-CN"
  },
  "data": {
    "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
    "type": "Stockable",
    "attributes": {
      "name": "曲速引擎"
    }
  }
}
```

#### Example Request for Retrieve

```http
GET /v1/stockables/33768c8a-a7e7-448e-ad2c-4279228b5bf4?locale=zh-CN
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.retrieveStockable('33768c8a-a7e7-448e-ad2c-4279228b5bf4', {
  locale: 'zh-CN'
}).then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```

#### Example Response for Retrieve
```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "meta": {
    "locale": "zh-CN"
  },
  "data": {
    "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
    "type": "Stockable",
    "attributes": {
      "name": "曲速引擎"
    }
  }
}
```

## Includes



## Pagination

## Versioning

## Webhook