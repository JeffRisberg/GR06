package com.incra

import java.util.Date;

/**
 * The <i>Tag</i> class defines one unique tag, which is located in a pool.  See the <i>tagUsage</i> class
 * for how tags are linked to business entities.
 * 
 * @author Spoorthy Ananthaiah
 * @since 11/22/10
 */
class Tag {
	
	String name
	Date dateCreated
	Date lastUpdated
	
	static constraints = {
		name(unique: true)
		dateCreated(display: false)
	}
	
	String toString() {
		name;
	}
	
	boolean equals(Object o) {
		Tag tag = (Tag) o;
		
		return !(name != null ? !name.equals(tag.name) : tag.name != null);
	}
}
