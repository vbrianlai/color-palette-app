import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';

const drawerWidth = 400;

const styles = (theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      navBtns: {
        display: 'flex',
        flexDirection: 'row'
      }
});

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorNameInput: '',
            // paletteNameInput: ''
        }
        // this.handleChange = this.handleChange.bind(this);
    }

    // componentDidMount() {
    //     ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
    //         //for every color saved, check if its color is equal to the color we're trying to add
    //         this.props.palettes.every(
    //             ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
    //         )
    //     );
    // }

    // handleChange(e) {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //         // colorNameInput: e.target.value
    //     })
    // }

    render() {
        const {classes, open, handleSubmit, palettes} = this.props;
        const {paletteNameInput} = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color='default'
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={this.props.handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Create a Palette
                        </Typography>
                    </Toolbar>
                    <div className={classes.navBtns}>
                        <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit}/>
                        <Link to='/'>
                            <Button variant='contained' color='secondary'>Go Back</Button>
                        </Link>
                    </div>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);
