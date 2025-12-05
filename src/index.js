/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import {
	PanelBody,
	CheckboxControl,
	RadioControl,
	TextControl,
	ToggleControl,
	Popover,
	Button,
	ButtonGroup,
} from '@wordpress/components';
import {
	InspectorControls,
	RichTextToolbarButton,
	BlockControls,
} from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { link, linkOff, chevronDown, chevronUp } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * XFN Relationship definitions
 */
const XFN_RELATIONSHIPS = {
	friendship: {
		type: 'radio',
		label: __( 'Friendship', 'link-extension-for-xfn' ),
		description: __(
			'Your friendship level (choose one)',
			'link-extension-for-xfn'
		),
		options: [
			{
				label: __( 'Contact', 'link-extension-for-xfn' ),
				value: 'contact',
			},
			{
				label: __( 'Acquaintance', 'link-extension-for-xfn' ),
				value: 'acquaintance',
			},
			{
				label: __( 'Friend', 'link-extension-for-xfn' ),
				value: 'friend',
			},
		],
	},
	physical: {
		type: 'checkbox',
		label: __( 'Physical', 'link-extension-for-xfn' ),
		description: __(
			'Have you met this person?',
			'link-extension-for-xfn'
		),
		options: [
			{
				label: __( 'Met', 'link-extension-for-xfn' ),
				value: 'met',
			},
		],
	},
	professional: {
		type: 'checkbox',
		label: __( 'Professional', 'link-extension-for-xfn' ),
		description: __(
			'Professional relationships',
			'link-extension-for-xfn'
		),
		options: [
			{
				label: __( 'Co-worker', 'link-extension-for-xfn' ),
				value: 'co-worker',
			},
			{
				label: __( 'Colleague', 'link-extension-for-xfn' ),
				value: 'colleague',
			},
		],
	},
	geographical: {
		type: 'radio',
		label: __( 'Geographical', 'link-extension-for-xfn' ),
		description: __(
			'Geographical relationship',
			'link-extension-for-xfn'
		),
		options: [
			{
				label: __( 'Co-resident', 'link-extension-for-xfn' ),
				value: 'co-resident',
			},
			{
				label: __( 'Neighbor', 'link-extension-for-xfn' ),
				value: 'neighbor',
			},
		],
	},
	family: {
		type: 'radio',
		label: __( 'Family', 'link-extension-for-xfn' ),
		description: __(
			'Family relationship',
			'link-extension-for-xfn'
		),
		options: [
			{
				label: __( 'Child', 'link-extension-for-xfn' ),
				value: 'child',
			},
			{
				label: __( 'Parent', 'link-extension-for-xfn' ),
				value: 'parent',
			},
			{
				label: __( 'Sibling', 'link-extension-for-xfn' ),
				value: 'sibling',
			},
			{
				label: __( 'Spouse', 'link-extension-for-xfn' ),
				value: 'spouse',
			},
			{
				label: __( 'Kin', 'link-extension-for-xfn' ),
				value: 'kin',
			},
		],
	},
	romantic: {
		type: 'checkbox',
		label: __( 'Romantic', 'link-extension-for-xfn' ),
		description: __(
			'Romantic relationships',
			'link-extension-for-xfn'
		),
		options: [
			{
				label: __( 'Muse', 'link-extension-for-xfn' ),
				value: 'muse',
			},
			{
				label: __( 'Crush', 'link-extension-for-xfn' ),
				value: 'crush',
			},
			{
				label: __( 'Date', 'link-extension-for-xfn' ),
				value: 'date',
			},
			{
				label: __( 'Sweetheart', 'link-extension-for-xfn' ),
				value: 'sweetheart',
			},
		],
	},
	identity: {
		type: 'checkbox',
		label: __( 'Identity', 'link-extension-for-xfn' ),
		description: __(
			'Is this your own content?',
			'link-extension-for-xfn'
		),
		options: [
			{
				label: __( 'Me', 'link-extension-for-xfn' ),
				value: 'me',
			},
		],
	},
};

