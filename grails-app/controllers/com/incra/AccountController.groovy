package com.incra

import com.incra.biz.Account


class AccountController {

    def index = { []}

    def getData = {
        println "call to getData for AccountController"
        params.max = Math.min(params.max ? params.int('max') : 10, 100)

        def criteria = Account.createCriteria()
        def query = { }

        List<Account> results = criteria.list(params, query)

        def wrapper = [:]
        wrapper['data'] = results
        println "returning " + wrapper.encodeAsJSON()
        render wrapper.encodeAsJSON()
    }
}
