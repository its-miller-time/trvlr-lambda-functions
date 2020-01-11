'use strict';

const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()
const connectorMongodb = mongoose.connect(process.env.uri);
// const userSchema = require('../api/schemas/userSchema.js')

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
  }, 
  password: {
      type: String,
      required: true
  }
})

const User = mongoose.model('User',userSchema, 'User');

module.exports.hello = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
   connectorMongodb
    .then(()=>{
    User.findOne()
    .then(user => callback(null,{
      statusCode:200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(user)
    }))
    .catch(err => console.log(err))
    })
  };

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: 'Welcome to Tvlr boys',
  //       input: event.message,
  //     },
  //     null,
  //     2
  //   ),
  // };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
  // };
