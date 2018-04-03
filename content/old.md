## Product Item

A Product Item represents a single item for sale. An item can be either an Unlockable or a SKU. The Product Item resources are used together with the Product resource to reprepsent items for sale.

**Localizable Attributes**: `name`, `shortName` `printName`, `specification`, `storageDescription`, `caption`,  `description`

Attribute              | Type     | Description
----------------------------|----------|-----------|
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
------------------------------------|---------------------------------|-------------|
`sku`                               | `Sku`                           |
`unlockable`                        | `Unlockable`                    |
`source`                            | `Sku`, `Unlockable`             |
`product`                           | `Product`                         |
`avatar`                            | `ExternalFile`                    |
`prices`                            | `Array<Price>`                    |
`externalFileCollections`           | `Array<ExternalFileCollection>`   |

**Notes**: Exactly one of `sku` and `unlockable` can be set. If one is set, the other must be nil.
