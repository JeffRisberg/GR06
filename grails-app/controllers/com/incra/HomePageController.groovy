package com.incra

/**
 * The <i>HomePageController</i> provides methods that provide data for the home page.
 * 
 * @author Jeffrey Risberg
 * @since 04/12/12
 */
class HomePageController {

    def showHeader = {
        // not currently called
        println "called showHeader"
        render template: '/header'
    }
}
