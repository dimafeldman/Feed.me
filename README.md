# FeedMe
Discover last-minute deals on quality restaurant food before it gets thrown out.

### Run the App

##### Prerequisites

1. Git
2. Node.js v4.2.2+
3. Visual Studio Code

##### Instructions

Run the following commands in the root directory of this project:

```
npm install
npm start
```

Go to <a href="http://localhost:3000/" target="_blank">http://localhost:3000/</a> to view the app.

### API Endpoints

A list of all Node.js API endpoints.

#### GET /deals

##### Response

```
{
  "deals": [
    {
      "_id": "564dedca8946b04417127d07",
      "description": "A really tasty hamburger for half the price.",
      "discount": "50%",
      "image": "https://example.com/image.jpg",
      "created": "2015-11-19T15:42:02.152Z",
      "price": "100₪",
      "quantity": 25,
      "interested": 10,
      "title": "220g Hamburger",
      "address": "2 Baruc St, Tel Aviv, Israel",
      "location": [
        32.072176,
        34.808871
      ]
    }
  ]
}
```

#### GET /deals/:id

##### Response

```
{
  "deal": 
  {
    "_id": "564dedca8946b04417127d07",
    "description": "A really tasty hamburger for half the price.",
    "discount": "50%",
    "image": "https://example.com/image.jpg",
    "created": "2015-11-19T15:42:02.152Z",
    "price": "100₪",
    "quantity": 25,
    "interested": 10,
    "title": "220g Hamburger",
    "address": "2 Baruc St, Tel Aviv, Israel",
    "location": [
        32.072176,
        34.808871
      ]
  }
}
```


#### DELETE /deals/:id

##### Response

```
{
  "success": true
}
```

#### GET /deals/:id/interested

##### Response

```
{
  "success": true
}
```

#### POST /deals/nearby

##### Request

```
{
    "location":
    {
        "lat": 34.3984,
        "lng": 36.34198,
    },
    "radius": 10 // km
}
```

##### Response

```
{
  "deals": [
    {
      "_id": "564dedca8946b04417127d07",
      "description": "A really tasty hamburger for half the price.",
      "discount": "50%",
      "image": "https://example.com/image.jpg",
      "created": "2015-11-19T15:42:02.152Z",
      "price": "100₪",
      "quantity": 25,
      "interested": 10,
      "title": "220g Hamburger",
      "address": "2 Baruc St, Tel Aviv, Israel",
      "location": [
        32.072176,
        34.808871
      ]
    }
  ]
}
```


#### POST /deals/search

##### Request

```
{
    "location":
    {
        "lat": 34.3984,
        "lng": 36.34198,
    },
    "query": "Hamburger"
}
```

##### Response

```
{
  "deals": [
    {
      "_id": "564dedca8946b04417127d07",
      "description": "A really tasty hamburger for half the price.",
      "discount": "50%",
      "image": "https://example.com/image.jpg",
      "created": "2015-11-19T15:42:02.152Z",
      "price": "100₪",
      "quantity": 25,
      "interested": 10,
      "title": "220g Hamburger",
      "address": "2 Baruc St, Tel Aviv, Israel",
      "location": [
        32.072176,
        34.808871
      ]
    }
  ]
}
```

#### PUT /deals

##### Request

```
{
    "title": "220g Hamburger",
    "description": "A really tasty hamburger for half the price.",
    "discount": "50%",
    "price": "100₪",
    "quantity": 25,
    "image": "https://example.com/image.jpg",
    "address": "2 Baruc St, Tel Aviv, Israel"
}
```

##### Response

```
{
    "success": true
}
```

### Future Endpoints

1. Login/Register?
2. Interested in Deals
