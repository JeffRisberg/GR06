package com.incra.biz

import java.util.Date

import com.incra.domain.AbstractDomain

/**
 * The <i>SalesOrder</i> class...
 * 
 * @author Jeffrey Risberg
 * @since 11/25/10
 */
class SalesOrder extends AbstractDomain {

    Date datePlaced
    Date dateDue
    double value;

    static constraints = {
        datePlaced()
        dateDue()
        value(nullable: true)
        dateCreated()
    }

    static hasMany = { salesOrderDetails : SalesOrderDetail }

    static mapping = { table 'SALES_ORDER' }

    static transients = getTransients_Order()

    static protected def getTransients_Order() {
        def result = []
        result.addAll(getTransients_AbstractDomain())
        return result
    }
}
