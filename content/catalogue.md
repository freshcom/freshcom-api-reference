## Product

A product represents goods for sell. You can think of product as goods + prices. There are 5 kinds of product:

- `simple` - A simple product is associated with a single goods.

- `withVariants` - A product with variants consist of multiple child product, and each of the child product is of kind `variant`. A product with variants is basically a container for its variants. You want to use this kind of product if you want your customer to select only one of the variants. Each variant can be individually priced but the product with variants itself can not be priced. For example you have a T-shirt for sell, then the T-shirt itself will be a product with variants and each individual size will be the variant.

- `variant` - Variant of a product with variants.

- `combo` - A product combo consit of multiple child product, and each of the child product is of kind `item`. You want to use this kind of product if you want your customer to buy all the item inside the combo at once.

- `item` - Item of a product combo.

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
`sortIndex`                   | `Integer`  | The sort order of the product. Whenever multiple products are returned, they will be sorted according to their `sortIndex` in descending order.
`goodsQuantity`               | `Integer`  | The number of goods to be considered as one product.
`primary`                     | `Boolean`  | If the product is of kind `variant` then this indicate whether it is the primary variant.
`maximumPubilcOrderQuantity`  | `Integer`  | The maximum ordering quantity for user with role other than `supportSpecialist`, `developer` or `administrator`.
`autoFulfill`                 | `Boolean`  | The default value for the `autoFulfill` attribute of a order line item when created with the product.
`caption`                     | `String`   | _(user-defined)_ _(localizable)_ A short description of the the product.
`description`                 | `String`   | _(user-defined)_ _(localizable)_ A long description of the the product.
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
`primary`                     | `Boolean`  | _(default:`false`)_ If the product is of kind `variant`, indicates whether it is the primary variant.
`maximumPubilcOrderQuantity`  | `Integer`  | _(default: `999`)_ Maximum ordering quantity for user with role other than `supportSpecialist`, `developer` or `administrator`.
`autoFulfill`                 | `Boolean`  | _(default: `false`)_ The default value for the `autoFulfill` attribute of a order line item when created with the product.
`caption`                     | `String`   | A short description of the the product.
`description`                 | `String`   | A long description of the the product.
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

User with role other than `marketingSpecialist`, `developer` or `administrator` can only retrieve product with status `active`.

**Parameters**

Name               | Type      | Description
-------------------|-----------|-------|
`id`               | `String`  | The product ID.

**Returns**

The target product.

#### Definition

```endpoint
GET /products/{id}
```

#### Example Request

