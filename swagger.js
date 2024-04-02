const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Product = require('./models/product.model');

exports.options = {
  "components": {
    "schemas": {
      User: m2s(User),
      Product: m2s(Product)
    }  
  },
  "openapi":"3.1.0",
  "info":{
    "version":"1.0.0",
    "title":"Products CRUD API",
    "description": "Products project aplication",
    "contact":{
      "name":"API Support",
      "url":"http://www.example.com",
      "email":"support@example.com"
    }
  },
  "servers":[
    {
      url:'http://localhost:3000',
      description: 'Local Server'
    },
    {
      url:'htpp://www.example.com',
      description:"Testing server"
    }
  ],
  "tags": [
    {
      "name":"Users",
      "description": "API endpoints for users"
    },
    {
      "name": "Products",
      "description": "API endpoints for products"
    },
    {
      "name": "Users and Products",
      "description": "API endpoints for users and their products"
    }
  ],
  "paths":{
    "/api/users":{
      "get":{
        "tags":["Users"],
        "description": "Return all users",
        "responses":{
          "200": {
            "description":"A list of users",
            "content":{
              "application/json":{
                "schema":{
                  "type":"array",
                  "items":{
                    "$ref":"#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      },
      "post":{
        "tags": ["Users"],
        "description":"Create new user",
        "requestBody":{
          "description":"User schema to insert",
          "content":{
            "application/json":{
              "schema":{
                "type":"object",
                "properties":{
                  "username": {"type":"string"},
                  "password": {"type":"string"},
                  "name": {"type":"string"},
                  "surname": {"type":"string"},
                  "email": {"type":"string"},
                  "address": {
                    "type":"object",
                    "properties":{
                      "area": {"type":"string"},
                      "road": {"type":"string"}
                    }
                  },
                  "phone":{
                    "type":"array",
                    "items":{
                      "type":"object",
                      "properties":{
                        "type": {"type":"string"},
                        "number": {"type":"string"}
                      }
                    }
                  }
                },
                "required":["username", "password","email"]
              }
            }
          }
        },
        "responses":{
          "200":{
            "description": "New user inserted"
          }
        }
      }
    },
    "/api/users/{username}":{
      "get":{
        "tags":["Users"],
        "parameters":[
          {
            "name":"username",
            "in":"path",
            "required":true,
            "description": "Username of user that we want to find",
            "type":"string"
          }
        ],
        "description":"Get user with specific username",
        "responses":{
          "200":{
            "description":"User to find",
            "schema":{
              "$ref":"#/components/schemas/User"
            }
          }
        }
      },
      "patch":{
        "tags":[ "Users" ],
        "description":"Update user in app",
        "parameters":[
          {
            "name":"username",
            "in":"path",
            "required":true,
            "description":"Username of user to update",
            "type":"string"
          },
        ],
        "requestBody":{
          "description": "User that we update",
          "content":{
            "application/json":{
              "schema":{
                "type":"object",
                "properties":{
                  "username": {"type":"string"},
                  "name": {"type":"string"},
                  "surname":{"type":"string"},
                  "email": {"type": "string"},
                  "address": {
                    "type":"object",
                    "properties":{
                      "area": {"type":"string"},
                      "road": {"type":"string"}
                    }
                  },
                  "phone":{
                    "type":"array",
                    "items":{
                      "type":"object",
                      "properties":{
                        "type": {"type":"string"},
                        "number": {"type":"string"}
                      }
                    }
                  }
                },
                "required":["email"]
              }
            }
          }
        },
        "responses":{
          "200": {
            "description": "Update user",
            "schema":{
              "$ref": "#/components/schemas/User"
            }
          }
        }
      },
      "delete":{
        "tags":["Users"],
        "description":"Delete a user",
        "parameters":[
          {
            "name":"username",
            "in":"path",
            "description":"User to delete",
            "type":"string"
          },
        ],
        "responses":{
          "200":{
            "description":"Delete a user"
          }
        }
      }
    },
    "/api/products":{
        "get":{
          "tags":["Products"],
          "description": "Return all products",
          "responses":{
            "200": {
              "description":"A list of products",
              "content":{
                "application/json":{
                  "schema":{
                    "type":"array",
                    "items":{
                      "$ref":"#/components/schemas/Product"
                    }
                  }
                }
              }
            }
          }
        },
        "post":{
          "tags": ["Products"],
          "description":"Create new product",
          "requestBody":{
            "description":"Product schema to insert",
            "content":{
              "application/json":{
                "schema":{
                  "type":"object",
                  "properties":{
                    "product": {"type":"string"},
                    "description": {"type":"string"},
                    "cost": {"type":"number"},
                    "quantity": {"type":"number"}
                  }
                }
              }
            }
          },
          "responses":{
            "200":{
              "description": "New product inserted"
            }
          }
        }
      },
      "/api/products/{product}":{
        "get":{
          "tags":["Products"],
          "parameters":[
            {
              "name":"product",
              "in":"path",
              "required":true,
              "description": "name of product that we want to find",
              "type":"string"
            }
          ],
          "description":"Get product with specific title",
          "responses":{
            "200":{
              "description":"product to find",
              "schema":{
                "$ref":"#/components/schemas/Product"
              }
            }
          }
        },
        "patch":{
          "tags":[ "Products" ],
          "description":"Update product in app",
          "parameters":[
            {
              "name":"product",
              "in":"path",
              "required":true,
              "description":"Name of product to update",
              "type":"string"
            },
          ],
          "requestBody":{
            "description": "product that we update",
            "content":{
              "application/json":{
                "schema":{
                  "type":"object",
                  "properties":{
                    "product": {"type":"string"},
                    "description": {"type":"string"},
                    "cost": {"type":"number"},
                    "quantity": {"type":"number"}
                  }
                }
              }
            }
          },
          "responses":{
            "200": {
              "description": "Update product",
              "schema":{
                "$ref": "#/components/schemas/Product"
              }
            }
          }
        },
        "delete":{
          "tags":["Products"],
          "description":"Delete a product",
          "parameters":[
            {
              "name":"product",
              "in":"path",
              "description":"Product to delete",
              "type":"string"
            },
          ],
          "responses":{
            "200":{
              "description":"Delete a product"
            }
          }
        }
      },
      "/api/user-products":{
        "get":{
          "tags":["Users and Products"],
          "description": "Return all Users products",
          "responses":{
            "200": {
              "description":"A list of all the products of all users",
              "content":{
                "application/json":{
                  "schema":{
                    "type":"array",
                    "items":{
                      "$ref":"#/components/schemas/User"
                    }
                  }
                }
              }
            }
          }
        },
        "post":{
          "tags": ["Users and Products"],
          "description":"Create new product for a user",
          "requestBody":{
            "description":"User schema to insert",
            "content":{
              "application/json":{
                "schema":{
                  "$ref":"#/components/schemas/Product",
                  "properties":{
                    "product": {"type":"string"},
                    "description": {"type":"string"},
                    "cost": {"type":"number"},
                    "quantity": {"type":"number"}
                  }
                }
              }
            }
          },
          "responses":{
            "200":{
              "description": "New product inserted"
            }
          }
        }
      },
      "/api/user-products/{username}":{
        "get":{
          "tags":["Users and Products"],
          "parameters":[
            {
              "name":"username",
              "in":"path",
              "required":true,
              "description": "selected user",
              "type":"string"
            }
          ],
          "description":"Return all User's products",
          "responses":{
            "200":{
              "description":"products to find for the user",
              "schema":{
                "$ref":"#/components/schemas/User"
              }
            }
          }
        },
        "patch":{
          "tags":[ "Users and Products" ],
          "description":"Update product of a user",
          "parameters":[
            {
              "name":"username",
              "in":"path",
              "required":true,
              "description":"username of user to update product",
              "type":"string"
            },
          ],
          "requestBody":{
            "description": "product that we update",
            "content":{
              "application/json":{
                "schema":{
                  "type":"object",
                  "properties":{
                    "product": {"type":"string"},
                    "description": {"type":"string"},
                    "cost": {"type":"number"},
                    "quantity": {"type":"number"}
                  }
                }
              }
            }
          },
          "responses":{
            "200": {
              "description": "Update product",
              "schema":{
                "$ref": "#/components/schemas/User"
              }
            }
          }
        },
        "delete":{
          "tags":["Users and Products"],
          "description":"Delete a product from a user",
          "parameters":[
            {
              "name":"username",
              "in":"path",
              "description":"user to delete product from",
              "type":"string"
            },
          ],
          "responses":{
            "200":{
              "description":"Delete a product"
            }
          }
        }
      }
  }
}