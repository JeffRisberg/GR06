package com.incra

import com.incra.biz.Product


/**
 * 
 * @author Jeffrey Risberg
 * @since April 2012
 */
class ProductController {

    def getData = {
        println "call to getData for ProductController"
        params.max = Math.min(params.max ? params.int('max') : 10, 100)

        def criteria = Product.createCriteria()
        def query = { }

        List<Product> productList = criteria.list(params, query)

        def products = []
        productList.each { Product product ->
            Map map = [:]

            map['id'] = product.id
            map['name'] = product.name
            map['description'] = product.description
            map['price'] = product.price
            map['type'] = product.productType.name
            products.add(map)
        }

        def wrapper = [:]
        wrapper['data'] = products
        println "returning " + wrapper.encodeAsJSON()
        render wrapper.encodeAsJSON()
    }
}
