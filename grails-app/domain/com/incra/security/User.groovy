package com.incra.security

import java.util.TimeZone

import com.incra.biz.Client
import com.incra.domain.AbstractDomain

/**
 * Created by the Spring Security Plugin
 *
 * @author Jeffrey Risberg
 * @since 03/12/11
 */
class User extends AbstractDomain {

    transient springSecurityService

    String username
    String password
    String email
    boolean enabled
    boolean accountExpired
    boolean accountLocked
    boolean passwordExpired
    Client client
    String timeZoneKey
    Date lastLoggedIn
    Integer loginCount

    static constraints = {
        username(blank: false, unique: true)
        password(blank: false)
        email(nullable:true)
        client(nullable: true)
        timeZoneKey(nullable:true)
        lastLoggedIn(nullable:true)
        loginCount(nullable:true)
        dateCreated()
        lastUpdated()
    }

    static transients = getTransients_User();

    static protected def getTransients_User() {
        def result = ['timeZone']
        result.addAll(getTransients_AbstractDomain());
        return result;
    }

    static mapping = { password column: '`password`' }

    TimeZone getTimeZone() {
        if (timeZoneKey != null) {
            return TimeZone.getTimeZone(timeZoneKey)
        }
        return TimeZone.getTimeZone("JST")
    }

    String toString() {
        StringBuffer sb = new StringBuffer()

        sb.append("User[username=").append(username)
        if (client) {
            sb.append(", client=").append(client.name)
        }
        sb.append(", timeZoneKey=").append(timeZoneKey)
        sb.append("]")
        sb.toString()
    }
}
