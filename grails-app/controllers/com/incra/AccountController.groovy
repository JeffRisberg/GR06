package com.incra

import com.incra.biz.Account

import grails.converters.JSON

class AccountController {

    def index = { []}

    def getData = {
        println "call to getData for AccountController"
        params.max = Math.min(params.max ? params.int('max') : 10, 100)

        def criteria = Account.createCriteria()
        def query = { }

        List<Account> results = criteria.list(params, query)

        return results as JSON
    }
}
