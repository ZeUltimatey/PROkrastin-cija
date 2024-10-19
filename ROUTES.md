```
localhost/
└── api/
    ├── register POST (adding a new user)
    ├── login POST (authentificating an existing user)
    ├── basket/
    │   ├── GET (getting the contents of a users basket)
    │   ├── POST (selecting/deselecting a product)
    │   └── clear/ POST (clear basket)
    ├── products/
    │   ├── GET (getting all products)
    │   ├── {id} GET (getting the specfified product)
    │   ├── {id} POST (updating the specified product)
    │   └── remove/{id} POST (deleting the specified product)
    ├── cats/
    │   ├── GET (getting all cats)
    │   ├── {id} GET (getting the specfified cat)
    │   ├── {id} POST (updating the specified cat)
    │   └── remove/{id} POST (deleting the specified cat)
    ├── cat_breeds/
    │   ├── GET (getting all cat breeds)
    │   ├── {id} GET (getting the specfified cat breed)
    │   ├── {id} POST (updating the specified cat breed)
    │   └── remove/{id} POST (deleting the specified cat breed)
    └── cards/
        ├── GET (getting all card information)
        ├── {id} GET (getting specific card information)
        ├── {id} POST (updating specific card information)
        └── remove/{id} POST (deleting specific card information)
```

### ↓ Routes with no JSON required ↓
`localhost/api/products GET`
```php
return [
    {
        'id': int,
        'attachments_id': int or null,
        'product_type': enum('Unlisted', 'Cat', 'Accessory', 'Food', 'Furniture'),
        'display_name': string(255),
        'description': string(65535),
        'pricing': float,
        'discount_pricing': float or null,
        'stock': int,
        'created_at': timestamp,
        'updated_at': timestamp,
    },
    other products..
]
```
---
`localhost/api/products/{id} GET`
```php
return {
    'id': int,
    'attachments_id': int or null,
    'product_type': enum('Unlisted', 'Cat', 'Accessory', 'Food', 'Furniture'),
    'display_name': string(255),
    'description': string(65535),
    'pricing': float,
    'discount_pricing': float or null,
    'stock': int,
    'created_at': timestamp,
    'updated_at': timestamp,
}

or

{} - code 422 - invalid product id
```
---
`localhost/api/cats GET`
```php
return [
    {
        'id': int,
        'breed_id': int,
        'birthdate': timestamp,
        'color': string(255),
        'created_at': timestamp,
        'updated_at': timestamp
    },
    other cats..
]
```
---
`localhost/api/cats/{id} GET`
```php
return {
    'id': int,
    'breed_id': int,
    'birthdate': timestamp,
    'color': string(255),
    'created_at': timestamp,
    'updated_at': timestamp
}

or

{} - code 422 - invalid cat id
```
---
`localhost/api/cat_breeds GET`
```php
return [
    {
        'id': int,
        'attachments_id': int or null,
        'display_name': string(255),
        'breed_information': string(65535),
        'created_at': timestamp,
        'updated_at': timestamp
    },
    other breeds..
]
```
---
`localhost/api/cat_breeds/{id} GET` 
```php
return {
    'id': int,
    'attachments_id': int or null,
    'display_name': string(255),
    'breed_information': string(65535),
    'created_at': timestamp,
    'updated_at': timestamp
}

or

{} - code 422 - invalid cat breed id
```
---
`localhost/api/basket GET` *authenticated user*
```php
return [
    {
        'amount': int,
        'product_type': enum('Unlisted', 'Cat', 'Accessory', 'Food', 'Furniture'),
        'display_name': string(255),
        'description': string(65535),
        'pricing': float,
        'discount_pricing': float or null,
    },
    other products..
];
```
---
`localhost/api/cards GET` *authenticated user*
```php
return [
    {
        'id': int,
        'cardholder_id': int,
        'card_name': string(255),
        'created_at': timestamp,
        'updated_at': timestamp
    },
    other card information..
]
```
---
`localhost/api/cards/{id} GET` *authenticated user*
```php
return {
    'id': int,
    'cardholder_id': int,
    'card_name': string(255),
    'created_at': timestamp,
    'updated_at': timestamp
}

or

{} - code 422 - invalid card information id
```
---
`localhost/api/cards/remove/{id} POST` *authenticated user*
```php
return true

or 

{} - code 422 - invalid card information id
```
---
`localhost/api/users GET`
```php
return [
    {
        'id': int,
        'profilepicture_id': int or null,
        'email': string(255),
        'display_name': string(255),
        'name': string(255),
        'surname': string(255),
        'phone_number': string(15),
        'user_role': enum('User', 'Admin'),
        'deactivated': boolean,
        'created_at': timestamp,
        'updated_at': timestamp,
        'remember_token': string(255) or null
    },
    other users..
]
```
---
`localhost/api/products/remove/{id} POST` ***authenticated admin***
```php
return true

or 

{} - code 422 - invalid product id
```
---
`localhost/api/cats/remove/{id} POST` ***authenticated admin***
```php
return true

or 

{} - code 422 - invalid cat id
```
---
`localhost/api/cat_breeds/remove/{id} POST` ***authenticated admin***
```php
return true

or 

{} - code 422 - invalid cat breed id
```

