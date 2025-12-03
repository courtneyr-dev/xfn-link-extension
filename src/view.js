/**
 * Frontend JavaScript for XFN Link Extension
 *
 * This plugin primarily enhances the editor interface, so minimal frontend
 * JavaScript is required. XFN relationships are semantic HTML attributes
 * that work without JavaScript.
 */

( function () {
	'use strict';

	/**
	 * Initialize XFN frontend functionality
	 */
	function initXFNFrontend() {
		// Optional: Add analytics tracking for XFN relationships
		trackXFNUsage();

		// Optional: Add accessibility enhancements
		enhanceXFNAccessibility();
	}

	/**
	 * Track XFN usage for analytics (optional)
	 */
	function trackXFNUsage() {
		const xfnLinks = document.querySelectorAll( 'a[rel]' );

		if ( xfnLinks.length === 0 ) {
			return;
		}

		// Count different types of XFN relationships
		const relationshipCounts = {
			friendship: 0,
			professional: 0,
			family: 0,
			romantic: 0,
			identity: 0,
			met: 0,
		};

		xfnLinks.forEach( function ( link ) {
			const rel = link.getAttribute( 'rel' ) || '';

			// Check for friendship relationships
			if ( /\b(contact|acquaintance|friend)\b/.test( rel ) ) {
				relationshipCounts.friendship++;
			}

			// Check for professional relationships
			if ( /\b(co-worker|colleague)\b/.test( rel ) ) {
				relationshipCounts.professional++;
			}

			// Check for family relationships
			if ( /\b(child|parent|sibling|spouse|kin)\b/.test( rel ) ) {
				relationshipCounts.family++;
			}

			// Check for romantic relationships
			if ( /\b(muse|crush|date|sweetheart)\b/.test( rel ) ) {
				relationshipCounts.romantic++;
			}

			// Check for identity relationships
			if ( /\bme\b/.test( rel ) ) {
				relationshipCounts.identity++;
			}

			// Check for met relationship
			if ( /\bmet\b/.test( rel ) ) {
				relationshipCounts.met++;
			}
		} );

		// Log usage statistics for debugging
		console.log( 'XFN Usage Statistics:', {
			totalLinks: xfnLinks.length,
			...relationshipCounts,
		} );
	}

	/**
	 * Enhance XFN links with accessibility features (optional)
	 */
	function enhanceXFNAccessibility() {
		const xfnLinks = document.querySelectorAll( 'a[rel]' );

		xfnLinks.forEach( function ( link ) {
			const rel = link.getAttribute( 'rel' ) || '';
			const xfnRelationships = extractXFNRelationships( rel );

			if ( xfnRelationships.length === 0 ) {
				return;
			}

			// Add data attributes for CSS styling
			link.setAttribute(
				'data-xfn-relationships',
				xfnRelationships.join( ' ' )
			);
			link.classList.add( 'has-xfn-relationships' );
		} );
	}

	/**
	 * Extract XFN relationships from a rel attribute
	 */
	function extractXFNRelationships( rel ) {
		const xfnValues = [
			'contact',
			'acquaintance',
			'friend',
			'met',
			'co-worker',
			'colleague',
			'co-resident',
			'neighbor',
			'child',
			'parent',
			'sibling',
			'spouse',
			'kin',
			'muse',
			'crush',
			'date',
			'sweetheart',
			'me',
		];

		const relParts = rel.split( /\s+/ );
		return relParts.filter( function ( part ) {
			return xfnValues.indexOf( part ) !== -1;
		} );
	}

	// Initialize when DOM is ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initXFNFrontend );
	} else {
		initXFNFrontend();
	}
} )();
