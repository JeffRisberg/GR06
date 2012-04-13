package com.incra.biz

import java.util.Date;

/**
 * The <i>AccountType</i> domain class defines a type of organization, such as "Building", "Factory", etc.
 * 
 * @author Jeff Risberg
 * @since 09/30/10
 */
class AccountType {	
	
	String name
	String description
	Date dateCreated
	Date lastUpdated
	
	static constraints = {
		name(unique: true)
		description(nullable: true)
		dateCreated(display: false)
	}
	
	static hasMany = [ accounts : Account ]
	
	String toString() {
		return name
	}
}
