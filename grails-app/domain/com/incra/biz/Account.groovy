package com.incra.biz

import com.incra.domain.AbstractDomain

/**
 * Located in client-specific datasource
 * 
 * @author Jeffrey Risberg
 * @since 12/01/11
 */
class Account extends AbstractDomain {

  String name
  String status

  static constraints = {
    name blank: false
    status nullable: true
    dateCreated()
    lastUpdated()
  }
}
