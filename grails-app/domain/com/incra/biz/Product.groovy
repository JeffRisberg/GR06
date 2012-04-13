package com.incra.biz

import com.incra.domain.AbstractDomain

/**
 * The <i>Product</i> class...
 *
 * @author Jeffrey Risberg
 * @since 11/25/10
 */
class Product extends AbstractDomain {

  String name
  String description
  int partNo
  double price
  Date dateCreated
  Date lastUpdated

  static constraints = {
    productType()
    name(blank: false, unique: true)
    description(nullable: true)
    partNo(nullable: true)
    price()
    dateCreated()
  }

  static belongsTo = [ productType : ProductType ]

  static transients = getTransients_Product()

  static protected def getTransients_Product() {
    def result = []
    result.addAll(getTransients_AbstractDomain())
    return result
  }

  String toString() {
    name
  }
}
