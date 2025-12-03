<?php
/**
 * Plugin Name:       XFN Relationship Link Extension
 * Plugin URI:        https://github.com/automattic/xfn-link-extension
 * Description:       Extends the native Gutenberg link interface to include XFN (XHTML Friends Network) relationship options across all blocks that support links. Features floating toolbar access, Inspector Controls integration, and Link Advanced panel support.
 * Version:           1.0.0
 * Requires at least: 6.4
 * Requires PHP:      7.4
 * Author:            Courtney Robertson
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       xfn-relationship-link-extension
 *
 * @package XFNLinkExtension
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define plugin constants
define( 'XFN_LINK_EXTENSION_VERSION', '1.0.0' );
define( 'XFN_LINK_EXTENSION_PLUGIN_FILE', __FILE__ );
define( 'XFN_LINK_EXTENSION_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'XFN_LINK_EXTENSION_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

/**
 * XFN Link Extension main class
 *
 * Handles plugin initialization, asset enqueuing, and core functionality
 * for extending WordPress link interface with XFN relationship options
 * across multiple interface points: floating toolbar, inspector controls,
 * and link advanced panel.
 *
 * @since 1.0.0
 */
class XFN_Link_Extension {

	/**
	 * Plugin instance
	 *
	 * @var XFN_Link_Extension
	 */
	private static $instance = null;

	/**
	 * Get plugin instance
	 *
	 * @return XFN_Link_Extension
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor
	 *
	 * Initialize plugin hooks and functionality.
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'init' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
	}

	/**
	 * Initialize plugin
	 *
	 * Runs after WordPress has finished loading but before any headers are sent.
	 * Sets up plugin functionality and registers necessary components.
	 *
	 * @since 1.0.0
	 */
	public function init() {
		// Add REST API endpoint for XFN validation (if needed in future)
		// This would be used for server-side validation of relationship combinations
	}

	/**
	 * Enqueue block editor assets
	 *
	 * Loads JavaScript and CSS files needed for the block editor interface.
	 * Only loads in the block editor context to avoid frontend performance impact.
	 *
	 * @since 1.0.0
	 */
	public function enqueue_block_editor_assets() {
		// Enqueue main JavaScript file
		wp_enqueue_script(
			'xfn-relationship-link-extension',
			XFN_LINK_EXTENSION_PLUGIN_URL . 'build/index.js',
			array(
				'wp-blocks',
				'wp-element',
				'wp-components',
				'wp-data',
				'wp-hooks',
				'wp-i18n',
				'wp-rich-text',
				'wp-block-editor',
				'wp-compose',
			),
			XFN_LINK_EXTENSION_VERSION,
			true
		);

		// Enqueue editor-specific styles
		wp_enqueue_style(
			'xfn-link-extension-editor',
			XFN_LINK_EXTENSION_PLUGIN_URL . 'build/editor.css',
			array( 'wp-components' ),
			XFN_LINK_EXTENSION_VERSION
		);

		// Localize script with XFN relationship data and translations
		wp_localize_script(
			'xfn-relationship-link-extension',
			'xfnLinkExtension',
			array(
				'relationships' => $this->get_xfn_relationships(),
				'version' => XFN_LINK_EXTENSION_VERSION,
				'nonce' => wp_create_nonce( 'xfn_link_extension' ),
				'interfaces' => array(
					'toolbar' => __( 'Floating Toolbar', 'xfn-relationship-link-extension' ),
					'inspector' => __( 'Inspector Controls', 'xfn-relationship-link-extension' ),
					'advanced' => __( 'Link Advanced Panel', 'xfn-relationship-link-extension' ),
				),
			)
		);

		// Set script translations for JavaScript
		wp_set_script_translations(
			'xfn-relationship-link-extension',
			'xfn-relationship-link-extension',
			XFN_LINK_EXTENSION_PLUGIN_PATH . 'languages'
		);
	}

