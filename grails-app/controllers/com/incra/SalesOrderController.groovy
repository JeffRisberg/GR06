package com.incra

import com.incra.biz.SalesOrder

/**
 * 
 * @author Jeffrey Risberg
 * @since April 2012
 */
class SalesOrderController {

    def getData = {
        println "call to getData for SalesOrder controller"
        params.max = Math.min(params.max ? params.int('max') : 10, 100)

        def criteria = SalesOrder.createCriteria()
        def query = { }

        List<SalesOrder> results = criteria.list(params, query)

        def wrapper = [:]
        wrapper['data'] = results
        println "returning " + wrapper.encodeAsJSON()
        render wrapper.encodeAsJSON()
    }
}