### ↓ Routes with JSON required ↓
`localhost/api/register POST`
```php
[
    'profilepicture_id'     => 'nullable|exists:images,id',
    'email'                 => 'required|string|email|max:255|unique:users',
    'password'              => 'required|string|min:8|confirmed',
    'password_confirmation' => 'required|same:password',
    'display_name'          => 'required|string|max:255',
    'name'                  => 'required|string|max:255',
    'surname'               => 'required|string|max:255',
    'phone_number'          => 'nullable|string|max:15',
    'user_role'             => 'nullable|in:User,Admin',
]
```
```php
return {
    'user': {
        'id': int,
        'email': string(255),
        'display_name': string(255),
        'name': string(255),
        'surname': string(255),
        'phone_number': string(15),
        'updated_at': timestamp,
        'created_at': timestamp
    },
    'token': string(255)
}
```
---
`localhost/api/login POST`
```php
[
    'email'    => 'required|string|email|max:255',
    'password' => 'required|string',
]
```
```php
return {
    'user': {
        'id': int,
        'profilepicture_id': int or null,
        'email': string(255),
        'display_name': string(255),
        'name': string(255),
        'surname': string(255),
        'phone_number': string(15),
        'user_role': enum('User', 'Admin'),
        'deactivated': boolean,
        'created_at': timestamp,
        'updated_at': timestamp,
        'remember_token': string(255) or null
    },
    'token': string(255)
}
```
--- 
`localhost/api/basket POST` *authenticated user*
```php
[
    'product_id' => 'required|int|exists:products,id',
    'amount'     => 'required|int',
]
```
```php
return {
    'amount': int,
    'product_type': enum('Unlisted', 'Cat', 'Accessory', 'Food', 'Furniture'),
    'display_name': string(255),
    'description': string(65535),
    'pricing': float,
    'discount_pricing': float or null,
}

or

{} - code 422 - invalid product id
```
---
`localhost/api/cards POST` *authenticated user*
```php
[
    'cardholder_id'   => 'required|exists:users,id',
    'card_number'     => 'required|string|digits:16|unique:card_information,card_number',
    'expiration_date' => 'required|date_format:m/y|after:today',
    'cvc_number'      => 'nullable|string|digits:3',
    'card_name'       => 'required|string|max:255',
];
```
```php
{
    "cardholder_id"   : "required|exists:users,id",
    "card_number"     : "required|string|digits:16|unique:card_information,card_number",
    "expiration_date" : "required|date_format:m/y|after:today",
    "cvc_number"      : "nullable|string|digits:3",
    "card_name"       : "required|string|max:255"
}
```
---
`localhost/api/cards/{id} POST` *authenticated user*
```php
[
    'cardholder_id'   => 'required|exists:users,id',
    'card_number'     => 'required|string|digits:16|unique:card_information,card_number',
    'expiration_date' => 'required|date_format:m/y|after:today',
    'cvc_number'      => 'nullable|string|digits:3',
    'card_name'       => 'required|string|max:255',
];
```
---
`localhost/api/products POST` ***authenticated admin***
```php
[
    'product_type'     => 'required|in:Unlisted,Accessory,Food,Furniture',
    'display_name'     => 'required|string|max:255',
    'description'      => 'required|string',
    'pricing'          => 'required|numeric|min:0',
    'discount_pricing' => 'nullable|numeric|min:0|lt:pricing',
    'stock'            => 'required|integer|min:0',
]
```
---
`localhost/api/products/{id} POST` ***authenticated admin***
```php
[
    'product_type'     => 'required|in:Unlisted,Accessory,Food,Furniture',
    'display_name'     => 'required|string|max:255',
    'description'      => 'required|string',
    'pricing'          => 'required|numeric|min:0',
    'discount_pricing' => 'nullable|numeric|min:0|lt:pricing',
    'stock'            => 'required|integer|min:0',
]
```
---
`localhost/api/cats/{id} POST` ***authenticated admin***
```php
wip
```
---
`localhost/api/cat_breeds/{id} POST` ***authenticated admin***
```php
wip
```