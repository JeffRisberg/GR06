package com.incra

import java.util.Date

/**
 * The <i>TimeSeriesValue</i> entity describes one point in the time-series data
 * attached to a specified (entityType, id) pair.  Each point has a Resource
 * and a value.  There is no UOM field in this class, because the amount is 
 * assumed to be in the standard UOM for the Resource.
 * 
 * @author Jeffrey Risberg
 * @since 10/15/10
 */
class TimeSeriesValue {

	EntityType entityType
	long entityId
	TimeSegment timeSegment
	double value
	Date dateCreated
	Date lastUpdated

	static constraints = {
		entityType()
		entityId()
		timeSegment()
		value()
		dateCreated(display: false)
	}

	static mapping = { sort timeSegment: "asc" }

	String toString() {
		timeSegment.label + "/" + resource.name + "/" + value
	}
}
