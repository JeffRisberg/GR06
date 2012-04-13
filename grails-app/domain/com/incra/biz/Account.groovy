package com.incra.biz

import com.incra.domain.AbstractDomain

/**
 * The <i>Account</i> domain class describes one organizational unit.  Each Account has a type
 * and a scale.  Each Account has a name, description, country, and naicsCode.  Each Account can 
 * have associated child AccountLinks.
 * 
 * @author Jeffrey Risberg
 * @since 09/29/10
 */
class Account extends AbstractDomain {
    String name
    String description
    byte[] photo

    static constraints = {
        name(nullable: false)
        type()
        description(maxSize: 500, nullable: true)
        photo(nullable: true, maxSize: 1000000)
        children(display: false)
        dateCreated(display: false)
    }

    static transients = getTransients_Account();

    static protected def getTransients_Account() {
        def result = [];
        result.addAll(getTransients_AbstractDomain());
        return result;
    }

    static belongsTo = [type : AccountType]

    static hasMany = [ children : AccountLink ]

    static mappedBy = [ children: 'parent' ]

    String toString() {
        "${name}"
    }
}
