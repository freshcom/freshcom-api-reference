## Customer

**Localizable Attributes**: `customData`<br>

Attribute                        | Type       | Description
---------------------------------|------------|-----------
`code`                           | `String`   | A unique code for the Customer, you can assign any string.
`status`                         | `String`   | One of `anonymous`, `guest`, `registered`, `suspended`, `deleted` or any other user defined status.
`firstName`                      | `String`   |
`lastName`                       | `String`   |
`email`                          | `String`   | Email of the Customer, must be unique.
`otherName`                      | `String`   | Any other name for the Customer
`phoneNumber`                    | `String`   |
`label`                          | `String`   | A user defined label for the Customer for filtering purpose.
`customData`                     | `JSON`     |
`locale`                         | `String`   |
`insertedAt`                     | `Datetime` |
`updatedAt`                      | `Datetime` |

#### Example Customer Object

```json
{
  "type": "Customer",
  "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
  "attributes": {
    "code": "C389DK",
    "status": "registered",
    "firstName": "Roy",
    "lastName": "Bao",
    "otherName": "Roy",
    "email": "roy@outersky.com",
    "phoneNumber": "1234567890",
    "label": null,
    "locale": "en",
    "insertedAt": "2017-04-01T07:43:29.516422",
    "updatedAt": "2017-04-01T07:43:29.516422"
  }
}
```

### Create a Customer

This endpoint creates a new Customer object. You can use any type of Access Token for this endpoint. If the `status` is set to `anonymous` then **all fields are optional**. If `status` is set to `registered` then fields are required as specified below.

**Fields**

Attribute                        | Description
---------------------------------|-----------
`code`                           | A unique code for the Customer, you can assign any string.
`status`                         | One of `guest`, `registered`, `suspended` or any other user defined status.
`firstName`                      | _(required)_
`lastName`                       | _(required)_
`email`                          | _(required)_ Email of the Customer, must be unique.
`password`                       | _(required)_
`otherName`                      | Any other name for the Customer
`phoneNumber`                    |
`label`                          | A user defined label for the Customer for filtering purpose.
`customData`                     |


**Returns**

Returns a Customer object if the request succeeded.


```endpoint
POST /customers
```

#### Example Request

```http
POST /v1/customers HTTP/1.1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {SAT}
```

```http
{
  "type": "Customer",
  "attributes": {
    "code": "C389DK",
    "status": "member",
    "firstName": "Roy",
    "lastName": "Bao",
    "otherName": "Roy",
    "email": "roy@outersky.com",
    "password": "test1234",
    "phoneNumber": "1234567890",
    "customData": { "custom1": "hi" }
  }
}
```


#### Example Response
```http
HTTP/1.1 201 Created
```

```json
{
  "type": "Customer",
  "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
  "attributes": {
    "code": "C389DK",
    "status": "member",
    "firstName": "Roy",
    "lastName": "Bao",
    "otherName": "Roy",
    "email": "roy@outersky.com",
    "phoneNumber": "1234567890",
    "label": null,
    "customData": { "custom1": "hi" },
    "locale": "en",
    "insertedAt": "2017-04-01T07:43:29.516422",
    "updatedAt": "2017-04-01T07:43:29.516422"
  }
}
```

### Retrieve a customer with ID

This endpoint retrieve a previously created Customer by its ID. To use this endpoint
you must provided the customer's ID.


**URL Parameters**

Name                             | Description
---------------------------------|-----------
`id`                             | _(required)_ The customer's ID


**Query String Parameters**

Key           | Description
--------------|-----------
`locale`      |
`include`     |

**Returns**

Returns a Customer object if the request succeeded.

#### Endpoint

```endpoint
GET /customers/{id}
```

#### Example Request

```http
GET /v1/customers/33768c8a-a7e7-448e-ad2c-4279228b5bf4 HTTP/1.1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {accessToken}
```

#### Example Response

```http
HTTP/1.1 200 Ok
```

```json
{
  "type": "Customer",
  "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
  "attributes": {
    "code": "C389DK",
    "status": "registered",
    "firstName": "Roy",
    "lastName": "Bao",
    "otherName": "Roy",
    "email": "roy@outersky.com",
    "phoneNumber": "1234567890",
    "label": null,
    "customData": { "custom1": "hi" },
    "locale": "en",
    "insertedAt": "2017-04-01T07:43:29.516422",
    "updatedAt": "2017-04-01T07:43:29.516422"
  }
}
```

### Retrieve a customer without ID

This endpoint retrieve a previously created customer in two ways:

1. If no query paramter is provided, this endpoint returns the customer that is
associated with the access token.

2. If the `code` query parameter is provide AND the total number of query parameter
(excluding common query parameters like `include` and `locale`) is not less than two (2),
then this endpoint returns the customer with the supplied code if and only if the
target customer have status `guest` and all the other query parameter matches.

Using query parameter to retrive customer is useful in the case that you want to limit
the customer registration to a predefined set (ex. VIP only shop). In this case you
can import all the predefined customers with status `guest` through the FreshCom dashboard
and in your frontend app you can then use query parameter to retrieve the customer
and update the customer to have `registered` status to finish the registration process.

