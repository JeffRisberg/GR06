package com.incra.domain;

/**
 * The <i>ColumnAlignment</i> enumeration is used in the ColumnDescriptor dto.
 * 
 * @author Jeff Risberg
 * @since 02/01/12
 */
public enum ColumnAlignment {
    /* 0 */left("Left"),
    /* 1 */center("Center"),
    /* 2 */right("Right");

    private String label;

    private ColumnAlignment(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
