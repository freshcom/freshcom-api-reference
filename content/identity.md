## Account

An account represents a business or an app that uses the Freshcom API and pay to Freshcom using the same billing information. When you sign up for Freshcom, an account is automatically created for you. You can create more accounts as needed, for example if you are an agency that builds e-commerce app for different clients then you can create an account for each of your client to keep track of billing.

Each account also have a test account associated with it. If you make changes to an account, those changes will be automatically synced to its corresponding test account. If you wish to test against an account with different information then the recommmended way is to create a new account.

**Attributes**

Name                   | Type     | Description |
-----------------------|----------|-------------|
`status`               | String   |
`name`                 | String   |
`companyName`          | String   |
`mode`                 | String   | Either `live` or `test`
`defaultLocale`        | String   |
`defaultAuthMethod`    | String   | Default authentication method for user, can be either `simple`, `tfa_email` or `tfa_sms`. Please see [authentication](http://example.com) for detail.
`websiteUrl`           | String   |
`supportEmail`         | String   | Email to contact for non-technical matter
`techEmail`            | String   | Email to contact for technical related matter
`testAccountId`        | String   |
`apiVersion`           | String   | The API version that is currently used by this account
`caption`              | String   | A short description you can set for the account
`description`          | String   | A long description you can set for the account
`customData`           | Object   |

**Localizable Attributes**: `name`, `companyName`, `caption`, `description`, `customData`

#### Example Response

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

### Retrive current account

Retrieves the detail of the account associated with the access token of the request.

**Authorization**

Authorized roles: all

**Events**

Name: `identity.account.retrieve.success`

Event Data             | Type     | Description
-----------------------|----------|-------------|
`account`              | Object   | The account resource

**Returns**

Returns the account resource.

#### Definition
```endpoint
GET /account
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
      "name": "Starship Manufacturing",
      "companyName": "Starship Manufacturing Inc",
      "mode": "live",
      "defaultLocale": "en",
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

### Update current account

Update the detail of the account associated with the access token of the request.

**Authorization**

Authorized roles: `developer`, `administrator`

**Attributes**

Name                   | Type     | Description
-----------------------|----------|-------------|
`name`                 | String   |
`companyName`          | String   |
`defaultAuthMethod`    | String   |
`websiteUrl`           | String   |
`supportEmail`         | String   |
`techEmail`            | String   |
`apiVersion`           | String   |
`caption`              | String   |
`description`          | String   |
`customData`           | Object   |

**Events**

Name: `identity.account.update.success`

Event Data             | Type     | Description
-----------------------|----------|-------------|
`account`              | Object   | The updated account resource
`user`                 | Object   | The user that updated the account resource

Name: `identity.account.update.error`

Event Data             | Type     | Description
-----------------------|----------|-------------|
`error`                | Object   | The error

**Returns**

Returns the updated account resources.

#### Definition

```endpoint
PATCH /account
```

#### Example Request

```http
PATCH /v1/account
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "type": "Account",
    "attributes": {
      "name": "Warp Drive Manufacturing"
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.updateAccount({
  name: 'Warp Drive Manufacturing'
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
      "name": "Warp Drive Manufacturing",
      "companyName": "Starship Manufacturing Inc",
      "mode": "live",
      "defaultLocale": "en",
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

## User

An user represents someone who uses the Freshcom API. This could be a customer, an application, or you the developer. A user will always be a member of at least one account.

**Type of User**

Ther are two types of user in Freshcom:

- Global user - this type of user can only be created by signing up through Freshcom's signup process. Global user can join other account and can create and own multiple accounts.

- Account user - this type of user can only be created by using the Freshcom API or through the Freshcom Dashboard. Account user is scoped to a specific account and thus cannot create more account or join other account.

Note that there is no way to create global user through the API and it is intentional.

**Username**

User is uniquely identified by its username. Username can be any alphanumeric string plus - (dash), @ (at sign), . (dot), + (plus) and _ (underscore). Global user's username is managed by Freshcom and is always the same as its email. Because user is not identified by its email, account user does not need to have unique email by default, if you require email to be unique you can change the settings in Freshcom Dashboard.

Due to the fact there are two type of users, the uniquness of username maybe a bit complicated to understand however such complication is need to achieve maximum flexibility and customization.

A global user's username must be unique across all global users hence their email must also be unique because for global users their email is their username.

Account user's username must be unique across all user that is a member of that specific account this include other account user under that specific account and global user that joined that specific account. For example if an account is owned by a global user with username `user1@example.com`, and another global user with username `user2@example.com` joined that same account then an account user with the username `user1@example.com` or `user2@example.com` will violate the uniqueness contraint and trying to create or update a user with those username will always fail. The username `user3@example.com` will be valid even if there is another global user with that same username.

A global user with a username that conflicts with a specific account's account user will not be able to join that specific account. For example if there is an account user with username `user3@example.com` then a global user with that same username will conflict with the account user so will not be able to join that account.

**Attributes**

Name                       | Type     | Description
---------------------------|----------|-------------|
`status`                   | String   |
`username`                 | String   | Uniquely identify the user, see username section above.
`email`                    | String   |
`phoneNumber`              | String   |
`name`                     | String   |
`firstName`                | String   |
`lastName`                 | String   |
`authMethod`               | String   |
`role`                     | String   |
`emailVerified`            | Boolean  |
`emailVerifiedAt`          | String   |
`passwordUpdatedAt`        | String   |
`customData`               | Object   |

**Localizable Attributes**: none

**Relationships**

Name             | Type           | Description
-----------------|----------------|-------------|
`account`        | Account        | If the user is an account user, this is the account the user belongs to. If the user is a global user, then this relationship will always be `null`



#### Example Response

```json
{
  "meta": {
    "locale": "en"
  },
  "data": {
    "type": "User",
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "attributes": {
      "status": "active",
      "username": "test",
      "email": "test@example.com",
      "phoneNumber": "+1234567890",
      "name": "Captain Evil",
      "firstName": "Captain",
      "lastName": "Evil",
      "authMethod": "simple",
      "role": "administrator",
      "emailVerified": true,
      "emailVerifiedAt": "",
      "passwordUpdated": "",
      "customData": {}
    }
  }
}
```

### Create a user

Creates a new user object

**Authorization**

Authorized roles: `administrator`

**Attributes**

Name                   | Type     | Description
-----------------------|----------|-------------|
`status`               | String   | If not provided, defaults to `active`
`username`             | String   | _(required)_
`password`             | String   | _(required)_
`email`                | String   | Required if `authMethod` is `tfa_email`
`phoneNumber`          | String   | Required if `authMethod` is `tfa_sms`
`name`                 | String   |
`firstName`            | String   |
`lastName`             | String   |
`authMethod`           | String   | If not provided, defaults to `simple`
`role`                 | String   | _(required)_
`emailVerified`        | Boolean  | If not provided, defaults to `false`
`emailVerifiedAt`      | String   |
`passwordUpdatedAt`    | String   |
`customData`           | Object   |

**Events**

Name: `identity.user.create.success`

Event Data             | Type     | Description
-----------------------|----------|-------------|
`user`                 | User     | The created user
`account`              | Account  | The account the user belongs to

Name: `identity.email_verification_token.create.success`

This event fires when `email` attribute is set and `emailVerified` is `false`. `user.emailVerificationToken` is available in this event data.

Event Data               | Type     | Description
-------------------------|----------|-------------|
`emailVerificationToken` | String   | A token for email verification, see [email verification token.](#email-verification-token)
`user`                   | User     | The created user
`account`                | Account  | The account the user belongs to

**Returns**

Returns the created user resource.

#### Definition

```endpoint
POST /users
```

#### Example Request

```http
POST /v1/users
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "type": "User",
    "attributes": {
      "username": "test",
      "password": "supersecurepassword"
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.createUser({
  username: 'test',
  password: 'supersecurepassword',
  role: 'developer'
}).then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```

#### Example Response

```http
HTTP/1.1 201 Created
Content-Type: application/json
```

```json
{
  "meta": {
    "locale": "en"
  },
  "data": {
    "type": "User",
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "attributes": {
      "status": "active",
      "username": "test",
      "email": null,
      "phoneNumber": null,
      "name": null,
      "firstName": null,
      "lastName": null,
      "authMethod": "simple",
      "role": "developer",
      "emailVerified": false,
      "emailVerifiedAt": null,
      "passwordUpdated": null,
      "customData": {}
    }
  }
}
```

### Retrive current user

Retrive the user associated to the provided access token.

**Authorization**

Authorized role: all

**Events**

Name: `identity.current_user.retrieve.success`

Event Data             | Type     | Description
-----------------------|----------|-------------|
`user`                 | User     | The current user
`account`              | Account  | The account the user belongs to

**Returns**

The current user resource.

#### Definition

```endpoint
GET /user
```

#### Example Request

```http
GET /v1/user
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.retrieveUser().then(function (response) {
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
    "type": "User",
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "attributes": {
      "status": "active",
      "username": "test",
      "email": null,
      "phoneNumber": null,
      "name": null,
      "firstName": null,
      "lastName": null,
      "authMethod": "simple",
      "role": "developer",
      "emailVerified": false,
      "emailVerifiedAt": null,
      "passwordUpdated": null,
      "customData": {}
    }
  }
}
```

### Retrive a user

Retrive the detail of an existing user. You will need to provide the ID of the target user.

**Authorization**

Authorized roles: `administrator`

**Events**

Name: `identity.user.retrieve.success`

Event Data             | Type     | Description
-----------------------|----------|-------------|
`user`                 | User     | The target user
`account`              | Account  | The account the user belongs to

**Returns**

Returns the target user resource.

#### Definition

```endpoint
GET /user
```

#### Example Request

```http
GET /v1/users/e407d0dc-58d4-48ff-a70f-c6e022e028f1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.retrieveUser('e407d0dc-58d4-48ff-a70f-c6e022e028f1').then(function (response) {
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
    "type": "User",
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "attributes": {
      "status": "active",
      "username": "test",
      "email": null,
      "phoneNumber": null,
      "name": null,
      "firstName": null,
      "lastName": null,
      "authMethod": "simple",
      "role": "administrator",
      "emailVerified": false,
      "emailVerifiedAt": null,
      "passwordUpdated": null,
      "customData": {}
    }
  }
}
```

## Email Verification Token

Email verification token (EVT) represent a token used to verify a user's email. The only action available for EVT is create. EVT cannot be retrieved through the Freshcom API, instead you should create notification trigger to send the EVT to the user using email or SMS upon its creation. Please see [verifying user email](http://example.com).

**Localizable Attributes**: none

### Create a EVT

CreateS a email verification token (EVT). Creating a EVT will automatically invalidate all previous created EVT, each user can only have 1 valid EVT at a time.

**Authorization**

Authorized roles: all except `guest`.

**Relationships**

Name                   | Type     | Description
-----------------------|----------|-------------|
`user`                 | User     | The user to create the EVT for

**Events**

Name: `identity.email_verification_token.create.success`

Event Data               | Type     | Description
-------------------------|----------|-------------|
`emailVerificationToken` | String   | The created EVT
`user`                   | User     | The target user
`account`                | Account  | The account the user belongs to

**Returns**

This endpoint returns nothing.

## Email Verification

### Create a verification

## Password Reset Token

### Create a PRT

## Password

### Update a password

## Phone Verification Code

### Create a PVC