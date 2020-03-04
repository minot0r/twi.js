const fs = require('fs')
const Twi = require('./twi')

let OAuthData = JSON.parse(fs.readFileSync('./credentials.json'))
const twi = new Twi(OAuthData.api, OAuthData.api_secret, OAuthData.token, OAuthData.token_secret)

let a = async () => {
    //twi.get('https://api.twitter.com/1.1/statuses/show.json', { id: 1235101463405162496 })
    twi.post('https://api.twitter.com/1.1/statuses/update.json', {status: 'test'})
}
a()