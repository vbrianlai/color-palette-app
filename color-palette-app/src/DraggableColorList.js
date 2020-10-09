import React, { Component } from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import DraggableColorBox from './DraggableColorBox';

const DraggableColorList = SortableContainer(({colors, deleteColor}) => {
    return (
        <div style={{height: '100%'}}>
            {colors.map((color, i) => (
                <DraggableColorBox 
                    index={i}
                    color={color.color} 
                    name={color.name} 
                    handleDelete={() => deleteColor(color.name)} 
                    key={color.name}/>
                ))
            }
        </div>
    )
});

export default DraggableColorList;
