## Customer

A Customer represents a single customer of your Storefront.

**Localizable Attributes**: `customData`<br>

Attribute                        | Type       | Description
---------------------------------|------------|-----------
`code`                           | `String`   | A unique code for the Customer, you can assign any string. This code must be unique for each SKU.
`status`                         | `String`   | One of `anonymous`, `registered`, `suspended`, `deleted` or any other user defined status.
`firstName`                      | `String`   |
`lastName`                       | `String`   |
`email`                          | `String`   | Email of the Customer, must be unique.
`displayName`                    | `String`   | Any other name for the Customer
`phoneNumber`                    | `String`   |
`label`                          | `String`   | A user defined label for the Customer for filtering purpose.
`deliveryAddressLineOne`         | `String`   |
`deliveryAddressLineTwo`         | `String`   |
`deliveryAddressLineProvince`    | `String`   |
`deliveryAddressLinePostalCode`  | `String`   |
`customData`                     | `Json`     |
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
    "status": "member",
    "firstName": "Roy",
    "lastName": "Bao",
    "email": "roy@outersky.com",
    "displayName": "Roy",
    "phoneNumber": "1234567890",
    "label": null,
    "deliveryAddressLineOne": "Unit 123",
    "deliveryAddressLineTwo": "3535 Abc St",
    "deliveryAddressProvince": "BC",
    "deliveryAddressCity": "Vancouver",
    "deliveryAddressCountryCode": "CAN",
    "deliveryAddressPostalCode": "abcabc",
    "customData": { "custom1": "hi" },
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
`status`                         | One of `anonymous`, `registered`, `suspended` or any other user defined status.
`firstName`                      | _(required)_
`lastName`                       | _(required)_
`email`                          | _(required)_ Email of the Customer, must be unique.
`password`                       | _(required)_
`displayName`                    | Any other name for the Customer
`phoneNumber`                    |
`label`                          | A user defined label for the Customer for filtering purpose.
`deliveryAddressLineOne`         |
`deliveryAddressLineTwo`         |
`deliveryAddressLineProvince`    |
`deliveryAddressLinePostalCode`  |
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
    "email": "roy@outersky.com",
    "password": "test1234",
    "displayName": "Roy",
    "phoneNumber": "1234567890",
    "deliveryAddressLineOne": "Unit 123",
    "deliveryAddressLineTwo": "3535 Abc St",
    "deliveryAddressProvince": "BC",
    "deliveryAddressCity": "Vancouver",
    "deliveryAddressCountryCode": "CAN",
    "deliveryAddressPostalCode": "abcabc",
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
    "email": "roy@outersky.com",
    "displayName": "Roy",
    "phoneNumber": "1234567890",
    "label": null,
    "deliveryAddressLineOne": "Unit 123",
    "deliveryAddressLineTwo": "3535 Abc St",
    "deliveryAddressProvince": "BC",
    "deliveryAddressCity": "Vancouver",
    "deliveryAddressCountryCode": "CAN",
    "deliveryAddressPostalCode": "abcabc",
    "customData": { "custom1": "hi" },
    "locale": "en",
    "insertedAt": "2017-04-01T07:43:29.516422",
    "updatedAt": "2017-04-01T07:43:29.516422"
  }
}
```


### Retrieve a Customer

This endpoint retrieve a previously created Customer. You must supply either a CAT or UAT in order to use this endpoint.

**URL Parameters**

Name                             | Description
---------------------------------|-----------
`id`                             | _(required)_ The Customer's ID


**Query String Parameters**

Key           | Description
--------------|-----------
`locale`      |
`include`     |

**Returns**

Returns a Customer object if the request succeeded.


#### Endpoint when using CAT

```endpoint
GET /customer
```

#### Example Request

```http
GET /v1/customer HTTP/1.1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {CAT}
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
    "status": "member",
    "firstName": "Roy",
    "lastName": "Bao",
    "email": "roy@outersky.com",
    "displayName": "Roy",
    "phoneNumber": "1234567890",
    "label": null,
    "deliveryAddressLineOne": "Unit 123",
    "deliveryAddressLineTwo": "3535 Abc St",
    "deliveryAddressProvince": "BC",
    "deliveryAddressCity": "Vancouver",
    "deliveryAddressCountryCode": "CAN",
    "deliveryAddressPostalCode": "abcabc",
    "customData": { "custom1": "hi" },
    "locale": "en",
    "insertedAt": "2017-04-01T07:43:29.516422",
    "updatedAt": "2017-04-01T07:43:29.516422"
  }
}
```

#### Endpoint when using UAT

```endpoint
GET /customers/{id}
```

#### Example Request

```http
GET /v1/customers/33768c8a-a7e7-448e-ad2c-4279228b5bf4 HTTP/1.1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {UAT}
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
    "status": "member",
    "firstName": "Roy",
    "lastName": "Bao",
    "email": "roy@outersky.com",
    "displayName": "Roy",
    "phoneNumber": "1234567890",
    "label": null,
    "deliveryAddressLineOne": "Unit 123",
    "deliveryAddressLineTwo": "3535 Abc St",
    "deliveryAddressProvince": "BC",
    "deliveryAddressCity": "Vancouver",
    "deliveryAddressCountryCode": "CAN",
    "deliveryAddressPostalCode": "abcabc",
    "customData": { "custom1": "hi" },
    "locale": "en",
    "insertedAt": "2017-04-01T07:43:29.516422",
    "updatedAt": "2017-04-01T07:43:29.516422"
  }
}
```

### Update a Customer

This endpoint updates a Customer object. You must supply either a CAT or UAT in order to use this endpoint. Any fields not provided will be left unchanged. If the `status` is set to `anonymous` then **all fields are optional**. If `status` is set to `registered` then fields are required as specified below. If the `status` was already `registered` then you can not update it to `anonymous` again.

**URL Parameters**

Name                             | Description
---------------------------------|-----------
`id`                             | _(required)_ The Customer's ID

**Query String Parameters**

Key           | Description
--------------|-----------
`locale`      |
`include`     |

**Fields**

Attribute                        | Description
---------------------------------|-----------
`code`                           | A unique code for the Customer, you can assign any string.
`status`                         | One of `anonymous`, `registered`, `suspended`, `deleted` or any other user defined status.
`firstName`                      | _(required)_
`lastName`                       | _(required)_
`email`                          | _(required)_ Email of the Customer, must be unique.
`password`                       | _(required)_
`displayName`                    | Any other name for the Customer
`phoneNumber`                    |
`label`                          | A user defined label for the Customer for filtering purpose.
`deliveryAddressLineOne`         |
`deliveryAddressLineTwo`         |
`deliveryAddressLineProvince`    |
`deliveryAddressLinePostalCode`  |
`customData`                     |

**Returns**

Returns the Customer object if the request succeeded. Returns an error if any of the fields are invalid.

#### Endpoint

```endpoint
PATCH /customers/{id}
```

#### Example Request

```http
PATCH /v1/customers/{id} HTTP/1.1
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {CAT}
```

```http
{
  "type": "Customer",
  "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
  "attributes": {
    "code": "C389DK",
    "status": "member",
    "firstName": "Roy",
    "lastName": "Bao",
    "email": "roy@outersky.com",
    "password": "test1234",
    "displayName": "Roy",
    "phoneNumber": "1234567890",
    "deliveryAddressLineOne": "Unit 123",
    "deliveryAddressLineTwo": "3535 Abc St",
    "deliveryAddressProvince": "BC",
    "deliveryAddressCity": "Vancouver",
    "deliveryAddressCountryCode": "CAN",
    "deliveryAddressPostalCode": "abcabc",
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
    "status": "member",
    "firstName": "Roy",
    "lastName": "Bao",
    "email": "roy@outersky.com",
    "displayName": "Roy",
    "phoneNumber": "1234567890",
    "label": null,
    "deliveryAddressLineOne": "Unit 123",
    "deliveryAddressLineTwo": "3535 Abc St",
    "deliveryAddressProvince": "BC",
    "deliveryAddressCity": "Vancouver",
    "deliveryAddressCountryCode": "CAN",
    "deliveryAddressPostalCode": "abcabc",
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

**Filterable Attributes**: `status`, `label`<br>

**Searchable Attributes**: `code`, `firstName`, `lastName`, `email`, `phoneNumber`


## Charge

## Refund

## Card

## Stripe Account

## Product

A Product represents a number of Product Items grouped together. Generally there are two ways to use the Product resource:

1. The first way to use the Product resource is to group similar Product Item together. For example if you are selling a T-shirt, you can use Product Item to represent a single size of the T-shirt. If you have 3 different sizes (S, M, L) then you can create three Product Items, but you will only have one Product to group them beacuse to the Customer the three Product Items represents the same Product. When the customer buys the Product they will need to choose which Product Item.

2. The second way to use the Product resource is to group unrelated Product Item together as a bundle or combo. For example if you are selling an apple and an orange together as a fruit combo, you can create two Product Item, one for apple one for orange. You can then use one Product that contains those two Product Items and the Product is the fruit combo you are selling. When the customer buys the Product they are buying all of the corresponding Product Item.

However even if you only have one Product Item you must still use a Product, since a Product Item must belong to a Product.

**Localizable Attributes**: `name`, `shortName` `printName`, `specification`, `storageDescription`, `caption`,  `description`

Attribute                     | Type     | Description
------------------------------|----------|-----------
`status`                      | `String`   |
`name`                        | `String`   |
`printName`                   | `String`   | Name to print when printing. To accomndate most receipt printer it is recommended to limit this field to at most 64 characters.
`itemMode`                    | `String`   | Can be either `any` or `all` specifying whether Customer can buy any of the Product Item or buy all of the Product Item of this Product
`specification`               | `String`     |
`caption`                     | `String`   | A short description of the Product.
`description`                 | `String`     | A detail description of the Product.


Relationship                        | Type                     | Description
------------------------------------|--------------------------|-----------
`avatar`                            | ExternalFile             |
`items`                             | Array< ProductItem >       |

## Product Collection

A Product Collection represents a collection of Product.

## Product Item

A Product Item represents a single item for sale. An item can be either an Unlockable or a SKU. The Product Item resources are used together with the Product resource to reprepsent items for sale.

**Localizable Attributes**: `name`, `shortName` `printName`, `specification`, `storageDescription`, `caption`,  `description`

Attribute              | Type     | Description
----------------------------|----------|-----------
`code`                        | `String`   | A unique code for the SKU, you can assign any string. This code must be unique for each SKU.
`status`                      | `String`   |
`name`                        | `String`   |
`shortName`                   | `String`   |
`printName`                   | `String`   | Name to print when printing. To accomndate most receipt printer it is recommended to limit this field to at most 64 characters.
`sourceQuantity`              | `Integer`  | How many of source are considered 1 Product Item.
`primary`                     | `Boolean`  | Whether this is the primary item for the Product.
`maximumPublicOrderQuantity`  | `Integer`  | The maximum quantity a Customer can order.
`specification`               | `String`     |
`caption`                     | `String`   | A short description of the Product Item.
`description`                 | `String`     | A detail description of the Product Item.


**Localizable Relationships**: `avatar`

Relationship                        | Type                            | Description
------------------------------------|---------------------------------|-----------
`sku`                               | `Sku`                           |
`unlockable`                        | `Unlockable`                    |
`source`                            | `Sku`, `Unlockable`             |
`product`                           | `Product`                         |
`avatar`                            | `ExternalFile`                    |
`prices`                            | `Array<Price>`                    |
`externalFileCollections`           | `Array<ExternalFileCollection>`   |

**Notes**: Exactly one of `sku` and `unlockable` can be set. If one is set, the other must be nil.


## Price

A Price represents a price for a specific Product Item. The Price resource allow you to price your Product Item in many ways:

1. **Fixed Price per Item**: This the most common way to price your item. For example if you are selling a T-shirt for $20 each, you can do the following:

    - set `chargeAmountCents: 2000`; and
    - set `chargeUnit: "EA"` since you are charging for each T-shirt; and
    - set `orderUnit: "EA"`, since the customer is ordering by each individual T-shirt.

2. **Variable Price per Item**: This way of pricing is needed when each item can have a different price. For example if you are selling beef at $2/lb and each beef portion is not in the same weight. The weight range for each portion of beef is from 1.5 pounds to 2.5 pounds. In this case you can do the following:

    - set `chargeAmountCents: 200`; and
    - set `estimateAmountCents: 400` since the average weight of each beef portion is 2 pounds, so you can use `2 * 200 = 400` as the estimate to display for your customer so at least they have an idea of how much they will be paying; and
    - set `maximumAmountCents: 500` since the largest portion of beef is $5, you can set that as the maximum so that `authorizedAmountCents` in order will be calculated accordingly to authorize customer's card with the max amount in case they got the largest portion; and
    - set `chargeUnit: "LB"`, since you are charging by pounds
    - set `orderUnit: "EA"`, since the customer is ordering each portion of the beef not each pound of beef.

3. **Wholesale Price**: In addition to the above ways of pricing you can also set a wholesale price by setting the `minimumOrderQuantity`. For example if you sell each T-shirt at $20 but wants to cut the price to $15 per T-shirt if a customer buys 10 or more of them at once, then you can create two Price resources for that specified T-shirt Product Item then do the following:

    - set `minimumOrderQuantity: 0` and `chargeAmountCents: 2000` for one of the Price; and
    - set `minimumOrderQuantity: 10` and `chargeAmountCents: 1000` for the other Price.

  When a Customer add the item to their Order, by default FreshCom will use the lowest price with `publicOrderable: true` that matches the `minimumOrderQuantity`.


**Localizable Attributes**: `name`, `caption`.

Attribute              | Type     | Description
-----------------------|----------|-----------
`name`                 | `String`   | A name for this price. For example "On Sale Price"
`status`               | `String`   | One of `pending`, `active`, `expired`, `display_only`, `disabled` or any other user defined status
`caption`              | `String`   | A short description for this price. For example "On Sale until 2017-05-01"
`chargeAmountCents`    | `Integer`  | Amount to charge per quantity in `chargeUnit`
`estimateAmountCents`  | `Integer`  | An estimate amount per quantity in `orderUnit`
`maximumAmountCents`   | `Integer`  | The amount to authorize when `estimateByDefault` is set to `true`
`currencyCode`         | `String`   |
`minimumOrderQuantity` | `Integer`  | The minimum amout of item to order for this price to be in effect
`orderUnit`            | `String`   |
`chargeUnit`           | `String`   |
`publicOrderable`      | `Boolean`  | If `true` then customer can use this price, set `false` to make this price dashboard only
`label`                | `String`   |
`estimateByDefault`    | `Boolean`  | If `true` then the price is going to be an estimate only
`taxOneRate`           | `Float`    |
`taxTwoRate`           | `Float`    |
`taxThreeRate`         | `Float`    |
`startDate`            | `Datetime` | The start time of this price, if this is set then before the `startDate` the status of the price can only be `pending`
`endDate`              | `Datetime` | The end time of this price, if this is set then after the `endDate` the price can only be `expired` or `disabled`


Relationship                        | Type                     | Description
------------------------------------|--------------------------|-----------
`item`                              | ProductItem              | The Product Item that this price is for.

## Order

An Order represents a cart or a placed Order.

Attribute                    | Type     | Description
-----------------------------|----------|-----------
`status`                     | `String` | One of `cart`, `open`, `closed` or any user defined order.

## Line Item

A Line Item represents a single item in the order.

**Localizable Attributes**: `name`, `description`, `priceName`.

Attribute                    | Type     | Description
-----------------------------|----------|-----------
`name`                       | `String`   |
`printName`                  | `String`   | If the item relationship is defined, this attribute will always reflect the item's `printName` attribute and setting it has no effect.
`description`                | `String`   |
`isLeaf`                     | `Boolean`  |
`isEstimate`                 | `Boolean`  |
`priceName`                  | `String`   |
`priceLabel`                 | `String`   |
`priceCaption`               | `String`   |
`priceCurrencyCode`          | `Integer`  |
`priceChargeAmountCents`     | `Integer`  |
`priceEstimateAmountCents`   | `Integer`  |
`priceMaximumAmountCents`    | `Integer`  |
`priceTaxOneRate`            | `Float`    |
`priceTaxTwoRate`            | `Float`    |
`priceTaxThreeRate`          | `Float`    |
`priceEstimateByDefault`     | `Boolean`  |
`priceChargeUnitOfMeasure`   | `String`   |
`priceOrderUnitOfMeasure`    | `String`   |
`priceStartDate`             | `Datetime` |
`priceEndDate`               | `Datetime` |
`chargeQuantity`             | `Float`    |
`orderQuantity`              | `Integer`  |
`subTotalCents`              | `Integer`  |
`taxOneCents`                | `Integer`  |
`taxTwoCents`                | `Integer`  |
`taxThreeCents`              | `Integer`  |
`grandTotalCents`            | `Integer`  |


Relationship                        | Type                     | Description
------------------------------------|--------------------------|-----------
`order`                             | Order                    |
`price`                             | Price                    |
`item`                              | ProductItem              |

