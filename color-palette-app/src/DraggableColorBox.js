import React from 'react';
import {SortableElement} from 'react-sortable-hoc';
import {withStyles} from '@material-ui/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import styles from './styles/DraggableColorBoxStyles';

const DraggableColorBox = SortableElement((props) => {
    const {classes, name, color} = props;
    return (
        <div 
            className={classes.root} 
            style={{backgroundColor: color}}
        >
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteForeverIcon className={classes.deleteIcon} onClick={props.handleDelete}/>
            </div>
            
        </div>
        
    )
    
});

export default withStyles(styles)(DraggableColorBox);