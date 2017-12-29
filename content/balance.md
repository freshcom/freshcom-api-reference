## Payment

A Customer represents a single customer of your Storefront.

**Localizable Attributes**: `customData`<br>

Attribute                        | Type       | Description
---------------------------------|------------|-----------
`code`                           | `String`   | A unique code for the Customer, you can assign any string.
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

