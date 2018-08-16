## Account

An account represents a business or an app that uses the Freshcom API and pay to Freshcom using the same billing information. When you sign up for Freshcom, an account is automatically created for you. You can create more accounts as needed, for example if you are an agency that builds e-commerce app for different clients then you can create an account for each of your client to keep track of billing.

Each account also have a test account associated with it. If you make changes to an account, those changes will be automatically synced to its corresponding test account. If you wish to test against an account with different information then the recommmended way is to create a new account.

**Attributes**

Name                   | Type       | Description |
-----------------------|------------|-------------|
`status`               | `String`   | The status of the account.
`name`                 | `String`   | _(localizable)_ The name of the account.
`companyName`          | `String`   | _(user-defined)_ _(localizable)_ The company name of the account.
`mode`                 | `String`   | The mode of the account, can be one of `live` or `test`.
`defaultLocale`        | `String`   | The default locale of the account.
`defaultAuthMethod`    | `String`   | The default authentication method for user, can be one of `simple`, `tfa_email` or `tfa_sms`. Please see [authentication](http://example.com) for detail.
`websiteUrl`           | `String`   | The website URL of the company.
`supportEmail`         | `String`   | The email to contact for non-technical matter
`techEmail`            | `String`   | The email to contact for technical related matter
`testAccountId`        | `String`   | The test account ID for this account if it is a `live` account.
`apiVersion`           | `String`   | The default API version that is currently used by this account
`caption`              | `String`   | _(user-defined)_ _(localizable)_ A short description for the account.
`description`          | `String`   | _(user-defined)_ _(localizable)_ A long description for the account.
`customData`           | `Object`   | _(user-defined)_ _(localizable)_

#### Example Response

```json
{
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
      "supportEmail": "support@example.com",
      "techEmal": "tech@example.com",
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

Use this endpoint to retrieve the account associated with the access token of the request.

**Authorization**

Authorized roles: all

**Returns**

Returns the target account.

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

freshcom.retrieveAccount().then(function (response) {
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
  "data": {
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "type": "Account",
    "attributes": {
      "status": "active",
      "name": "Starship Manufacturing",
      "companyName": "Starship Manufacturing Inc",
      "mode": "live",
      "defaultLocale": "en",
      "defaultAuthMethod": "simple",
      "websiteUrl": "https://example.com",
      "supportEmail": "support@example.com",
      "techEmal": "tech@example.com",
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

Use this endpoint to update the account associated with the access token of the request.

**Authorization**

Authorized roles: `developer`, `administrator`

**Attributes**

Name                   | Type       | Description
-----------------------|------------|-------------|
`name`                 | `String`   |
`companyName`          | `String`   |
`defaultAuthMethod`    | `String`   |
`websiteUrl`           | `String`   |
`supportEmail`         | `String`   |
`techEmail`            | `String`   |
`apiVersion`           | `String`   |
`caption`              | `String`   |
`description`          | `String`   |
`customData`           | `Object`   |

**Events**

Name: `identity.account.update.success`

Event Data             | Type      | Description
-----------------------|-----------|-------------|
`account`              | `Account` | The updated account
`user`                 | `User`    | The user that updated the account

**Returns**

Returns the updated account.

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
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
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
  "data": {
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "type": "Account",
    "attributes": {
      "status": "active",
      "name": "Starship Manufacturing",
      "companyName": "Starship Manufacturing Inc",
      "mode": "live",
      "defaultLocale": "en",
      "defaultAuthMethod": "simple",
      "websiteUrl": "https://example.com",
      "supportEmail": "support@example.com",
      "techEmal": "tech@example.com",
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

An user represents someone who uses the Freshcom API. This could be a customer, an application, or a developer. A user will always be a member of at least one account.

**Type of User**

Ther are two types of user in Freshcom:

- Global user - this type of user can only be created by signing up through Freshcom Dashboard. Global user can join other account and can create and own multiple accounts.

- Account user - this type of user can be created by using the Freshcom API or through the Freshcom Dashboard. Account user is scoped to a specific account and thus cannot create more account or join other account.

**Username**

User is uniquely identified by its username. Username can be any alphanumeric string plus - (dash), @ (at sign), . (dot), + (plus) and/or _ (underscore). Global user's username is managed by Freshcom and is always the same as its email. Because user is not identified by its email, account user does not need to have unique email by default, if you require email to be unique you can change the settings in Freshcom Dashboard.

A global user's username must be unique across all global users hence their email must also be unique because for global users their email is their username.

Account user's username must be unique across all user that is a member of that specific account this include other account user under that specific account and global user that joined that specific account. For example if an account is owned by a global user with username `user1@example.com`, and another global user with username `user2@example.com` joined that same account then an account user with the username `user1@example.com` or `user2@example.com` will violate the uniqueness contraint and trying to create or update a user with those username will always fail. The username `user3@example.com` will be valid even if there is another global user with that same username.

A global user with a username that conflicts with a specific account's account user will not be able to join that specific account. For example if there is an account user with username `user3@example.com` then a global user with that same username will conflict with the account user so will not be able to join that account.

**Attributes**

Name                       | Type       | Description
---------------------------|------------|-------------|
`status`                   | `String`   | The status of the user.
`username`                 | `String`   | The username of the user, see above section about username.
`email`                    | `String`   | The email of the user.
`phoneNumber`              | `String`   | The phone number of the user.
`name`                     | `String`   | The full name of the user.
`firstName`                | `String`   | The first name of the user
`lastName`                 | `String`   | The last name of the user
`authMethod`               | `String`   | The authentication method of the user.
`role`                     | `String`   | The role of the user.
`emailVerified`            | `Boolean`  | Indicate whether the email is verified.
`emailVerifiedAt`          | `String`   | The datetime that the email got verified.
`passwordUpdatedAt`        | `String`   | The datetime that the password last updated at.
`customData`               | `Object`   |

**Relationships**

Name             | Type           | Description
-----------------|----------------|-------------|
`account`        | `Account`      | This is the account the user belongs to. If the user is a global user, then it will always be `null`.

#### Example Response

```json
{
  "meta": {
    "locale": "en"
  },
  "data": {
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "type": "User",
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

Use this endpoint to create a new user.

**Authorization**

Authorized roles: `administrator`

**Attributes**

Name                   | Type       | Description
-----------------------|------------|-------------|
`status`               | `String`   | _(default: `active`)_ The status of the user.
`username`             | `String`   | _(required)_ The username of the user.
`password`             | `String`   | _(required)_ The password of the user
`email`                | `String`   | Required if `authMethod` is `tfa_email`
`phoneNumber`          | `String`   | Required if `authMethod` is `tfa_sms`
`name`                 | `String`   | The full name of the user.
`firstName`            | `String`   | The first name of the user.
`lastName`             | `String`   | The last name of the user.
`authMethod`           | `String`   | _(default: `simple`)_ The authentication method.
`role`                 | `String`   | _(required)_ The role of the user.
`emailVerified`        | `Boolean`  | _(default: `false`)_ Indicate whether the email is verified.
`customData`           | `Object`   |

**Events**

Name: `identity.user.create.success`

Event Data             | Type     | Description
-----------------------|----------|-------------|
`user`                 | `User`     | The created user
`account`              | `Account`  | The account the user belongs to

Name: `identity.email_verification_token.create.success`<br/>
This event only fires when `email` attribute is set and `emailVerified` is `false`.

Event Data               | Type     | Description
-------------------------|----------|-------------|
`emailVerificationToken` | `String`   | A token for email verification, see [email verification token.](#email-verification-token)|
`user`                   | `User`     | The created user
`account`                | `Account`  | The account the user belongs to

**Returns**

Returns the created user.

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
      "password": "supersecurepassword",
      "role": "developer"
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
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "type": "User",
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

Use this endpoint to retrive the user associated to the provided access token.

**Authorization**

Authorized role: all

**Returns**

Returns the current user.

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
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "type": "User",
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

Use this endpoint to retrive an existing user.

**Authorization**

Authorized roles: `administrator`

**Parameters**

Name                   | Type       | Description
-----------------------|------------|-------------|
`id`                   | `String`   | ID of the user

**Returns**

Returns the target user.

#### Definition

```endpoint
GET /users/{id}
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
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "type": "User",
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

### Update current user

Use this endpoint to update the user associated with the provided access token.

**Authorization**

Authorized roles: all except `guest`

**Attributes**

Name                   | Type       | Description
-----------------------|------------|-------------|
`username`             | `String`   |
`email`                | `String`   | Required if `authMethod` is `tfa_email`.
`phoneNumber`          | `String`   | Required if `authMethod` is `tfa_sms`.
`phoneVerificationCode`| `String`   | Required if `authMethod` is `tfa_sms` and `phoneNumber` is provided.
`name`                 | `String`   |
`firstName`            | `String`   |
`lastName`             | `String`   |
`authMethod`           | `String`   |
`customData`           | `Object`   |

**Events**

Name: `identity.current_user.update.success`

Event Data             | Type       | Description
-----------------------|------------|-------------|
`user`                 | `String`   | The updated user.
`account`              | `String`   | The account that the user belongs to.

**Returns**

Returns the updated user.

#### Definition

```endpoint
PATCH /user
```

#### Example Request

```http
PATCH /v1/user
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "type": "User",
    "attributes": {
      "name": "Captain Good"
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.updateCurrentUser({
  name: 'Captain Good'
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
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "type": "User",
    "attributes": {
      "status": "active",
      "username": "test",
      "email": null,
      "phoneNumber": null,
      "name": "Captain Good",
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

### Update a user

Use this endpoint to update a user.

**Authorization**

Authorized roles: `administrator`

**Parameters**

Name                   | Type       | Description
-----------------------|------------|-------------|
`id`                   | `String`   | ID of the user

**Attributes**

Name                   | Type       | Description
-----------------------|------------|-------------|
`status`               | `String`   |
`username`             | `String`   |
`password`             | `String`   | A new password for the user.
`email`                | `String`   | Required if `authMethod` is `tfa_email`.
`phoneNumber`          | `String`   | Required if `authMethod` is `tfa_sms`.
`name`                 | `String`   |
`firstName`            | `String`   |
`lastName`             | `String`   |
`authMethod`           | `String`   |
`emailVerified`        | `Boolean`  |
`customData`           | `Object`   |

**Events**

Name: `identity.user.update.success`

Event Data             | Type       | Description
-----------------------|------------|-------------|
`user`                 | `String`   | The updated user.
`account`              | `String`   | The account that the user belongs to.

**Returns**

Returns the updated user.

#### Definition

```endpoint
PATCH /users/{id}
```

#### Example Request

```http
PATCH /v1/users/e407d0dc-58d4-48ff-a70f-c6e022e028f1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "type": "User",
    "attributes": {
      "name": "Captain Good"
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.updateCurrentUser('e407d0dc-58d4-48ff-a70f-c6e022e028f1', {
  name: 'Captain Good'
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
    "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
    "type": "User",
    "attributes": {
      "status": "active",
      "username": "test",
      "email": null,
      "phoneNumber": null,
      "name": "Captain Good",
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

## Email Verification Token

Email verification token (EVT) represent a token used to verify a user's email. The only action available for EVT is create. EVT cannot be retrieved through the Freshcom API, instead you should create notification trigger to send a link with the EVT to the user using email or SMS upon its creation. Please see our guide on [verifying user email](http://example.com).

### Create a EVT

Use this endpoint to create a email verification token (EVT). Creating a EVT will automatically invalidate all previous created EVT, each user can only have 1 valid EVT at a time.

**Authorization**

Authorized roles: all except `guest`.

**Relationships**

Name         | Type       | Description
-------------|------------|-------------|
`user`       | `User`     | _(required)_ The user to create the EVT for.

**Events**

Name: `identity.email_verification_token.create.success`

You can create a notification trigger for this event to send a link with the token to the user, so that they can verify their email. Please see our guide on [verifying user email](http://example.com).

Event Data               | Type       | Description
-------------------------|------------|-------------|
`emailVerificationToken` | `String`   | The created EVT.
`user`                   | `User`     | The target user.
`account`                | `Account`  | The account the user belongs to.

**Returns**

If successful, this endpoint returns a HTTP 204 with no body.

#### Definition

```endpoint
POST /email_verification_tokens
```

#### Example Request

```http
POST /v1/email_verification_tokens
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "type": "EmailVerificationToken",
    "relationships": {
      "user": {
        "data": {
          "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
          "type": "User"
        }
      }
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.createEmailVerificationToken({
  user: { id: 'e407d0dc-58d4-48ff-a70f-c6e022e028f1', type: 'User' }
}).then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```

## Email Verification

Email verification represents the verification of a user's email. The only action available for this resource is create. Please see our guide on [verifying user email](http://example.com).

### Create a verification

Use this endpoint to create a email verification. Creating a verification requires a email verification token, once a email verification is successfully created the email for that specific user is considered verified and `user.emailVerified` will be set to `true`.

**Authorization**

Authorized roles: all

**Attributes**

Name                     | Type     | Description
-------------------------|----------|-------------|
`token`                  | `String` | _(required)_ The email verification token.

**Events**

Name: `identity.email_verification.create.success`

Event Data               | Type       | Description
-------------------------|------------|-------------|
`user`                   | `User`     | The user that got verified.
`account`                | `Account`  | The account the user belongs to.

**Returns**

If successful, this endpoint returns a HTTP 204 with no body.

#### Definition

```endpoint
POST /email_verifications
```

#### Example Request

```http
POST /v1/email_verifications
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "type": "EmailVerification",
    "attributes": {
      "token": "{emailVerificationToken}"
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.createEmailVerification({
  token: "{emailVerificationToken}"
}).then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```

## Password Reset Token

Password reset token (PRET) is a token used for reseting a user's password without providing its current password. The only action available for for this resource is create. Password reset token cannot be retrieved through the Freshcom API, instead you should create a notification trigger to send a link with the token to the user using email or SMS upon its creation. Password reset token expires in 24 hours. Please see our guide on [resetting user password](http://example.com).

### Create a PRET

Use this endpoint to create a password reset token. Creating a token wil automatically invalidate all previous created token, each user can only have 1 valid token at a time. You must use a publishable access token in order to use this endpoint. To successfully create a token, the username provided must be of a user that is a member of your account. It does not matter whether the target user is a standard user or managed user.

**Authorization**

Authorized roles: `guest`

**Attributes**

Name                     | Type     | Description
-------------------------|----------|-------------|
`username`               | `String` | _(required)_ The username of the target user.

**Events**

Name: `identity.password_reset_token.create.success`

You can create a notification trigger for this event to send a link with the token to the user, so that they can reset their password. Please see our guide on [resetting user password](http://example.com).

Event Data               | Type       | Description
-------------------------|------------|-------------|
`passwordResetToken`     | `String`   | The created password reset token.
`user`                   | `String`   | The target user.
`account`                | `String`   | The account the user belongs to.

**Returns**

If successful, this endpoint returns a HTTP 204 with no body.

#### Definition

```endpoint
POST /password_reset_tokens
```

#### Example Request

```http
POST /v1/password_reset_tokens
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "type": "PasswordResetToken",
    "attributes": {
      "username": "test"
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.createPasswordResetToken({
  username: "{username}"
}).then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```

## Password

Password represents a user's password. The only action available for password is update.

### Update a password

Use this endpoint to update a user's password.

**Authorization**

Authorized roles: all

**Attributes**

Name                     | Type       | Description
-------------------------|------------|-------------|
`currentPassword`        | `String`   | Required if `resetToken` is not provided.
`resetToken`             | `String`   | Required if `currentPassword` is not provided.
`value`                  | `String`   | The new password.

**Events**

Name: `identity.password.update.success`

Event Data               | Type       | Description
-------------------------|------------|-------------|
`user`                   | `String`   | The target user.
`account`                | `String`   | The account the user belongs to.

**Returns**

If successful, this endpoint returns a HTTP 204 with no body.

#### Definition

```endpoint
PATCH /password
```

#### Example Request

```http
PATCH /v1/password
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "type": "Password",
    "attributes": {
      "resetToken": "2449fed6-0e5b-4c5e-9bf6-0df7acad25f6",
      "value": "anothersupersecurepassword"
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.updatePassword({
  resetToken: "2449fed6-0e5b-4c5e-9bf6-0df7acad25f6",
  value: "anothersupersecurepassword"
}).then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```

## Phone Verification Code

Phone verification code (PVC) is a one time code you can use to verify a user's phone number. PVC is always a 6 letter number only string. If a user's `authMethod` is set to `tfa_sms` then whenever you want to update the user's phone number a PVC is also required. PVC is only valid for 30 mintues. Please see our guide on [two factor authentication](http://example.com).

### Create a PVC

Use this endpoint to create a phone verification code (PVC). Creating a new PVC does not invalidate previous PVC, a user can still use a previous created PVC if it has not been used yet.

**Authorization**

Authorized roles: all

**Attributes**

Name                     | Type     | Description
-------------------------|----------|-------------|
`phoneNumber`            | `String` | _(required)_ The target phone number to verify.

**Events**

Name: `identity.phone_verification_code.create.success`

You can create a notification trigger for this event to send a SMS containing the code to the target phone number, so that user can verify their phone number. Please see our guide on [two factor authentication](http://example.com).

Event Data               | Type     | Description
-------------------------|----------|-------------|
`phoneVerificationCode`  | `String` | The created PVC.
`phoneNumber`            | `String` | The phone number for the PVC.

**Returns**

If successful, this endpoint returns a HTTP 204 with no body.

#### Definition

```endpoint
POST /phone_verification_codes
```

#### Example Request

```http
POST /v1/phone_verification_codes
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "type": "PhoneVerificationCode",
    "attributes": {
      "phoneNumber": "+1234567890"
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.createPhoneVerificationCode({
  phoneNumber: "+1234567890"
}).then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```