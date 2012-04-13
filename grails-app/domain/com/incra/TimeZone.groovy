package com.incra

/**
 * The <i>TimeZone</i> entity...
 * 
 * @author Jeffrey Risberg
 * @since 10/02/10
 */
class TimeZone {
	
	String name
	int relativeUTC = 0
	Date dateCreated
	Date lastUpdated
	
	static constraints = {
		name(unique: true) 
		dateCreated(display: false)
	}
}
