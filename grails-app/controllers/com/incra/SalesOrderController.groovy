package com.incra

import grails.converters.JSON

class SalesOrderController {

    def index = { []}


    def getData = {
        println "call to getData for SalesOrder controller"

        def result = []

        return result as JSON
    }
}
