package com.incra.domain;

/**
 * The <i>ColumnDataType</i> enumeration is used in the ColumnDescriptor dto.
 * 
 * @author Jeff Risberg
 * @since 01/30/12
 */
public enum ColumnDataType {
    /* 0 */Generic("Generic"),
    /* 1 */String("String"),
    /* 2 */TextArea("TextArea"),
    /* 3 */Integer("Integer"),
    /* 4 */Decimal("Decimal"),
    /* 5 */Financial("Financial"),
    /* 6 */Boolean("Boolean"),
    /* 7 */Date("Date"),
    /* 8 */DateTime("DateTime"),
    /* 9 */FlexField("FlexField"),
    /* 10 */RoleList("RoleList"),
    /* 11 */EmailAddress("EmailAddress"),
    /* 12 */ShortString("ShortString"),
    /* 13 */VeryShortString("VeryShortString");

    private String label;

    private ColumnDataType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public boolean isTextArea() {
        return label.equals("TextArea");
    }
}
