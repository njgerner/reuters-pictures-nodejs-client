# Reuters Pictures API node.js client 

## Installation

`npm install reuters-pictures-client --save`

## Documentation

Documentation is not yet available.

## API Overview

Every resource is accessed via your `reuters-pictures-client` instance:

```js
const ReutersPictures = require('reuters-pictures-client')({ apiToken: 'your api token' });
// ReutersPictures.{ RESOURCE_NAME }.{ METHOD_NAME }
```

Every resource method returns a promise (bluebird):

```js
ReutersPictures.search.text('Harambe')
.then(result => { ... })
.catch(err => { ... });
```

### Notes

Not notes yet.

---

## Search

| Endpoint | Description |
| ---- | --------------- |
| [GET http://pictures.reuters.com/API/search/v1.0/search] | Perform a text search

## `GET /search?query=Text:Pandas`

Returns an image search.

### Example Request

```js
ReutersPictures.search.text('Pandas')
.then(result => { ... })
.catch(err => { ... });
```

### Example Response

```json
{
    ... coming soon ...
}
```

## `GET /search?query=Keyword:Pandas OR Atlanta`

Returns an image search.

### Example Request

```js
ReutersPictures.search.keyword(['Pandas', 'Atlanta'])
.then(result => { ... })
.catch(err => { ... });
```

### Example Response

```json
{
    ... coming soon ...
}
```

---
