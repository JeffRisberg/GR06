package com.incra.pageFramework


/**
 * The <i>Module</i> class is a subclass of a Component which has a list of menus
 * 
 * @author Jeffrey Risberg
 * @since 10/03/10
 */
class Module extends AbstractComponent {

    static hasMany = [menus : Menu]
}
