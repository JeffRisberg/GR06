package com.incra

import com.incra.biz.Product


class ProductController {

    def index = { []}


    def getData = {
        println "call to getData for ProductController"
        params.max = Math.min(params.max ? params.int('max') : 10, 100)

        def criteria = Product.createCriteria()
        def query = { }

        List<Product> results = criteria.list(params, query)

        def wrapper = [:]
        wrapper['data'] = results
        println "returning " + wrapper.encodeAsJSON()
        render wrapper.encodeAsJSON()
    }
}
