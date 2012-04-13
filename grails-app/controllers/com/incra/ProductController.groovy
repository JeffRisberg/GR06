package com.incra

import grails.converters.JSON

class ProductController {

    def index = { []}


    def getData = {
        println "call to getData for ProductController"

        def result = []

        return result as JSON
    }
}
