package com.incra.biz

import java.util.Date

import com.incra.domain.AbstractDomain

/**
 * The <i>ProductType</i> class...
 *
 * @author Jeffrey Risberg
 * @since 11/25/10
 */
class ProductType extends AbstractDomain {

  String name
  String description

  static constraints = {
    name(blank: false, unique: true)
    description(nullable: true)
    dateCreated()
  }

  static hasMany = { products: Product }

  static transients = getTransients_ProductType()

  static protected def getTransients_ProductType() {
    def result = []
    result.addAll(getTransients_AbstractDomain())
    return result
  }

  String toString() {
    name
  }
}
