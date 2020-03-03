const fs = require('fs')
const Twi = require('./twi')

let OAuthData = JSON.parse(fs.readFileSync('./credentials.json'))
const twi = new Twi(OAuthData.api, OAuthData.api_secret, OAuthData.token, OAuthData.token_secret)