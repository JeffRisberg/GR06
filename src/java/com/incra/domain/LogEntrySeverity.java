package com.incra.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The <i>LogEntrySeverity</i> enumeration defines 5 levels of importance.
 * 
 * @author Jeff Risberg
 * @since 11/14/10
 */
public enum LogEntrySeverity {
  LOW("Low", 0),
  MED_LOW("Med-Low", 1),
  MEDIUM("Medium", 2),
  MED_HIGH("Med-High", 3),
  HIGH("High", 4);

  protected String label;
  protected int level;

  private LogEntrySeverity(String label, int level) {
    this.label = label;
    this.level = level;

    ObjectRepo.shared_objectList.add(this);
    ObjectRepo.shared_nameToObjectMap.put(this.name(), this);
  }

  public String getLabel() {
    return label;
  }

  public int getLevel() {
    return level;
  }

  static public List<LogEntrySeverity> selectAll() {
    return ObjectRepo.shared_objectList;
  }

  static public LogEntrySeverity findByName(String name) {
    return ObjectRepo.shared_nameToObjectMap.get(name);
  }

  static protected class ObjectRepo {
    static protected Map<String, LogEntrySeverity> shared_nameToObjectMap = new HashMap<String, LogEntrySeverity>();
    static protected List<LogEntrySeverity> shared_objectList = new ArrayList<LogEntrySeverity>();
  }
}