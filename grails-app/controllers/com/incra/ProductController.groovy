package com.incra

import com.incra.biz.Product

import grails.converters.JSON

class ProductController {

    def index = { []}


    def getData = {
        println "call to getData for ProductController"
        params.max = Math.min(params.max ? params.int('max') : 10, 100)

        def criteria = Product.createCriteria()
        def query = { }

        List<Product> results = criteria.list(params, query)

        return results as JSON
    }
}
