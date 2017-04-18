# Reuters Pictures API node.js client 

## Installation

`npm install reuters-pictures-client --save`

## Overview

See [Reuters documentation](Reuters_Pictures_API.pdf) for full API details.  This client provides limited functionality at the moment.
 
#### Restrictions:

1. Only GET requests are supported so URL length is limited to 280 characters per Reuters documentation.  If you provide too many options to the search API you'll therefore hit an error. In the future we may add support for the POST API to prevent this error pending user demand.
2. Boolean logic in the query parameter is limited to individual fields e.g., keyword:Nelson AND Mandela

## Basic usage

```JavaScript
const reutersSearchService = require('reuters-pictures-client').getSearchService('username', 'password');

searchService.search({
    query: { text: 'snowy mountain' }
})
.then(results => console.log('Got the results! Do something'))
.catch(err => console.log('Oh no, failed for some reason'))
```

The username and password should be provided with your Reuters account.

## Auth usage - if you need the api token for something else

```JavaScript
const reutersAuthService = require('reuters-pictures-client').getAuthService('username', 'password');

reutersAuthService.getApiToken()
.then(apiToken => console.log('Got the token! Do something'))
.catch(err => console.log('Oh no, failed for some reason'))
```

The username and password should be provided with your Reuters account.

## ReutersPicturesSearchService.search(options) Documentation

**Options**
----
* **query** - Object that can include the following parameters (all optional)
    
    * **text** - all words provided must be matched
    
    * **keyword** - individual keyword to search
    
    * **mediaType** - comma delimited list with options including Image, Album, and Graphic.  Defaults to Image if not provided
    
    * **artist** - object, both firstName and lastName must be provided if artist is provided
    
        * **firstName**
        
        * **lastName**
    
    * **orientation** - Landscape, Portrait, or Square
    
    * **mediaNumber** - for images/graphics, the Image ID (e.g., GM1E42P0T7601)
    
* **fields** - Comma-delimited list of fields to include.  Defaults to MediaNumber if not provided.  See the [Reuters documentation](Reuters_Pictures_API.pdf) for full list of fields in section 2.3.4.
    
* **pageNumber** - defaults to 1

* **countPerPage** - defaults to 100

* **sort** - Ranking, Newest, or Oldest. Defaults to Ranking.

Example search query using most of the parameters:

```JavaScript
searchService.search({
    query: {
        text: 'snowy mountain',
        keyword: 'mountain',
        mediaType: 'Image',
        artist: {
            firstName: 'John',
            lastName: 'Doe'
        },
        orientation: 'Landscape'
    },
    fields: 'MediaNumber',
    pageNumber: 2,
    sort: 'Newest'
})
.then(results => results)
...
```

**Return Object**
----
* **totalCount** - total number of records matching the query
* **queryDurationMs** - duration of search query
* **records** - Array of search results where each result is an object that has fields as properties. Note, properties start with lowercase letter, except for the path_XXX objects which have URI/Width/Height properites.

Example:

```JavaScript
{
  totalCount: 12768,
  queryDurationMs: 71,
  records: [
    {
      title: "CHILE-VOLCANO\/",
      mediaNumber: "GF10000091170",
      path_TR3: {
        URI: "http:\/\/cdn.pictures.reuters.com\/Doc\/RTR\/Media\/TR3\/9\/b\/f\/c\/RTX1CGG8.jpg",
        Width: 728,
        Height: 485
      },
      captionShort: "The Villarrica Volcano is seen at night in Pucon town"
    },
    {
      title: "MIDEAST-CRISIS\/SYRIA",
      mediaNumber: "GF10000085996",
      path_TR3: {
        URI: "http:\/\/cdn.pictures.reuters.com\/Doc\/RTR\/Media\/TR3\/b\/7\/0\/8\/RTX1BTUZ.jpg",
        Width: 728,
        Height: 490
      },
      captionShort: "Children react after what activists said was shelling by forces loyal to Syria's President Assad near the Syrian Arab Red Crescent center in the Douma neighborhood of Damascus"
    },
    ...
  ]
}
```

## Setting up and running tests

If you'd like to set up tests locally, make sure to create a file in test/credentials called credentials.json.  It should contain very simple JSON with username/password for your Reuters account:

```JSON
{
  "username": "YOUR_USERNAME",
  "password": "YOUR_PASSWORD"
}
```

Running tests is as simple as

```
npm test
```