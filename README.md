Quts is a simple, free and open-source quotations API for everyone.

## API Server
``https://quotes-rest-api.up.railway.app/``

## API References
- [Get quote by id](#)
- [Get random quote](#)
- [Get quotes](#)
- [Get quotes by tag](#)

### Get quote by id
```HTTP
GET /random
```
> ✅ Returns a single random quote from the databse

#### Query parameters
| Name  | Type | Value |
| ------------- | ------------- | ------------- |
| id  | ``string``  | Set an id of the needed quote |
| lang  | ``string`` | Specify the language |