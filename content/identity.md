## Account

An Account represents a business or an app that uses the FreshCom API and pay to FreshCom using the same billing information. When you as the developer sign up for FreshCom, an Account is automatically created for you. You can created more accounts as needed, for example if you are a freelancer that builds e-commerce app for different clients then you can create an account for each of your client to keep track of billing.

Attribute              | Type     | Description
-----------------------|----------|-----------
`status`               | String   |
`name`                 | String   |
`email`                | String   |
`apiVersion`           | String   |


Relationship                        | Type                     | Description
------------------------------------|--------------------------|-----------
`memberships`                       | AccountMembership        |


## User

An User represents a single user that uses the FreshCom API. User is different than customer, this represents you the developer.

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

An External File represents a single file stored in a third party storage service (As of now FreshCom only uses AWS S3, but this may change in the future).

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
