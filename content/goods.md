## Branch

## SKU

An SKU (Stock Keeping Unit) represents a single unique item in your inventory. Many of its attributes are optional and its up to you on how you use it.

**Localizable Attributes**: `name`, `printName`, `unitOfMeasure`, `specification`, `storageDescription`, `caption`,  `description`

Attribute              | Type     | Description
-----------------------|----------|-----------
`code`                 | String   | A unique code for the SKU, you can assign any string. This code must be unique for each SKU.
`status`               | String   |
`name`                 | String   |
`printName`            | String   | Name to print when printing. To accomndate most receipt printer it is recommended to limit this field to at most 64 characters.
`unitOfMeasure`        | String   |
`variableWeight`       | Boolean  |
`storageType`          | String   |
`storageSize`          | Integer  |
`stackable`            | Boolean  |
`specification`        | Text     |
`storageDescription`   | Text     |
`caption`              | String   | A short description of the SKU.
`description`          | Text     | A detail description of the SKU.


Relationship                        | Type                     | Description
------------------------------------|--------------------------|-----------
`externalFileCollections`           | ExternalFileCollection   | You can associate ExternalFileCollection to SKU in order to store images or any files related to the SKU.


#### Example SKU Object

```json
{
  "type": "Sku",
  "id": "33768c8a-a7e7-448e-ad2c-4279228b5bf4",
  "attributes": {
    "code": "APL001",
    "status": "active",
    "name": "Apple",
    "printName": "APPLE",
    "unitOfMeasure": "EA",
    "variableWeight": true,
    "storageType": "frozen",
    "storageSize": 100,
    "stackable": false,
    "specification": "About 600g per apple",
    "storageDescription": "Avoid direct sunlight",
    "caption": "Beautiful apple from local farm",
    "description": "Beautiful apple from local farm. An apple you deserve to have."
    "insertedAt": "2017-04-01T07:43:29.516422",
    "updatedAt": "2017-04-01T07:43:29.516422",
    "locale": "en"
  },
  "relationships": {
    "externalFileCollection": {
      "data": [
        {
          "type": "ExternalFileCollection",
          "id": "5ab96bb4-7291-4907-a556-3d99ab7de801"
        },
        {
          "type": "ExternalFileCollection",
          "id": "5ab96bb4-7291-4907-a556-3d99ab7de801"
        }
      ]
    }
  }
}
```

### List SKU

List all SKUs for your account.

```endpoint
GET /skus?search={searchKeyword}
```

**Query String Parameters**

Key           | Description
--------------|-----------
`search`      | (optional) Only return SKUs that matches the search keyword.


#### Example Request

```javascript
client.listWobbles(function(err, wobbles) {
  console.log(wobbles);
});
```

#### Example Request Body

```json


```

#### Example Response
```json
{
  "meta": {
    "totalCount":
  }
}

```


## Stock Batch

## Stock Transfer
