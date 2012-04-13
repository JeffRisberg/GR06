package com.incra


import java.util.Date;

import com.incra.security.User;


/**
 * The <i>Comment</i> entity describes one user-specified piece of text attached to a 
 * specified (entityType, entityId) pair.
 * 
 * The Comment entity should probably also have a set of tags.
 * 
 * @author Jeffrey Risberg
 * @since 09/29/10
 */
class Comment {
	
	EntityType entityType
	long entityId
	User user
	String body
	Date dateCreated
	Date lastUpdated
	
	static constraints = {
		entityType()
		entityId()
		user()
		body(blank: false)
		dateCreated(display: false)
	}
	
	static mapping = { sort dateCreated: "desc" }
	
	String toString() {
		"${user.userId}: ${body}"
	}
}
