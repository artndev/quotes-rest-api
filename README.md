Quts is a simple, free and open-source quotations API for everyone.

## API Server
```
https://quts.up.railway.app/
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
- [Get quotes](#3-get-quotes)
- [Get quotes by tag](#4-get-quotes-by-tag)

<br>

## 1. Get quote by id
```HTTP
GET /quotes/:id ?lang=en
```
> ✅ Returns a single quote from the database with the stated ID

### Query parameters
| Name  | Type | Value |
| ------------- | ------------- | ------------- |
| id  | ``string`` | The ID of a searching quote |
| lang  | ``string`` | Specify the [↪ language](#supported-languages) |

### Answer
```JSON
{
	"message": "Quote was successfully found!",
	"_doc": {
		"_id": "6478f4758ef37e413f2bcad9",
		"text": "Your time is limited, so don't waste it living someone else's life.",
		"author": "Steve Jobs",
		"tags": ["motivation", "business"]
	}
}
```

<br>

## 2. Get random quote
```HTTP
GET /random ?lang=en
```
> ✅ Returns a single random quote from the database

#### Query parameters
| Name  | Type | Value |
| ------------- | ------------- | ------------- |
| lang  | ``string`` | Specify the [↪ language](#supported-languages) |

### Answer
```JSON
{
	"message": "Random quote was successfully received!",
	"_doc": {
		"_id": "6478f807c0e5c040ed849d63",
		"text": "Any intelligent fool can make things bigger, more complex, and more violent.",
		"author": "Albert Einstein",
		"tags": ["intelligence"]
	}
}
```

<br>

## 3. Get quotes
```HTTP
GET /quotes ?lang=en
```
> ✅ Returns a list of the all quotes in the database

#### Query parameters
| Name  | Type | Value |
| ------------- | ------------- | ------------- |
| lang  | ``string`` | Specify the [↪ language](#supported-languages) |

### Answer
```JSON
{
	"message": "Quotes list was successfully received!",
	"_arr": {
		{
			"_id": "6478f4758ef37e413f2bcad9",
			"text": "Your time is limited, so don't waste it living someone else's life.",
			"author": "Steve Jobs",
			"tags": ["motivation", "business"]
		},
		{
			"_id": "6478f807c0e5c040ed849d63",
			"text": "Any intelligent fool can make things bigger, more complex, and more violent.",
			"author": "Albert Einstein",
			"tags": ["intelligence"]
		}
	}
}
```

<br>

## 4. Get quotes by tag
```HTTP
GET /tags/:tag ?lang=en
```
> ✅ Returns a list of the all quotes in the database with the stated tag

#### Query parameters
| Name  | Type | Value |
| ------------- | ------------- | ------------- |
| tag  | ``string`` | The tag of a searching quote |
| lang  | ``string`` | Specify the [↪ language](#supported-languages) |

### Answer
```JSON
{
	"message": "Quotes list was successfully received!",
	"_arr": {
		{
			"_id": "6478f4758ef37e413f2bcad9",
			"text": "Your time is limited, so don't waste it living someone else's life.",
			"author": "Steve Jobs",
			"tags": ["motivation", "business"]
		}
	}
}
```