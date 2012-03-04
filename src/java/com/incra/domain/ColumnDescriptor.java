package com.incra.domain;

/**
 * The <i>ColumnDescriptor</i> provides the metadata about a column in a display
 * screen.
 * 
 * @author Jeffrey Risberg
 * @since 02/01/12
 */
public class ColumnDescriptor {
    private String label;
    private String fieldName;
    private ColumnDataType dataType;
    private ColumnAlignment alignment;
    private Object defaultValue;

    /** Constructor */
    public ColumnDescriptor(String label, String fieldName, ColumnDataType dataType,
            ColumnAlignment alignment, Object defaultValue) {
        this.label = label;
        this.fieldName = fieldName;
        this.dataType = dataType;
        this.alignment = alignment;
        this.defaultValue = defaultValue;
    }

    /** Constructor */
    public ColumnDescriptor(String label, String fieldName, ColumnDataType dataType,
            ColumnAlignment alignment) {
        this(label, fieldName, dataType, alignment, "");
    }

    /** Constructor */
    public ColumnDescriptor(String fieldName, ColumnDataType dataType) {
        this(fieldName, fieldName, dataType, ColumnAlignment.left, "");
    }

    public String getLabel() {
        return label;
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

    public String getWijmoDataType() {
        if (dataType == ColumnDataType.Financial)
            return "currency";

        if (dataType == ColumnDataType.Integer)
            return "number";

        if (dataType == ColumnDataType.Decimal)
            return "number";

        return "string";
    }
}
