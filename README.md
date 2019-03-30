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

### User Object

```json
{
  "facebookUserId": "STRING",
  "budget": "INTEGER",
  "maxDrinks": "INTEGER"
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
  - **Response:** Number of Drink Objects deleted

### Users

- `POST /user`
  - Creates user
  - **Request:** User Object
  - **Response:** User Object that was created
- `GET /user/:id`
  - Gets user information
  - **Response:** User Object
- `PUT /user/:id`
  - Updates user information
  - **Request:** User Object
  - **Response:** Number of User Objects updated
- `DELETE /user/:id`
  - Deletes user
  - **Response:** Number of User Objects deleted