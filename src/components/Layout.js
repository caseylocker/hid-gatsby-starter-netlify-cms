import * as React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./all.sass";
//import useSiteMetadata from "./SiteMetadata";
import settings from "../settings/settings-data.json";
import { withPrefix } from "gatsby";

const TemplateWrapper = ({ children }) => {
	// const { title, description } = useSiteMetadata();
	return (
		<div>
			<Helmet>
				<html lang="en" />
				<title>{settings.title}</title>
				<meta name="description" content={settings.description} />

				<link rel="apple-touch-icon" sizes="180x180" href={`${withPrefix("/")}img/apple-touch-icon.png`} />
				<link rel="icon" type="image/png" href={`${withPrefix("/")}img/favicon-32x32.png`} sizes="32x32" />
				<link rel="icon" type="image/png" href={`${withPrefix("/")}img/favicon-16x16.png`} sizes="16x16" />

				<link rel="manifest" href={`${withPrefix("/")}img/site.webmanifest`} />

				<link rel="mask-icon" href={`${withPrefix("/")}img/safari-pinned-tab.svg`} color="#ff4400" />

				<meta property="og:type" content="business.business" />
				<meta property="og:title" content={settings.title} />
				<meta property="og:url" content="/" />
				<meta name="msapplication-TileColor" content="#2b5797" />
				<meta property="og:image" content={`${withPrefix("/")}img/og-image.jpg`} />
				<meta name="theme-color" content="#ffffff"></meta>
			</Helmet>
			<Navbar />
			<div>{children}</div>
			<Footer />
		</div>
	);
};

export default TemplateWrapper;
