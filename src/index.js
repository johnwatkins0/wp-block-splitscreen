import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

registerBlockType( 'johnwatkins0/splitscreen', {
	attributes: {
		height: {
			type: 'integer',
			default: 200,
		},
		left: {
			type: 'object',
			default: {},
		},
		right: {
			type: 'object',
			default: {},
		},
	},
	title: __( 'Splitscreen', 'johnwatkins0' ),
	description: __(
		'Displays two media files with a splitscreen effect, with an optional draggable handle to show more or less of each side.',
		'johnwatkins0'
	),
	category: 'widgets',
	icon: 'smiley',
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},
	edit: Edit,
	save,
} );