/**
 * Parse rel attribute to separate XFN and non-XFN values
 */
function parseRelAttribute( relString ) {
	if ( ! relString ) {
		return { xfn: [], other: [] };
	}

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

	const relParts = relString.split( /\s+/ ).filter( Boolean );
	const xfn = [];
	const other = [];

	relParts.forEach( ( part ) => {
		if ( xfnValues.includes( part ) ) {
			xfn.push( part );
		} else {
			other.push( part );
		}
	} );

	return { xfn, other };
}

/**
 * Combine XFN and other rel values
 */
function combineRelValues( xfnValues, otherValues ) {
	const allValues = [ ...otherValues, ...xfnValues ].filter( Boolean );
	return [ ...new Set( allValues ) ].join( ' ' );
}

/**
 * Get rel attribute from various block types
 */
function getRelFromBlock( attributes, blockName ) {
	if ( attributes.rel ) {
		return attributes.rel;
	}

	if ( attributes.metadata?.rel ) {
		return attributes.metadata.rel;
	}

	return '';
}

/**
 * Set rel attribute for various block types
 */
function setRelForBlock( attributes, setAttributes, newRel, blockName ) {
	if ( attributes.hasOwnProperty( 'rel' ) ) {
		setAttributes( { rel: newRel || undefined } );
		return;
	}

	const metadata = attributes.metadata || {};
	setAttributes( {
		metadata: {
			...metadata,
			rel: newRel || undefined,
		},
	} );
}

/**
 * XFN Collapsible Section Component
 */
const XFNCollapsibleSection = ( {
	currentRel,
	onUpdateRel,
	isExpanded,
	onToggle,
} ) => {
	const { xfn: xfnValues, other: otherValues } =
		parseRelAttribute( currentRel );

	const updateRelationship = ( category, value, isChecked ) => {
		let newXfnValues = [ ...xfnValues ];

		if ( XFN_RELATIONSHIPS[ category ].type === 'radio' ) {
			const categoryValues = XFN_RELATIONSHIPS[ category ].options.map(
				( opt ) => opt.value
			);
			newXfnValues = newXfnValues.filter(
				( val ) => ! categoryValues.includes( val )
			);

			if ( isChecked ) {
				newXfnValues.push( value );
			}
		} else {
			if ( isChecked ) {
				if ( ! newXfnValues.includes( value ) ) {
					newXfnValues.push( value );
				}
			} else {
				newXfnValues = newXfnValues.filter( ( val ) => val !== value );
			}
		}

		const newRel = combineRelValues( newXfnValues, otherValues );
		onUpdateRel( newRel );
	};

	return (
		<div className="xfn-collapsible-section">
			<Button
				className="xfn-section-toggle"
				onClick={ onToggle }
				aria-expanded={ isExpanded }
				icon={ isExpanded ? chevronUp : chevronDown }
				iconPosition="right"
				variant="tertiary"
			>
				{ __( 'XFN', 'link-extension-for-xfn' ) }
				{ xfnValues.length > 0 && (
					<span className="xfn-count-badge">
						{ xfnValues.length }
					</span>
				) }
			</Button>

			{ isExpanded && (
				<div className="xfn-section-content">
					<p className="xfn-section-description">
						{ __(
							'Describe your relationship to this person or organization',
							'link-extension-for-xfn'
						) }
					</p>

					<div className="xfn-relationships">
						{ Object.entries( XFN_RELATIONSHIPS ).map(
							( [ categoryKey, category ] ) => {
								if ( category.type === 'radio' ) {
									const selectedValue =
										category.options.find( ( opt ) =>
											xfnValues.includes( opt.value )
										)?.value || '';

									return (
										<div
											key={ categoryKey }
											className="xfn-category"
										>
											<h4>{ category.label }</h4>
											<ButtonGroup>
												<Button
													isPressed={
														selectedValue === ''
													}
													onClick={ () =>
														updateRelationship(
															categoryKey,
															'',
															true
														)
													}
													size="compact"
												>
													{ __(
														'None',
														'link-extension-for-xfn'
													) }
												</Button>
												{ category.options.map(
													( option ) => (
														<Button
															key={ option.value }
															isPressed={
																selectedValue ===
																option.value
															}
															onClick={ () =>
																updateRelationship(
																	categoryKey,
																	option.value,
																	true
																)
															}
															size="compact"
														>
															{ option.label }
														</Button>
													)
												) }
											</ButtonGroup>
										</div>
									);
								} else {
									return (
										<div
											key={ categoryKey }
											className="xfn-category"
										>
											<h4>{ category.label }</h4>
											<ButtonGroup>
												{ category.options.map(
													( option ) => (
														<Button
															key={ option.value }
															isPressed={ xfnValues.includes(
																option.value
															) }
															onClick={ () =>
																updateRelationship(
																	categoryKey,
																	option.value,
																	! xfnValues.includes(
																		option.value
																	)
																)
															}
															size="compact"
														>
															{ option.label }
														</Button>
													)
												) }
											</ButtonGroup>
										</div>
									);
								}
							}
						) }
					</div>

					{ xfnValues.length > 0 && (
						<div className="xfn-summary">
							<h4>
								{ __(
									'Active Relationships:',
									'link-extension-for-xfn'
								) }
							</h4>
							<div className="xfn-pills">
								{ xfnValues.map( ( rel ) => (
									<span
										key={ rel }
										className={ `xfn-pill xfn-pill-${ rel }` }
									>
										{ rel }
									</span>
								) ) }
							</div>
						</div>
					) }
				</div>
			) }
		</div>
	);
};

