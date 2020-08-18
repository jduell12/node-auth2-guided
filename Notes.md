## Cookie

- An http cookie is a small package of data used to exchange information between the server and the client

## Session

- Session information is stored in the server's data store (database, memory cache etc.)

## Jason Web Tokens (JWT)

- Tokens store the data inside the token
  - The token is encoded not encrypted
  - Don't put sensitive data within the token
- Tokens have 3 parts
  - header
  - payload
    - holds data
  - signature
    - database/app signature
    - holds the secret that the database only knows
-
