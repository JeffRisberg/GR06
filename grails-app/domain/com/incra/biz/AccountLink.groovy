package com.incra.biz

/**
 * The <i>AccountLink</i> entity provides a parent-child link with an effectivity date range.
 * 
 * @author Jeffrey Risberg
 * @since 09/29/10
 */
class AccountLink {
	Account parent
	Account child
	Date validFromDate
	Date validToDate
	Date dateCreated
	Date lastUpdated
	
	static constraints = { validToDate(nullable:true) }
}
