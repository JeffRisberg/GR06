package com.incra

import com.incra.pageFramework.MenuItem

/**
 * The <i>PageFrameworkController</i> provides methods that supply data for elements on the app such as 
 * the menus and notification elements.
 * 
 * @author Jeffrey Risberg
 * @since 04/11/12
 */
class PageFrameworkController {

    def index = {
        println "page framework controller"
        []
    }

    def showHeader = {
        println "called showHeader"
        render template: '/header'
    }

    def getMenuItems = {
        println "call to getMenuItems for PageFrameworkController"

        def criteria = MenuItem.createCriteria()
        def query = { }

        List<MenuItem> results = criteria.list(params, query)

        def wrapper = [:]
        wrapper['data'] = results
        println "returning " + wrapper.encodeAsJSON()
        render wrapper.encodeAsJSON()
    }
}
