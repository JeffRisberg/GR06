package com.incra.pageFramework

/**
 * Describes a menuItem, which add Controller name and Action name to
 * AbstractComponent.
 * 
 * @author Jeffrey Risberg
 * @since 10/02/10
 */
class MenuItem extends AbstractComponent {

    static belongsTo = [menu : Menu]

    String controller
    String action = 'index'

    static constraints = {
    }

    @Override
    public String toString() {
        StringBuffer sb = new StringBuffer()

        sb.append("MenuItem[name=").append(name)
        sb.append("]")
        sb.toString();
    }
}
