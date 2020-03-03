/**
 * Twitter API main class
 * @author minot0r
 * @since 03-01-20
 */

const axios = require('axios')

const Req = require('./req')
const RFC3986 = require('./encode')
const OAuth1Utils = require('./oauth1')

const endpoints = {
    statuses: {
        update: new Req('POST', 'https://api.twitter.com/1.1/statuses/update.json', false),
        destroy: new Req('POST', 'https://api.twitter.com/1.1/statuses/destroy/%s.json', true),
        show: new Req('GET', 'https://api.twitter.com/1.1/statuses/show.json', false),

    }
}

const Twi = class {
    constructor(api, api_secret, token, token_secret) {
        this.credentials = {
            api: api,
            api_secret: api_secret,
            token: token,
            token_secret: token_secret
        }
    }

    async sendTweet(text) {
        let OAuthReq = new OAuth1Utils(endpoints.statuses.update.method,
            endpoints.statuses.update.endpoint, 
            { status: text },
            this.credentials.api,
            this.credentials.api_secret,
            this.credentials.token,
            this.credentials.token_secret
        ).generate()
        let res = await axios.post(OAuthReq.fullURL, {}, { headers: {'Authorization': OAuthReq.authorizationHeader} })
        return res.data
    }
}

module.exports = Twi