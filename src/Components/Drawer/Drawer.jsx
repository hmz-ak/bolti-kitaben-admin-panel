import React from "react";
import PropTypes from "prop-types";
import {
  Hidden,
  Drawer,
  Divider,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import { useStyles } from "./styles";
import MenuIcon from "@material-ui/icons/Menu";
import { useTheme } from "@material-ui/core/styles";
import ListComponent from "./ListComponent";
import AddAudioBook from "../AddAudioBook/AddAudioBook";
import { Route, Switch } from "react-router-dom";
import AddCategory from "../Category/AddCategory";
import Category from "../Category/Category";
import ViewAudioBooks from "../AddAudioBook/ViewAudioBooks";
import SingleAudioBook from "../AddAudioBook/SingleAudioBook";

export default function NavDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Typography className={classes.bolText} align="center">
        BOLTI KITABEN
      </Typography>
      <Divider />
      <ListComponent />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/addAudioBook" render={() => <AddAudioBook />} />
          <Route path="/addCategory" render={() => <AddCategory />} />
          <Route path="/categories" render={() => <Category />} />
          <Route path="/books" render={() => <ViewAudioBooks />} />
          <Route path="/:id" render={() => <SingleAudioBook />} />
        </Switch>
      </main>
    </div>
  );
}

NavDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