/**
 * XFN Toolbar Popover Component
 */
const XFNToolbarPopover = ( {
	isVisible,
	onClose,
	currentRel,
	onUpdateRel,
	anchorRef,
} ) => {
	const [ isXFNExpanded, setXFNExpanded ] = useState( false );

	if ( ! isVisible ) {
		return null;
	}

	return (
		<Popover
			position="bottom center"
			onClose={ onClose }
			anchorRef={ anchorRef?.current }
			className="xfn-toolbar-popover"
			focusOnMount="firstElement"
		>
			<div className="xfn-toolbar-popover-content">
				<div className="xfn-toolbar-header">
					<h3>
						{ __(
							'Link Settings',
							'link-extension-for-xfn'
						) }
					</h3>
				</div>

				<XFNCollapsibleSection
					currentRel={ currentRel }
					onUpdateRel={ onUpdateRel }
					isExpanded={ isXFNExpanded }
					onToggle={ () => setXFNExpanded( ! isXFNExpanded ) }
				/>
			</div>
		</Popover>
	);
};

/**
 * XFN Inspector Controls Component (for blocks that are entirely links)
 */
const XFNInspectorControls = ( { attributes, setAttributes, name } ) => {
	const currentRel = getRelFromBlock( attributes, name );
	const { xfn: xfnValues, other: otherValues } =
		parseRelAttribute( currentRel );

	const updateXFNValues = ( newXfnValues ) => {
		const newRel = combineRelValues( newXfnValues, otherValues );
		setRelForBlock( attributes, setAttributes, newRel, name );
	};

	const updateRelationship = ( category, value, isChecked ) => {
		let newXfnValues = [ ...xfnValues ];

		if ( XFN_RELATIONSHIPS[ category ].type === 'radio' ) {
			const categoryValues = XFN_RELATIONSHIPS[ category ].options.map(
				( opt ) => opt.value
			);
			newXfnValues = newXfnValues.filter(
				( val ) => ! categoryValues.includes( val )
			);

			if ( isChecked ) {
				newXfnValues.push( value );
			}
		} else {
			if ( isChecked ) {
				if ( ! newXfnValues.includes( value ) ) {
					newXfnValues.push( value );
				}
			} else {
				newXfnValues = newXfnValues.filter( ( val ) => val !== value );
			}
		}

		updateXFNValues( newXfnValues );
	};

	return (
		<InspectorControls>
			<PanelBody
				title={ __(
					'XFN Relationships',
					'link-extension-for-xfn'
				) }
				initialOpen={ false }
				className="xfn-inspector-panel"
			>
				<p className="xfn-panel-description">
					{ __(
						'Describe your relationship to the people or organizations you link to using XFN (XHTML Friends Network) markup.',
						'link-extension-for-xfn'
					) }
				</p>

				{ Object.entries( XFN_RELATIONSHIPS ).map(
					( [ categoryKey, category ] ) => {
						if ( category.type === 'radio' ) {
							const selectedValue =
								category.options.find( ( opt ) =>
									xfnValues.includes( opt.value )
								)?.value || '';
							const radioOptions = [
								{
									label: __(
										'None',
										'link-extension-for-xfn'
									),
									value: '',
								},
								...category.options,
							];

							return (
								<div
									key={ categoryKey }
									className="xfn-category-section"
								>
									<RadioControl
										label={ category.label }
										help={ category.description }
										selected={ selectedValue }
										options={ radioOptions }
										onChange={ ( value ) => {
											updateRelationship(
												categoryKey,
												value,
												value !== ''
											);
										} }
									/>
								</div>
							);
						} else {
							return (
								<div
									key={ categoryKey }
									className="xfn-category-section"
								>
									<h4 className="xfn-category-title">
										{ category.label }
									</h4>
									<p className="xfn-category-help">
										{ category.description }
									</p>
									{ category.options.map( ( option ) => (
										<CheckboxControl
											key={ option.value }
											label={ option.label }
											checked={ xfnValues.includes(
												option.value
											) }
											onChange={ ( isChecked ) => {
												updateRelationship(
													categoryKey,
													option.value,
													isChecked
												);
											} }
										/>
									) ) }
								</div>
							);
						}
					}
				) }

				{ xfnValues.length > 0 && (
					<div className="xfn-selected-summary">
						<h4>
							{ __(
								'Selected Relationships:',
								'link-extension-for-xfn'
							) }
						</h4>
						<div className="xfn-pills">
							{ xfnValues.map( ( rel ) => (
								<span
									key={ rel }
									className={ `xfn-pill xfn-pill-${ rel }` }
								>
									{ rel }
								</span>
							) ) }
						</div>
					</div>
				) }
			</PanelBody>
		</InspectorControls>
	);
};

