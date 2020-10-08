import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import chroma from 'chroma-js';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styles from './styles/ColorBoxStyles';
import { withStyles } from '@material-ui/styles';

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copied: false }
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        //changes copied to true for 1500ms before changing it back to false
        this.setState({copied: true}, () => {
            setTimeout(() => this.setState({copied: false}), 1500);
        })
    }

    render() {
        const {classes, name, background, paletteId, colorId, showFullPalette} = this.props;
        const {copied} = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className={classes.ColorBox}>
                    <div 
                        style={{background}} 
                        className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
                    />
                    <div className={`${classes.copyMessage} ${copied && classes.showCopyMessage}`}>
                        <h1>copied!</h1>
                        <p className={classes.boxText}>
                            {background}
                        </p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
                            <span className={classes.boxText}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {/* stopPropagation will stop the parent transition from firing when clicking on the button*/}
                    {showFullPalette && (
                        <Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>    
                            <span className={classes.seeMore}>MORE</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        )
    }
}

export default withStyles(styles)(ColorBox);