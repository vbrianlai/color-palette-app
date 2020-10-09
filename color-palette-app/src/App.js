import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Palette from "./Palette";
import PaletteList from './PaletteList';
import SinglePalette from './SinglePalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from "./seedColors";
import { generatePalette } from './colorHelpers';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      palettes: seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }

  findPalette(id){
    return this.state.palettes.find((palette) => palette.id === id);
  }

  savePalette(newPalette) {
    console.log(newPalette);
    this.setState({palettes: [...this.state.palettes, newPalette]})
  }

  render() {
    // console.log(generatePalette(seedColors[4]));
    return (
      <Switch>
        <Route
          exact
          path='/palette/new'
          render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps}/>}
        />
        <Route 
          exact 
          path='/' 
          render={routeProps => <PaletteList palettes={this.state.palettes} {...routeProps}/>}
        />
        <Route 
          exact 
          path='/palette/:id'
          render={routeProps => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>}
        />
        <Route
          exact
          path='/palette/:paletteId/:colorId'
          render={routeProps => <SinglePalette colorId={routeProps.match.params.colorId} palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}/>}
        />
      </Switch>
    );
  }
}

export default App;
