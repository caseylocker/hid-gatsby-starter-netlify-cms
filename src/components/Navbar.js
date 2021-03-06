import React from "react";
import { graphql, StaticQuery, Link } from "gatsby";
import logo from "../img/logo.svg";
import { useLocation } from "@reach/router";

const NavbarTemplate = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			navBarActiveClass: "",
			activeComponentsDropdownClass: "",
		};
	}

	toggleHamburger() {
		// toggle the active boolean in the state
		this.setState(
			{
				active: !this.state.active,
			},
			// after state has been updated,
			() => {
				// set the class in state for the navbar accordingly
				this.state.active
					? this.setState({
							navBarActiveClass: "is-active",
					  })
					: this.setState({
							navBarActiveClass: "",
					  });
			}
		);
	}

	render() {
		const { data } = this.props;
		const { edges: componentLinks } = data.components;
		const { edges: widgetLinks } = data.widgets;

		const location = this.props.location ? this.props.location.pathname : "";

		if (location !== "") {
			let regexp = /^\/components/;
			if (regexp.test(location)) {
				this.state.activeComponentsDropdownClass = "is-active-dropdown";
			}
			regexp = /^\/widgets/;
			if (regexp.test(location)) {
				this.state.activeWidgetsDropdownClass = "is-active-dropdown";
			}
		}

		return (
			<nav className="navbar has-shadow" role="navigation" aria-label="main-navigation">
				<div className="container">
					<div className="navbar-brand">
						<Link to="/" className="navbar-item logo" title="Logo">
							<img src={logo} alt="HID Design System" style={{ width: "321px" }} />
						</Link>
						{/* Hamburger menu */}
						<div
							className={`navbar-burger burger ${this.state.navBarActiveClass}`}
							data-target="navMenu"
							role="menuitem"
							tabIndex={0}
							onKeyPress={() => this.toggleHamburger()}
							onClick={() => this.toggleHamburger()}
						>
							<span />
							<span />
							<span />
						</div>
					</div>
					<div id="navMenu" className={`navbar-menu ${this.state.navBarActiveClass}`}>
						<div className="navbar-end has-text-centered has-text-left-touch">
							<Link activeClassName="is-active" className="navbar-item" to="/gettingstarted">
								Getting Started
							</Link>
							<Link activeClassName="is-active" className="navbar-item" to="/fundamentals">
								Fundamentals
							</Link>
							<div className={`navbar-item has-dropdown is-hoverable ${this.state.activeComponentsDropdownClass}`}>
								<Link activeClassName="is-active" className="navbar-link is-arrowless" partiallyActive={true} to="/components">
									Components
								</Link>
								<div className="navbar-dropdown">
									{componentLinks &&
										componentLinks.map(({ node: componentLink, key }) => (
											<Link activeClassName="is-active" className="navbar-item" to={componentLink.fields.slug} key={Math.random()}>
												{componentLink.frontmatter.title}
											</Link>
										))}
								</div>
							</div>
							<div className={`navbar-item has-dropdown is-hoverable ${this.state.activeWidgetsDropdownClass}`}>
								<Link activeClassName="is-active" className="navbar-link is-arrowless" partiallyActive={true} to="/widgets">
									Widgets
								</Link>
								<div className="navbar-dropdown">
									{widgetLinks &&
										widgetLinks.map(({ node: widgetLink, key }) => (
											<Link activeClassName="is-active" className="navbar-item" to={widgetLink.fields.slug} key={Math.random()}>
												{widgetLink.frontmatter.title}
											</Link>
										))}
								</div>
							</div>
							{/* <Link activeClassName="is-active" className="navbar-item" to="/widgets">
								Widgets
							</Link> */}
							<Link activeClassName="is-active" className="navbar-item" to="/ui-shell">
								UI Shell
							</Link>
							<Link activeClassName="is-active" className="navbar-item" to="/page-templates">
								Page Templates
							</Link>
						</div>
					</div>
				</div>
			</nav>
		);
	}
};

export default function Navbar() {
	const location = useLocation();
	return (
		<StaticQuery
			query={graphql`
				query NavbarQuery {
					components: allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___title] }, filter: { frontmatter: { templateKey: { eq: "component-post" } } }) {
						edges {
							node {
								id
								fields {
									slug
								}
								frontmatter {
									title
									templateKey
								}
							}
						}
					}
					widgets: allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___title] }, filter: { frontmatter: { templateKey: { eq: "widget-post" } } }) {
						edges {
							node {
								id
								fields {
									slug
								}
								frontmatter {
									title
									templateKey
								}
							}
						}
					}
				}
			`}
			render={(data) => <NavbarTemplate data={data} location={location} />}
		/>
	);
}
