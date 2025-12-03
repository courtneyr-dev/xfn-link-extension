/**
 * This file is not used in the XFN Link Extension plugin.
 *
 * The plugin enhances existing link functionality by modifying rel attributes
 * rather than creating new block content, so no save function is needed.
 *
 * XFN relationships are stored in standard HTML rel attributes that are
 * handled by WordPress core's existing link serialization.
 */

export default function save() {
	return null;
}
