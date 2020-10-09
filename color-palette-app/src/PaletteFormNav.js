import React, { Component } from 'react'
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

import {ChromePicker} from 'react-color';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import arrayMove from 'array-move';
import { Link } from 'react-router-dom';

export default class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorNameInput: '',
            paletteNameInput: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
            //for every color saved, check if its color is equal to the color we're trying to add
            this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
            // colorNameInput: e.target.value
        })
    }

    render() {
        const {classes, open} = this.props;
        const {paletteNameInput} = this.state;
        return (
            <div>
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
                            Persistent drawer
                        </Typography>
                        <ValidatorForm onSubmit={() => this.props.handleSubmit(paletteNameInput)}>
                            <TextValidator 
                                label='Palette Name'
                                name='paletteNameInput'
                                value={this.state.paletteNameInput}
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Enter Palette Name', 'Palette name is already taken']}
                            />
                            <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
                            <Link to='/'>
                                <Button variant='contained' color='secondary'>Go Back</Button>
                            </Link>
                        </ValidatorForm>

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
