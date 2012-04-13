package com.incra.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The <i>MetricType</i> enumeration...
 * 
 * @author Jeff Risberg
 * @since 02/17/11
 */
public enum MetricType {
  /* */VALUE("Value"),
  /* */VALUE_AND_NAME("Value And Name");

  private String label;

  private MetricType(String label) {
    this.label = label;

    ObjectRepo.shared_objectList.add(this);
    ObjectRepo.shared_keyToObjectMap.put(this.name(), this);
  }

  public String getLabel() {
    return label;
  }

  static public List<MetricType> selectAll() {
    return ObjectRepo.shared_objectList;
  }

  static public MetricType findByKey(String key) {
    return ObjectRepo.shared_keyToObjectMap.get(key);
  }

  static protected class ObjectRepo {
    static protected Map<String, MetricType> shared_keyToObjectMap = new HashMap<String, MetricType>();
    static protected List<MetricType> shared_objectList = new ArrayList<MetricType>();
  }
}
