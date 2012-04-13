package com.incra


class HomeController {

    def index = { []}

    def showHeader = {
        println "called showHeader"
        render template: '/header'
    }
}
