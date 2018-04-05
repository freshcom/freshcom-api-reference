## Product

A product represents goods for sell. You can think of product as goods + prices. There are 5 kinds of product:

- `simple` - A simple product is associated with a single goods.

- `withVariants` - A product with variants consist of multiple child product, and each of the child product is of kind `variant`. A product with variants is basically a container for its variants. You want to use this kind of product if you want your customer to select only one of the variants. Each variant can be individually priced but the product with variants itself can not be priced. For example you have a T-shirt for sell, then the T-shirt itself will be a product with variants and each individual size will be the variant.

- `variant` - Variant of a product with variants.

- `combo` - A product combo consit of multiple child product, and each of the child product is of kind `item`. You want to use this kind of product if you want your customer to buy all the item inside the combo at once.

- `item` - Item of a product combo

**Attributes**

Name                          | Type       | Description
------------------------------|------------|-------------|
`status`                      | `String`   | The status of the product, can be one of `draft`, `active` or `disabled`.
`code`                        | `String`   | _(user-defined)_ A unique code for the product.
`kind`                        | `String`   | The kind of product, can be one of `simple`, `withVariants`, `variant`, `combo` or `item`.
`name`                        | `String`   | _(localizable)_ The name of the product
`label`                       | `String`   | _(user-defined)_ A label for the product.
`nameSync`                    | `String`   | The method of name sync to use, can be one of `disabled` or `syncWithGoods`. If the value is `syncWithGoods` then the name will be always synced with the associated goods.
`shortName`                   | `String`   | _(user-defined)_ _(localizable)_ A short name for the product.
`printName`                   | `String`   | _(localizable)_ The name to print on a receipt.
`sortIndex`                   | `Integer`  | The sort order of this product. Whenever multiple products are returned, they will be sorted according to their `sortIndex` in descending order.
`goodsQuantity`               | `Integer`  | The number of goods to be considered as one product.
`primary`                     | `Boolean`  | If the product is of kind `variant` then this indicate whether it is the primary variant.
`maximumPubilcOrderQuantity`  | `Integer`  | The maximum ordering quantity for user with role other than `supportSpecialist`, `developer` or `administrator`.
`autoFulfill`                 | `Boolean`  | The default value for the `autoFulfill` attribute of a order line item when created with this product.
`caption`                     | `String`   | _(user-defined)_ _(localizable)_ A short description of the this product.
`description`                 | `String`   | _(user-defined)_ _(localizable)_ A long description of the this product.
`customData`                  | `Object`   | _(user-defined)_ _(localizable)_

**Relationships**

Name               | Type                     | Description
-------------------|--------------------------|--------------|
`avatar`           | `File`                   |
`parent`           | `Product`                |
`fileCollections`  | `Array<FileCollection>`  |
`goods`            | `Stockable`, `Unlockable` or `Depositable`|
`prices`           | `Array<Price>`           |
`defaultPrice`     | `Price`                  | The price with the loweset `minimumOrderQuantity`.

#### Example Response

```json
{
  "data": {
    "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
    "type": "Product",
    "attributes": {
      "status": "draft",
      "code": "P001",
      "kind": "simple",
      "name": "Warp Drive",
      "label": null,
      "nameSync": "syncWithGoods",
      "printName": null,
      "sortIndex": 1000,
      "goodsQuantity": 1,
      "primary": false,
      "maximumPubilcOrderQuantity": 5,
      "autoFulfill": false,
      "caption": null,
      "description": null,
      "customData": {}
    },
    "relationships": {
      "avatar": {
        "data": {
          "id": "74b901b2-32f9-4e3b-8d4d-4eca2360550c",
          "type": "File"
        }
      },
      "fileCollections": {
        "data": []
      },
      "parent": {
        "data": null
      },
      "goods": {
        "data": {
          "id": "5e9240ff-0885-4327-a1e7-f46f3fdb3f74",
          "type": "Stockable"
        }
      },
      "prices": {
        "data": [
          {
            "id": "58183c45-bb3d-429b-a4fb-273490ad32a4",
            "type": "Price"
          },
          {
            "id": "5e9240ff-0885-4327-a1e7-f46f3fdb3f74",
            "type": "Price"
          }
        ]
      },
      "defaultPrice": {
        "data": {
          "id": "58183c45-bb3d-429b-a4fb-273490ad32a4",
          "type": "Price"
        }
      }
    }
  }
}
```

### Create a product

Use this endpoint to create a product.

**Authorization**

Authorized roles: `marketingSpecialist`, `developer` or `administrator`

**Attributes**

Name                          | Type       | Description
------------------------------|------------|-------------|
`code`                        | `String`   | A unique code for the product.
`kind`                        | `String`   | _(required)_ Can be one of `simple`, `withVariants`, `variant`, `combo` or `item`. If set to `variant` or `item` then the `parent` relationship must be set appropriately.
`name`                        | `String`   | Required if `nameSync` is `disabled`.
`label`                       | `String`   | A label for the code.
`nameSync`                    | `String`   | _(default: `disabled`)_ The method of name sync to use, can be `disabled` or `syncWithGoods`.
`shortName`                   | `String`   | A short name for the product.
`printName`                   | `String`   | The name to print on a receipt. If not provided, defaults to the same value as `name`. To accomndate most receipt printer it is recommended to limit this field to at most 64 characters.
`sortIndex`                   | `Integer`  | _(default:`1000`)_
`goodsQuantity`               | `Integer`  | _(default:`1`)_ The number of goods to be considered as one product.
`primary`                     | `Boolean`  | _(default:`false`)_ If this product is of kind `variant`, indicates whether it is the primary variant.
`maximumPubilcOrderQuantity`  | `Integer`  | _(default: `999`)_ Maximum ordering quantity for user with role other than `supportSpecialist`, `developer` or `administrator`.
`autoFulfill`                 | `Boolean`  | _(default: `false`)_ The default value for the `autoFulfill` attribute of a order line item when created with this product.
`caption`                     | `String`   | A short description of the this product.
`description`                 | `String`   | A long description of the this product.
`customData`                  | `Object`   |

