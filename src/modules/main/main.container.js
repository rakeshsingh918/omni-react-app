import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Navigator from './components/Navigator';
import Content from './components/Content';
import Header from './components/Header';
import DenseTable from './components/DenseTable';
import actions from './main.actions';

let theme = createMuiTheme({
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    ...theme.mixins,
    toolbar: {
      minHeight: 48,
    },
  },
};

const drawerWidth = 256;

const styles = {
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    padding: '48px 36px 0',
    background: '#eaeff1',
  },
};

class MainContainer extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = (tabName=null) => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    if(tabName && tabName === "Self Service"){
      this.props.loadQuality();  
    }else{
      this.props.initialLoad();
    }
    
  };
  handleSourceDbChange=(event)=>{
    this.props.enableInvalidTag();
  }
  handleTargetDbChange=(event)=>{
    this.props.enableInvalidTag();
  }

  render() {
    const { classes,categories,isInvalidTag } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                variant="temporary"
                open={this.state.mobileOpen}
                categories={categories}
                onClose={this.handleDrawerToggle}
              />
            </Hidden>
            <Hidden xsDown implementation="css">
              <Navigator PaperProps={{ style: { width: drawerWidth } }} categories={categories} />
            </Hidden>
          </nav>
          <div className={classes.appContent}>
            <Header onDrawerToggle={this.handleDrawerToggle} onTabClick={this.handleDrawerToggle.bind(this)}/>
            <main className={classes.mainContent}>
              {/* <Content /> */}
              <DenseTable isInvalidTag={isInvalidTag} onSourceDbchange={this.handleSourceDbChange} onTargetDbChange = {this.handleTargetDbChange} />
            </main>
          </div>
        </div>
      </ThemeProvider>
    );
  }
  componentDidMount(){
    this.props.initialLoad();
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
      categories: state.reducer.categories,
      isInvalidTag:state.reducer.isInvalidTag
  }
};
const mapDispatchToProps = dispatch => ({
  loadQuality: () => dispatch(actions.loadQualityCategory()),
  initialLoad:()=>dispatch(actions.initialLoad()),
  enableInvalidTag:()=>dispatch(actions.fetchApiData())
})
MainContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(MainContainer));