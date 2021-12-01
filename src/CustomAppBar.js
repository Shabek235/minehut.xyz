import {
    makeStyles,
    AppBar,
    ThemeProvider,
    Hidden,
    Toolbar,
    IconButton,
    Tooltip,
    SvgIcon,
    NoSsr,
    Menu,
    MenuItem,
    CircularProgress,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Brightness4 from "@material-ui/icons/Brightness4";
import Brightness7 from "@material-ui/icons/Brightness7";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useEffect, useState } from "react";
import Minehut from "../public/minehut.svg";
import Link from "./Link";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 3,
    },
    toolBar: {
        [theme.breakpoints.only("xs")]: {
            justifyContent: "space-between",
        },
    },
    empty: {
        flexGrow: 1,
    },
}));

export default function CustomAppBar({
    themeConfig,
    appBarTheme,
    toggleDarkMode,
    setOpen,
    open,
    hideAppBar,
}) {
    const classes = useStyles();
    const router = useRouter();

    const isHome = router.pathname === "/";

    const [scrollTop, setScrollTop] = useState(0);

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const scrollHandler = () => {
            setScrollTop(window.pageYOffset);
        };
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    });

    const handler = () => {
        setClicked(false);
        router.events.off("routeChangeComplete", handler);
    };

    if (typeof window !== "undefined")
        router.events.on("routeChangeComplete", handler);

    const menuButton = (
        <Tooltip title="Open menu">
            <IconButton
                onClick={() => setOpen(!open)}
                className={classes.menuButton}
                centerRipple={false}
            >
                <MenuIcon />
            </IconButton>
        </Tooltip>
    );

    return (
        <ThemeProvider theme={appBarTheme}>
            <AppBar
                position="fixed"
                color="inherit"
                className={classes.appBar}
                elevation={scrollTop <= 20 && (isHome || hideAppBar) ? 0 : 4}
                color={
                    scrollTop <= 20 && (isHome || hideAppBar)
                        ? "transparent"
                        : "inherit"
                }
            >
                <Toolbar className={classes.toolBar}>
                    {!isHome && !hideAppBar ? (
                        <Hidden lgUp>{menuButton}</Hidden>
                    ) : (
                        menuButton
                    )}
                    <Tooltip title="Back to home">
                        <IconButton
                            component={Link}
                            href="/"
                            naked
                            centerRipple={false}
                        >
                            <SvgIcon
                                component={Minehut}
                                viewBox="0, 0, 400, 400"
                                fontSize="large"
                            />
                        </IconButton>
                    </Tooltip>
                    <Hidden xsDown>
                        <div className={classes.empty} />
                    </Hidden>
                    <Tooltip title="Search">
                        {clicked ? (
                            <CircularProgress />
                        ) : (
                            <IconButton
                                component={Link}
                                naked
                                href="/search"
                                centerRipple={false}
                                onClick={() => setClicked(true)}
                            >
                                <SearchIcon />
                            </IconButton>
                        )}
                    </Tooltip>
                    <Tooltip title="Toggle light/dark theme">
                        <IconButton
                            onClick={toggleDarkMode}
                            centerRipple={false}
                        >
                            <NoSsr>
                                {themeConfig.palette.type === "light" ? (
                                    <Brightness4 />
                                ) : (
                                    <Brightness7 />
                                )}
                            </NoSsr>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}