**Relationships**

Name               | Type                     | Description
-------------------|--------------------------|--------------|
`avatar`           | `File`                   |
`parent`           | `Product`                | Required if the product kind is set to `variant` or `item`.
`goods`            | `Stockable`, `Unlockable` or `Depositable`| _(required)_

**Events**

Name: `catalogue.product.create.success`

Event Data         | Type                     | Description
-------------------|--------------------------|--------------|
`product`          | `Product`                | The created product
`avatar`           | `File`                   |
`parent`           | `Product`                |
`fileCollections`  | `Array<FileCollection>`  |
`goods`            | `Stockable`, `Unlockable` or `Depositable`|
`prices`           | `Array<Price>`           |
`defaultPrice`     | `Price`                  | The price with the loweset `minimumOrderQuantity`.

**Returns**

Returns the created product.

#### Definition

```endpoint
POST /products
```

#### Example Request

```http
POST /v1/products
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "type": "Product",
    "attributes": {
      "code": "P001",
      "kind": "simple",
      "nameSync": "syncWithGoods"
    },
    "relationships": {
      "avatar": {
        "data": {
          "id": "74b901b2-32f9-4e3b-8d4d-4eca2360550c",
          "type": "File"
        }
      },
      "goods": {
        "data": {
          "id": "5e9240ff-0885-4327-a1e7-f46f3fdb3f74",
          "type": "Stockable"
        }
      }
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.createProduct({
  code: 'P001',
  kind: 'simple',
  nameSync: 'syncWithGoods',
  avatar: {
    id: '74b901b2-32f9-4e3b-8d4d-4eca2360550c',
    type: 'File'
  },
  goods: {
    id: '5e9240ff-0885-4327-a1e7-f46f3fdb3f74',
    type: 'Stockable'
  }
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
    "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
    "type": "Product",
    "attributes": {
      "status": "draft",
      "code": "P001",
      "kind": "simple",
      "name": "Warp Drive",
      "label": null,
      "nameSync": "syncWithGoods",
      "printName": null,
      "sortIndex": 1000,
      "goodsQuantity": 1,
      "primary": false,
      "maximumPubilcOrderQuantity": 999,
      "autoFulfill": false,
      "caption": null,
      "description": null,
      "customData": {}
    },
    "relationships": {
      "avatar": {
        "data": {
          "id": "74b901b2-32f9-4e3b-8d4d-4eca2360550c",
          "type": "File"
        }
      },
      "fileCollections": {
        "data": []
      },
      "parent": {
        "data": null
      },
      "goods": {
        "data": {
          "id": "5e9240ff-0885-4327-a1e7-f46f3fdb3f74",
          "type": "Stockable"
        }
      },
      "prices": {
        "data": []
      },
      "defaultPrice": {
        "data": null
      }
    }
  }
}
```

### Retrieve a product

Use this endpoint to retrieve a product.

**Authorization**

Authorized roles: all

Only user with role `marketingSpecialist`, `developer` or `administrator` can retrieve product with any status. All other role can only retrieve product with status `active`.

**Parameters**

Name               | Type      | Description
-------------------|-----------|-------|
`id`               | `String`  | The product ID.

**Returns**

The target product.

#### Definition

```endpoint
POST /products/{id}
```

#### Example Request

```http
GET /v1/products/4665c136-1448-4e04-a959-5358828f4feb
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'

freshcom.retrieveProduct('9fc8ee53-906f-48bd-a392-8b0709301699').then(function (response) {
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
    "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
    "type": "Product",
    "attributes": {
      "status": "draft",
      "code": "P001",
      "kind": "simple",
      "name": "Warp Drive",
      "label": null,
      "nameSync": "syncWithGoods",
      "printName": null,
      "sortIndex": 1000,
      "goodsQuantity": 1,
      "primary": false,
      "maximumPubilcOrderQuantity": 999,
      "autoFulfill": false,
      "caption": null,
      "description": null,
      "customData": {}
    },
    "relationships": {
      "avatar": {
        "data": {
          "id": "74b901b2-32f9-4e3b-8d4d-4eca2360550c",
          "type": "File"
        }
      },
      "fileCollections": {
        "data": []
      },
      "parent": {
        "data": null
      },
      "goods": {
        "data": {
          "id": "5e9240ff-0885-4327-a1e7-f46f3fdb3f74",
          "type": "Stockable"
        }
      },
      "prices": {
        "data": []
      },
      "defaultPrice": {
        "data": null
      }
    }
  }
}
```

### Update a product


### Delete a product


### List products


## Product Collection

A product collection represents a collection of Product.

### Create a product collection

### Retrieve a product collection

### Update a product collection

### Delete a product collection

## Product Collection Membership

### Create a membership

### Update a membership

### Delete a membership

### List memberships

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
-----------------------|----------|-------------|
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
------------------------------------|--------------------------|-------------|
`item`                              | ProductItem              | The Product Item that this price is for.

### Create a price


### Update a price


### Delete a price

