package com.incra.security

/**
 * Created by the Spring Security Plugin
 *
 * @author Jeffrey Risberg
 * @since 03/12/11
 */
class Role {

  String authority

  static mapping = { cache true }

  static constraints = {
    authority blank: false, unique: true
  }
}
