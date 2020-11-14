import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import CustomDrawer from "../src/CustomDrawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Brightness4 } from "@material-ui/icons";
import { useRouter } from "next/router";
import { Fab, Hidden, Link, Tooltip } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { CookiesProvider, useCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		// backgroundColor: "#373b42",
		background: "linear-gradient(120deg, #7289da, #66a6ff)",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	navTheme: {
		marginRight: theme.spacing(1),
	},
	title: {
		flexGrow: 1,
	},
	discordFab: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
		fontSize: 26,
		color: "white",
	},
}));

const themeObject = {
	palette: {
		type: "dark",
		background: {
			default: "#282b30",
		},
		secondary: {
			main: "#7289DA",
			dark: "#7289DA",
			light: "#7289DA",
		},
	},
};

const useDarkMode = (setCookie) => {
	const [theme, setTheme] = React.useState(themeObject);

	const {
		palette: { type },
	} = theme;
	const toggleDarkMode = () => {
		const updatedTheme = {
			...theme,
			palette: {
				...theme.palette,
				type: type === "light" ? "dark" : "light",
				background: {
					default: type === "dark" ? "#f3f3f3" : "#282b30",
				},
			},
		};
		setCookie("theme", type === "dark" ? "light" : "dark");
		setTheme(updatedTheme);
	};
	return [theme, toggleDarkMode];
};

const appBarTheme = createMuiTheme(themeObject);

export default function MinehutXYZ(props) {
	const [cookies, setCookie] = useCookies(["theme"]);
	const classes = useStyles();
	themeObject.palette.type = cookies.theme || "dark";
	themeObject.palette.background.default =
		themeObject.palette.type === "light" ? "#f3f3f3" : "#282b30";

	const [theme, toggleDarkMode] = useDarkMode(setCookie);

	const { Component, pageProps } = props;
	const themeConfig = createMuiTheme(theme);

	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	const router = useRouter();
	let title = router.asPath
		.split("/")
		[router.asPath.split("/").length - 1].replace(/-(.)/g, (e) =>
			e[1].toUpperCase()
		)
		.replace("-", " ");
	if (title) title = title[0].toUpperCase() + title.slice(1);

	return (
		<CookiesProvider>
			<React.Fragment>
				<Head>
					<title>
						{"minehut.xyz" + (title ? " | " + title : "")}
					</title>
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width"
					/>
					<script
						src="https://kit.fontawesome.com/9a67ea5597.js"
						crossOrigin="anonymous"
					></script>
				</Head>
				<ThemeProvider theme={themeConfig}>
					<div className={classes.root}>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						<AppBar position="fixed" className={classes.appBar}>
							<ThemeProvider theme={appBarTheme}>
								<Toolbar>
									<Hidden mdUp>
										<IconButton
											onClick={() => setOpen(!open)}
											className={classes.menuButton}
										>
											<MenuIcon />
										</IconButton>
									</Hidden>
									<Typography
										variant="h6"
										className={classes.title}
									>
										minehut.xyz
									</Typography>
									<Tooltip title="Toggle light/dark theme">
										<IconButton
											className={classes.themeIcon}
											onClick={toggleDarkMode}
										>
											<Brightness4 />
										</IconButton>
									</Tooltip>
								</Toolbar>
							</ThemeProvider>
						</AppBar>
						<CustomDrawer open={open} setOpen={setOpen} />
						<main className={classes.content}>
							<Toolbar />
							<Component {...pageProps} />
						</main>
						<Tooltip title="Join us on Discord!">
							<Fab
								component={Link}
								href="https://discord.gg/bS6FMMCVyg"
								underline="none"
								color="secondary"
								className={classes.discordFab}
								rel="noreferrer"
								target="_blank"
							>
								<i aria-hidden className="fab fa-discord" />
							</Fab>
						</Tooltip>
					</div>
				</ThemeProvider>
			</React.Fragment>
		</CookiesProvider>
	);
}

MinehutXYZ.propTypes = {
	Component: PropTypes.elementType.isRequired,
	pageProps: PropTypes.object.isRequired,
};
