import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import './ColorBox.css';

export default class ColorBox extends Component {
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
        const {name, background, paletteId, colorId, showLink} = this.props;
        const {copied} = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div style={{background}} className="ColorBox">
                    <div 
                        style={{background}} 
                        className={`copy-overlay ${copied && 'show'}`}
                    />
                    <div className={`copy-msg ${copied && 'show'}`}>
                        <h1>copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className='copy-container'>
                        <div className='box-content'>
                            <span>{name}</span>
                        </div>
                        <button className='copy-button'>Copy</button>
                    </div>
                    {/* stopPropagation will stop the parent transition from firing when clicking on the button*/}
                    {showLink && (
                        <Link to={`/palette/${paletteId}/${colorId}`} onClick={e => e.stopPropagation()}>    
                            <span className='see-more'>More</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        )
    }
}
