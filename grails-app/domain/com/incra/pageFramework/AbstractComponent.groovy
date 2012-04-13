package com.incra.pageFramework;

/**
 * All component descriptions entities subclass from this class.  Each has a name, an optional 
 * description, and an optional styleClass.  The 'weight' field is used for controlling the sort
 * order of a list components.  This term has the same meaning as in Drupal:  Components with 
 * lower weight will float to the top of lists or left on bars, while heavier items will sink
 * to the bottom of lists or right on bars.  Weights are allowed to be negative.
 * 
 * Concrete subclasses include menus, modules, etc.
 * 
 * @author Jeff Risberg
 * @since 11/25/10
 */
abstract class AbstractComponent {

    String name
    int weight = 0;
    String description
    String styleClass

    static constraints = {
        description(nullable: true)
        styleClass(nullable: true)
    }
}