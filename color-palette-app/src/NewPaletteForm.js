import React, { Component } from 'react'
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';

const drawerWidth = 400;

const styles = (theme) => ({
    root: {
      display: 'flex',
    //   alignItems: 'center'
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
      display: 'flex',
      alignItems: 'center'
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
    container: {
        width: '90%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        width: '100%'
    },
    button: {
        width: '50%'
    }
});

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            colors: this.props.palettes[0].colors,
            paletteNameInput: ''
        };
        this.addNewColor = this.addNewColor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this)
    }
    
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };
    
    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    addNewColor(newColor) {
        this.setState({colors: [...this.state.colors, newColor], colorNameInput: ''});
    }

    handleSubmit(newPalette) {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
        newPalette.colors = this.state.colors;
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
        const { classes, maxColors, palettes} = this.props;
        const { open, colors } = this.state;
        const isPaletteFull = colors.length >= maxColors;
        return (
            <div className={classes.root}>
                <PaletteFormNav open={open} palettes = {palettes} handleSubmit={this.handleSubmit} handleDrawerOpen={this.handleDrawerOpen}/>
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

                    <div className={classes.container}>
                        <Typography variant='h4' gutterBottom>Design Your Palette!</Typography>
                        <div className={classes.buttons}>
                            <Button variant='contained' color='secondary' className={classes.button} onClick={this.clearPalette}>Clear Palette</Button>
                            <Button variant='contained' color='primary' className={classes.button} onClick={this.addRandomColor} disabled={isPaletteFull}>Random Color</Button>
                        </div>
                        <ColorPickerForm isPaletteFull={isPaletteFull} addNewColor={this.addNewColor} colors={colors}/>
                    </div>

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