package com.incra.domain;

/**
 * The <i>ColumnDescriptor</i> is provides the metadata about a column in a
 * display screen. It is used to drive the list view and the Excel dump
 * operations.
 * 
 * @author Jeffrey Risberg
 * @since 12/14/10
 */
public class ColumnDescriptor {
    private ViewType viewType;
    private String label;
    private String fieldName;
    private ColumnAlignment alignment;
    private ColumnDataType dataType;
    private Object defaultValue;

    /** Constructor */
    public ColumnDescriptor(ViewType viewType, String label, String fieldName,
            ColumnAlignment alignment, ColumnDataType dataType, Object defaultValue) {
        super();
        this.viewType = viewType;
        this.label = label;
        this.fieldName = fieldName;
        this.alignment = alignment;
        this.dataType = dataType;
        this.defaultValue = defaultValue;
    }

    /** Constructor */
    public ColumnDescriptor(ViewType viewType, String label, String fieldName,
            ColumnAlignment alignment, ColumnDataType dataType) {
        this(viewType, label, fieldName, alignment, dataType, "");
    }

    /** Constructor */
    public ColumnDescriptor(ViewType viewType, String label, String fieldName,
            ColumnDataType dataType) {
        this(viewType, label, fieldName, ColumnAlignment.Left, dataType, "");
    }

    public ViewType getViewType() {
        return viewType;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(String fieldName) {
        this.fieldName = fieldName;
    }

    public ColumnAlignment getAlignment() {
        return alignment;
    }

    public void setAlignment(ColumnAlignment alignment) {
        this.alignment = alignment;
    }

    public ColumnDataType getDataType() {
        return dataType;
    }

    public void setDataType(ColumnDataType dataType) {
        this.dataType = dataType;
    }

    public Object getDefaultValue() {
        return defaultValue;
    }

    public void setDefaultValue(Object defaultValue) {
        this.defaultValue = defaultValue;
    }
}
