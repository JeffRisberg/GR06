package com.incra.domain;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The <i>TimeSegmentLevel</i> class is an enum over different levels of the
 * corporate calendar. This is based on forecast and demand management software
 * applications.
 * 
 * The database is only populated with segments at the Year level and finer. The
 * Root level is used only by the root of the time segment tree created in the
 * TimeSegmentService.
 * 
 * @author Jeff Risberg
 * @since since 2005
 */
public enum TimeSegmentLevel {
    /* 0 */Root("Root", 24L * 60L * 60L * 1000L),
    /* 1 */Year("Year", 365L * 24L * 60L * 60L * 1000L),
    /* 2 */Quarter("Quarter", 90L * 24L * 60L * 60L * 1000L),
    /* 3 */Month("Month", 31L * 24L * 60L * 60L * 1000L),
    /* 4 */Week("Week", 7L * 24L * 60L * 60L * 1000L),
    /* 5 */Day("Day", 24L * 60L * 60L * 1000L);

    private String name;
    private long unitTime;

    private TimeSegmentLevel(final String name, long unitTime) {
        this.name = name;
        this.unitTime = unitTime;

        ObjectRepo.shared_objectList.add(this);
        ObjectRepo.shared_keyToObjectMap.put(this.name(), this);
    }

    static public List<TimeSegmentLevel> selectAll() {
        return ObjectRepo.shared_objectList;
    }

    static public TimeSegmentLevel findByKey(String key) {
        return ObjectRepo.shared_keyToObjectMap.get(key);
    }

    static protected class ObjectRepo {
        static protected Map<String, TimeSegmentLevel> shared_keyToObjectMap = new HashMap<String, TimeSegmentLevel>();
        static protected List<TimeSegmentLevel> shared_objectList = new ArrayList<TimeSegmentLevel>();
    }
}
