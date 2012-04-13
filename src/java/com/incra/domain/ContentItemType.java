package com.incra.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The <i>ContentItemType</i> enumeration defines content types such as book, .
 * 
 * @author Jeff Risberg
 * @since 12/15/10
 */
public enum ContentItemType {
  /* */ORGANIZATION("Organization", "organization"),
  /* */PRODUCT("Product", "product"),
  /* */BOOK("Book", "book"),
  /* */PROJECT("Project", "project"),
  /* */NEWS("PartnerNews", "partnerNews");

  private String label;
  private String styleName;

  private ContentItemType(String label, String styleName) {
    this.label = label;
    this.styleName = styleName;

    ObjectRepo.shared_objectList.add(this);
    ObjectRepo.shared_keyToObjectMap.put(this.name(), this);
  }

  public String getLabel() {
    return label;
  }

  public String getStyleName() {
    return styleName;
  }

  static public List<ContentItemType> selectAll() {
    return ObjectRepo.shared_objectList;
  }

  static public ContentItemType findByKey(String key) {
    return ObjectRepo.shared_keyToObjectMap.get(key);
  }

  static protected class ObjectRepo {
    static protected Map<String, ContentItemType> shared_keyToObjectMap = new HashMap<String, ContentItemType>();
    static protected List<ContentItemType> shared_objectList = new ArrayList<ContentItemType>();
  }
}
