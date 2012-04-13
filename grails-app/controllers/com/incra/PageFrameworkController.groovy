package com.incra

import com.incra.pageFramework.MenuItem

class PageFrameworkController {

    def index = { []}

    def getMenuItems = {
        println "call to getMenuItem for PageFrameworkController"

        def criteria = MenuItem.createCriteria()
        def query = { }

        List<MenuItem> results = criteria.list(params, query)

        def wrapper = [:]
        wrapper['data'] = results
        println "returning " + wrapper.encodeAsJSON()
        render wrapper.encodeAsJSON()
    }
}
