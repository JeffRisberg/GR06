package com.incra.biz

import java.util.Date

import com.incra.domain.AbstractDomain

/**
 * The <i>OrderDetail</i> class...
 * 
 * @author Jeffrey Risberg
 * @since 11/25/10
 */
class OrderDetail extends AbstractDomain {

  Product product
  String status
  double price
  int quantity

  static constraints = {
    product()
    status()
    price(nullable: true)
    quantity()
    dateCreated()
  }

  static belongsTo = [ order : Order ]

  static transients = getTransients_OrderDetail()

  static protected def getTransients_OrderDetail() {
    def result = []
    result.addAll(getTransients_AbstractDomain())
    return result
  }

  String toString() {
    quantity + " of " + product.name
  }
}
