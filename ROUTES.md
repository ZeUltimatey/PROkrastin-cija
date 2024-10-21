```
localhost/
└── api/
    ├── register/ POST (adding a new user) ✅
    ├── login/ POST (authentificating an existing user) ✅
    ├── user/ GET (gets current user using token) ✅
    ├── logout/ POST (deletes current user's token) ✅
    ├── purchase/ POST (purchase and clear basket) ✅
    ├── all_users/ GET (getting all users) ✅
    ├── all_cards/ GET (getting all user card information) ✅
    ├── all_locations/ GET (getting all user locations) ✅
    ├── all_transactions/ GET (getting all user transactions) ✅
    ├── all_reviews/ GET (getting all reviews) ✅
    ├── basket/
    │   ├── GET (getting the contents of a users basket) ✅
    │   ├── POST (selecting/deselecting a product) ✅
    │   └── clear/ POST (clear basket) ✅
    ├── products/
    │   ├── {query_options} GET (getting all products) ✅
    │   ├── POST (adding new product) ✅
    │   ├── {id} GET (getting the specfified product) ✅
    │   ├── {id} POST (updating the specified product) ✅
    │   └── remove/{id} POST (deleting the specified product) ✅
    ├── cats/
    │   ├── GET (getting all cats) ✅
    │   ├── POST (adding new cat) 🟨
    │   ├── {id} GET (getting the specfified cat) ✅
    │   ├── {id} POST (updating the specified cat) 🟨
    │   └── remove/{id} POST (deleting the specified cat) ✅
    ├── cat_breeds/
    │   ├── GET (getting all cat breeds) ✅
    │   ├── POST (adding new cat breed) ✅
    │   ├── {id} GET (getting the specfified cat breed) ✅
    │   ├── {id} POST (updating the specified cat breed) ✅
    │   └── remove/{id} POST (deleting the specified cat breed) ✅
    ├── cards/
    │   ├── GET (getting all card information) ✅
    │   ├── POST (adding new card information) ✅
    │   ├── {id} GET (getting specific card information) ✅
    │   ├── {id} POST (updating specific card information) ✅
    │   └── remove/{id} POST (deleting specific card information) ✅
    ├── locations/
    │   ├── GET (getting all locations) ✅
    │   ├── POST (adding new location) ✅
    │   ├── {id} GET (get specific location) ✅
    │   ├── {id} POST (update specific location) ✅
    │   └── remove/{id} POST (deleting specific location) ✅
    ├── transactions/
    │   ├── GET (getting all transactions) ✅
    │   └── {id} GET (getting specific transaction) ❌
    └── reviews/
        ├── {product_id} GET (getting all reviews for a product) ✅
        ├── {product_id} POST (creating a review for a product) ✅
        └── remove/{id} POST (deleting a specific review) ✅
        
✅ - Working fine
🟨 - Subject to change
❌ - Incomplete

PS: There are a few unhandled errors for deleting products while they are in users baskets
```

