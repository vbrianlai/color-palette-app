import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Palette from "./Palette";
import PaletteList from './PaletteList';
import SinglePalette from './SinglePalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';
import seedColors from "./seedColors";
import { generatePalette } from './colorHelpers';


class App extends Component {
  constructor(props){
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {
      palettes: savedPalettes || seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id){
    return this.state.palettes.find((palette) => palette.id === id);
  }

  savePalette(newPalette) {
    console.log(newPalette);
    this.setState({
      palettes: [...this.state.palettes, newPalette]
    }, 
    this.syncLocalStorage
    );
  }

  deletePalette(id) {
    this.setState(
      st => ({palettes: st.palettes.filter(palette => palette.id !== id)}),
      this.syncLocalStorage
    );
  }

  syncLocalStorage(){
    //save palettes to localStorage
    window.localStorage.setItem("palettes", JSON.stringify(this.state.palettes));
  }

  render() {
    // console.log(generatePalette(seedColors[4]));
    return (
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path='/palette/new'
                render={(routeProps) => 
                  <Page>
                    <NewPaletteForm 
                      savePalette={this.savePalette} 
                      palettes={this.state.palettes} 
                      {...routeProps}
                    />
                  </Page>
                }
              />
              <Route 
                exact 
                path='/' 
                render={routeProps => 
                  <Page>
                    <PaletteList 
                      palettes={this.state.palettes} 
                      deletePalette={this.deletePalette} 
                      {...routeProps}
                    />
                  </Page>
                }
              />
              <Route 
                exact 
                path='/palette/:id'
                render={routeProps => 
                  <Page>
                    <Palette 
                      palette={generatePalette(this.findPalette(routeProps.match.params.id))}
                    />
                  </Page>
                }
              />
              <Route
                exact
                path='/palette/:paletteId/:colorId'
                render={routeProps => 
                  <Page>
                    <SinglePalette 
                      colorId={routeProps.match.params.colorId} 
                      palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}
                    />
                  </Page>
                }
              />
              <Route 
                render={routeProps => 
                  <Page>
                    <PaletteList 
                      palettes={this.state.palettes} 
                      deletePalette={this.deletePalette} 
                      {...routeProps}
                    />
                  </Page>
                }
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}/>
    );
  }
}

export default App;
