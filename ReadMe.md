# GraphQL File Upload Example
##### A little demo of how GraphQL can handle file uploads.

This demo uses [Express-GraphQL](https://github.com/graphql/express-graphql) and [Multer](https://github.com/expressjs/multer) to show one way to handle file uploads to a GraphQL server.  It is adapted from [the tests](https://github.com/graphql/express-graphql/blob/0bf6aac9ec1c02d42f5de93ff068182c304d56a4/src/__tests__/http-test.js#L676) written for Express-GraphQL.

## Usage
  - After installing the dependencies, run `npm run build` to do a quick Babel compile.
  - Create an 'uploads' folder.  Multer will thrown an `ENOENT` error if the directory doesn't exist when a file is posted.
  - `npm start` will start the Express+GraphQL server.
  - Now post to the endpoint with the `uploadFile` mutation and a file attached as form-data with the key `file`.  This is most easily done using a "REST Client" like [Postman](https://www.getpostman.com/).
  - The file will be added to `/uploads` in your project root and the requested fields will be returned.

#### Example query string
  ```
http://localhost:3000/?query=mutation%20%7B%0A%20%20uploadFile%20%7B%0A%20%20%20%20originalname%0A%20%20%20%20mimetype%0A%20%20%20%20encoding%0A%20%20%20%20destination%0A%20%20%20%20filename%0A%20%20%20%20path%0A%20%20%20%20size%0A%20%20%7D%0A%7D
```
