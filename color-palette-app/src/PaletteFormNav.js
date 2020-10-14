import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PaletteMetaForm from './PaletteMetaForm';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorNameInput: '',
            formOpen: false
        }
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
        const {classes, open, handleSubmit, palettes, handleDrawerOpen} = this.props;
        const {formOpen} = this.state;
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
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <AddIcon fontSize='large' />
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
                {formOpen && <PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm}/>}
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(PaletteFormNav);
