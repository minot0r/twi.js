/**
 * Utils for encoding
 * @author minot0r
 * @since 02-20-20
 */

const utf8 = require('crypto-js/enc-utf8')

const RFC3986 = class {
    static encode(text) {
        if(!text) return ''
        return encodeURIComponent(text)
            .replace(/[!'()]/g, escape)
            .replace(/\*/g, '%2A')
            .toString(utf8)
    }
}

module.exports = RFC3986