/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import {
	BlockIcon,
	InspectorControls,
	MediaPlaceholder,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { image as icon } from '@wordpress/icons';
import { PanelBody, PanelRow } from '@wordpress/components';
import { useRef, useEffect, useState } from '@wordpress/element';

import Splitscreen from 'react-draggable-splitscreen';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

export function Image( { alt, height, type, url, width } ) {
	switch ( type ) {
		case 'image':
			return (
				<img
					alt={ alt }
					src={ url }
					height={ height }
					width={ width }
				/>
			);

		default:
			return null;
	}
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { className, attributes, setAttributes } ) {
	const { left, right } = attributes;

	// Save left and right in state to prevent confusing intermediate states when switching or uploading images.
	const [ savedLeft, setSavedLeft ] = useState( left );
	const [ savedRight, setSavedRight ] = useState( right );

	/**
	 * Handles image selection.
	 * 
	 * @param {Object} media Media object.
	 * @param {string} side The image's side, left or right.
	 */
	function onSelectImage( media, side ) {
		if ( ! media || ! media.id ) {
			setAttributes( {
				[ side ]: {},
			} );
			return;
		}

		if (media.media_details) {
			setAttributes( {
				[ side ]: {
					id: media.id,
					type: media.media_type,
					height: media.media_details.height,
					width: media.media_details.width,
					alt: media.alt,
					url: media.url,
				},
			} );
		} else {
			setAttributes( {
				[ side ]: {
					id: media.id,
					type: media.type,
					height: media.height,
					width: media.width,
					alt: media.alt,
					url: media.url,
				},
			} );
		}
	}

	/**
	 * Capture the height to prevent layout shift when rendering on the frontend.
	 */
	const container = useRef();
	useEffect( () => {
		if ( ! container?.current ) {
			return;
		}

		setAttributes( { height: container.current.clientHeight } );
	}, [ savedLeft, savedRight ] );

	/**
	 * Capture attributes in state as they become valid.
	 */
	useEffect( () => {
		if ( left.id ) {
			setSavedLeft( left );
		}
	}, [ left ] );
	useEffect( () => {
		if ( right.id ) {
			setSavedRight( right );
		}
	}, [ right ] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Media items', 'johnwatkins0' ) }>
					<PanelRow className="splitscreen__panel-row">
						<Image { ...left } />
						<MediaReplaceFlow
							mediaId={ { id: savedLeft.id } }
							accept="image"
							onSelect={ ( media ) => {
								onSelectImage( media, 'left' );
							} }
						/>
						{ ! left.id && (
							<MediaPlaceholder
								icon={ <BlockIcon icon={ icon } /> }
								onSelect={ ( media ) => {
									onSelectImage( media, 'left' );
								} }
								accept="image"
								value={ { id: savedLeft.id } }
							/>
						) }
					</PanelRow>
					<PanelRow className="splitscreen__panel-row">
						<Image { ...right } />
						{ right.id && (
							<MediaReplaceFlow
								mediaId={ { id: savedRight.id } }
								accept="image"
								onSelect={ ( media ) => {
									onSelectImage( media, 'right' );
								} }
							/>
						) }
						{ ! right.id && (
							<MediaPlaceholder
								icon={ <BlockIcon icon={ icon } /> }
								onSelect={ ( media ) => {
									onSelectImage( media, 'right' );
								} }
								accept="image"
								value={ { id: savedRight.id } }
							/>
						) }
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div className={ className } ref={ container }>
				<Splitscreen
					leftSide={ <Image { ...savedLeft } /> }
					rightSide={ <Image { ...savedRight } /> }
				/>
			</div>
		</>
	);
}
