package com.incra

import org.hsqldb.User

import grails.converters.JSON

class CustomerController {

    def index = { []}

    def getData = {
        println "call to getData for CustomerController"
        params.max = Math.min(params.max ? params.int('max') : 10, 100)

        def criteria = Customer.createCriteria()
        def query = { }

        List<User> results = criteria.list(params, query)

        return results as JSON
    }
}
