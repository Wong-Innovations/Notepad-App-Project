import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/AddOutlined'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolderOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import MenuIcon from '@material-ui/icons/Menu';
import SaveIcon from '@material-ui/icons/SaveOutlined'
import SaveAltIcon from '@material-ui/icons/SaveAltOutlined'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const fakeData = {
  folders: [
    {
      name: "My Folder",
      contents: [
        {
          name: "Passwords & Secrets",
          value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam dictum rutrum ante vel euismod. Integer dapibus velit non sagittis fringilla. Aenean cursus risus malesuada, consequat nisi vel, posuere lectus. In ut augue a augue eleifend elementum quis ut eros."
        },
        {
          name: "Another Note",
          value: "Praesent magna nulla, tempor id arcu eu, scelerisque ultricies orci. Donec odio nulla, tincidunt a vehicula ut, interdum a turpis. Suspendisse auctor eu nulla quis imperdiet."
        }
      ]
    },
    //...
    {
      name: "Misc",
      contents: [
        {
          name: "A Misc Note",
          value: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed sit amet metus sed urna commodo sollicitudin. Quisque tincidunt nulla purus."
        },
        {
          name: "Feynman's Lectures",
          value: "This two-year course in physics is presented from the point of view that you, the reader, are going to be a physicist. This is not necessarily the case of course, but that is what every professor in every subject assumes!"
        }
      ]
    }
  ]
};

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerIcon: {
    height: '64px'
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    minHeight: '64px'
  },
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  notePreview: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Button color="inherit" className={classes.drawerIcon}>
          <AddIcon fontSize="large" />
        </Button>
        <Button color="inherit" className={classes.drawerIcon}>
          <CreateNewFolderIcon fontSize="large" />
        </Button>
        <Button color="inherit" className={classes.drawerIcon}>
          <SaveAltIcon fontSize="large" />
        </Button>
      </div>
      <Divider />
      <List
        component="nav"
      >
        {fakeData.folders.map((folder) => {
        if (folder.name !== "Misc") {
          return (
            <div>
            <ListItem button onClick={handleClick}>
              <ListItemText primary={folder.name} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {folder.contents.map((note) => {
                  return (
                    <ListItem button className={classes.nested}>
                      <ListItemText primary={note.name} />
                    </ListItem>
                  )
                })}
              </List>
            </Collapse>
            </div>
          )
        } else {
          return (
            <div>
              {folder.contents.map((note) => {
                return (
                  <ListItem button>
                    <ListItemText primary={note.name} />
                  </ListItem>
                )
              })}
            </div>
          )
        }
      })}
      </List>
    </div>
  );

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
          <Typography className={classes.title} variant="h6" noWrap>
            Notepad
          </Typography>
          <Button color="inherit">
            <SaveIcon fontSize="large" />
          </Button>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
        <Typography paragraph>
          Replace This Typography With A Slate Editor Component
        </Typography>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default ResponsiveDrawer;