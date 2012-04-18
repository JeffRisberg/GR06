/**
 * Any overrides to the ExtJS default functionality should be put here.
 *
 * @author Jeff Risberg
 * @since April 2012
 */

Ext.define('GR06.Override', {
    singleton: true
});

/**
 * This is a workaround to bug in ExtJs 4.0.7:
 * http://www.sencha.com/forum/showthread.php?154059-4.0.7-TreePanel-Error-when-reloading-the-treeStore
 */
Ext.override(Ext.data.TreeStore, {
    load: function(options) {
        options = options || {};
        options.params = options.params || {};

        var me = this,
        node = options.node || me.tree.getRootNode(),root;

        //If there is not a node it means the user hasn't defined a rootnode yet.
        //In this case lets just create one for them.
        if (!node) {
            node = me.setRootNode({
                expanded: true
            });
        }

        if (me.clearOnLoad) {
            node.removeAll(false);
        }

        Ext.applyIf(options, {
            node: node
        });
        options.params[me.nodeParam] = node ? node.getId() : 'root';

        if (node) {
            node.set('loading', true);
        }

        return me.callParent([options]);
    }
});
