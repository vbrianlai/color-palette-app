import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {ChromePicker} from 'react-color';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currColor: 'teal',
            colorNameInput: '',
        }
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isNameUnique', (value) => 
            //for every color saved, check if its name is equal to the text value
            this.props.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', () => 
            //for every color saved, check if its color is equal to the color we're trying to add
            this.props.colors.every(
                ({color}) => color !== this.state.currColor
            )
        );
        // ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
        //     //for every color saved, check if its color is equal to the color we're trying to add
        //     this.props.palettes.every(
        //         ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
        //     )
        // );
    }

    updateCurrentColor(newColor) {
        this.setState({currColor: newColor.hex})
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
            // colorNameInput: e.target.value
        })
    }

    handleSubmit(){
        const newColor = {color: this.state.currColor, name: this.state.colorNameInput}
        this.props.addNewColor(newColor);
        this.setState({colorNameInput: ''})
    }

    render() {
        const {isPaletteFull, classes} = this.props;
        const {currColor, colorNameInput} = this.state;
        return (
            <div className={classes.root}>
                <ChromePicker color={currColor} onChangeComplete={this.updateCurrentColor} className={classes.picker}/>

                <ValidatorForm onSubmit={this.handleSubmit}>
                    <TextValidator 
                        variant='filled'
                        margin='normal'
                        placeholder='Color Name'
                        value={colorNameInput} 
                        className={classes.colorNameInput}
                        name='colorNameInput'
                        onChange={this.handleChange}
                        validators={['required', 'isNameUnique', 'isColorUnique']}
                        errorMessages={['This field is required', 'Color name is already taken', 'Color is already being used']}
                    />
                    <Button 
                        variant='contained' 
                        color='primary'
                        className={classes.addColor}
                        style={{backgroundColor: !isPaletteFull ? currColor : 'gray'}} 
                        type='submit'
                        disabled={isPaletteFull}
                    >
                        {!isPaletteFull ? 'Add Color' : 'Palette Full'}
                    </Button>
                </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);
