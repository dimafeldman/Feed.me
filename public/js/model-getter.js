
var useMocks = true;

exports.get_default_deal = function()
{ 
  return {'seller': 'PizzaHutCorp.',
                   'title': 'Pizza', 
                   'image': '../img/pizza.jpg',
                   'description': 'Very tasty pizza with random toppings',
                   'price': '3$',
                   'address': 'Tel Aviv, Namir 20',
                   'quantity': '20',                                                                                               
                   'when' : '23:00'};
}


exports.add_deal = function(http, deal, successCallback, errorCallback)
{ 
  if( ! useMocks)
  {
    http.put('/deals', deal)
          .success(successCallback)
          .error(errorCallback);
  }
  else
  {
    successCallback();
  }
}

exports.get_deals = function(http, successCallback)
{ 
  if( useMocks )
  {
    successCallback({"deals" : deal_mocks});
  }
  else
  {
    http.get('/deals')
          .success(successCallback);
  }
}

exports.delete_deal = function(http, deal, successCallback)
{ 
  if( !useMocks )
  {
    http.delete('/deals/' + deal._id)
          .success(successCallback);
  }
  else
  {
    successCallback();
  }     
}

exports.search = function(http, query, successCallback)
{ 
  if( !useMocks )
  {
    http.post('/deals/search', query).success(successCallback);
  }
  else
  {
    successCallback({"deals" : search_mocks});
  }     
}

var deal_mocks = [
      {
        "_id": "564e6ea8d5649518139aeb06",
        "created": "2015-11-20T00:51:52.132Z",
        "description": "Awesome, juicy hamburger, incredibly cheap",
        "quantity": 20,
        "address": "Ram 8 Tel Aviv",
        "image": "http://www.trbimg.com/img-55f0b26d/turbine/ct-timothy-otooles-offers-hamburger-hop-menu-2-001/650/650x366",
        "price": "35₪",
        "seller": "PizzaHutCorp.",
        "when": "2015-11-20T21:00:52.129Z",
        "title": "Hamburger",
        "location": [
          32.06812900000001,
          34.7892136
        ],
        "interested": 0,
        "__v": 0
      },
      {
        "_id": "564e6faad5649518139aeb07",
        "created": "2015-11-20T00:56:10.332Z",
        "description": "Delicious apple strudel for a crazy cheap price!",
        "quantity": 20,
        "address": "Derech Menachem Begin 23 Tel Aviv Yafo",
        "image": "http://www.theberghoff.com/wp-content/uploads/2013/04/Apple-Strudel.jpg",
        "price": "10₪",
        "seller": "PizzaHutCorp.",
        "when": "2015-11-20T21:00:10.329Z",
        "title": "Apple Strudel",
        "location": [
          32.068719,
          34.786771
        ],
        "interested": 0,
        "__v": 0
      },
      {
        "_id": "564e7054d5649518139aeb08",
        "created": "2015-11-20T00:59:00.819Z",
        "description": "Crispy falafel will make you go crazy!",
        "quantity": 20,
        "address": "Beit Alfa St 2-4 Tel Aviv",
        "image": "https://i.ytimg.com/vi/foB6bxhZYF0/maxresdefault.jpg",
        "price": "8₪",
        "seller": "PizzaHutCorp.",
        "discount" : "70%", 
        "when": "2015-11-20T21:00:00.816Z",
        "title": "Falalel",
        "location": [
          32.0657471,
          34.7876113
        ],
        "interested": 0,
        "__v": 0
      },
      {
        "_id": "564e7dde882f6c741e88f034",
        "created": "2015-11-20T01:56:46.449Z",
        "description": "Get it while it's still fresh!",
        "quantity": 20,
        "address": "2 Tushiya St, Tel Aviv Yafo",
        "image": "../img/pizza.jpg",
        "price": "Free",
        "seller": "PizzaHutCorp.",
        "when": "23:30 - 24:00",
        "title": "Leftover Pizza from Geekim",
        "location": [
          32.066790, 34.788103
        ],
        "interested": 0,
        "__v": 0
      }
    ];
    
var search_results_filter = function (deal)
                            {
                              return deal.title.indexOf('Pizza') > -1 || deal.title.indexOf('Fal') > -1;
                            }
var search_mocks = deal_mocks.filter(search_results_filter);