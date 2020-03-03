/**
 * Twitter endpoints wrapper
 * @author minot0r
 * @since 03-01-20
 */

const Req = class {
    constructor(method, endpoint, param) {
        this.method = method
        this.endpoint = endpoint
        this.param = param
    }
}

module.exports = Req