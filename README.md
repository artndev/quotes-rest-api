Quts is a simple, free and open-source quotations API for everyone.

## API Server
``https://quotes-rest-api.up.railway.app/``

### Supported languages
- English (en)
- Russian (ru)
- Spanish (es)
- French (fr)
- Japanese (ja)
- Chinese (zh)

## API References
- [Get quote by id](#1-get-quote-by-id)
- [Get random quote](#2-get-random-quote)
- [Get quotes](#)
- [Get quotes by tag](#)

<br>

## 1. Get quote by id
```HTTP
GET /quotes?id=
```
> ✅ Returns a single random quote from the database

### Query parameters
| Name  | Type | Value |
| ------------- | ------------- | ------------- |
| id  | ``string``  | Get a quote with the stated id |
| lang  | ``string`` | Specify the [↪ language](#supported-languages) |

## 2. Get random quote
```HTTP
GET /random
```
> ✅ Returns a random quote from the database

#### Query parameters
| Name  | Type | Value |
| ------------- | ------------- | ------------- |
| author  | ``string``  | Get a random quote with the stated author |
| tag  | ``string``  | Get a random quote with the stated tag |
| lang  | ``string`` | Specify the [↪ language](#supported-languages) |