/**
 * Global state to track XFN editing mode
 */
let isXFNEditingActive = false;
let currentXFNValues = [];
let currentOtherValues = [];

/**
 * Inject XFN controls into LinkControl Advanced panel
 */
function injectXFNControls() {
	// Wait for link controls to be available
	setTimeout( () => {
		const linkControls = document.querySelector(
			'.block-editor-link-control'
		);
		if ( ! linkControls ) {
			return;
		}

		// Look for the Advanced panel
		const advancedToggle = linkControls.querySelector(
			'.block-editor-link-control__tools .components-button'
		);
		if ( ! advancedToggle ) {
			return;
		}

		// Check if Advanced panel is expanded
		const isAdvancedOpen =
			advancedToggle.getAttribute( 'aria-expanded' ) === 'true';
		if ( ! isAdvancedOpen ) {
			return;
		}

		// Look for the settings panel container
		const settingsPanel = linkControls.querySelector(
			'.block-editor-link-control__settings'
		);
		if ( ! settingsPanel ) {
			return;
		}

		// Check if XFN controls are already injected
		if ( settingsPanel.querySelector( '.xfn-collapsible-section' ) ) {
			return;
		}

		// Get current rel value from the link control
		const relInput = linkControls.querySelector(
			'input[type="text"][placeholder*="rel"], input[id*="rel"]'
		);
		const currentRel = relInput ? relInput.value : '';
		const { xfn: xfnValues, other: otherValues } =
			parseRelAttribute( currentRel );

		currentXFNValues = [ ...xfnValues ];
		currentOtherValues = [ ...otherValues ];

		// Create XFN collapsible section
		const xfnContainer = document.createElement( 'div' );
		xfnContainer.className = 'xfn-collapsible-section';
		xfnContainer.innerHTML = createXFNCollapsibleHTML( currentXFNValues );

		// Insert XFN controls after existing controls
		settingsPanel.appendChild( xfnContainer );

		// Add event listeners
		addXFNEventListeners( xfnContainer, relInput );
	}, 100 );
}

