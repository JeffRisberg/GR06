package com.incra.pageFramework


/**
 * Describes a menu, which is made up of MenuItem instances.
 *
 * @author Jeffrey Risberg
 * @since 10/03/10
 */
class Menu extends AbstractComponent {

    static belongsTo = [module : Module]

    static hasMany = [children : MenuItem]
}
