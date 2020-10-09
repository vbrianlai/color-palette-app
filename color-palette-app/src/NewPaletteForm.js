import React, { Component } from 'react'
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';

import {ChromePicker} from 'react-color';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
// import { arrayMove } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const drawerWidth = 400;

const styles = (theme) => ({
    root: {
      display: 'flex',
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
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: 'theme.spacing(0, 1)',
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      height: `calc(100vh - 64px)`,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
});

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currColor: 'teal',
            colors: this.props.palettes[0].colors,
            colorNameInput: '',
            paletteNameInput: ''
        };
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this)
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isNameUnique', (value) => 
            //for every color saved, check if its name is equal to the text value
            this.state.colors.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', () => 
            //for every color saved, check if its color is equal to the color we're trying to add
            this.state.colors.every(
                ({color}) => color !== this.state.currColor
            )
        );
        ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
            //for every color saved, check if its color is equal to the color we're trying to add
            this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }
    
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };
    
    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    updateCurrentColor(newColor) {
        this.setState({currColor: newColor.hex})
    }

    addNewColor() {
        const newColor = {color: this.state.currColor, name: this.state.colorNameInput}
        this.setState({colors: [...this.state.colors, newColor], colorNameInput: ''});
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
            // colorNameInput: e.target.value
        })
    }

    handleSubmit() {
        let newName = this.state.paletteNameInput;
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, '-'),
            colors: this.state.colors
        }
        this.props.savePalette(newPalette);
        this.props.history.push('/');
    }

    deleteColor(colorName) {
        this.setState({
            colors: this.state.colors.filter(color => color.name !== colorName)
        })
    }

    clearPalette() {
        this.setState({
            colors: []
        })
    }

    addRandomColor(){
        //pick random color from existing palettes
        const allColors = this.props.palettes.map(p => p.colors).flat();
        let random = Math.floor(Math.random() * allColors.length);
        const randomColor = allColors[random];
        this.setState({colors: [...this.state.colors, randomColor]});
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({colors}) => ({
          colors: arrayMove(colors, oldIndex, newIndex),
        }));
      };
    
    render() {
        const { classes, maxColors } = this.props;
        const { open, colors } = this.state;
        const isPaletteFull = colors.length >= maxColors;
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
                        onClick={this.handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            Persistent drawer
                        </Typography>
                        <ValidatorForm onSubmit={this.handleSubmit}>
                            <TextValidator 
                                label='Palette Name'
                                name='paletteNameInput'
                                value={this.state.paletteNameInput}
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Enter Palette Name', 'Palette name is already taken']}
                            />
                            <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
                        </ValidatorForm>

                        
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon /> 
                        </IconButton>
                    </div>
                    <Divider />

                    <Typography variant='h4'>Design Your Palette!</Typography>
                    <div>
                        <Button variant='contained' color='secondary' onClick={this.clearPalette}>Clear Palette</Button>
                        <Button variant='contained' color='primary' onClick={this.addRandomColor} disabled={isPaletteFull}>Random Color</Button>
                    </div>
                    
                    <ChromePicker color={this.state.currColor} onChangeComplete={this.updateCurrentColor}/>

                    <ValidatorForm onSubmit={this.addNewColor}>
                        <TextValidator 
                            value={this.state.colorNameInput} 
                            name='colorNameInput'
                            onChange={this.handleChange}
                            validators={['required', 'isNameUnique', 'isColorUnique']}
                            errorMessages={['This field is required', 'Color name is already taken', 'Color is already being used']}
                        />
                        <Button 
                            variant='contained' 
                            color='primary' 
                            style={{backgroundColor: !isPaletteFull ? this.state.currColor : 'gray'}} 
                            type='submit'
                            disabled={isPaletteFull}
                        >
                            {!isPaletteFull ? 'Add Color' : 'Palette Full'}
                        </Button>
                    </ValidatorForm>
                    

                </Drawer>
            
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {/* stuff goes here */}
                    <DraggableColorList
                        colors={this.state.colors}
                        deleteColor={this.deleteColor}
                        axis='xy'
                        onSortEnd={this.onSortEnd}
                    />
                    
                </main>
          </div>
          
        );
      }
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);