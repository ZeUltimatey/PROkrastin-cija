```angular2html
localhost/
└── localhost/api/
    ├── localhost/api/register POST (adding a new user)
    ├── localhost/api/login POST (authentificating an existing user)
    ├── localhost/api/basket/{id} GET (getting the contents of a users basket)
    ├── localhost/api/basket/{id} POST (selecting/deselecting a product)
    ├── localhost/api/products/
    │   ├── localhost/api/products GET (getting all products)
    │   ├── localhost/api/products/{id} GET (getting the specfified product)
    │   ├── localhost/api/products/{id} POST (updating the specified product)
    │   └── localhost/api/products/remove/
    │       └── localhost/api/products/remove/{id} POST (deleting the specified product)
    ├── localhost/api/cats/
    │   ├── localhost/api/cats GET (getting all cats)
    │   ├── localhost/api/cats/{id} GET (getting the specfified cat)
    │   ├── localhost/api/cats/{id} POST (updating the specified cat)
    │   └── localhost/api/cats/remove/
    │       └── localhost/api/cats/remove/{id} POST (deleting the specified cat)
    ├── localhost/api/cat_breeds/
    │   ├── localhost/api/cat_breeds GET (getting all cat breeds)
    │   ├── localhost/api/cat_breeds/{id} GET (getting the specfified cat breed)
    │   ├── localhost/api/cat_breeds/{id} POST (updating the specified cat breed)
    │   └── localhost/api/cat_breeds/remove/
    │       └── localhost/api/cat_breeds/remove/{id} POST (deleting the specified cat breed)
    └── localhost/api/cards/
        ├── localhost/api/cards GET (getting all card information)
        ├── localhost/api/cards/{id} GET (getting specific card information)
        ├── localhost/api/cards/{id} POST (updating specific card information)
        └── localhost/api/cards/remove/
            └── localhost/api/cards/remove/{id} POST (deleting specific card information)
```

### No JSON required
`localhost/api/basket/{id} GET` \
`localhost/api/products/{id} GET` \
`localhost/api/products/remove/{id} POST` \
`localhost/api/cats GET` \
`localhost/api/cats/{id} GET` \
`localhost/api/cats/remove/{id} POST` \
`localhost/api/cat_breeds GET` \
`localhost/api/cat_breeds/{id} GET` \
`localhost/api/cat_breeds/remove/{id} POST` \
`localhost/api/cards GET` \
`localhost/api/cards/{id} GET` \
`localhost/api/cards/remove/{id} POST` 

### JSON required
`localhost/api/register POST`
```
[
    'profilepicture_id'     => 'nullable|exists:images,image_id',
    'email'                 => 'required|string|email|max:255|unique:users',
    'password'              => 'required|string|min:8|confirmed',
    'password_confirmation' => 'required|same:password',
    'display_name'          => 'required|string|max:255',
    'name'                  => 'required|string|max:255',
    'surname'               => 'required|string|max:255',
    'phone_number'          => 'nullable|string|max:15',
    'user_role'             => 'nullable|in:User,Admin,
]
```
---
`localhost/api/login POST`
```
[
    'email'    => 'required|string|email|max:255',
    'password' => 'required|string',
]
```
--- 
`localhost/api/basket/{id} POST`
```
[
    'product_id' => 'required|int|exists:products,id',
    'amount'     => 'required|int',
]
```
---
`localhost/api/products POST`
```
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
`localhost/api/products/{id} POST`
```
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
`localhost/api/cats/{id} POST`
```
--
```
---
`localhost/api/cat_breeds/{id} POST`
```
--
```
---
`localhost/api/cards POST`
```
[
    'product_type'     => 'required|in:Unlisted,Cat,Accessory,Food,Furniture',
    'display_name'     => 'required|string|max:255',
    'description'      => 'required|string',
    'pricing'          => 'required|numeric|min:0',
    'discount_pricing' => 'nullable|numeric|min:0|lt:pricing',
    'stock'            => 'required|integer|min:0',
]
```
---
`localhost/api/cards/{id} POST`
```
[
    'product_type'     => 'required|in:Unlisted,Cat,Accessory,Food,Furniture',
    'display_name'     => 'required|string|max:255',
    'description'      => 'required|string',
    'pricing'          => 'required|numeric|min:0',
    'discount_pricing' => 'nullable|numeric|min:0|lt:pricing',
    'stock'            => 'required|integer|min:0',
]
```
