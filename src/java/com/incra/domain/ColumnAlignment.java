package com.incra.domain;

/**
 * The <i>Alignment</i> enumeration is used in the columnDescriptor dto.
 * 
 * @author Jeff Risberg
 * @since 12/07/10
 */
public enum ColumnAlignment {
	/* 0 */Left("left"),
	/* 1 */Center("center"),
	/* 2 */Right("right");

	private String name;

	private ColumnAlignment(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}
}
