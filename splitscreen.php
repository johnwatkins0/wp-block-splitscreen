<?php
/**
 * Plugin Name:     Splitscreen
 * Description:     Displays two media files with a splitscreen effect, with an optional draggable handle to show more or less of each side.
 * Version:         0.1.0
 * Author:          John Watkins
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     johnwatkins0
 *
 * @package         johnwatkins0
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function johnwatkins_0_splitscreen_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "johnwatkins0/splitscreen" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'johnwatkins0-splitscreen-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	$frontend_script_asset_path = "$dir/build/frontend.asset.php";
	if ( ! file_exists( $frontend_script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "johnwatkins0/splitscreen" block first.'
		);
	}
	$frontend_js     = 'build/frontend.js';
	$script_asset = require( $frontend_script_asset_path );
	wp_register_script(
		'johnwatkins0-splitscreen-block-frontend',
		plugins_url( $frontend_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	$editor_css = 'build/index.css';
	wp_register_style(
		'johnwatkins0-splitscreen-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	register_block_type( 'johnwatkins0/splitscreen', array(
		'editor_script' => 'johnwatkins0-splitscreen-block-editor',
		'editor_style'  => 'johnwatkins0-splitscreen-block-editor',
		'script'        => 'johnwatkins0-splitscreen-block-frontend'
	) );
}
add_action( 'init', 'johnwatkins_0_splitscreen_block_init' );