### ↓ Routes with no JSON required ↓
`localhost/api/products GET`
```php
type=enum('UNLISTED', 'CATS', 'ACCESSORIES', 'FOOD', 'CARE', 'TOYS', 'FURNITURE')
min_price=float
max_price=float
keyword=string
per_page=int (default 10)
page=int (default 1)

Example: /products?type=CATS,FURNITURE&min_price=7.4&per_page=15&page=2
```
```php
return [
    {
        "id": int,
        "attachments_id": int or null,
        "product_type": enum('UNLISTED', 'CATS', 'ACCESSORIES', 'FOOD', 'CARE', 'TOYS', 'FURNITURE'),
        "display_name": string(255),
        "description": string(65535),
        "pricing": float,
        "discount_pricing": float or null,
        "stock": int,
        "created_at": timestamp,
        "updated_at": timestamp,
    },
    other products..
]
```
```php
return {
  "data": [
        {
        "id": int,
        "attachments_id": int or null,
        "product_type": enum('UNLISTED', 'CATS', 'ACCESSORIES', 'FOOD', 'CARE', 'TOYS', 'FURNITURE'),
        "display_name": string(255),
        "description": string(65535),
        "pricing": float,
        "discount_pricing": float or null,
        "stock": int,
        "created_at": timestamp,
        "updated_at": timestamp,
    },
    other products..
  ],
  "links": {
    "first": string,
    "last": string,
    "prev": string or null,
    "next": string or null
  },
  "meta": {
    "current_page": int,
    "from": int or null,
    "last_page": int,
    "links": [
      {
        "url": string or null,
        "label": string,
        "active": true or false
      },
      more links..
    ],
    "path": string,
    "per_page": int,
    "to": int or null,
    "total": int
  }
}
```
---
`localhost/api/products/{id} GET`
```php
return {
    "id": int,
    "attachments_id": int or null,
    "product_type": enum('UNLISTED', 'CATS', 'ACCESSORIES', 'FOOD', 'CARE', 'TOYS', 'FURNITURE'),
    "display_name": string(255),
    "description": string(65535),
    "pricing": float,
    "discount_pricing": float or null,
    "stock": int,
    "created_at": timestamp,
    "updated_at": timestamp,
}

or

{} - code 422 - invalid product id
```
---
`localhost/api/cats GET`
```php
return [
    {
        "id": int,
        "breed_id": int,
        "birthdate": timestamp,
        "color": string(255),
        "created_at": timestamp,
        "updated_at": timestamp
    },
    other cats..
]
```
---
`localhost/api/cats/{id} GET`
```php
return {
    "id": int,
    "breed_id": int,
    "birthdate": timestamp,
    "color": string(255),
    "created_at": timestamp,
    "updated_at": timestamp
}

or

{} - code 422 - invalid cat id
```
---
`localhost/api/cat_breeds GET`
```php
return [
    {
        "id": int,
        "attachments_id": int or null,
        "display_name": string(255),
        "breed_information": string(65535),
        "created_at": timestamp,
        "updated_at": timestamp
    },
    other breeds..
]
```
---
`localhost/api/cat_breeds/{id} GET` 
```php
return {
    "id": int,
    "attachments_id": int or null,
    "display_name": string(255),
    "breed_information": string(65535),
    "created_at": timestamp,
    "updated_at": timestamp
}

or

{} - code 422 - invalid cat breed id
```
---
`localhost/api/reviews/{product_id} GET`
```php
return [
    {
        "id": int,
        "attachments_id": int or null,
        "content": string(65535),
        "rating": int,
        "created_at": timestamp,
        "reviewer": {
            "id": int,
            "display_name": string(255),
            "image_url": string(255) or null,
            "user_role": enum('User', 'Admin'),
            "deactivated": boolean
        }
    },
    other reviews..
]
```
---
`localhost/api/transactions GET` *authenticated user*
```php
return [
    {
        "id": int,
        "total_pricing": float,
        "check_content": string(65535),
        "created_at": timestamp,
        "location": {
            "id": int,
            "city": string(255),
            "street": string(255),
            "apartment_number": string(255) or null,
            "zip_code": string(255)
        } or location can be null
    },
    other transactions..
]
```
---
`localhost/api/basket GET` *authenticated user*
```php
return [
    {
        "amount": int,
        "product_type": enum('UNLISTED', 'CATS', 'ACCESSORIES', 'FOOD', 'CARE', 'TOYS', 'FURNITURE'),
        "display_name": string(255),
        "description": string(65535),
        "pricing": float,
        "discount_pricing": float or null,
    },
    other products..
];
```
---
`localhost/api/basket/clear GET` *authenticated user*
```php
return {
    'cleared': int
}
```
---
`localhost/api/cards GET` *authenticated user*
```php
return [
    {
        "id": int,
        "card_name": string(255),
        "created_at": timestamp,
        "updated_at": timestamp
    },
    other card information..
]
```
---
`localhost/api/locations GET` *authenticated user*
```php
return [
    {
        "id": int,
        "city": string(255),
        "street": string(255),
        "apartment_number": string(255) or null,
        "zip_code": string(255)
    },
    other locations..
]
```
---
`localhost/api/cards/{id} GET` *authenticated user*
```php
return {
    "id": int,
    "card_name": string(255),
    "created_at": timestamp,
    "updated_at": timestamp
}

or

{} - code 422 - invalid card information id
{} - code 403 - forbidden
```
---
`localhost/api/locations/{id} GET` *authenticated user*
```php
{
    "id": int,
    "city": string(255),
    "street": string(255),
    "apartment_number": string(255) or null,
    "zip_code": string(255)
}

or

{} - code 422 - invalid location id
{} - code 403 - forbidden
```
---
`localhost/api/cards/remove/{id} POST` *authenticated user* \
`localhost/api/locations/remove/{id} POST` *authenticated user*
```php
return true

or 

{} - code 422 - invalid id
```
---
`localhost/api/all_users GET` ***authenticated admin***
```php
return [
    {
        "id": int,
        "profilepicture_id": int or null,
        "email": string(255),
        "display_name": string(255),
        "name": string(255),
        "surname": string(255),
        "phone_number": string(15),
        "user_role": enum('User', 'Admin'),
        "deactivated": boolean,
        "created_at": timestamp,
        "updated_at": timestamp,
        "remember_token": string(255) or null
    },
    other users..
]
```
---
`localhost/api/all_cards GET` ***authenticated admin***
```php
return [
    {
        "id": int,
        "cardholder_id": int,
        "card_name": string(255),
        "created_at": timestamp,
        "updated_at": timestamp
    },
    other card information..
]
```
---
`localhost/api/all_locations GET` ***authenticated admin***
```php
return [
    {
        "id": int,
        "creator_id": int,
        "city": string(255),
        "street": string(255),
        "apartment_number": string(255) or null,
        "zip_code": string(255)
    },
    other locations..
]
```
---
`localhost/api/all_reviews GET` ***authenticated admin***
```php
return [
    {
        "id": int,
        "attachments_id": int or null,
        "content": string(65535),
        "rating": int,
        "created_at": timestamp,
        "product": {
            "id": int,
            "display_name": string(255),
            "pricing": float,
            "discount_pricing": float or null
        },
        "reviewer": {
            "id": int,
            "display_name": string(255),
            "image_url": string(255) or null,
            "user_role": enum('User', 'Admin')
            "deactivated": boolean
        }
    },
    other reviews..
]
```
---
`localhost/api/all_transactions GET` ***authenticated admin***
```php
return [
    {
        "id": int,
        "total_pricing": float,
        "check_content": string(65535),
        "created_at": timestamp,
        "transactor": {
            "id": int,
            "display_name": string(255),
            "image_url": string(255) or null,
            "user_role": enum('User', 'Admin'),
            "deactivated": boolean
        },
        "location": {
            "id": int,
            "city": string(255),
            "street": string(255),
            "apartment_number": string(255) or null,
            "zip_code": string(255)
        } or location can be null
    },
    other transactions..
]
```
---
`localhost/api/products/remove/{id} POST` ***authenticated admin*** \
`localhost/api/cats/remove/{id} POST` ***authenticated admin*** \
`localhost/api/cat_breeds/remove/{id} POST` ***authenticated admin*** \
`localhost/api/reviews/remove/{id} POST` ***authenticated admin***
```php
return true

or 

{} - code 422 - invalid id
```
---

