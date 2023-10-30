# CS 340 Spooktacular Database

Node.js, Express, MySQL CRUD project

### Checking against project guidelines:

"Your database should be pre-populated with sample data. At least three rows per table."
_Yes, for all tables._

"At least 4 entities and at least 4 relationships, one of which must be a many-to-many relationship."
_We have 7 entities (8 tables), 6 relationships in which InventoryItems_Employees is M:N._

"Primary user is the administrator of this database. It is NOT a customer facing website."
_Yup! Our site is meant for the Haunted House admin team._

- "Every table should be used in at least one SELECT query. For the SELECT queries, it is fine to just display the content of the tables."
- "Need to include one DELETE and one UPDATE function in your website, for any one of the entities. In addition, it should be possible to add and remove things from at least one many-to-many relationship and it should be possible to add things to all relationships."
- "Need SELECT & INSERT functionalities for all relationships as well as entities. And DELETE & UPDATE for least one m:m relationship."

_We are planning to have 'read' and 'create' for all entities, and 'update' for all entities except Tickets. The InventoryItems-Employees M:N relationship will have full CRUD implemented. Entities are spread across multiple pages, with tables and forms for each entity._

"Note that it's not acceptable to require the user to enter IDs for foreign keys. Instead your website needs to use a dynamically populated drop-down list or have the ability to search using text instead of entering in the ID. This Dynamic drop-down/Search functionality should be present for at least one entity."
_Foreign keys will use select elements and populate them with readable fields (eg. when creating a new review, if selecting a room, the user selects by room name). Will add a filter select for InventoryItems to view by room or employee._

"In one relationship, you should be able to set the foreign key value to NULL using UPDATE, that removes the relationship."
_The 1:M optional relationship between Rooms and Inventory Items fulfils this for us._

"You should be able to DELETE a record from a M:M relationship without creating a data anomaly in the related tables."
_If an Inventory Item or Employee is deleted, accordingly, the intersection table InventoryItems_Employees will be updated as it has the appropriate ON DELETE CASCADE._
