## Order

An order represents a cart or a placed order. An order has three important status that is important to understand:

**Payment Status**

Payment status is automatically managed by Freshcom, when a new payment is created for this order its payment status will be updated accordingly.

- `pending` - When there is no payment for an order, or the payment is pending.
- `partiallyAuthorized` - When the total authorized amount of all the payments of an order is less than the order's `authorizationTotalCents`.
- `authorized`
- `partiallyPaid` - When there is existing payment for the order but the total is less than the `grandTotalCents` of the order.
- `paid`
- `overPaid`
- `partiallyRefunded`
- `Refunded`

**Fulfillment Status**

- pending
- fulfilled
- discarded


**Order Status**

Attribute                    | Type       | Description
-----------------------------|------------|-----------
`status`                     | `String`   | One of `cart`, `open`, `closed`, `cancelled` or any user defined order.
`code`                       | `String`   | A unique code for the Order.
`label`                      | `String`   | A user defined label for the Customer for filtering purpose.
`email`                      | `String`   |
`firstName`                  | `String`   |
`lastName`                   | `String`   |
`phoneNumber`                | `String`   |
`deliveryAddressLineOne`     | `String`   |
`deliveryAddressLineTwo`     | `String`   |
`deliveryAddressProvince`    | `String`   |
`deliveryAddressCountryCode` | `String`   |
`deliveryAddressPostalCode`  | `String`   |
`billingAddressLineOne`      | `String`   |
`billingAddressLineTwo`      | `String`   |
`billingAddressProvince`     | `String`   |
`billingAddressCountryCode`  | `String`   |
`billingAddressPostalCode`   | `String`   |
`subTotalCents`              | `Integer`  |
`taxOneCents`                | `Integer`  |
`taxTwoCents`                | `Integer`  |
`taxThreeCents`              | `Integer`  |
`grandTotalCents`            | `Integer`  |
`paymentStatus`              | `String`   | One of `pending`, `error`, `paid`, `fully_refunded`, `partially_refunded`.
`paymentGateway`             | `String`   | One of `online`, `in_person`.
`paymentProcessor`           | `String`   | One of `stripe`, `paypal`.
`paymentMethod`              | `String`   | One of `visa`, `mastercard`, `debit`, `cash`, `cheque` or any user defined method.
`fulfillmentMethod`          | `String`   | One of `pickup` or `ship`
`placedAt`                   | `Datetime` |


Relationship                        | Type                            | Description
------------------------------------|---------------------------------|-----------
`customer`                          | `Customer`                      |
`createdBy`                         | `User`                          | The user that created this Order if any. If its a Customer created Order then this relationship will be null.
`charge`                            | `Charge`                        |

### Create an Order

This endpoint creates a new Order object. You can use any type of Access Token for this endpoint. If the status is set to anonymous then all fields are optional. If status is set to registered then fields are required as specified below.

Attribute                    | Description
-----------------------------|-----------------------
`status`                     | If not provided, defaults to `cart`
`code`                       |
`label`                      |
`email`                      | _(required)_
`firstName`                  | Required if `otherName` is not provided
`lastName`                   | Required if `otherName` is not provided
`otherName`                  | Required if `firstName` and `lastName` is not provided
`phoneNumber`                |
`fulfillmentMethod`          | _(required)_ Can be either `ship` or `pickup`
`deliveryAddressLineOne`     | Required if `fulfillmentMethod` is set to `ship`
`deliveryAddressLineTwo`     | Required if `fulfillmentMethod` is set to `ship`
`deliveryAddressProvince`    | Required if `fulfillmentMethod` is set to `ship`
`deliveryAddressCountryCode` | Required if `fulfillmentMethod` is set to `ship`
`deliveryAddressPostalCode`  | Required if `fulfillmentMethod` is set to `ship`
`billingAddressLineOne`      |
`billingAddressLineTwo`      |
`billingAddressProvince`     |
`billingAddressCountryCode`  |
`billingAddressPostalCode`   |
`paymentStatus`              | If not provided, defaults to `pending`


Relationship       | Description
-------------------|-------------
customer           |


### Retrieve an Order

This endpoint retrieve a previously created Order. You must supply either a CAT or UAT in order to use this endpoint.


### Update an Order

This endpoint updates a previously created order object. If the `grandTotalCents` is 0 then a customer/guest user can update
the status from `card` to `opened` otherwise, a customer/guest user must create a payment which will automatically mark the target
order as `opened`. User with other role can update the status freely as authorized.

### Delete an Order


## Order Line Item

A Line Item represents a single item in the order.

**Localizable Attributes**: `name`, `description`, `priceName`.

Attribute                    | Type       | Description
-----------------------------|------------|---------------
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

## Unlock

## Fulfillment