### ↓ Routes with JSON required ↓
`localhost/api/register POST`
```php
{
    "profilepicture_id"     : "nullable|exists:images,id",
    "email"                 : "required|string|email|max:255|unique:users",
    "password"              : "required|string|min:8|confirmed",
    "password_confirmation" : "required|same:password",
    "display_name"          : "required|string|max:255",
    "name"                  : "required|string|max:255",
    "surname"               : "required|string|max:255",
    "phone_number"          : "nullable|string|max:15",
    "user_role"             : "nullable|in:User,Admin"
}
```
```php
return {
    "user": {
        "id": int,
        "email": string(255),
        "display_name": string(255),
        "name": string(255),
        "surname": string(255),
        "phone_number": string(15),
        "updated_at": timestamp,
        "created_at": timestamp
    },
    "token": string(255)
}
```
---
`localhost/api/login POST`
```php
{
    "email"    : "required|string|email|max:255",
    "password" : "required|string"
}
```
```php
return {
    "user": {
        "id": int,
        "profilepicture_id": int or null,
        "email": string(255),
        "display_name": string(255),
        "name": string(255),
        "surname": string(255),
        "phone_number": string(15),
        "user_role": enum('User', 'Admin'),
        "deactivated": boolean,
        "created_at": timestamp,
        "updated_at": timestamp,
        "remember_token": string(255) or null
    },
    "token": string(255)
}
```
--- 
`localhost/api/basket POST` *authenticated user*
```php
{
    "product_id" : "required|int|exists:products,id",
    "amount"     : "required|int"
}
```
```php
return {
    "amount": int,
    "product_type": enum('UNLISTED', 'CATS', 'ACCESSORIES', 'FOOD', 'CARE', 'TOYS', 'FURNITURE'),
    "display_name": string(255),
    "description": string(65535),
    "pricing": float,
    "discount_pricing": float or null,
}

or

{} - code 422 - invalid product id
```
---
`localhost/api/cards POST` *authenticated user* \
`localhost/api/cards/{id} POST` *authenticated user*
```php
{
    "card_number"     : "required|string|digits:16",
    "expiration_date" : "required|date_format:m/y|after:today",
    "cvc_number"      : "nullable|string|digits:3",
    "card_name"       : "required|string|max:255"
}
```
```php
return { "card_number": string(255), ... }

or 

{} - code 422 - invalid input data
```

