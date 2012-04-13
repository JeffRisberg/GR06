package com.incra


/**
 * The <i>EntityType</i> entity is the main control record for a class of entities, and contains several
 * flags that are used to drive common code in the controllers and views.
 * 
 * @author Jeffrey Risberg
 * @since 10/02/10
 */
class EntityType {
	
	String name
	String plural
	boolean hasOwnership // it will have user field
	boolean hasGeography // it will have address field
	boolean supportsComments // comments can link to this
	boolean supportsTags // tags can link to this
	boolean inScenario = false; // true if this object is part of a scenario
	Date dateCreated
	Date lastUpdated
	
	static constraints = {
		name(unique : true) 
		plural()
		hasOwnership()
		hasGeography()
		supportsComments()
		supportsTags()
		inScenario()
		dateCreated(display: false)
	}
	
	String toString() {
		"[EntityType: " + name + "]"
	}
}
