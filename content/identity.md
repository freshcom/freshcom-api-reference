## Account

An account represents a business or an app that uses the Freshcom API and pay to Freshcom using the same billing information. When you as the developer sign up for Freshcom, an account is automatically created for you. You can created more accounts as needed, for example if you are an agency that builds e-commerce app for different clients then you can create an account for each of your client to keep track of billing.

**Attributes**

Name                   | Type     | Description
-----------------------|----------|-----------
`status`               | String   |
`name`                 | String   |
`defaultLocale`        | String   |
`testAccountId`        | String   |
`apiVersion`           | String   |
`caption`              | String   | A short description you can set for the account
`description`          | String   | A long description you can set for the account
`customData`           | Object   |

### Retrive current account

Retrieves the detail of the account associated with the access token of the request.

**Returns**

Returns an account

#### Definition
```http
GET /v1/account
```

```javascript
freshcom.retrieveAccount(params)
```

#### Example Request

```http
GET /v1/account
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.retrieveAccount({
  locale: 'en'
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
    "locale": "en"
  },
  "data": {
    "type": "Account",
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "attributes": {
      "status": "active",
      "testAccountId": "9fdd716d-7222-46e4-aaeb-0d798063c463",
      "name": "Example Inc.",
      "defaultLocale": "zh-CN",
      "caption": null,
      "description": null,
      "customData": {}
    }
  }
}
```


## User

An User represents a single user that uses the Freshcom API. User is different than customer, this represents you the developer.

Attribute              | Type     | Description
-----------------------|----------|-----------
`status`               | String   |
`firstName`            | String   |
`lastName`             | String   |
`email`                | String   |


Relationship                        | Type                     | Description
------------------------------------|--------------------------|-----------
`accounts`                          | Account                  |


## Account Membership

An Account Membership represents a account membership of a user and its role for that account.

Attribute              | Type     | Description
-----------------------|----------|-----------
`role`                 | String   |


Relationship                        | Type                     | Description
------------------------------------|--------------------------|-----------
`account`                           | Account                  |
`user`                              | User                     |


## External File

An External File represents a single file stored in a third party storage service (As of now Freshcom only uses AWS S3, but this may change in the future).

Attribute              | Type     | Description
-----------------------|----------|-----------
`status`               | String   |
`name`                 | String   |
`contentType`          | String   |
`sizeBytes`            | String   |
`publicReadable`       | Boolean  |
`versionName`          | String   |
`versionLabel`         | String   |

Relationship                        | Type                     | Description
------------------------------------|--------------------------|-----------
`original`                          | ExternalFile             |
