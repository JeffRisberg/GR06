package com.incra.domain;

import java.util.Date

/**
 * The <i>AbstractDomain</i> class is a common superclass of all domain classes.
 * 
 * @author Jeffrey Risberg
 * @since 04/07/11
 */
public abstract class AbstractDomain {
  Date dateCreated
  Date lastUpdated

  public AbstractDomain() {
  }

  static transients = getTransients_AbstractDomain();

  static protected def getTransients_AbstractDomain() {
    return ['kind'];
  }

  public String getKind() {
    String longName = this.class.getName();
    int dot = longName.lastIndexOf(".");
    if (dot > 0) {
      return longName.substring(dot+1, longName.length());
    } else {
      return longName;
    }
  }

  protected String getMyClass() {
    return (String) this.class;
  }
}
