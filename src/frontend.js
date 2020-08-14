import domReady from '@wordpress/dom-ready';
import Splitscreen from 'react-draggable-splitscreen';
import { render } from '@wordpress/element';

/**
 * Renders the component into its root using stringified JSON attributes.
 *
 * @param {HTMLElement} root Root element
 */
function renderSplitscreen( root ) {
	let left;
	let right;

	try {
		left = JSON.parse( root.getAttribute( 'data-left' ) );
		right = JSON.parse( root.getAttribute( 'data-right' ) );
	} catch ( e ) {
		return;
	}

	if ( ! left || ! right ) {
		return;
	}

	render(
		<Splitscreen
			leftSide={
				<img
					alt={ left.alt }
					height={ left.height }
					width={ left.width }
					src={ left.url }
				/>
			}
			rightSide={
				<img
					alt={ right.alt }
					height={ right.height }
					width={ right.width }
					src={ right.url }
				/>
			}
		/>,
		root
	);
}

domReady( () => {
	[
		...document.querySelectorAll(
			'.entry-content .wp-block-johnwatkins0-splitscreen'
		),
	].forEach( renderSplitscreen );
} );
