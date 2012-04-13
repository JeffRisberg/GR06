package com.incra

import grails.converters.JSON

class CustomerController {

    def index = { []}

    def getData = {
        println "call to getData for CustomerController"

        def result = []

        return result as JSON
    }
}
