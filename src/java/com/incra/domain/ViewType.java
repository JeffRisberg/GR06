package com.incra.domain;

/**
 * The <i>ViewType</i> enumeration is used by the metadata driven controllers to
 * indicate which columns apply to which types of views. These can be Added
 * together to form control flags.
 * 
 * @author Jeff Risberg
 * @since 12/15/10
 */
public enum ViewType {
	/**
	 * In order to capture all combinations, we organize this as a binary count
	 * through the flag values
	 */
	/* */NONE(false, false, false, false),
	/* */LIST(true, false, false, false),
	/* */SHOW(false, true, false, false),
	/* */LIST_SHOW(true, true, false, false),
	/* */EDIT(false, false, true, false),
	/* */LIST_EDIT(true, false, true, false),
	/* */SHOW_EDIT(false, true, true, false),
	/* */LIST_SHOW_EDIT(true, true, true, false),

	/* */CREATE(false, false, false, true),
	/* */LIST_CREATE(true, false, false, true),
	/* */SHOW_CREATE(false, true, false, true),
	/* */LIST_SHOW_CREATE(true, true, false, true),
	/* */EDIT_CREATE(false, false, true, true),
	/* */LIST_EDIT_CREATE(true, false, true, true),
	/* */SHOW_EDIT_CREATE(false, true, true, true),
	/* */LIST_SHOW_EDIT_CREATE(true, true, true, true);

	private boolean list;
	private boolean show;
	private boolean edit;
	private boolean create;

	ViewType(boolean list, boolean show, boolean edit, boolean create) {
		this.list = list;
		this.show = show;
		this.edit = edit;
		this.create = create;
	}

	public boolean matches(Object obj) {
		if (obj instanceof ViewType) {
			ViewType otherViewType = (ViewType) obj;

			if (isList() && otherViewType.isList())
				return true;
			if (isShow() && otherViewType.isShow())
				return true;
			if (isEdit() && otherViewType.isEdit())
				return true;
			if (isCreate() && otherViewType.isCreate())
				return true;
		}

		return false;
	}

	public boolean isList() {
		return list;
	}

	public boolean isShow() {
		return show;
	}

	public boolean isEdit() {
		return edit;
	}

	public boolean isCreate() {
		return create;
	}
}
