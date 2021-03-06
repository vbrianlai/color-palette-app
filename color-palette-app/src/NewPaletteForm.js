import React, { Component } from 'react'
import clsx from 'clsx';
import arrayMove from 'array-move';
import Drawer from '@material-ui/core/Drawer';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import seedColors from './seedColors';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/NewPaletteFormStyles';

class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    }
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            colors: seedColors[0].colors,
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
        const allColors = seedColors.map(p => p.colors).flat();
        let random;
        let randomColor;
        let isDuplicateColor = true;
        // make sure chosen random color is not already in the palette
        while (isDuplicateColor) {
            random = Math.floor(Math.random() * allColors.length);
            randomColor = allColors[random];
            isDuplicateColor = this.state.colors.some(color => color.name === randomColor.name);
        }
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
                    <DraggableColorList
                        colors={colors}
                        distance={20}
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