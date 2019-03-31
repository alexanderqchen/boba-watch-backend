# Boba Watch Backend

## Objects

### Drink Object

```json
{
  "name": "STRING",
  "location": "STRING",
  "price": "INTEGER",
  "date": "DATE",
  "photo": "STRING",
  "userId": "INTEGER"
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
  - Gets all drinks
  - **Response:** array of Drink Objects
- `POST /drinks/:accessToken`
  - Add drink
  - **Request:** Drink Object with userId
  - **Response:** Drink Object that was added
- `GET /drinks/user/:userId`
  - Gets all drinks for user
  - **Response:** array of Drink Objects
- `PUT /drinks/:id/:accessToken`
  - Updates drink for user
  - **Request:** Drink Object with id to update
  - **Response:** Number of Drink Objects updated
- `DELETE /drinks/:id/:accessToken`
  - Deletes drink for user
  - **Response:** Number of Drink Objects deleted

### Users

- `POST /user/login`
  - Logs in
  - **Request:** Facebook Response Object
  - **Response:** `{ userId: <userId> }`
- `POST /user`
  - Creates user
  - **Request:** User Object
  - **Response:** User Object that was created
- `GET /user/:id/:accessToken`
  - Gets user information
  - **Response:** User Object
- `PUT /user/:id/:accessToken`
  - Updates user information
  - **Request:** User Object
  - **Response:** Number of User Objects updated
- `DELETE /user/:id/:accessToken`
  - Deletes user
  - **Response:** Number of User Objects deleted