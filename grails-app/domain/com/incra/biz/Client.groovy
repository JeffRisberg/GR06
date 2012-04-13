package com.incra.biz

import com.incra.domain.AbstractDomain

/**
 * Entity holds tenant information, such as Contact Info and Billing Info.
 *
 * The most important field is the sqlDbName, which is assigned at creation time.
 *
 * @author Jeff Risberg
 * @since 12/02/11
 */
class Client extends AbstractDomain {

  String name
  boolean active
  String contactInfo
  String billingInfo

  String sqlDbName

  static constraints = {
    name blank: false
    billingInfo nullable: true
    contactInfo nullable: true
    dateCreated()
    lastUpdated()
  }

  static transients = getTransients_Client();

  static protected def getTransients_Client() {
    def result = [];
    result.addAll(getTransients_AbstractDomain());
    return result;
  }

  @Override
  String toString() {
    StringBuffer sb = new StringBuffer()

    sb.append("Client[name=").append(name)
    sb.append(", active=").append(active)
    sb.append(", sqlDbName=").append(sqlDbName)
    sb.append("]")

    sb.toString()
  }
}
