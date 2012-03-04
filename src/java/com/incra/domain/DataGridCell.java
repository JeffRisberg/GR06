package com.incra.domain;

/**
 * The <i>DataGridCell</i> pojo is used to hold one cell, including its value
 * and a reference to the DataGridColumn (for the display rules).
 * 
 * @author Jeffrey Risberg
 * @since 12/15/10
 */
public class DataGridCell {
    private ColumnDescriptor column;
    private String value;
    private Object val;

    /** Constructor */
    public DataGridCell(ColumnDescriptor column, String value) {
        this.column = column;
        this.value = value;
    }

    /** Constructor */
    public DataGridCell(ColumnDescriptor column, String value, Object val) {
        this.column = column;
        this.value = value;
        this.val = val;
    }

    public ColumnDescriptor getColumn() {
        return column;
    }

    public String getValue() {
        return value;
    }

    public Object getVal() {
        return val;
    }
}