	/**
	 * Get XFN relationship definitions
	 *
	 * Returns the complete XFN 1.1 specification as a structured array.
	 * Includes all relationship categories with their types and validation rules.
	 *
	 * @since 1.0.0
	 * @return array XFN relationship structure
	 */
	private function get_xfn_relationships() {
		return array(
			'friendship' => array(
				'type' => 'radio',
				'label' => __( 'Friendship', 'xfn-relationship-link-extension' ),
				'description' => __( 'Your friendship level with this person (choose one)', 'xfn-relationship-link-extension' ),
				'options' => array(
					'contact' => __( 'Contact', 'xfn-relationship-link-extension' ),
					'acquaintance' => __( 'Acquaintance', 'xfn-relationship-link-extension' ),
					'friend' => __( 'Friend', 'xfn-relationship-link-extension' ),
				),
				'default' => null,
			),
			'physical' => array(
				'type' => 'checkbox',
				'label' => __( 'Physical', 'xfn-relationship-link-extension' ),
				'description' => __( 'Have you met this person in real life?', 'xfn-relationship-link-extension' ),
				'options' => array(
					'met' => __( 'Met', 'xfn-relationship-link-extension' ),
				),
			),
			'professional' => array(
				'type' => 'checkbox',
				'label' => __( 'Professional', 'xfn-relationship-link-extension' ),
				'description' => __( 'Professional relationships (multiple allowed)', 'xfn-relationship-link-extension' ),
				'options' => array(
					'co-worker' => __( 'Co-worker', 'xfn-relationship-link-extension' ),
					'colleague' => __( 'Colleague', 'xfn-relationship-link-extension' ),
				),
			),
			'geographical' => array(
				'type' => 'radio',
				'label' => __( 'Geographical', 'xfn-relationship-link-extension' ),
				'description' => __( 'Your geographical relationship (choose one)', 'xfn-relationship-link-extension' ),
				'options' => array(
					'co-resident' => __( 'Co-resident', 'xfn-relationship-link-extension' ),
					'neighbor' => __( 'Neighbor', 'xfn-relationship-link-extension' ),
				),
				'default' => null,
			),
			'family' => array(
				'type' => 'radio',
				'label' => __( 'Family', 'xfn-relationship-link-extension' ),
				'description' => __( 'Family relationship (choose one)', 'xfn-relationship-link-extension' ),
				'options' => array(
					'child' => __( 'Child', 'xfn-relationship-link-extension' ),
					'parent' => __( 'Parent', 'xfn-relationship-link-extension' ),
					'sibling' => __( 'Sibling', 'xfn-relationship-link-extension' ),
					'spouse' => __( 'Spouse', 'xfn-relationship-link-extension' ),
					'kin' => __( 'Kin', 'xfn-relationship-link-extension' ),
				),
				'default' => null,
			),
			'romantic' => array(
				'type' => 'checkbox',
				'label' => __( 'Romantic', 'xfn-relationship-link-extension' ),
				'description' => __( 'Romantic relationships (multiple allowed)', 'xfn-relationship-link-extension' ),
				'options' => array(
					'muse' => __( 'Muse', 'xfn-relationship-link-extension' ),
					'crush' => __( 'Crush', 'xfn-relationship-link-extension' ),
					'date' => __( 'Date', 'xfn-relationship-link-extension' ),
					'sweetheart' => __( 'Sweetheart', 'xfn-relationship-link-extension' ),
				),
			),
			'identity' => array(
				'type' => 'checkbox',
				'label' => __( 'Identity', 'xfn-relationship-link-extension' ),
				'description' => __( 'Is this link to your own content?', 'xfn-relationship-link-extension' ),
				'options' => array(
					'me' => __( 'Me', 'xfn-relationship-link-extension' ),
				),
			),
		);
	}

	/**
	 * Parse rel attribute to separate XFN and non-XFN values
	 *
	 * Takes a rel attribute string and separates XFN relationships from
	 * other rel values like nofollow, noopener, etc.
	 *
	 * @since 1.0.0
	 * @param string $rel_string The rel attribute value to parse
	 * @return array Array with 'xfn' and 'other' keys containing respective values
	 */
	public static function parse_rel_attribute( $rel_string ) {
		if ( empty( $rel_string ) ) {
			return array( 'xfn' => array(), 'other' => array() );
		}

		// All possible XFN relationship values
		$xfn_values = array(
			'contact', 'acquaintance', 'friend', 'met',
			'co-worker', 'colleague', 'co-resident', 'neighbor',
			'child', 'parent', 'sibling', 'spouse', 'kin',
			'muse', 'crush', 'date', 'sweetheart', 'me'
		);

		$rel_parts = array_filter( array_map( 'trim', explode( ' ', $rel_string ) ) );
		$xfn = array();
		$other = array();

		foreach ( $rel_parts as $part ) {
			if ( in_array( $part, $xfn_values, true ) ) {
				$xfn[] = $part;
			} else {
				$other[] = $part;
			}
		}

		return array(
			'xfn' => $xfn,
			'other' => $other,
		);
	}

	/**
	 * Combine XFN and other rel values into valid rel attribute string
	 *
	 * Takes XFN relationships and other rel values and combines them
	 * into a properly formatted rel attribute string.
	 *
	 * @since 1.0.0
	 * @param array $xfn_values Array of XFN relationship values
	 * @param array $other_values Array of non-XFN rel values
	 * @return string Combined rel attribute value
	 */
	public static function combine_rel_values( $xfn_values, $other_values ) {
		$all_values = array_merge(
			array_filter( (array) $other_values ),
			array_filter( (array) $xfn_values )
		);

		// Remove duplicates and empty values
		$all_values = array_unique( array_filter( $all_values ) );

		return implode( ' ', $all_values );
	}

