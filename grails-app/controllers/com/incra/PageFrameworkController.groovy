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
        println "call to page framework controller index"
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

    def getCategoryData = {
        println "call to getCategoryData for PageFrameworkController"

        List results = []
        Map category

        category = [id: 1, name: "Alpha"]
        results.add(category)
        category = [id: 2, name: "Beta"]
        results.add(category)
        category = [id: 3, name: "Gamma"]
        results.add(category)
        category = [id: 4, name: "Delta"]
        results.add(category)

        def wrapper = [:]
        wrapper['data'] = results
        println "returning " + wrapper.encodeAsJSON()
        render wrapper.encodeAsJSON()
    }
}
