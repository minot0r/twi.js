/**
 * Twitter API main class
 * @author minot0r
 * @since 03-01-20
 */

const axios = require('axios')

const OAuth1Utils = require('./oauth1')

const Twi = class {
    constructor(api, api_secret, token, token_secret) {
        this.credentials = {
            api: api,
            api_secret: api_secret,
            token: token,
            token_secret: token_secret
        }
    }

    async get(url, parameters) {
        let OAuthReq = new OAuth1Utils(
            'GET',
            url,
            parameters,
            this.credentials.api,
            this.credentials.api_secret,
            this.credentials.token,
            this.credentials.token_secret
        ).generate()
        try {
            let res = await axios.get(
                OAuthReq.fullURL,
                {},
                { 
                    headers: {'Authorization': OAuthReq.authorizationHeader} 
                }
            )
            return res
        } catch(e) {
            console.log(e)
        }
    }

    async post(url, parameters) {
        let OAuthReq = new OAuth1Utils(
            'POST',
            url,
            parameters,
            this.credentials.api,
            this.credentials.api_secret,
            this.credentials.token,
            this.credentials.token_secret
        ).generate()
        let res = await axios.post(
            OAuthReq.fullURL,
            {},
            { 
                headers: {'Authorization': OAuthReq.authorizationHeader} 
            }
        )
        console.log(res)
    }
}

module.exports = Twi