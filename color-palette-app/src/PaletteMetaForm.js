import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
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

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const {paletteNameInput} = this.state;
        return (
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Save Palette</DialogTitle>
                <ValidatorForm onSubmit={() => this.props.handleSubmit(paletteNameInput)}>
                <DialogContent>
                    <DialogContentText>
                        Please choose a unique name for your palette! &#40;:
                    </DialogContentText>
                    
                    <TextValidator 
                        label='Palette Name'
                        name='paletteNameInput'
                        value={this.state.paletteNameInput}
                        fullWidth
                        margin='normal'
                        onChange={this.handleChange}
                        validators={['required', 'isPaletteNameUnique']}
                        errorMessages={['Enter Palette Name', 'Palette name is already taken']}
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
                </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
}

export default PaletteMetaForm;