## Order

An order represents a cart or a placed order. A cart is simply an order with status `cart`.

**Attributes**

Name                         | Type       | Description
-----------------------------|------------|-------------|
`status`                     | `String`   | One of `cart`, `open`, `closed`, `cancelled`
`code`                       | `String`   | _(user-defined)_ A unique code for the order.
`label`                      | `String`   | _(user-defined)_ A label for the order.
`email`                      | `String`   | The email of the order.
`firstName`                  | `String`   | The first name of the order.
`lastName`                   | `String`   | The last name of the order.
`name`                       | `String`   | The full name of the order.
`phoneNumber`                | `String`   | The phone number of the order.
`subTotalCents`              | `Integer`  | The sub total of the order in cents.
`taxOneCents`                | `Integer`  | The tax one of the order in cents.
`taxTwoCents`                | `Integer`  | The tax two of the order in cents.
`taxThreeCents`              | `Integer`  | The tax three of the order in cents.
`grandTotalCents`            | `Integer`  | The grand total of the order in cents.
`authorizationTotalCents`    | `Integer`  | The amount to authorize if you create a payment with `authorized` status.
`isEstimate`                 | `Boolean`  | Indicate whether the sub total is an estimate.
`paymentStatus`              | `String`   | One of `pending`, `authorized`, `partiallyAuthorized`, `partiallyPaid`, `paid`, `overPaid`, `partiallyRefunded` or `refunded`.
`fulfillmentMethod`          | `String`   | One of `pickup`, `ship` or `digital`.
`deliveryAddressLineOne`     | `String`   |
`deliveryAddressLineTwo`     | `String`   |
`deliveryAddressProvince`    | `String`   |
`deliveryAddressCountryCode` | `String`   |
`deliveryAddressPostalCode`  | `String`   |
`fulfillmentStatus`          | `String`   | One of `pending`, `partialllyFulfilled`, `fulfilled`, `partiallyReturned`, `returned`, `partiallyDiscarded` or `discarded`
`openedAt`                   | `String`   | The datetime that the order opened at.
`confirmationEmailSentAt`    | `String`   | The datetime that the confirmation email sent at.
`caption`                    | `String`   | _(user-defined)_ _(localizable)_ A short description of the order.
`description`                | `String`   | _(user-defined)_ _(localizable)_ A long description of the order.
`customData`                 | `Object`   | _(user-defined)_ _(localizable)_
`insertedAt`                 | `String`   |
`updatedAt`                  | `String`   |

**Relationships**

Name              | Type                     | Description
------------------|--------------------------|-------------|
`customer`        | `Customer`               | The customer this order belongs to.
`rootLineItems`   | `Array<OrderLineItem>`   | The top level line items of this order.

#### Example Response

```json
{
  "data": {
    "id": "4665c136-1448-4e04-a959-5358828f4feb",
    "type": "Order",
    "attributes": {
      "status": "cart",
      "code": "ORD001",
      "label": null,
      "email": "test@example.com",
      "firstName": "Captain",
      "lastName": "Good",
      "name": "Captain Good",
      "phoneNumber": "+1234567890",
      "subTotalCents": 10000,
      "taxOneCents": 500,
      "taxTwoCents": 700,
      "taxThreeCents": 0,
      "grandTotalCents": 11200,
      "authorizationTotalCents": 11200,
      "isEstimate": false,
      "paymentStatus": "pending",
      "fulfillmentMethod": "pickup",
      "deliveryAddressLineOne": null,
      "deliveryAddressLineTwo": null,
      "deliveryAddressProvince": null,
      "deliveryAddressCountryCode": null,
      "deliveryAddressPostalCode": null,
      "fulfillmentStatus": "pending",
      "openedAt": null,
      "confirmationEmailSentAt": null,
      "caption": null,
      "description": null,
      "customData": {},
      "insertedAt": "",
      "updatedAt": ""
    },
    "relationships": {
      "customer": {
        "data": {
          "id": "e407d0dc-58d4-48ff-a70f-c6e022e028f1",
          "type": "Customer"
        }
      }
    }
  }
}
```