	/**
	 * Validate XFN relationship combinations
	 *
	 * Ensures that selected XFN relationships are valid according to
	 * the XFN specification. Checks for mutually exclusive relationships.
	 *
	 * @since 1.0.0
	 * @param array $relationships Array of selected XFN relationships
	 * @return bool Whether the relationship combination is valid
	 */
	public static function validate_xfn_relationships( $relationships ) {
		if ( empty( $relationships ) || ! is_array( $relationships ) ) {
			return true;
		}

		// Define mutually exclusive groups
		$exclusive_groups = array(
			array( 'contact', 'acquaintance', 'friend' ),
			array( 'co-resident', 'neighbor' ),
			array( 'child', 'parent', 'sibling', 'spouse', 'kin' ),
		);

		// Check each exclusive group
		foreach ( $exclusive_groups as $group ) {
			$selected_in_group = array_intersect( $relationships, $group );
			if ( count( $selected_in_group ) > 1 ) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Sanitize XFN rel attribute value
	 *
	 * Cleans and validates a rel attribute value to ensure it contains
	 * only valid XFN and standard rel values.
	 *
	 * @since 1.0.0
	 * @param string $rel_value The rel attribute value to sanitize
	 * @return string Sanitized rel attribute value
	 */
	public static function sanitize_rel_attribute( $rel_value ) {
		if ( empty( $rel_value ) ) {
			return '';
		}

		// Parse the rel attribute
		$parsed = self::parse_rel_attribute( $rel_value );
		
		// Validate XFN relationships
		if ( ! self::validate_xfn_relationships( $parsed['xfn'] ) ) {
			// If invalid, remove all XFN values and keep only other values
			$parsed['xfn'] = array();
		}

		// Combine and return
		return self::combine_rel_values( $parsed['xfn'], $parsed['other'] );
	}
}

/**
 * Initialize the plugin
 */
function xfn_link_extension_init() {
	XFN_Link_Extension::get_instance();
}
add_action( 'plugins_loaded', 'xfn_link_extension_init' );

/**
 * Plugin activation hook
 *
 * Runs when the plugin is activated. Performs any necessary setup.
 *
 * @since 1.0.0
 */
function xfn_link_extension_activate() {
	// Check minimum requirements
	if ( version_compare( get_bloginfo( 'version' ), '6.4', '<' ) ) {
		deactivate_plugins( plugin_basename( __FILE__ ) );
		wp_die(
			esc_html__( 'XFN Link Extension requires WordPress 6.4 or higher.', 'xfn-relationship-link-extension' ),
			esc_html__( 'Plugin Activation Error', 'xfn-relationship-link-extension' ),
			array( 'back_link' => true )
		);
	}

	if ( version_compare( PHP_VERSION, '7.4', '<' ) ) {
		deactivate_plugins( plugin_basename( __FILE__ ) );
		wp_die(
			esc_html__( 'XFN Link Extension requires PHP 7.4 or higher.', 'xfn-relationship-link-extension' ),
			esc_html__( 'Plugin Activation Error', 'xfn-relationship-link-extension' ),
			array( 'back_link' => true )
		);
	}
}
register_activation_hook( __FILE__, 'xfn_link_extension_activate' );

/**
 * Helper function to get XFN relationship definitions
 *
 * Provides a public interface for accessing XFN relationship structure.
 * Useful for themes or other plugins that need to work with XFN data.
 *
 * @since 1.0.0
 * @return array XFN relationship definitions
 */
function xfn_get_relationships() {
	$instance = XFN_Link_Extension::get_instance();
	return $instance->get_xfn_relationships();
}

/**
 * Helper function to parse rel attributes
 *
 * Provides a public interface for parsing rel attribute strings.
 *
 * @since 1.0.0
 * @param string $rel_string The rel attribute value to parse
 * @return array Array with 'xfn' and 'other' keys
 */
function xfn_parse_rel_attribute( $rel_string ) {
	return XFN_Link_Extension::parse_rel_attribute( $rel_string );
}

/**
 * Helper function to combine rel values
 *
 * Provides a public interface for combining XFN and other rel values.
 *
 * @since 1.0.0
 * @param array $xfn_values Array of XFN relationship values
 * @param array $other_values Array of non-XFN rel values
 * @return string Combined rel attribute value
 */
function xfn_combine_rel_values( $xfn_values, $other_values ) {
	return XFN_Link_Extension::combine_rel_values( $xfn_values, $other_values );
}

/**
 * Helper function to validate XFN relationships
 *
 * Provides a public interface for validating XFN relationship combinations.
 *
 * @since 1.0.0
 * @param array $relationships Array of selected XFN relationships
 * @return bool Whether the relationship combination is valid
 */
function xfn_validate_relationships( $relationships ) {
	return XFN_Link_Extension::validate_xfn_relationships( $relationships );
}

/**
 * Helper function to sanitize rel attributes
 *
 * Provides a public interface for sanitizing rel attribute values.
 *
 * @since 1.0.0
 * @param string $rel_value The rel attribute value to sanitize
 * @return string Sanitized rel attribute value
 */
function xfn_sanitize_rel_attribute( $rel_value ) {
	return XFN_Link_Extension::sanitize_rel_attribute( $rel_value );
}