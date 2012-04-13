package com.incra

/**
 * The <i>LogEntryKey</i> entity describes one type of record being logged.
 * 
 * @author Jeffrey Risberg
 * @since 09/28/10
 */
class LogEntryKey {
	
	String label
	String scope
	
	static constraints = {
		label()
		scope(nullable: true)
	}
	
	static transients = { name }
	
	def hasChildren = [logEntry : LogEntry]
	
	void setName(String name) {
	}
	
	String getName() {
		label
	}
	
	String toString() {
		label
	}
}
