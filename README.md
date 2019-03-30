# Boba Watch Backend

## Objects

### Drink Object

```json
{
  "name": "STRING",
  "location": "STRING",
  "price": "INTEGER",
  "date": "DATE",
  "photo": "STRING"
}
```

## Routes

### Drinks

- `GET /drinks`
  - Gets all drinks for user
  - **Response:** array of Drink Objects
- `POST /drinks`
  - Add drink for user
  - **Request:** Drink Object
  - **Response:** Drink Object that was added
- `PUT /drinks/:id`
  - Updates drink for user
  - **Request:** Drink Object with id to update
  - **Response:** Number of Drink Objects updated
- `DELETE /drinks/:id`
  - Deletes drink for user
  - **Request:** drinkId
  - **Response:** Number of Drink Objects deleted

