
## External File Collection

An External File Collection represents a collection of External File grouped for a single purpose.

Attribute              | Type     | Description
-----------------------|----------|-----------
`name`                 | String   |
`label`                | String   |
`contentType`          | String   | Content Type of this file.
`sizeBytes`            | String   |
`contentTypePrefix`    | String   | If specified, only External File with the matching content type prefix will be allowed to add to the collection.
`versionName`          | String   |
`versionLabel`         | String   |


Relationship                        | Type                     | Description
------------------------------------|--------------------------|-----------
`files`                             | ExternalFile             |
`sku`                               | Sku                      |
`productItem`                       | ProductItem              |