/**
 * Create HTML for XFN collapsible section
 */
function createXFNCollapsibleHTML( xfnValues ) {
	const countBadge =
		xfnValues.length > 0
			? `<span class="xfn-count-badge">${ xfnValues.length }</span>`
			: '';

	let html = `
		<button 
			class="xfn-section-toggle components-button is-tertiary" 
			aria-expanded="false" 
			type="button"
		>
			XFN ${ countBadge }
			<svg class="xfn-chevron" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z"/>
			</svg>
		</button>
		<div class="xfn-section-content" style="display: none;">
			<p class="xfn-section-description">
				${ __(
					'Describe your relationship to this person or organization',
					'link-extension-for-xfn'
				) }
			</p>
	`;

	Object.entries( XFN_RELATIONSHIPS ).forEach(
		( [ categoryKey, category ] ) => {
			html += `<div class="xfn-category" data-category="${ categoryKey }">`;
			html += `<h4>${ category.label }</h4>`;

			if ( category.type === 'radio' ) {
				const selectedValue =
					category.options.find( ( opt ) =>
						xfnValues.includes( opt.value )
					)?.value || '';

				html += `<div class="xfn-button-group">`;
				html += `<button class="components-button is-compact ${
					selectedValue === '' ? 'is-pressed' : ''
				}" data-value="">${ __(
					'None',
					'link-extension-for-xfn'
				) }</button>`;

				category.options.forEach( ( option ) => {
					html += `<button class="components-button is-compact ${
						selectedValue === option.value ? 'is-pressed' : ''
					}" data-value="${ option.value }">${
						option.label
					}</button>`;
				} );
				html += `</div>`;
			} else {
				html += `<div class="xfn-button-group">`;
				category.options.forEach( ( option ) => {
					const isPressed = xfnValues.includes( option.value );
					html += `<button class="components-button is-compact ${
						isPressed ? 'is-pressed' : ''
					}" data-value="${ option.value }">${
						option.label
					}</button>`;
				} );
				html += `</div>`;
			}

			html += `</div>`;
		}
	);

	// Add summary if there are selected relationships
	if ( xfnValues.length > 0 ) {
		html += `<div class="xfn-summary">`;
		html += `<h4>${ __(
			'Active Relationships:',
			'link-extension-for-xfn'
		) }</h4>`;
		html += `<div class="xfn-pills">`;
		xfnValues.forEach( ( rel ) => {
			html += `<span class="xfn-pill xfn-pill-${ rel }">${ rel }</span>`;
		} );
		html += `</div></div>`;
	}

	html += `</div>`;

	return html;
}

/**
 * Add event listeners to XFN collapsible section
 */
