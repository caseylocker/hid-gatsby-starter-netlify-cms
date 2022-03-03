import * as React from "react";
import PropTypes from "prop-types";
import { GatsbyImage } from "gatsby-plugin-image";

const PreviewCompatibleImage = ({ imageInfo }) => {
	const imageStyle = { borderRadius: "0px" };

	const { alt = "", childImageSharp, image } = imageInfo;

	if (image.ext === ".svg") {
		return <img className="svg" style={imageStyle} src={image.publicURL} alt={alt} />;
	} else if (!!image && !!image.childImageSharp) {
		return <GatsbyImage image={image.childImageSharp.gatsbyImageData} style={imageStyle} alt={alt} />;
	} else if (!!childImageSharp) {
		return <GatsbyImage image={childImageSharp.gatsbyImageData} style={imageStyle} alt={alt} />;
		// for Netlify CMS
	} else if (image && image.ext !== ".svg") {
		return <img style={{ imageStyle }} src={image} alt={alt} />;
	} else {
		return null;
	}
};

PreviewCompatibleImage.propTypes = {
	imageInfo: PropTypes.shape({
		alt: PropTypes.string,
		childImageSharp: PropTypes.object,
		image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
		style: PropTypes.object,
	}).isRequired,
};

export default PreviewCompatibleImage;
