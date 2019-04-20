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
  "userId": "INTEGER",
  "description": "STRING"
}
```

### User Object

```json
{
  "facebookUserId": "STRING",
  "budget": "INTEGER",
  "maxDrinks": "INTEGER",
  "public": "BOOLEAN"
}
```

## Routes

### Dashboard

- `GET /dashboard/:userId`
  - Gets all data for the dashboard for the user
  - **Response:**
    ```json
    {
      "budget": "INTEGER",
      "spent": "INTEGER",
      "maxDrinks": "INTEGER",
      "numDrinks": "INTEGER"
    }
    ```

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

- `POST /users/login`
  - Logs in
  - **Request:** Facebook Response Object
  - **Response:** `{ userId: <userId> }`
- `GET /users/public/:id`
  - Checks if user has public profile sharing on
  - **Response:** `{ public: <boolean> }`
- `PUT /users/public/:id`
  - Change user's public profile setting
  - **Request:** `{ accessToken: <token>, public: <boolean> }`
  - **Response:** Number of User Objects updated
- `GET /users/:id/:accessToken`
  - Gets user information
  - **Response:** User Object
- `PUT /users/:id/:accessToken`
  - Updates user information
  - **Request:** User Object
  - **Response:** Number of User Objects updated
- `DELETE /users/:id/:accessToken`
  - Deletes user
  - **Response:** Number of User Objects deleted