---
`localhost/api/locations POST` *authenticated user* \
`localhost/api/locations/{id} POST` *authenticated user*
```php
{
    "city"             : "required|string|max:255",
    "street"           : "required|string|max:255",
    "apartment_number" : "nullable|string|max:255",
    "zip_code"         : "required|string|max:255"
}
```
```php
return { "city": string(255), ... }

or 

{} - code 422 - invalid input data
```
---
`localhost/api/reviews/{product_id} POST` *authenticated user*
```php
{
    "attachment_groups" : "nullable|int|exists:attachment_groups,id",
    "content"           : "required|string|max:65535",
    "rating"            : "required|int|min:0|max:10"
}
```
```php
return {
    "id": int,
    "attachments_id": int or null,
    "content": string(65535),
    "rating": int,
    "created_at": timestamp,
    "product": {
        "id": int,
        "display_name": string(255),
        "pricing": float,
        "discount_pricing": float or null
    },
    "reviewer": {
        "id": int,
        "display_name": string(255),
        "image_url": string(255) or null,
        "user_role": enum('User', 'Admin'),
        "deactivated": boolean
    }
}
```
---
`localhost/api/purchase POST` *authenticated user*
```php
{
    "location_id"   : "nullable|int|exists:locations,id"
}
```
```php
return {
    "id": int,
    "total_pricing": float,
    "check_content": string(65535),
    "created_at": timestamp,
    "location": {
        "id": int,
        "city": string(255),
        "street": string(255),
        "apartment_number": string(255) or null,
        "zip_code": string(255)
    } or location can be null
}
```
---
`localhost/api/products POST` ***authenticated admin*** \
`localhost/api/products/{id} POST` ***authenticated admin***
```php
{
    "product_type"     : "required|in:UNLISTED,ACCESSORIES,FOOD,CARE,TOYS,FURNITURE",
    "display_name"     : "required|string|max:255",
    "description"      : "required|string",
    "pricing"          : "required|numeric|min:0",
    "discount_pricing" : "nullable|numeric|min:0|lt:pricing",
    "stock"            : "required|integer|min:0"
}
```
```php
return { "product_type": enum('UNLISTED', 'ACCESSORIES', 'FOOD', 'CARE', 'TOYS', 'FURNITURE'), ... }

or 

{} - code 422 - invalid input data
```
---
`localhost/api/cats POST` ***authenticated admin*** \
`localhost/api/cats/{id} POST` ***authenticated admin***
```php
{
    "breed_id"  : "required|exists:cat_breeds,id",
    "birthdate" : "required|date|before:today",
    "color"     : "required|string|max:255"
}
```
```php
return { "breed_id": int, ... }

or 

{} - code 422 - invalid input data
```

---
`localhost/api/cat_breeds POST` ***authenticated admin*** \
`localhost/api/cat_breeds/{id} POST` ***authenticated admin***
```php
{
    "attachments_id"    : "nullable|integer|exists:attachment_groups,id",
    "display_name"      : "required|string|max:255",
    "breed_information" : "required|string|max:65535"
}
```
```php
return { "attachments_id": int, ... }

or 

{} - code 422 - invalid input data
```