```http
GET /v1/products/9fc8ee53-906f-48bd-a392-8b0709301699
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

Use this endpoint to update a product.

**Authorization**

Authorized roles: `marketingSpecialist`, `developer` and `administrator`

**Parameters**

Name               | Type      | Description
-------------------|-----------|-------|
`id`               | `String`  | The product ID.

**Attributes**

Name                          | Type       | Description
------------------------------|------------|-------------|
`code`                        | `String`   | A unique code for the product.
`name`                        | `String`   | Required if `nameSync` is `disabled`.
`label`                       | `String`   | A label for the code.
`nameSync`                    | `String`   | The method of name sync to use, can be `disabled` or `syncWithGoods`.
`shortName`                   | `String`   | A short name for the product.
`printName`                   | `String`   | The name to print on a receipt. If not provided, defaults to the same value as `name`. To accomndate most receipt printer it is recommended to limit this field to at most 64 characters.
`sortIndex`                   | `Integer`  |
`goodsQuantity`               | `Integer`  | The number of goods to be considered as one product.
`primary`                     | `Boolean`  | If the product is of kind `variant`, indicates whether it is the primary variant.
`maximumPubilcOrderQuantity`  | `Integer`  | Maximum ordering quantity for user with role other than `supportSpecialist`, `developer` or `administrator`.
`autoFulfill`                 | `Boolean`  | The default value for the `autoFulfill` attribute of a order line item when created with the product.
`caption`                     | `String`   | A short description of the the product.
`description`                 | `String`   | A long description of the the product.
`customData`                  | `Object`   |

**Events**

Name: `catalogue.product.update.success`

Event Data         | Type                     | Description
-------------------|--------------------------|--------------|
`product`          | `Product`                | The updated product.
`avatar`           | `File`                   |
`parent`           | `Product`                |
`fileCollections`  | `Array<FileCollection>`  |
`goods`            | `Stockable`, `Unlockable` or `Depositable`|
`prices`           | `Array<Price>`           |
`defaultPrice`     | `Price`                  | The price with the loweset `minimumOrderQuantity`.

**Returns**

Returns the updated product.

#### Definition

```endpoint
PATCH /products/{id}
```

#### Example Request

```http
PATCH /v1/products/9fc8ee53-906f-48bd-a392-8b0709301699
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
    "type": "Product",
    "attributes": {
      "code": "P002"
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'
freshcom.setAccessToken('{access_token}')

freshcom.updateProduct('9fc8ee53-906f-48bd-a392-8b0709301699', {
  code: 'P002'
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
    "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
    "type": "Product",
    "attributes": {
      "status": "draft",
      "code": "P002",
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

### Delete a product

Use this endpoint to delete a product. If you delete a product all of the following related resources if any will also be deleted:

- All prices that are associated with this product
- All file collections that are owned by this product and all files inside those collections
- File that is the avatar of this product

**Authorization**

Authorized roles: `marketingSpecialist`, `developer` and `administrator`

**Parameters**

Name               | Type      | Description         |
-------------------|-----------|---------------------|
`id`               | `String`  | The product ID.     |

**Events**

Name: `catalogue.product.delete.success`

Event Data         | Type                     | Description
-------------------|--------------------------|---------------------|
`product`          | `Product`                | The deleted product.

**Returns**

If successful, this endpoint returns a HTTP 204 with no body.

#### Definition

```endpoint
DELETE /products/{id}
```

#### Example Request

```http
DELETE /v1/products/9fc8ee53-906f-48bd-a392-8b0709301699
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'
freshcom.setAccessToken('{access_token}')

freshcom.deleteProduct('9fc8ee53-906f-48bd-a392-8b0709301699').then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```

### List products

Use this endpoint to list some or all of the products.

**Authorization**

Authorized roles: all

User with role other than `marketingSpecialist`, `developer` or `administrator` can only list product with status `active`.

**Parameters**

Name                                  | Type             | Description
--------------------------------------|------------------|-------|
`search`                              | `String`         | If provided only product have `id`, `code`, `name`, `shortName`, or `printName` that matches the search string will be returned.
`filter`                              | `Object`         |
`filter.status`                       | `Array<String>`  |
`filter.label`                        | `String`         |
`filter.goodsType`                    | `String`         |
`filter.goodsId`                      | `String`         |
`filter.parentId`                     | `String`         |


**Returns**

Returns a list of products.

```endpoint
GET /products?search={search}&filter={filter}
```

#### Example Request

```http
GET /v1/products?search=drive&filter[label]=trending_product
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'
freshcom.setAccessToken('{access_token}')

freshcom.listProduct({
  search: 'drive',
  filter: { label: 'trending_product' }
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
      "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
      "type": "Product",
      "attributes": {
        "status": "active",
        "code": "P002",
        "kind": "simple",
        "name": "Warp Drive",
        "label": "trending_product",
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
          "data": [
            {
              "id": "aba1d92c-defb-478e-a031-40b5c27171c7",
              "type": "Price"
            }
          ]
        },
        "defaultPrice": {
          "data": {
            "id": "aba1d92c-defb-478e-a031-40b5c27171c7",
            "type": "Price"
          }
        }
      }
    },
    {...},
    {...}
  ]
}
```

## Product Collection

A product collection represents a collection of product. A product can be in multiple collections.

**Attributes**

Name                          | Type       | Description
------------------------------|------------|-------------|
`status`                      | `String`   | The status of the product collection, can be one of `draft`, `active` or `disabled`.
`code`                        | `String`   | _(user-defined)_ A unique code for the product collection.
`name`                        | `String`   | _(localizable)_ The name of the product collection.
`label`                       | `String`   | _(user-defined)_ A label for the product collection.
`sortIndex`                   | `Integer`  | The sort order of the product collection. Whenever multiple product collections are returned, they will be sorted according to their `sortIndex` in descending order.
`activeProductCount`          | `Integer`  | Number of active products in the collection.
`productCount`                | `Integer`  | Number of all products in the collection.
`caption`                     | `String`   | _(user-defined)_ _(localizable)_ A short description of the the product collection.
`description`                 | `String`   | _(user-defined)_ _(localizable)_ A long description of the the product collection.
`customData`                  | `Object`   | _(user-defined)_ _(localizable)_

**Relationships**

Name               | Type                                 | Description
-------------------|--------------------------------------|--------------|
`avatar`           | `File`                               |
`memberships`*     | `Array<ProductCollectionMembership>` |

*For performance reason, only the first 10 memberships will be ever be included with product collection. To list all the memberships use the [list memberships](#list-pcm) endpoint.

#### Example Response

```json
{
  "data": {
    "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
    "type": "ProductCollection",
    "attributes": {
      "status": "active",
      "code": "PC001",
      "name": "Custom Made Starship Engines",
      "label": null,
      "sortIndex": 1000,
      "activeProductCount": 5,
      "productCount": 10,
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
      }
    }
  }
}
```

### Create a product collection

Use this endpoint to create a product collection.

**Authorization**

Authorized roles: `marketingSpecialist`, `developer` and `administrator`

**Attributes**

Name                          | Type       | Description
------------------------------|------------|-------------|
`status`                      | `String`   | _(default: `draft`)_
`code`                        | `String`   | A unique code for the product collection.
`name`                        | `String`   | _(required)_ A name for the product collection.
`label`                       | `String`   | A label for the product collection.
`sortIndex`                   | `Integer`  | _(default:`1000`)_
`caption`                     | `String`   | A short description of the the product collection.
`description`                 | `String`   | A long description of the the product collection.
`customData`                  | `Object`   |

**Relationships**

Name               | Type                     | Description
-------------------|--------------------------|--------------|
`avatar`           | `File`                   |

**Events**

Name: `catalogue.product_collection.create.success`

Event Data           | Type                     | Description
---------------------|--------------------------|--------------|
`product_collection` | `ProductCollection`      | The created product collection.
`avatar`             | `File`                   |

**Returns**

Returns the created product collection.

#### Definition

```endpoint
POST /product_collections
```

#### Example Request

```http
POST /v1/product_collections
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "type": "ProductCollection",
    "attributes": {
      "name": "Custom Made Starship Engine",
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'
freshcom.setAccessToken('{access_token}')

freshcom.createProductCollection({
  name: 'Custom Made Starship Engine'
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
    "type": "ProductCollection",
    "attributes": {
      "code": "null",
      "status": "draft",
      "name": "Custom Made Starship Engines",
      "label": null,
      "sortIndex": 1000,
      "activeProductCount": 0,
      "productCount": 0,
      "caption": null,
      "description": null,
      "customData": {}
    },
    "relationships": {
      "avatar": {
        "data": null
      }
    }
  }
}
```

### Retrieve a product collection

Use this endpoint to retrieve a product collection.

**Authorization**

Authorized roles: all

User with role other than `marketingSpecialist`, `developer` or `administrator` can only retrieve product collection with status `active`.

**Parameters**

Name               | Type      | Description
-------------------|-----------|-------|
`id`               | `String`  | The ID of the product collection.

**Returns**

The target product collection.

```endpoint
GET /product_collections/{id}
```

#### Example Request

```http
GET /v1/product_collections/9fc8ee53-906f-48bd-a392-8b0709301699
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'
freshcom.setAccessToken('{access_token}')

freshcom.retrieveProductCollection('9fc8ee53-906f-48bd-a392-8b0709301699').then(function (response) {
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
    "type": "ProductCollection",
    "attributes": {
      "code": null,
      "status": "draft",
      "name": "Custom Made Starship Engines",
      "label": null,
      "sortIndex": 1000,
      "activeProductCount": 0,
      "productCount": 0,
      "caption": null,
      "description": null,
      "customData": {}
    },
    "relationships": {
      "avatar": {
        "data": null
      }
    }
  }
}
```

### Update a product collection

Use this endpoint to update a product collection.

**Authorization**

Authorized roles: `marketingSpecialist`, `developer` and `administrator`

**Parameters**

Name               | Type      | Description
-------------------|-----------|-------|
`id`               | `String`  | The ID of the product collection.

**Attributes**

Name                          | Type       | Description
------------------------------|------------|-------------|
`status`                      | `String`   |
`code`                        | `String`   | A unique code for the product collection.
`name`                        | `String`   | A name for the product collection.
`label`                       | `String`   | A label for the product collection.
`sortIndex`                   | `Integer`  |
`caption`                     | `String`   | A short description for the the product collection.
`description`                 | `String`   | A long description for the the product collection.
`customData`                  | `Object`   |

**Relationships**

Name               | Type                     | Description
-------------------|--------------------------|--------------|
`avatar`           | `File`                   |

**Events**

Name: `catalogue.product_collection.update.success`

Event Data           | Type                     | Description
---------------------|--------------------------|--------------|
`product_collection` | `ProductCollection`      | The updated product collection.
`avatar`             | `File`                   |

**Returns**

Returns the updated product collection.

#### Definition

```endpoint
PATCH /product_collections/{id}
```

#### Example Request

```http
PATCH /v1/product_collections/9fc8ee53-906f-48bd-a392-8b0709301699
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
    "type": "ProductCollection",
    "attributes": {
      "code": "PC001"
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'
freshcom.setAccessToken('{access_token}')

freshcom.updateProduct('9fc8ee53-906f-48bd-a392-8b0709301699', {
  code: 'PC001'
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
    "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
    "type": "ProductCollection",
    "attributes": {
      "code": null,
      "status": "draft",
      "name": "Custom Made Starship Engines",
      "label": null,
      "sortIndex": 1000,
      "activeProductCount": 0,
      "productCount": 0,
      "caption": null,
      "description": null,
      "customData": {}
    },
    "relationships": {
      "avatar": {
        "data": null
      }
    }
  }
}
```

### Delete a product collection

Use this endpoint to delete a product collection. If you delete a product collection, all products inside the collection will also be deleted. If you want to keep certain products, remove them from the collection before deletion.

For each product in the collection all of the following related resources if any will also be delete:

- All product variants or items associated with the product
- All prices that are associated with the product, its variants or its items
- All file collections that are owned by the product and all files inside those collections
- File that is the avatar of the product

**Authorization**

Authorized roles: `marketingSpecialist`, `developer` and `administrator`

**Parameters**

Name               | Type      | Description         |
-------------------|-----------|---------------------|
`id`               | `String`  | The ID of the product collection.     |

**Events**

Name: `catalogue.product_collection.delete.success`

Event Data            | Type                     | Description
----------------------|--------------------------|---------------------|
`product_collection`  | `ProductCollection`      | The deleted product collection. |

**Returns**

If successful, this endpoint returns a HTTP 204 with no body.

```endpoint
DELETE /product_collection/{id}
```

#### Example Request

```http
DELETE /v1/product_collection/9fc8ee53-906f-48bd-a392-8b0709301699
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'
freshcom.setAccessToken('{access_token}')

freshcom.deleteProductCollection('9fc8ee53-906f-48bd-a392-8b0709301699').then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```

### List product collections

Use this endpoint to list some or all product collections.

**Authorization**

User with role other than `marketingSpecialist`, `developer` or `administrator` can only list product collection with status `active`.

**Parameters**

Name                                  | Type             | Description
--------------------------------------|------------------|-------|
`search`                              | `String`         | If provided only product have `id`, `code`, `name` that matches the search string will be returned.
`filter`                              | `Object`         |
`filter.label`                        | `String`         |

**Returns**

Returns a list of product collections.

```endpoint
GET /product_collection?search={search}&filter={filter}
```

#### Example Request

```http
GET /v1/product_collection?search=starship&filter[label]=trending_collection
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'
freshcom.setAccessToken('{access_token}')

freshcom.listProductCollection({
  search: 'starship',
  filter: { label: 'trending_collection' }
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
      "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
      "type": "ProductCollection",
      "attributes": {
        "code": null,
        "status": "draft",
        "name": "Custom Made Starship Engines",
        "label": "trending_collection",
        "sortIndex": 1000,
        "activeProductCount": 0,
        "productCount": 0,
        "caption": null,
        "description": null,
        "customData": {}
      },
      "relationships": {
        "avatar": {
          "data": null
        }
      }
    },
    {...},
    {...}
  ]
}
```

## Product Collection Membership

A product collection membership (PCM) represent a the membership of a product inside a product collection.

**Attributes**

Name                          | Type       | Description
------------------------------|------------|-------------|
`sortIndex`                   | `Integer`  | The sort order inside the collection. Whenever multiple memberships are returned, they will be sorted according to their `sortIndex` in descending order.

**Relationships**

Name               | Type                   | Description
-------------------|------------------------|--------------|
`collection`       | `ProductCollection`    |
`product`          | `Product`              |

#### Example Response

```json
{
  "data": {
    "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
    "type": "ProductCollectionMembership",
    "attributes": {
      "sortIndex": 1000
    },
    "relationships": {
      "collection": {
        "data": {
          "id": "74b901b2-32f9-4e3b-8d4d-4eca2360550c",
          "type": "ProductCollection"
        }
      },
      "product": {
        "data": {
          "id": "65a4a10c-a10d-4c8c-8c30-9cb28b9a2d8a",
          "type": "Product"
        }
      }
    }
  }
}
```

### Create a PCM

Use this endpoint to create a product collection membership.

**Authorization**

Authorized roles: `marketingSpecialist`, `developer` and `administrator`

**Parameters**

Name      | Type       | Description
----------|------------|-------------|
`id`      | `Integer`  | The ID of the product collection.

**Attributes**

Name                          | Type       | Description
------------------------------|------------|-------------|
`sortIndex`                   | `Integer`  | _(default: 1000)_

**Relationships**

Name               | Type                   | Description
-------------------|------------------------|--------------|
`collection`       | `ProductCollection`    | _(required)_
`product`          | `Product`              | _(required)_

**Events**

Name: `catalogue.product_collection_membership.create.success`

Event Data           | Type                     | Description
---------------------|--------------------------|--------------|
`product_collection_membership` | ProductCollectionMembership|
`collection`         | `ProductCollection`      | The created product collection.
`product`            | `Product`               |

**Returns**

The created product collection membership.

#### Definition

```endpoint
POST /product_collections/{id}/memberships
```

#### Example Request

```http
POST /v1/product_collections/{id}/memberships
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "type": "ProductCollectionMembership",
    "relationships": {
      "collection": {
        "data": {
          "id": "f78c1541-1874-4dfc-a31c-8ad52d3fe468",
          "type": "ProductCollection"
        }
      },
      "product": {
        "data": {
          "id": "ebb8f625-ca3a-488f-9f01-6f6cb71c8ddf",
          "type": "Product"
        }
      }
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'
freshcom.setAccessToken('{access_token}')

freshcom.createProductCollection('f78c1541-1874-4dfc-a31c-8ad52d3fe468', {
  collection: {
    id: 'f78c1541-1874-4dfc-a31c-8ad52d3fe468',
    type: 'ProductCollection'
  },
  product: {
    id: 'ebb8f625-ca3a-488f-9f01-6f6cb71c8ddf',
    type: 'Product'
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
    "type": "ProductCollectionMembership",
    "attributes": {
      "sortIndex": 1000
    },
    "relationships": {
      "collection": {
        "data": {
          "id": "74b901b2-32f9-4e3b-8d4d-4eca2360550c",
          "type": "ProductCollection"
        }
      },
      "product": {
        "data": {
          "id": "65a4a10c-a10d-4c8c-8c30-9cb28b9a2d8a",
          "type": "Product"
        }
      }
    }
  }
}
```

### Update a PCM

Use this endpoint to update a PCM.

**Authorization**

Authorized roles: `marketingSpecialist`, `developer` and `administrator`

**Attributes**

Name                          | Type       | Description
------------------------------|------------|-------------|
`sortIndex`                   | `Integer`  |

**Returns**

The updated product collection membership.

#### Definition

```endpoint
PATCH /product_collection_memberships/{id}
```

#### Example Request

```http
PATCH /v1/product_collection_memberships/9fc8ee53-906f-48bd-a392-8b0709301699
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```http
{
  "data": {
    "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
    "type": "ProductCollectionMembership",
    "attributes": {
      "sortIndex": 2000
    }
  }
}
```

```javascript
import freshcom from 'freshcom-sdk'
freshcom.setAccessToken('{access_token}')

freshcom.updateProductCollectionMembership('9fc8ee53-906f-48bd-a392-8b0709301699', {
  sortIndex: 2000
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
    "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
    "type": "ProductCollectionMembership",
    "attributes": {
      "sortIndex": 2000
    },
    "relationships": {
      "collection": {
        "data": {
          "id": "74b901b2-32f9-4e3b-8d4d-4eca2360550c",
          "type": "ProductCollection"
        }
      },
      "product": {
        "data": {
          "id": "65a4a10c-a10d-4c8c-8c30-9cb28b9a2d8a",
          "type": "Product"
        }
      }
    }
  }
}
```

### Delete a PCM

Use this endpoint to delete a product collection membership.

**Authorization**

Authorized roles: `marketingSpecialist`, `developer` and `administrator`

**Parameters**

Name   | Type       | Description
-------|------------|-------------|
`id`   | `Integer`  | The ID of the product collection membership.

**Returns**

If successful, this endpoint returns a HTTP 204 with no body.

```endpoint
DELETE /product_collection_memberships/{id}
```

#### Example Request

```http
DELETE /v1/product_collection_memberships/9fc8ee53-906f-48bd-a392-8b0709301699
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'
freshcom.setAccessToken('{access_token}')

freshcom.deleteProductCollectionMembership('9fc8ee53-906f-48bd-a392-8b0709301699').then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(response)
})
```

### List PCMs

Use this endpoint to list all or some of the memberships of a product collection.

**Authorization**

Authorized roles: all

- User with role other than `marketingSpecialist`, `developer` or `administrator` can only list memberships for product collection with status `active`.

- The returned memberships for user with role other than `marketingSpecialist`, `developer` or `administrator` will only contain membership associated with a product in `active` status.

**Parameters**

Name               | Type      | Description
-------------------|-----------|-----------------------------------|
`id`               | `String`  | The ID of the product collection.

**Returns**

A list of product collection membership.

```endpoint
GET /product_collections/{id}/memberships
```

#### Example Request

```http
GET /product_collections/9fc8ee53-906f-48bd-a392-8b0709301699/memberships
Host: api.freshcom.io
Content-Type: application/vnd.api+json
Authorization: Bearer {access_token}
```

```javascript
import freshcom from 'freshcom-sdk'
freshcom.setAccessToken('{access_token}')

freshcom.listProductCollectionMembership('9fc8ee53-906f-48bd-a392-8b0709301699').then(function (response) {
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
      "id": "9fc8ee53-906f-48bd-a392-8b0709301699",
      "type": "ProductCollectionMembership",
      "attributes": {
        "sortIndex": 2000
      },
      "relationships": {
        "collection": {
          "data": {
            "id": "74b901b2-32f9-4e3b-8d4d-4eca2360550c",
            "type": "ProductCollection"
          }
        },
        "product": {
          "data": {
            "id": "65a4a10c-a10d-4c8c-8c30-9cb28b9a2d8a",
            "type": "Product"
          }
        }
      }
    },
    {...},
    {...}
  ]
}
```

## Price

A price represents a price for a specific product. The price resource allow you to price your product in many ways:

1. **Fixed price per Item**: This the most common way to price your item. For example if you are selling a T-shirt for $20 each, you can do the following:

    - set `chargeAmountCents: 2000`; and
    - set `chargeUnit: "EA"` since you are charging for each T-shirt; and
    - set `orderUnit: "EA"`, since the customer is ordering by each individual T-shirt.

2. **Variable price per Item**: This way of pricing is needed when each item can have a different price. For example if you are selling beef at $2/lb and each beef portion is not in the same weight. The weight range for each portion of beef is from 1.5 pounds to 2.5 pounds. In this case you can do the following:

    - set `chargeAmountCents: 200`; and
    - set `estimateAmountCents: 400` since the average weight of each beef portion is 2 pounds, so you can use `2 * 200 = 400` as the estimate to display for your customer so at least they have an idea of how much they will be paying; and
    - set `maximumAmountCents: 500` since the largest portion of beef is $5, you can set that as the maximum so that `authorizedAmountCents` in order will be calculated accordingly to authorize customer's card with the max amount in case they got the largest portion; and
    - set `chargeUnit: "LB"`, since you are charging by pounds
    - set `orderUnit: "EA"`, since the customer is ordering each portion of the beef not each pound of beef.

3. **Wholesale price**: In addition to the above ways of pricing you can also set a wholesale price by setting the `minimumOrderQuantity`. For example if you sell each T-shirt at $20 but wants to cut the price to $15 per T-shirt if a customer buys 10 or more of them at once, then you can create two price resources for that specified T-shirt Product Item then do the following:

    - set `minimumOrderQuantity: 0` and `chargeAmountCents: 2000` for one of the price; and
    - set `minimumOrderQuantity: 10` and `chargeAmountCents: 1000` for the other price.

  When a Customer add the item to their Order, by default Freshcom will use the lowest price with `publicOrderable: true` that matches the `minimumOrderQuantity`.


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

