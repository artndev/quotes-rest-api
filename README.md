Quts is a simple, free and open-source quotations API for everyone.

## API Server
```
https://quotes-rest-api.up.railway.app/
```

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
GET /quotes/:id ?lang=
```
> ✅ Returns a single quote from the database with the stated ID

### Query parameters
| Name  | Type | Value |
| ------------- | ------------- | ------------- |
| lang  | ``string`` | Specify the [↪ language](#supported-languages) |

### Answer
```JSON
{
	"message": "Quote was successfully found!",
	"_doc": {
		"_id": "6478f4758ef37e413f2bcad9",
		"text": "Your time is limited, so don't waste it living someone else's life.",
		"author": "Steve Jobs",
		"tags": [
			"motivation",
            "business"
		]
	}
}
```

<br>

## 2. Get random quote
```HTTP
GET /random ?author=SteveJobs&tag=motivation&lang=en
```
> ✅ Returns a single random quote from the database

#### Query parameters
| Name  | Type | Value |
| ------------- | ------------- | ------------- |
| author  | ``string``  | Get a random quote with the stated author |
| tag  | ``string``  | Get a random quote with the stated tag |
| lang  | ``string`` | Specify the [↪ language](#supported-languages) |

### Answer
```JSON
{
	"message": "Random quote was successfully received!",
	"_doc": {
		"_id": "6478f807c0e5c040ed849d63",
		"text": "Any intelligent fool can make things bigger, more complex, and more violent.",
		"author": "Albert Einstein",
		"tags": [
			"intelligence"
		]
	}
}
```