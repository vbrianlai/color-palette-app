import React, { Component } from 'react';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Picker} from 'emoji-mart';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'emoji-mart/css/emoji-mart.css'

class PaletteMetaForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stage: 'form',
            paletteNameInput: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.nextFormStage = this.nextFormStage.bind(this);
        this.savePalette = this.savePalette.bind(this);
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
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    nextFormStage() {
        this.setState({stage: 'emoji'})
    }

    savePalette(emoji){
        // console.log(this.state);
        const newPalette = {
            paletteName: this.state.paletteNameInput, 
            emoji: emoji.native
        };
        this.props.handleSubmit(newPalette);
        this.setState({stage: ''})
    }

    render() {
        const {paletteNameInput, stage} = this.state;
        const {hideForm} = this.props;
        return ( 
            <div>
                <Dialog
                    open={stage === 'emoji'}
                    onClose={hideForm}
                >
                    <DialogTitle>Pick an emoji for your palette</DialogTitle>
                    <Picker
                        title=''
                        onSelect={this.savePalette}
                    />
                </Dialog>
                <Dialog
                    open={stage === 'form'}
                    onClose={hideForm}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Save Palette</DialogTitle>
                    <ValidatorForm onSubmit={this.nextFormStage}>
                    <DialogContent>
                        <DialogContentText>
                            Please choose a unique name for your palette! &#40;:
                        </DialogContentText>
                        
                        <TextValidator 
                            label='Palette Name'
                            name='paletteNameInput'
                            value={paletteNameInput}
                            fullWidth
                            margin='normal'
                            onChange={this.handleChange}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['Enter Palette Name', 'Palette name is already taken']}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={hideForm} color="primary">
                            Cancel
                        </Button>
                        <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
                    </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        );
    }
}

export default PaletteMetaForm;