## Introduction

The Freshcom API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). The API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients. We support [cross-origin resource sharing](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing), allowing you to interact securely with our API from a client-side web application. JSON is returned by all API responses, including errors.

The Freshcom API tries to follow [JSONAPI v1.0 Specification](http://jsonapi.org/) as much as possible. It is recommended you briefly read through the spec to understand the general format of the API. If you find any of our endpoint that does not comply with [JSONAPI v1.0 Specification](http://jsonapi.org/) please open an issue [here](http://github.com) and we will address it as soon as possible.

To make the API as explorable as possible, each account is associated with a test account. Simply use the appropriate API credentials to perform request against live or test account. Request made against the test account will never incur any cost.

```javascript
// 1. Create a access token using a administrator's refresh token
freshcom.createAndSetAccessToken({
  refresh_token: 'urt-test-galskerjalkjear',
  grant_type: 'refresh_token'
}).then(function () {
  // 3. Create a stockable goods
  return freshcom.createStockable({
    name: 'My starship',
    unitOfMeasure: 'EA'
  })
}).then(function (response) {
  // 4. Create a product
  return freshcom.createProduct({
    kind: 'kind',
    nameSync: 'syncWithGoods',
    goods: { id: response.data.id, type: 'Stockable' }
  })
}).then(function (response) {
  // 5. Create a price for the product
  return freshcom.createPrice({
    name: 'Regular Price',
    chargeAmountCents: 50000,
    chargeUnit: 'EA',
    product: { id: response.data.id, type: 'Product' }
  })
}).then(function (response) {
  // 6. Launch the product
  return freshcom.updateProduct(response.data.product.id, {
    status: 'active'
  })
})
```

## Authentication

The Freshcom API handles authentication through OAuth2. The client must first obtain an access token using a resource owner's credential or refresh token, then authenticate each request by sending the access token in the HTTP `Authorization` header.

- **Access Token**: Access token are short lived token that usually expires in 1 hour. The client send the access token through the `Authorization` HTTP header to authenticate itself. Access token are considered secret and cannot be revoked easily so the client should never store it anywhere, only keep it in memory.

- **Refresh Token**: Refresh token are long lived token. Right now, refresh token never expires, in the future its expiry time can be set through the Freshcom Dashboard. The client can use refresh token to get a new access token. Refresh token can be revoked easily in case it is compromised. Refresh token can either be obtained using user's credential or from the Dashboard.

There are 2 types access token for the API and each type of access token have a corresponding refresh token:

- **Publishable Access Token (PAT)**: Using a publishable access token, the client can access the account's resources that is available to the public. For example listing all active products. This access token allow the client to act as a guest user.

- **User Access Token (UAT)**: Using a user access token the client can access a subset or all resources of an account as defined by the user's role in the Dashboard.

### Obtain a PAT

To obtain a publishable access token, the client must have the publishable refresh token which can be obtained from the Dashboard. The publishable refresh token is considered public and it never expires, so this can be hard coded to the client-side code as desired. With the publishable refresh token available, the client can now make a POST request to `/v1/token` to get a publishable access token.

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

To obtain a user access token for the first time, the client must make a POST request to `/v1/token` passing in the user's credentials and set the scope to `aid:{account_id}`.

The user access token will be valid for 1 hour, before it expires it is the client's responsiblity to get a new user access token using the user refresh token through the same endpoint as above.

When obtaining access token using user refresh token, the `scope` parameter can be omitted, the resulting access token will always have the same scope as before. However, the client may get a new user refresh token with the new access token, so it is important that the client always store and use the newest user refresh token.

**Note:** the scope is required when obtaining a UAT using user's credentials, as of now omitting the scope may still work in some cases but it is not part of the public API and may change anytime, so please do not depend on this behaviour.

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

Freshcom API also supports two factor authentication (TFA) for business that require extra security for their customer. To enable TFA you must set `authMethod` on the user resource that you want to enable TFA to `tfa_email` or `tfa_sms`. You can also set the `defaultAuthMethod` on the account resource to make user use a specific authentication method by default.

After you enable TFA for a user, obtaining UAT require an one time password (OTP) in addition to the user's username and password. The process for obtaining UAT for a TFA-enabled user is as follow:

1. Try obtain UAT like normal by providing just the username and password.

2. The API will return an error, with a special header `X-Freshcom-OTP: required; auth_method=tfa_sms`. This means an OTP has been sent using that specific method. If `auth_method=tfa_email` then OTP is sent using email, if using `auth_method=tfa_sms` then OTP is sent using text messages.

3. Prompt the user to enter the OTP they received.

4. Obtain UAT by sending the username, password and an additional header `X-Freshcom-OTP: {otp}`.

5. If everything is valid, the API will return the UAT.

**Note:** If the username and password the user provide is not valid, then the API will return an error but there will be no `X-Freshcom-OTP` header. That header will only be set if the usernamd and password provided in step 1 is valid.

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

Freshcom API uses role based authorization, each user is assigned a single role and each role have a specific set of permissions. The role guest and customer are reserved roles that are set automatically in specific situation or to system created users. You are free to change the user's role through the API or Dashboard to any non-reserved role. Right now there is no way to create new role or to change the permissin of each role, however such feature may be available in the future. Here is a list of avilable roles:

- **Guest** - _(reserved)_ This is the default role if a client is using a PAT to access the API on behalf of a user.

- **Customer** - _(reserved)_ A user that is associated with a customer will always have this role and cannot be changed. The customer role allow a user to have all access of the guest role plus access to resources that it owns for example its own orders, payments, profile and so on.

- **Read Only** - This role will allow a user to be able to view all information that is accessible through the Freshcom Dashboard with the exception of API credentials.

- **Support Specialist** - This role will allow a user to:
  1. Manage all resources related to order, payment, customer and fulfillment.
  2. View all resources related to active and internal products.
  3. View all resources related to email and SMS.

- **Marketing Specialist** - This role will allow a user to:
  1. Manage all resources related to products.
  2. View all resources related to active and internal goods.

- **Goods Specialist** - This role will allow user to manage all resoures related to goods.

- **Manager** - This role will allow a user to manage all resources EXCEPT:
  1. Viewing API credentials
  2. Viewing resources related notification triggers
  3. Editing email and sms template
  4. Viewing team information

- **Developer** - This role will allow a user to manage all resources EXCEPT viewing team information.

- **Administrator** - This role will allow a user to have full control over an account.

Through out the API reference we may refer to a user with a specific role simply as "{role} user" where {role} can be any of the available roles. For example a customer user means a user with role `customer` and a developer user means a user with role `developer`.

**Note**: Freshcom API also has have a resource named "Customer", it is not to be confused with a user with `customer` role. Please see [customer](http://example.com) for more detail.

## Custom Data

Freshcom API allow you to add custom data to most of the resources you create. Custom data can be any valid JSON object. Custom data can be translated as well (see [Internalization](http://example.com)).

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

- `title` - A human readable message in English. Client side code should not dependent on this message it may change from time to time. It is recommended client compose their own human readable mssage using the error code.

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

Freshcom API fires event for most of the endpoints. These events can be used to trigger [notification](#notification) like [webhook](#webook), [email](#email) or [SMS](#sms). Each event is identified with its name in the format of `{module}.{resource}.{action}.{result}` for example `identity.account.updated.success`.

Each event also comes with associated event data. The event data comes in different format depending on the triggering action.

If the triggering action is a webhook call then the event data will be the same as any API response with a few meta info added. If additional information is needed it is up to your implementation to make additional request to the API to get it.

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

## Includes

Many resources that Freshcom API provide are related to one or more other resources. For example, a `Stockable` resource have an associated `avatar` which is a `File`. When loading the main resource by default the API do not load the related resources. However they may be cases where you do want to load the related resources with the main resource, in this case you can simply provide the `include` query parameters to ask for the related resources.

You can also nest the include for example when loading an `Order` you can specify `include=lineItems.product`. This will load the order together with all of its line items and the product of each line item.

If you are loading a has many association and there is more 50 associated resources then only the first 50 will be loaded. In the above example if the order has more than 50 line items then only the first 50 will be loaded. In order to retrieve the rest of the line items you will need to make an extra request to the list line item endpoint and adjust the pagination parameter accordingly.

#### Example Request

```http
GET /v1/stockables/33768c8a-a7e7-448e-ad2c-4279228b5bf4?locale=zh-CN&include="avatar,fileCollections"
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.retrieveStockable('33768c8a-a7e7-448e-ad2c-4279228b5bf4', {
  locale: 'zh-CN',
  include: 'avatar,fileCollections'
}).then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```

#### Example Response
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
    },
    "relationships": {
      "avatar": {
        "data": {
          "id": "92173eba-908e-47ea-94e3-b058f85dbc1d",
          "type": "File"
        }
      },
      "fileCollections": {
        "data": []
      }
    }
  },
  "included": [
    {
      "id": "92173eba-908e-47ea-94e3-b058f85dbc1d",
      "type": "File",
      "attributes": {
        "name": "avatar.jpg"
      }
    }
  ]
}
```

## Internalization

Freshcom API provides full support for internalization (i18n). Resources that support i18n can have their attributes in unlimited number of languages. Attributes that can be localized is marked with _(localizable)_ in the resource's attributes table. To request or update a resource under a specific locale just set the `locale` query parameters. If your also request contain the `include` query parameter for loading related resources then the related resources will also be returned in the requested locale.

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

## Pagination

All endpoints that list resources supports pagination. You can modify the pagination by setting the `page[number]` and `page[size]` query parameters.

If you do not specify any pagination parameter the default `page[size]` is `25`.

As of now Freshcom API do not yet support cursor-based pagination however it will be supported in the future.


#### Example Request

```http
GET /v1/stockables?page[number]=2&page[size]=5
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'
freshcom.setAccessToken('{access_token}')

freshcom.listStockable({
  page: { number: 2, size: 3 }
}).then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```

#### Example Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

```json
{
  "meta": {
    "locale": "en",
    "totalCount": 5,
    "allCount": 102
  },
  "data": [
    {
      "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
      "type": "Stockable",
      "attributes": {
        "status": "active",
        ...
      },
      "relationships": {
        ...
      }
    },
    {...},
    {...}
  ]
}
```




## Versioning

**Note**: Since Freshcom API is still in alpha, it does not support any versioning yet. Below is the proposed way to be implemented for stable release.

When we make backwards-incompatible changes to the Freshcom API, we will release new version named using the release date, For example 2018-11-01. We will guaranteed that each version will be supported for at least 2 years, and even after 2 years we will continue support it until majority of the user has upgraded to a newer version.

When you first create an account your API version will be locked to the most recent version, this will be the default API version of your account. When a new version is release your account will not automatically upgrade, however if you do want to upgrade you can do that manually through the Dashboard.

All requests you send will use your account's default API version unless you specify a `X-FRESHCOM-VERSION` header in a specific request in which case for this specific request the value in the header will take precedence.