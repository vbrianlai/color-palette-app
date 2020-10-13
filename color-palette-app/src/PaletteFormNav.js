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

import { Link } from 'react-router-dom';

import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorNameInput: '',
            formOpen: false
            // paletteNameInput: ''
        }
        // this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    showForm() {
        this.setState({formOpen: true})
    }

    hideForm() {
        this.setState({formOpen: false})
    }

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
                        
                        <Link to='/'>
                            <Button className={classes.button} variant='contained' color='secondary'>Go Back</Button>
                        </Link>
                        <Button className={classes.button} variant="contained" color="primary" onClick={this.showForm}>
                            Save
                        </Button>
                    </div>
                </AppBar>
                {this.state.formOpen && <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm}/>}
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);