### Create an order

Use this endpoint to create an order/cart. When creating an order all attributes and relationships are optional. The created order will always have status `cart` representing a cart. To actually place the order use the update endpoint to update it or create a payment targeting the order. Please see our guide on [placing order](http://example.com).

**Authorization**

Authorized roles: all

Only user with role `supportSpecialist`, `developer` or `administrator` can set the `customer` relationship.

**Attributes**

Name                         | Type       |  Description |
-----------------------------|------------|--------------|
`code`                       | `String`   |
`label`                      | `String`   |
`email`                      | `String`   |
`firstName`                  | `String`   |
`lastName`                   | `String`   |
`name`                       | `String`   |
`phoneNumber`                | `String`   |
`fulfillmentMethod`          | `String`   |
`deliveryAddressLineOne`     | `String`   | Required if `fulfillmentMethod` is `ship`
`deliveryAddressLineTwo`     | `String`   | Required if `fulfillmentMethod` is `ship`
`deliveryAddressProvince`    | `String`   | Required if `fulfillmentMethod` is `ship`
`deliveryAddressCountryCode` | `String`   | Required if `fulfillmentMethod` is `ship`
`deliveryAddressPostalCode`  | `String`   | Required if `fulfillmentMethod` is `ship`
`caption`                    | `String`   |
`description`                | `String`   |
`customData`                 | `Object`   |

**Relationships**

Name               | Type        | Description
-------------------|-------------|-------|
`customer`         | `Customer`  | Only customer with role `supportSpecialist`, `developer` or `administrator` can set the `customer` relationship, otherwise it will be set automatically

**Events**

Name: `identity.order.create.success`

Event Data         | Type                     | Description
-------------------|--------------------------|-------|
`order`              | `Order`                  |
`rootLineItems`      | `Array<OrderLineItem>`   |
`customer`           | `Customer`               |
`user`               | `User`                   |
`account`            | `Account`                |

**Returns**

Returns the created order.

#### Definition

```endpoint
POST /orders
```

#### Example Request

```http
POST /v1/orders
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "type": "Order",
    "attributes": {
      "name": "Captain Good"
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.createOrder({
  name: "Captain Good"
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
  "data": {
    "id": "4665c136-1448-4e04-a959-5358828f4feb",
    "type": "Order",
    "attributes": {
      "status": "cart",
      "code": null,
      "label": null,
      "email": null,
      "firstName": null,
      "lastName": null,
      "name": "Captain Good",
      "phoneNumber": null,
      "subTotalCents": 0,
      "taxOneCents": 0,
      "taxTwoCents": 0,
      "taxThreeCents": 0,
      "grandTotalCents": 0,
      "authorizationTotalCents": 0,
      "isEstimate": false,
      "paymentStatus": "pending",
      "fulfillmentMethod": null,
      "deliveryAddressLineOne": null,
      "deliveryAddressLineTwo": null,
      "deliveryAddressProvince": null,
      "deliveryAddressCountryCode": null,
      "deliveryAddressPostalCode": null,
      "fulfillmentStatus": "pending",
      "openedAt": null,
      "confirmationEmailSentAt": null,
      "caption": null,
      "description": null,
      "customData": {},
      "insertedAt": "",
      "updatedAt": ""
    },
    "relationships": {
      "customer": {
        "data": null
      }
    }
  }
}
```

### Retrieve an order

Use this endpoint to retrieve a previously created order. You must provide the ID of the order.

**Authorization**

Authorized roles: all

- Guest user can only retrieve order that is not assicated with any customer.
- User with role other than `supportSpecialist`, `businessAnalyst`, `developer` or `administrator` can only retrieve order that belongs to their associated customer.

**Parameters**

Name               | Type      | Description
-------------------|-----------|-------|
`id`               | `String`  |

**Returns**

Returns the target order.

#### Definition

```endpoint
GET /orders/{id}
```

#### Example Request

```http
GET /v1/orders/4665c136-1448-4e04-a959-5358828f4feb
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.retrieveOrder('4665c136-1448-4e04-a959-5358828f4feb').then(function (response) {
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
    "id": "4665c136-1448-4e04-a959-5358828f4feb",
    "type": "Order",
    "attributes": {
      "status": "cart",
      "code": null,
      "label": null,
      "email": null,
      "firstName": null,
      "lastName": null,
      "name": "Captain Good",
      "phoneNumber": null,
      "subTotalCents": 0,
      "taxOneCents": 0,
      "taxTwoCents": 0,
      "taxThreeCents": 0,
      "grandTotalCents": 0,
      "authorizationTotalCents": 0,
      "isEstimate": false,
      "paymentStatus": "pending",
      "fulfillmentMethod": null,
      "deliveryAddressLineOne": null,
      "deliveryAddressLineTwo": null,
      "deliveryAddressProvince": null,
      "deliveryAddressCountryCode": null,
      "deliveryAddressPostalCode": null,
      "fulfillmentStatus": "pending",
      "openedAt": null,
      "confirmationEmailSentAt": null,
      "caption": null,
      "description": null,
      "customData": {},
      "insertedAt": "",
      "updatedAt": ""
    },
    "relationships": {
      "customer": {
        "data": null
      }
    }
  }
}
```

### Update an order

Use this endpoint to update a previously created order. You must provide the ID of the order.

**Authorization**

Authorized roles: all

User with role other than `supportSpecialist`, `developer` and `administrator` can only do the following:

- They can only update an order with status `cart`.
- They can update the `status` to `opened` only if the order's `grandTotalCents` is `0`.
- They can not update the `status` to anything other than `opened`.

**Attributes**

Name                         | Type       |  Description |
-----------------------------|------------|--------------|
`status`                     | `String`   | One of `cart`, `opened`, `closed`, `cancelled`
`code`                       | `String`   |
`label`                      | `String`   |
`email`                      | `String`   | _(required)_
`firstName`                  | `String`   |
`lastName`                   | `String`   |
`name`                       | `String`   | Required if `firstName` or `lastName` is not provided
`phoneNumber`                | `String`   |
`fulfillmentMethod`          | `String`   | _(required)_
`deliveryAddressLineOne`     | `String`   | Required if `fulfillmentMethod` is `ship`
`deliveryAddressLineTwo`     | `String`   | Required if `fulfillmentMethod` is `ship`
`deliveryAddressProvince`    | `String`   | Required if `fulfillmentMethod` is `ship`
`deliveryAddressCountryCode` | `String`   | Required if `fulfillmentMethod` is `ship`
`deliveryAddressPostalCode`  | `String`   | Required if `fulfillmentMethod` is `ship`
`caption`                    | `String`   |
`description`                | `String`   |
`customData`                 | `Object`   |

**Parameters**

Name               | Type      | Description
-------------------|-----------|-------|
`id`               | `String`  |

**Events**

Name: `storefront.order.update.success`

Event Data           | Type                     | Description
---------------------|--------------------------|-------|
`order`              | `Order`                  |
`rootLineItems`      | `Array<OrderLineItem>`   |
`customer`           | `Customer`               |
`user`               | `User`                   |
`account`            | `Account`                |

Name: `storefront.order.opened.success`<br/>
This event only fire if the status of the order changed from `cart` to `opened`.

Event Data           | Type                     | Description
---------------------|--------------------------|-------|
`order`              | `Order`                  |
`rootLineItems`      | `Array<OrderLineItem>`   |
`customer`           | `Customer`               |
`user`               | `User`                   |
`account`            | `Account`                |

**Returns**

Returns the updated order.

#### Definition

```endpoint
PATCH /orders/{id}
```

#### Example Request

```http
PATCH /v1/orders/4665c136-1448-4e04-a959-5358828f4feb
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "id": "4665c136-1448-4e04-a959-5358828f4feb",
    "type": "Order",
    "attributes": {
      "name": "Captain Evil"
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.updateOrder('4665c136-1448-4e04-a959-5358828f4feb', {
  name: 'Captain Evil'
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
    "id": "4665c136-1448-4e04-a959-5358828f4feb",
    "type": "Order",
    "attributes": {
      "status": "cart",
      "code": null,
      "label": null,
      "email": null,
      "firstName": null,
      "lastName": null,
      "name": "Captain Evil",
      "phoneNumber": null,
      "subTotalCents": 0,
      "taxOneCents": 0,
      "taxTwoCents": 0,
      "taxThreeCents": 0,
      "grandTotalCents": 0,
      "authorizationTotalCents": 0,
      "isEstimate": false,
      "paymentStatus": "pending",
      "fulfillmentMethod": null,
      "deliveryAddressLineOne": null,
      "deliveryAddressLineTwo": null,
      "deliveryAddressProvince": null,
      "deliveryAddressCountryCode": null,
      "deliveryAddressPostalCode": null,
      "fulfillmentStatus": "pending",
      "openedAt": null,
      "confirmationEmailSentAt": null,
      "caption": null,
      "description": null,
      "customData": {},
      "insertedAt": "",
      "updatedAt": ""
    },
    "relationships": {
      "customer": {
        "data": null
      }
    }
  }
}
```

### Delete an order

Use this endpoint to delete an order. Only order with `cart` status can be deleted.

### List orders

Use this endpoint to list some or all orders. By default only order with status `opened` will be returned.

**Authorization**

Authorized roles: all

User with role other than `supportSpecialist`, `businessAnalyst`, `developer` and `administrator` can only list order that belongs to their associated customer.

**Parameters**

Name                                  | Type             | Description
--------------------------------------|------------------|-------|
`search`                              | `String`         | If provided only order have `id`, `code`, `name`, `email` or `phoneNumber` that matches the search string will be returned
`filter`                              | `Object`         |
`filter.status`                       | `Array<String>`  | If not provided, defaults to `['opened']`
`filter.label`                        | `String`         |
`filter.email`                        | `String`         |
`filter.phoneNumber`                  | `String`         |
`filter.paymentStatus`                | `Array<String>`  |
`filter.fulfillmentMethod`            | `String`         |
`filter.deliveryAddressProvince`      | `Array<String>`  |
`filter.deliveryAddressCountryCode`   | `Array<String>`  |
`filter.deliveryAddressPostalCode`    | `Array<String>`  |
`filter.fulfillmentStatus`            | `Array<String>`  |
`filter.isEstimate`                   | `Boolean`        |
`filter.customerId`                   | `String`         |

**Returns**

Returns a list of orders.

#### Definition

```endpoint
GET /orders?search={search}&filter={filter}
```

#### Example Request

```http
GET /v1/orders?search=Good&filter[isEstimate]=false&filter[status]=cart
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.listOrder({
  search: 'Good',
  filter: { isEstimate: false }
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
    "totalCount": 3,
    "allCount": 102
  },
  "data": [
    {
      "id": "4665c136-1448-4e04-a959-5358828f4feb",
      "type": "Order",
      "attributes": {
        "status": "cart",
        "code": null,
        "label": null,
        "email": null,
        "firstName": null,
        "lastName": null,
        "name": "Captain Good",
        "phoneNumber": null,
        "subTotalCents": 0,
        "taxOneCents": 0,
        "taxTwoCents": 0,
        "taxThreeCents": 0,
        "grandTotalCents": 0,
        "authorizationTotalCents": 0,
        "isEstimate": false,
        "paymentStatus": "pending",
        "fulfillmentMethod": null,
        "deliveryAddressLineOne": null,
        "deliveryAddressLineTwo": null,
        "deliveryAddressProvince": null,
        "deliveryAddressCountryCode": null,
        "deliveryAddressPostalCode": null,
        "fulfillmentStatus": "pending",
        "openedAt": null,
        "confirmationEmailSentAt": null,
        "caption": null,
        "description": null,
        "customData": {},
        "insertedAt": "",
        "updatedAt": ""
      },
      "relationships": {
        "customer": {
          "data": null
        }
      }
    },
    {...},
    {...}
  ]
}
```

## Order Line Item

A order line item represents a line item of an order, it is a very important resource that connects product and price together with a quantity to an order. Order line item can be nested. If an order line item has one or more children then its `subTotalCents`, `taxOneCents`, `taxTwoCents`, `taxThreeCents`, `grandTotalCents` and `authorizationTotalCents` will also be the sum of its children's corresponding attribute.

All attributes start with `price`, for example `priceName` are copied from the corresponding fields from the order line item's price if provided at the time of its creation. However the price resource maybe updated after the order line item is created, so their value may not always match the order line item's price related attributes. This behaviour is intentional so that you don't lose the information about the price that was used to create the order line item.

**Attributes**

Name                               | Type       | Description
-----------------------------------|------------|---------------|
`code`                             | `String`   | _(user-defined)_ A unique code for this order line item.
`name`                             | `String`   | _(localizable)_
`label`                            | `String`   | _(user-defined)_ A label for this order line item.
`fulfillmentStatus`                | `String`   | The fulfillment status of this order line item, can be one of `pending`, `partially_fulfilled`, `fulfilled`, `partially_returned`, `returned`, `discarded`.
`printName`                        | `String`   | _(localizable)_
`isLeaf`                           | `Boolean`  | `true` if this order line item has no children, `false` otherwise
`orderQuantity`                    | `Integer`  | The quantity ordered by customer, matching the unit provided by `priceOrderUnit`
`chargeQuantity`                   | `Float`    | The quantity to charge for when cutomer make payment matching the unit provided by `priceChargeUnit`. See our guide on [price your product](http://example.com).
`priceName`                        | `String`   | _(localizable)_
`priceLabel`                       | `String`   | _(user-defined)_
`priceCaption`                     | `String`   | _(user-defined)_ _(localizable)_
`priceOrderUnit`                   | `String`   | _(localizable)_
`priceChargeUnit`                  | `String`   | _(localizable)_
`priceCurrencyCode`                | `Integer`  |
`priceChargeAmountCents`           | `Integer`  |
`priceEstimateAveragePercentage`   | `Integer`  |
`priceEstimateMaximumPercentage`   | `Integer`  |
`priceTaxOnePercentage`            | `Float`    |
`priceTaxTwoPercentage`            | `Float`    |
`priceTaxThreePercentage`          | `Float`    |
`priceEstimateByDefault`           | `Boolean`  |
`priceEndDate`                     | `String`   |
`subTotalCents`                    | `Integer`  | If this order line item has one or more children then this field will be the sum of all its children's `subTotalCents`
`taxOneCents`                      | `Integer`  | If this order line item has one or more children then this field will be the sum of all its children's `taxOneCents`
`taxTwoCents`                      | `Integer`  | If this order line item has one or more children then this field will be the sum of all its children's `taxTwoCents`
`taxThreeCents`                    | `Integer`  | If this order line item has one or more children then this field will be the sum of all its children's `taxThreeCents`
`grandTotalCents`                  | `Integer`  | If this order line item has one or more children then this field will be the sum of all its children's `grandTotalCents`
`authorizationTotalCents`          | `Integer`  | If this order line item has one or more children then this field will be the sum of all its children's `authorizationTotalCents`
`isEstimate`                       | `Boolean`  | If this order line item has one or more children then this field will be `false` only if all its children is `false`, otherwise it will be `true`
`caption`                          | `String`   | _(user-defined)_ _(localizable)_ A short description of this order line item.
`description`                      | `String`   | _(user-defined)_ _(localizable)_ A long description of this order.
`customData`                       | `String`   | _(user-defined)_ _(localizable)_
`insertedAt`                       | `String`   |
`updatedAt`                        | `String`   |

**Relationships**

Name           | Type                     | Description
---------------|--------------------------|-------------|
`order`        | `Order`                  |
`price`        | `Price`                  |
`product`      | `Product`                |
`parent`       | `OrderLineItem`          |
`children`     | `Array<OrderLineItem>`   |


#### Example Response

```json
{
  "data": {
    "id": "e7fec34b-3599-437c-b6bc-690ae02993c2",
    "type": "OrderLineItem",
    "attributes": {
      "code": null,
      "name": "Warp Drive",
      "label": null,
      "fulfillmentStatus": "pending",
      "printName": null,
      "isLeaf": false,
      "orderQuantity": 1,
      "chargeQuantity": 1,
      "priceName": "Regular",
      "priceLabel": null,
      "priceCaption": null,
      "priceOrderUnit": "EA",
      "priceChargeUnit": "EA",
      "priceCurrencyCode": "CAD",
      "priceChargeAmountCents": 50000,
      "priceEstimateAveragePercentage": null,
      "priceEstimateMaximumPercentage": null,
      "priceTaxOnePercentage": 10,
      "priceTaxTwoPercentage": 15,
      "priceTaxThreePercentage": 1,
      "priceEstimateByDefault": false,
      "priceEndDate": null,
      "subTotalCents": 50000,
      "taxOneCents": 5000,
      "taxTwoCents": 7500,
      "taxThreeCents": 500,
      "grandTotalCents": 63000,
      "authorizationTotalCents": 63000,
      "isEstimate": false,
      "caption": null,
      "description": null,
      "customData": {},
      "insertedAt": "",
      "updatedAt": ""
    },
    "relationships": {
      "order": {
        "data": {
          "id": "f78c1541-1874-4dfc-a31c-8ad52d3fe468",
          "type": "Order"
        }
      },
      "product": {
        "data": {
          "id": "60fb4a42-0a4b-46df-babb-02f2c9dcef10",
          "type": "Product"
        }
      },
      "price": {
        "data": {
          "id": "84e0b7d9-7da4-4934-a388-bee1d5befff3",
          "type": "Price"
        }
      },
      "parent": {
        "data": null
      },
      "children": {
        "data": [
          {
            "id": "5e9240ff-0885-4327-a1e7-f46f3fdb3f74",
            "type": "OrderLineItem"
          }
        ]
      }
    }
  }
}
```

### Create a line item

Use this endpoint to create a line item.

**Authorization**

Authorized roles: all

- User with role other than `supportSpecialist`, `developer` or `administrator` can only create line item for order with `cart` status.
- Only user with role `supportSpecialist`, `developer` or `administrator` can set `chargeQuantity` and `isEstimate`.

**Parameters**

Name               | Type      | Description
-------------------|-----------|-------|
`order_id`               | `String`  | The order to create the line item for

**Attributes**

Name                               | Type       | Description
-----------------------------------|------------|---------------|
`code`                             | `String`   |
`name`                             | `String`   | Required if `product` is not provided.
`label`                            | `String`   |
`printName`                        | `String`   |
`orderQuantity`                    | `Integer`  | If not provided, defaults to `1`
`chargeQuantity`                   | `Float`    |
`subTotalCents`                    | `Integer`  | If not provided, defaults to 0. Can only be set if this order line item has no children and no price, otherwise it will be calculated automatically.
`taxOneCents`                      | `Integer`  | If not provided, defaults to 0. Can only be set if this order line item has no children and no price, otherwise it will be calculated automatically.
`taxTwoCents`                      | `Integer`  | If not provided, defaults to 0. Can only be set if this order line item has no children and no price, otherwise it will be calculated automatically.
`taxThreeCents`                    | `Integer`  | If not provided, defaults to 0. Can only be set if this order line item has no children and no price, otherwise it will be calculated automatically.
`grandTotalCents`                  | `Integer`  | If not provided, defaults to 0. Can only be set if this order line item has no children and no price, otherwise it will be calculated automatically.
`authorizationTotalCents`          | `Integer`  | Can only be set if this order line item has no children and no price and `isEstimate` is `true`, otherwise it will be calculated automatically.
`isEstimate`                       | `Boolean`  | Can only be set if this order line item has no children
`caption`                          | `String`   |
`description`                      | `String`   |
`customData`                       | `String`   |

**Relationships**

Name           | Type                     | Description
---------------|--------------------------|-------------|
`order`        | `Order`                  |
`price`        | `Price`                  |
`product`      | `Product`                |
`parent`       | `OrderLineItem`          |

**Events**

Name: `storefront.order_line_item.create.success`

Event Data     | Type                     | Description
---------------|--------------------------|-------------|
`orderLineItem`| `OrderLineItem`          |
`order`        | `Order`                  |
`price`        | `Price`                  |
`product`      | `Product`                |
`parent`       | `OrderLineItem`          |
`children`     | `Array<OrderLineItem>`   |
`user`         | `User`                   |
`customer`     | `Customer`               |
`account`      | `Account`                |


**Returns**

Returns the created order line item.

#### Definition

```endpoint
POST /orders/{order_id}/line_items
```

#### Example Request

```http
POST /v1/orders/4665c136-1448-4e04-a959-5358828f4feb/line_items
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "type": "OrderLineItem",
    "attributes": {
      "name": "Warp Drive",
      "subTotalCents": 50000
    },
    "relationships": {
      "order": {
        "data": {
          "id": "4665c136-1448-4e04-a959-5358828f4feb",
          "type": "Order"
        }
      }
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.createOrderLineItem('4665c136-1448-4e04-a959-5358828f4feb', {
  name: "Warp Drive",
  subTotalCents: 50000
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
  "data": {
    "id": "e7fec34b-3599-437c-b6bc-690ae02993c2",
    "type": "OrderLineItem",
    "attributes": {
      "code": null,
      "name": "Warp Drive",
      "label": null,
      "fulfillmentStatus": "pending",
      "printName": null,
      "isLeaf": true,
      "orderQuantity": 1,
      "chargeQuantity": 1,
      "priceName": null,
      "priceLabel": null,
      "priceCaption": null,
      "priceOrderUnit": null,
      "priceChargeUnit": null,
      "priceCurrencyCode": null,
      "priceChargeAmountCents": null,
      "priceEstimateAveragePercentage": null,
      "priceEstimateMaximumPercentage": null,
      "priceTaxOnePercentage": null,
      "priceTaxTwoPercentage": null,
      "priceTaxThreePercentage": null,
      "priceEstimateByDefault": null,
      "priceEndDate": null,
      "subTotalCents": 50000,
      "taxOneCents": 0,
      "taxTwoCents": 0,
      "taxThreeCents": 0,
      "grandTotalCents": 50000,
      "authorizationTotalCents": 50000,
      "isEstimate": false,
      "caption": null,
      "description": null,
      "customData": {},
      "insertedAt": "",
      "updatedAt": ""
    },
    "relationships": {
      "order": {
        "data": {
          "id": "f78c1541-1874-4dfc-a31c-8ad52d3fe468",
          "type": "Order"
        }
      },
      "product": {
        "data": null
      },
      "price": {
        "data": null
      },
      "parent": {
        "data": null
      },
      "children": {
        "data": []
      }
    }
  }
}
```

### Update a line item

Use this endpoint to update a line item.

**Authorization**

Authorized roles: all

- User with role other than `supportSpecialist`, `developer` or `administrator` can only update line item for order with `cart` status.
- Only user with role `supportSpecialist`, `developer` or `administrator` can set `chargeQuantity` and `isEstimate`.

**Parameters**

Name               | Type      | Description
-------------------|-----------|-------|
`id`               | `String`  | The order line item ID

**Attributes**

Name                               | Type       | Description
-----------------------------------|------------|---------------|
`code`                             | `String`   |
`name`                             | `String`   |
`label`                            | `String`   |
`printName`                        | `String`   |
`orderQuantity`                    | `Integer`  |
`chargeQuantity`                   | `Float`    |
`subTotalCents`                    | `Integer`  | Can only be set if this order line item has no children and no price, otherwise it will be calculated automatically.
`taxOneCents`                      | `Integer`  | Can only be set if this order line item has no children and no price, otherwise it will be calculated automatically.
`taxTwoCents`                      | `Integer`  | Can only be set if this order line item has no children and no price, otherwise it will be calculated automatically.
`taxThreeCents`                    | `Integer`  | Can only be set if this order line item has no children and no price, otherwise it will be calculated automatically.
`grandTotalCents`                  | `Integer`  | Can only be set if this order line item has no children and no price, otherwise it will be calculated automatically.
`authorizationTotalCents`          | `Integer`  | Can only be set if this order line item has no children and no price and `isEstimate` is `true`, otherwise it will be calculated automatically.
`isEstimate`                       | `Boolean`  | Can only be set if this order line item has no children
`caption`                          | `String`   |
`description`                      | `String`   |
`customData`                       | `String`   |

**Events**

Name: `storefront.order_line_item.update.success`

Event Data     | Type                     | Description
---------------|--------------------------|-------------|
`orderLineItem`| `OrderLineItem`          |
`order`        | `Order`                  |
`price`        | `Price`                  |
`product`      | `Product`                |
`parent`       | `OrderLineItem`          |
`children`     | `Array<OrderLineItem>`   |
`user`         | `User`                   |
`customer`     | `Customer`               |
`account`      | `Account`                |

**Returns**

Returns the updated order line item.

#### Definition

```endpoint
PATCH /order_line_items/{id}
```

#### Example Request

```http
PATCH /v1/order_line_items/e7fec34b-3599-437c-b6bc-690ae02993c2
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "type": "OrderLineItem",
    "attributes": {
      "subTotalCents": 70000
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.createOrderLineItem('e7fec34b-3599-437c-b6bc-690ae02993c2', {
  subTotalCents: 70000
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
    "id": "e7fec34b-3599-437c-b6bc-690ae02993c2",
    "type": "OrderLineItem",
    "attributes": {
      "code": null,
      "name": "Warp Drive",
      "label": null,
      "fulfillmentStatus": "pending",
      "printName": null,
      "isLeaf": true,
      "orderQuantity": 1,
      "chargeQuantity": 1,
      "priceName": null,
      "priceLabel": null,
      "priceCaption": null,
      "priceOrderUnit": null,
      "priceChargeUnit": null,
      "priceCurrencyCode": null,
      "priceChargeAmountCents": null,
      "priceEstimateAveragePercentage": null,
      "priceEstimateMaximumPercentage": null,
      "priceTaxOnePercentage": null,
      "priceTaxTwoPercentage": null,
      "priceTaxThreePercentage": null,
      "priceEstimateByDefault": null,
      "priceEndDate": null,
      "subTotalCents": 70000,
      "taxOneCents": 0,
      "taxTwoCents": 0,
      "taxThreeCents": 0,
      "grandTotalCents": 70000,
      "authorizationTotalCents": 70000,
      "isEstimate": false,
      "caption": null,
      "description": null,
      "customData": {},
      "insertedAt": "",
      "updatedAt": ""
    },
    "relationships": {
      "order": {
        "data": {
          "id": "f78c1541-1874-4dfc-a31c-8ad52d3fe468",
          "type": "Order"
        }
      },
      "product": {
        "data": null
      },
      "price": {
        "data": null
      },
      "parent": {
        "data": null
      },
      "children": {
        "data": []
      }
    }
  }
}
```


### Delete a line item

Use this endpoint to delete a order line item.

**Authorization**

Authorized roles: all

User with role other than `supportSpecialist`, `developer` or `administrator` can only delete line item for order with `cart` status.

**Parameters**

Name               | Type      | Description
-------------------|-----------|-------|
`id`               | `String`  | The order line item ID

**Events**

Name: `storefront.order_line_item.delete.success`

Event Data     | Type                     | Description
---------------|--------------------------|-------------|
`orderLineItem`| `OrderLineItem`          | The deleted order line item
`order`        | `Order`                  |
`price`        | `Price`                  |
`product`      | `Product`                |
`parent`       | `OrderLineItem`          |
`children`     | `Array<OrderLineItem>`   |
`user`         | `User`                   |
`customer`     | `Customer`               |
`account`      | `Account`                |

**Returns**

If successful, this endpoint returns a HTTP 204 with no body.

#### Definition

```endpoint
DELETE /order_line_items/{id}
```

#### Example Request

```http
DELETE /v1/order_line_items/e7fec34b-3599-437c-b6bc-690ae02993c2
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.deleteOrderLineItem('e7fec34b-3599-437c-b6bc-690ae02993c2').then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```
