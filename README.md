https://github.com/gitdagray/node_js_resources

# [Optional chaining (?.)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

- Required node.js version 14.0.0

# JWT (Json Web Tokens)

- Access Token = Short Time
  - Sent as JSON
  - Client stores in memory
  - Do NOT store in local storage or cookie
  - Issued at Authorization
  - Client uses for API Access until expires
  - Verified with Middleware
  - New token issued at Refresh request
- Refresh Token = Long Time
  - Sent as httpOnly cookie
  - Not accessible via JavaScript
  - Must have expiry at some point
  - Issued at Authorization
  - Client uses to request new Access Token.
  - Verified with endpoint & database
  - Must be allowed to expire or logout
- Hazards:
  - XSS:Cross-Site Scripting
  - CSRF: CS Request Forgery

## Access-Control-Allow-Origin

### Run demo

- Start node server: `npm run dev`
- Start front end: `npm run auth-fe`

### Verify on the Network tab

## Cookie’s SameSite

```
Specify SameSite=None and Secure if the cookie is intended to be set in cross-site contexts. Note that only cookies sent over HTTPS may use the Secure attribute.
```

# Authentication

- is the process of verifying who someone is.

# Authorization

- is the process of verifying what resources a user has access to.

# MongoDB

- A record in MongoDB is a document,
  - Which is a data structure composed of field and value pairs.
  - MongoDB documents are similar to JSON objects.
  - The values of fields may include other documents, arrays, and arrays of documents.
- MongoDB stores documents in collections.

## Advantages:

- Performance
- Flexibility: adding new field
- Scalability:
- Usability

# Scripts

- `npm init -y`: generate `package.json`
- `npx tsc --init`: create `tsconfig.json` for typescript compiler
- `npm i ts-node -D`: allow us compile and run the typescript file
- Generate base 64: require('crypto').randomBytes(64).toString('hex')
