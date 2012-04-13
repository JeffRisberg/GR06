package com.incra.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The <i>ChartType</i> enumeration is used in the DashboardPanel Configuration
 * to determine how a metric is to be displayed.
 * 
 * @author Jeff Risberg
 * @since 12/15/10
 */
public enum ChartType {
  /* */BAR("Bar"),
  /* */COLUMN("Column"),
  /* */PIE("Pie");

  private String label;

  private ChartType(String label) {
    this.label = label;

    ObjectRepo.shared_objectList.add(this);
    ObjectRepo.shared_keyToObjectMap.put(this.name(), this);
  }

  public String getLabel() {
    return label;
  }

  static public List<ChartType> selectAll() {
    return ObjectRepo.shared_objectList;
  }

  static public ChartType findByKey(String key) {
    return ObjectRepo.shared_keyToObjectMap.get(key);
  }

  static protected class ObjectRepo {
    static protected Map<String, ChartType> shared_keyToObjectMap = new HashMap<String, ChartType>();
    static protected List<ChartType> shared_objectList = new ArrayList<ChartType>();
  }
}
