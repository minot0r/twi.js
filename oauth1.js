/**
 * Utils for creating OAuth 1.0 requests
 * @author minot0r
 * @since 02-20-20
 */

const base64 = require('crypto-js/enc-base64')
const hmacsha1 = require('crypto-js/hmac-sha1')
const RFC3986 = require('./encode')

const OAuth1Utils = class {
    constructor(httpMethod, url, parameters, api, api_secret, token, token_secret) {
        this._enc_key = RFC3986.encode(api_secret) + '&' + RFC3986.encode(token_secret)
        
        this._parameters = {...parameters, ...{
            oauth_consumer_key: api,
            oauth_nonce: require('crypto').randomBytes(16).toString('hex'),
            oauth_signature_method: 'HMAC-SHA1',
            oauth_timestamp: ~~(new Date().getTime() / 1000),
            oauth_token: token,
            oauth_version: '1.0'
        }}

        this._httpMethod = httpMethod
        this._url = url

        return this
    }

    generate() {
        return {
            method: this._httpMethod,
            url: this._url,
            parameters: this._notOAuthParams(),
            fullURL: this._url + this._notOAuthParams(),
            allParameters: this._parameters,
            authorizationHeader: this._craftHeader(),
            signature: this._generateSignature(),
            normalizedURI: this._normalizedURI(),
            normalizedParameters: this._normalizedParameters() 
        }
    }

    _craftHeader() {
        let header = "OAuth "
        let allParams = {...{'oauth_signature': this._generateSignature()}, ...this._parameters}
        for(let key of Object.keys(allParams).sort()) {
            if(!key.startsWith('oauth_')) continue
            let value = allParams[key]
            header += key + "=\"" + RFC3986.encode(value) + "\", "
        }
        return header.slice(0, -2)
    }

    _generateSignature() {
        return hmacsha1(this._normalizedURI(), this._enc_key).toString(base64)
    }

    _normalizedParameters() {
        let normalizedParameters = ''
        for(let key of Object.keys(this._parameters).sort()) {
            let value = this._parameters[key]
            normalizedParameters += '&' + RFC3986.encode(key) + "=" + RFC3986.encode(value)
        }
        return RFC3986.encode(normalizedParameters.substring(1))
    }

    _notOAuthParams() {
        let params = "?"
        for(let key of Object.keys(this._parameters).sort()) {
            if(key.startsWith('oauth_')) continue
            let value = this._parameters[key]
            params += key + "=" + RFC3986.encode(value) + "&"
        }
        
        return params.slice(0, -1)
    }

    _normalizedURL() {
        return RFC3986.encode(this._url.split('?')[0])
    }

    _normalizedURI() {
        return this._httpMethod.toUpperCase() +
            '&' + this._normalizedURL() +
            '&' + this._normalizedParameters()
    }
}

module.exports = OAuth1Utils