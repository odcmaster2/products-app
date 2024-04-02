const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Product = require('./models/product.model');
exports.options = {
"components": {
"schemas": {
User: m2s(User),
Product: m2s(Product),
}
},
"openapi": "3.0.1",
"info": {
"version": "1.0.0",
"title": "Products CRUD API",
"description": "Products Project Application API",
"license": {
"name": "MIT",
"url": "https://opensource.org/licenses/MIT"
}
},
"servers": [
    {
    "url": "http://localhost:3000/",
    "description": "Local server"
    },
    {
    "url": "https://api_url_testing",
    "description": "Testing server"
    },
    ],
    "tags": [
    {
    "name": "Users",
    "description": "API for users in the system"
    },
    {
    "name": "Products",
    "description": "API for Products in the system"
    },
    {
    "name": "Users and Products",
    "description": "API for users in the system and their products"
    }
    ],
    "paths":{
        "/api/users": {
        "get": {
        "tags": [
        "Users"
        ],
        "summary": "Get all users in system"
        ,
        "responses": {
        "200": {
        "description": "OK"
        ,
        "schema": {
        "$ref": "#/components/schemas/User"
        }
        }
        }
        }
        },
        "/api/users": {
            "post":{
                "tags": [
                    "Users"
                ],
                "description": "Create new user in system",
                "content":{
                    //"application/x-www-form-urlencoded":{
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "username": { "type": "string" },
                                    "password":  { "type": "string" },
                                    "name":  { "type": "string" },
                                    "surname":  { "type": "string" },
                                    "email":  { "type": "string" },
                                    "address":  {
                                        "type": "object",
                                        "properties": {
                                            "area":  { "type": "string" },
                                            "road":  { "type": "string" },
                                        }, 
                                    },
                                    "phone": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type":  { "type": "string" },
                                                "number":  { "type": "number" }
                                        }
                                    }
                                }
                            },
                            "required": ["username","password","name","surname","email"]
                        },
                    }
                },
            },
            "responses": {
                "200": {
                    "description": "New user is created"
                }
            }
        }
    }
}            
            
        