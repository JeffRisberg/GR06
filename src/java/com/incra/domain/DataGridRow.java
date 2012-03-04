package com.incra.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * The <i>DataGridRow</i> class is a piece of the DataGrid infrastructure. It
 * defines one row of the grid, which is associated with an optional
 * (entityType, entityId) pair, and contains an editable flag.
 * 
 * @author Jeffrey Risberg
 * @since 12/16/10
 */
public class DataGridRow {

    private Long id;
    private boolean editable;
    private List<DataGridCell> cells;

    /** Constructor */
    public DataGridRow(Long id, boolean editable) {
        this.id = id;
        this.editable = editable;
        this.cells = new ArrayList<DataGridCell>();
    }

    public Long getId() {
        return id;
    }

    public boolean isEditable() {
        return editable;
    }

    public List<DataGridCell> getCells() {
        return cells;
    }

    public void setCells(List<DataGridCell> cells) {
        this.cells = cells;
    }

    public void addCell(DataGridCell cell) {
        cells.add(cell);
    }

    @Override
    public String toString() {
        StringBuffer sb = new StringBuffer();
        sb.append("DataGridRow[#cells=" + cells.size());
        sb.append("]");
        return sb.toString();
    }
}
