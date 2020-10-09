import React, { Component } from 'react'
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorBox from './DraggableColorBox';

import {ChromePicker} from 'react-color';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      height: 'calc(100vh - 64px)',
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
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currColor: 'teal',
            nameInput: '',
            colors: [{color: 'blue', name: 'blue'}],
        };
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        const newColor = {color: this.state.currColor, name: this.state.nameInput}
        this.setState({colors: [...this.state.colors, newColor], nameInput: ''});
    }

    handleChange(e) {
        this.setState({nameInput: e.target.value})
    }
    
    render() {
        const { classes, theme } = this.props;
        const { open, colors } = this.state;
    
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
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
                        <Button variant='contained' color='secondary'>Clear Palette</Button>
                        <Button variant='contained' color='primary'>Random Color</Button>
                    </div>
                    
                    <ChromePicker color={this.state.currColor} onChangeComplete={this.updateCurrentColor}/>

                    <ValidatorForm onSubmit={this.addNewColor}>
                        <TextValidator 
                            value={this.state.nameInput} 
                            onChange={this.handleChange}
                            validators={['required', 'isNameUnique', 'isColorUnique']}
                            errorMessages={['This field is required', 'Color name is already taken', 'Color is alreacy being used']}
                        />
                        <Button 
                            variant='contained' 
                            color='primary' 
                            style={{backgroundColor: this.state.currColor}} 
                            type='submit'
                        >
                            Add Color
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
                    {colors.map(color => (
                        <DraggableColorBox color={color.color} name={color.name}/>
                        ))
                    }
                </main>
          </div>
          
        );
      }
}

export default withStyles(styles, {withTheme: true})(NewPaletteForm);