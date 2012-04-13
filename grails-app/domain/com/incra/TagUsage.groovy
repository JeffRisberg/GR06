package com.incra

import java.util.Date;

/**
 * The <i>TagUsage</i> class is the many-to-many resolver between Tag and the objects which can be 
 * tagged.  It uses the (entityType, entityId) convention to specify the object being tagged, so that
 * we can extend tagging to additional entities with minimum change.
 * 
 * @author Spoorthy Ananthaiah, Jeff Risberg
 * @since 11/22/10
 */
class TagUsage {
	
	EntityType entityType
	long entityId
	Tag tag
	Date dateCreated
	Date lastUpdated
	
	static constraints = {
		entityType()
		entityId()
		tag()
		dateCreated(display: false)
	}
	
	static mapping = { tag lazy:false }
	
	String toString() {
		return tag.name;
	}
}