Note that if you are using the query parameter way for retriving customer, in addition
to providing the `code` query parameter you must provide and one or more other query
paremter listed below. This is to prevent malicious attacker trying to guess the `code`
of other customer since `code` could be sequential.


**Query String Parameters**

Key           | Description
--------------|-----------
`code`        |
`firstName`   |
`lastName`    |
`otherName`   |
`phoneNumber` |
`email`       |

**Returns**

Returns a customer object if the request succeeded. Returns 404 if no customer is
associated with the access token or no customer matches the provided query parameter.

#### Endpoint

```endpoint
GET /customer
```

#### Example Request

```http
GET /v1/customers?code=329343&otherName=Roy HTTP/1.1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {accessToken}
```

#### Example Response

```http
HTTP/1.1 200 Ok
```

```json
{
  "type": "Customer",
  "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
  "attributes": {
    "code": "C389DK",
    "status": "guest",
    "firstName": "Roy",
    "lastName": "Bao",
    "otherName": "Roy",
    "email": "roy@outersky.com",
    "phoneNumber": "1234567890",
    "label": null,
    "customData": { "custom1": "hi" },
    "locale": "en",
    "insertedAt": "2017-04-01T07:43:29.516422",
    "updatedAt": "2017-04-01T07:43:29.516422"
  }
}
```


### Update a Customer

This endpoint updates a customer object. If the `status` is set to `guest` then
**all fields are optional**. If `status` is set to `registered` then fields are
required as specified below. If the `status` was already `registered` then you can
not update it to `guest` again.

When updating a customer from status `guest` to `register` an associated user object
will be created automatically using the appropriate fields.

**Authorization**

- A guest user can only update customer with `guest` status.

- A customer user can only update its own customer object.

- Any other user that have permission to use this endpoint can update any customer
object.

**URL Parameters**

Name                             | Description
---------------------------------|-----------
`id`                             | _(required)_ The customer's ID

**Fields**

Attribute                        | Description
---------------------------------|-----------
`code`                           | A unique code for the customer, you can assign any string.
`status`                         | One of `guest`, `registered`, `suspended`, `deleted`.
`firstName`                      | Required if `otherName` is not set.
`lastName`                       | Required if `otherName` is not set.
`email`                          | Email of the customer, must be unique.
`username`                       | Required if status is changing to `registered`
`password`                       | Required if status is changing to `registered`.
`otherName`                      | Required if `firstName` or `lastName` is not set.
`phoneNumber`                    |
`label`                          | A user defined label for the customer for filtering purpose.
`customData`                     |

**Returns**

Returns the customer object if the request succeeded. Returns an error if any of the fields are invalid.

#### Endpoint

```endpoint
PATCH /customers/{id}
```

#### Example Request

```http
PATCH /v1/customers/33768c8a-a7e7-448e-ad2c-4279228b5bf4 HTTP/1.1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {accessToken}
```

```http
{
  "type": "Customer",
  "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
  "attributes": {
    "code": "C389DK",
    "status": "registered",
    "firstName": "Roy",
    "lastName": "Bao",
    "otherName": "Roy",
    "email": "roy@outersky.com",
    "password": "test1234",
    "phoneNumber": "1234567890",
    "customData": { "custom1": "hi" }
  }
}
```


#### Example Response
```http
HTTP/1.1 200 Ok
```

```json
{
  "type": "Customer",
  "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
  "attributes": {
    "code": "C389DK",
    "status": "registered",
    "firstName": "Roy",
    "lastName": "Bao",
    "otherName": "Roy",
    "email": "roy@outersky.com",
    "phoneNumber": "1234567890",
    "label": null,
    "customData": { "custom1": "hi" },
    "locale": "en",
    "insertedAt": "2017-04-01T07:43:29.516422",
    "updatedAt": "2017-04-01T07:43:29.516422"
  }
}
```

### Delete a Customer

This endpoint permanently deletes a Customer. It cannot be undone. You must supply a UAT in order to use endpoint.

**URL Parameters**

Name                             | Description
---------------------------------|-----------
`id`                             | _(required)_ The Customer's ID

**Returns**

Returns nothing if the request succeeded. Customer with no order or with only Cart Order (i.e Order with `status` set to `cart`) will be marked for deletion and will be deleted within 24 hours. Customer with real orders will not actually be deleted, only their `status` will be set to `deleted` and they can still be retrieved through the API. This is intentional to keep track of the history of the Customer the corresponding Orders, however all of the Customer's payment information will be removed. Deleted Customer does not count toward your storage.

#### Endpoint

```endpoint
DELETE /customers/{id}
```

#### Example Request

```http
DELETE /v1/customers/{id} HTTP/1.1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {UAT}
```

#### Example Response

```http
HTTP/1.1 204 No Content
```

### List Customers

Get a list of your Customers. Customer are order by descending creation time.

**Filterable Attributes**: `status`, `label`, `deliveryAddressCity`, `deliveryAddressCountryCode`, `deliveryAddressProvince`<br>

**Searchable Attributes**: `code`, `firstName`, `lastName`, `email`, `phoneNumber`

## Point Account

## Point Transaction