function addXFNEventListeners( container, relInput ) {
	const toggle = container.querySelector( '.xfn-section-toggle' );
	const content = container.querySelector( '.xfn-section-content' );
	const chevron = toggle.querySelector( '.xfn-chevron' );

	const updateRelAttribute = () => {
		const newRel = combineRelValues( currentXFNValues, currentOtherValues );
		if ( relInput ) {
			relInput.value = newRel;
			relInput.dispatchEvent( new Event( 'input', { bubbles: true } ) );
		}

		// Update the visual summary and count badge
		updateXFNSummary( container );
		updateCountBadge( toggle );
	};

	// Toggle functionality
	toggle.addEventListener( 'click', ( e ) => {
		e.preventDefault();
		const isExpanded = toggle.getAttribute( 'aria-expanded' ) === 'true';
		const newState = ! isExpanded;

		toggle.setAttribute( 'aria-expanded', newState );
		content.style.display = newState ? 'block' : 'none';
		chevron.style.transform = newState ? 'rotate(180deg)' : 'rotate(0deg)';
	} );

	// Handle button clicks
	container
		.querySelectorAll( '.xfn-button-group .components-button' )
		.forEach( ( button ) => {
			button.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				const category =
					e.target.closest( '.xfn-category' ).dataset.category;
				const value = e.target.dataset.value;
				const buttonGroup = e.target.closest( '.xfn-button-group' );

				if ( XFN_RELATIONSHIPS[ category ].type === 'radio' ) {
					// Remove all values from this category
					const categoryValues = XFN_RELATIONSHIPS[
						category
					].options.map( ( opt ) => opt.value );
					currentXFNValues = currentXFNValues.filter(
						( val ) => ! categoryValues.includes( val )
					);

					// Add new value if not empty
					if ( value ) {
						currentXFNValues.push( value );
					}

					// Update button states in group
					buttonGroup
						.querySelectorAll( '.components-button' )
						.forEach( ( btn ) => {
							btn.classList.remove( 'is-pressed' );
						} );
					e.target.classList.add( 'is-pressed' );
				} else {
					// Toggle checkbox behavior
					const isPressed =
						e.target.classList.contains( 'is-pressed' );

					if ( isPressed ) {
						currentXFNValues = currentXFNValues.filter(
							( val ) => val !== value
						);
						e.target.classList.remove( 'is-pressed' );
					} else {
						if ( ! currentXFNValues.includes( value ) ) {
							currentXFNValues.push( value );
						}
						e.target.classList.add( 'is-pressed' );
					}
				}

				updateRelAttribute();
			} );
		} );
}

/**
 * Update XFN visual summary
 */
function updateXFNSummary( container ) {
	let summaryContainer = container.querySelector( '.xfn-summary' );

	if ( currentXFNValues.length === 0 ) {
		if ( summaryContainer ) {
			summaryContainer.remove();
		}
		return;
	}

	if ( ! summaryContainer ) {
		summaryContainer = document.createElement( 'div' );
		summaryContainer.className = 'xfn-summary';
		container
			.querySelector( '.xfn-section-content' )
			.appendChild( summaryContainer );
	}

	let html = `<h4>${ __(
		'Active Relationships:',
		'link-extension-for-xfn'
	) }</h4>`;
	html += `<div class="xfn-pills">`;
	currentXFNValues.forEach( ( rel ) => {
		html += `<span class="xfn-pill xfn-pill-${ rel }">${ rel }</span>`;
	} );
	html += `</div>`;

	summaryContainer.innerHTML = html;
}

/**
 * Update count badge in toggle button
 */
function updateCountBadge( toggle ) {
	let badge = toggle.querySelector( '.xfn-count-badge' );

	if ( currentXFNValues.length === 0 ) {
		if ( badge ) {
			badge.remove();
		}
		return;
	}

	if ( ! badge ) {
		badge = document.createElement( 'span' );
		badge.className = 'xfn-count-badge';
		toggle.insertBefore( badge, toggle.querySelector( '.xfn-chevron' ) );
	}

	badge.textContent = currentXFNValues.length;
}

/**
 * Monitor for link control changes and inject XFN controls
 */
