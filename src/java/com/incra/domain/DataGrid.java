package com.incra.domain;

import java.util.ArrayList;
import java.util.List;

/**
 * The <i>DataGrid</i> is a pojo that creates a visual grid of values, and is
 * used in the tablular displays (such as the ListView) as well as the
 * spreadsheet-like displays (such as for Projects).
 * 
 * @author Jeffrey Risberg
 * @since 12/19/10
 */
public class DataGrid {

    private List<DataGridRow> rows;
    private List<ColumnDescriptor> columns;
    private String[][] cell;

    public DataGrid() {
        this.rows = new ArrayList<DataGridRow>();
        this.columns = new ArrayList<ColumnDescriptor>();
    }

    public List<DataGridRow> getRows() {
        return rows;
    }

    public void setRows(List<DataGridRow> rows) {
        this.rows = rows;
    }

    public List<ColumnDescriptor> getColumns() {
        return columns;
    }

    public void setColumns(List<ColumnDescriptor> columns) {
        this.columns = columns;
    }

    public void addRow(DataGridRow row) {
        rows.add(row);
    }

    public void addColumn(ColumnDescriptor column) {
        columns.add(column);
    }

    public boolean isEmpty() {
        return this.rows.isEmpty();
    }

    public void setEmpty(boolean empty) {
        //
    }

    public void createCellArray() {
        this.cell = new String[rows.size()][columns.size()];
        for (int i = 0; i < rows.size(); i++) {
            DataGridRow dgRow = rows.get(i);
            List<DataGridCell> dgCells = dgRow.getCells();

            for (int j = 0; j < dgCells.size(); j++) {
                DataGridCell dgCell = dgCells.get(j);

                cell[i][j] = dgCell.getValue();
            }
        }
    }

    public String[][] getCell() {
        return cell;
    }

    public void setCell(String[][] cell) {
        this.cell = cell;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("DataGrid[#rows=").append(rows.size());
        sb.append(", #cols=").append(columns.size());
        sb.append("]");
        return sb.toString();
    }
}
