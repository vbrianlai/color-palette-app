import React, { Component } from 'react';
import ColorBox from './ColorBox';
import NavBar from './NavBar';
import PaletteFooter from './PaletteFooter';

export default class SinglePalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.getShades(this.props.palette, this.props.colorId);
        this.state = { format: 'hex' };
        this.changeFormat = this.changeFormat.bind(this);
        // console.log(this._shades);
    }

    getShades(palette, chosenColor) {
        //return all shades of given color
        let shades = [];
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(color => color.id === chosenColor)
            )
        }
        return shades.slice(1);
    }

    changeFormat(val) {
        this.setState({ format: val }); 
    }

    render() {
        const {format} = this.state;
        const {paletteName, emoji} = this.props.palette;
        const colorBoxes = this._shades.map(shade => (
            <ColorBox key={shade.id} name={shade.name} background={shade[format]} showLink={false}/>
        ))
        return (
            <div className='Palette'>
                <NavBar handleChange={this.changeFormat} isSingleColor={true}/>
                <div className='Palette-colors'>
                    {colorBoxes}
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}