function startXFNMonitoring() {
	const observer = new MutationObserver( ( mutations ) => {
		mutations.forEach( ( mutation ) => {
			if ( mutation.type === 'childList' ) {
				const addedNodes = Array.from( mutation.addedNodes );

				// Check if link control was added
				addedNodes.forEach( ( node ) => {
					if ( node.nodeType === Node.ELEMENT_NODE ) {
						if (
							node.classList?.contains(
								'block-editor-link-control'
							) ||
							node.querySelector?.( '.block-editor-link-control' )
						) {
							injectXFNControls();
						}

						// Check for advanced settings expansion
						if (
							node.classList?.contains(
								'block-editor-link-control__settings'
							) ||
							node.querySelector?.(
								'.block-editor-link-control__settings'
							)
						) {
							injectXFNControls();
						}
					}
				} );
			}

			// Also check for attribute changes that might indicate advanced panel expansion
			if (
				mutation.type === 'attributes' &&
				mutation.attributeName === 'aria-expanded'
			) {
				injectXFNControls();
			}
		} );
	} );

	observer.observe( document.body, {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: [ 'aria-expanded' ],
	} );

	// Also monitor clicks on advanced toggle buttons
	document.addEventListener( 'click', ( e ) => {
		if (
			e.target.closest(
				'.block-editor-link-control__tools .components-button'
			)
		) {
			setTimeout( injectXFNControls, 50 );
		}
	} );
}

/**
 * Filter to add XFN controls to blocks that are entirely links
 */
const withXFNControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { attributes, name } = props;
		const [ isXFNPopoverVisible, setXFNPopoverVisible ] = useState( false );
		const xfnButtonRef = useState( null );

		// List of blocks that support links as the entire block
		const supportedBlocks = [
			'core/button',
			'core/image',
			'core/navigation-link',
			'core/site-logo',
			'core/post-title',
			'core/query-title',
		];

		// Check if this block type should have XFN controls in inspector
		const shouldShowXFN =
			supportedBlocks.includes( name ) ||
			attributes.hasOwnProperty( 'url' ) ||
			attributes.hasOwnProperty( 'href' ) ||
			attributes.hasOwnProperty( 'linkDestination' );

		if ( ! shouldShowXFN ) {
			return <BlockEdit { ...props } />;
		}

		const currentRel = getRelFromBlock( attributes, name );

		const handleXFNUpdate = ( newRel ) => {
			setRelForBlock( attributes, props.setAttributes, newRel, name );
		};

		return (
			<>
				<BlockEdit { ...props } />
				<XFNInspectorControls { ...props } />
				<BlockControls>
					<Button
						ref={ xfnButtonRef[ 0 ] }
						icon={ link }
						label={ __(
							'XFN Relationships',
							'link-extension-for-xfn'
						) }
						onClick={ () =>
							setXFNPopoverVisible( ! isXFNPopoverVisible )
						}
						isPressed={ isXFNPopoverVisible }
						className="xfn-toolbar-button"
					>
						{ __( 'XFN', 'link-extension-for-xfn' ) }
					</Button>
				</BlockControls>
				<XFNToolbarPopover
					isVisible={ isXFNPopoverVisible }
					onClose={ () => setXFNPopoverVisible( false ) }
					currentRel={ currentRel }
					onUpdateRel={ handleXFNUpdate }
					anchorRef={ xfnButtonRef[ 0 ] }
				/>
			</>
		);
	};
}, 'withXFNControls' );

// Apply the filter for block-level links
addFilter(
	'editor.BlockEdit',
	'xfn-link-extension/with-xfn-controls',
	withXFNControls
);

// Start monitoring for inline links
if ( typeof document !== 'undefined' ) {
	// Wait for editor to be ready
	setTimeout( startXFNMonitoring, 1000 );
}

console.log(
	'XFN Link Extension loaded successfully! XFN controls will appear:'
);
console.log(
	'1. In the floating toolbar for link blocks (Button, Navigation, etc.)'
);
console.log( '2. In Inspector Controls for link blocks' );
console.log(
	'3. In a collapsible XFN section in link popovers for inline links'
);
