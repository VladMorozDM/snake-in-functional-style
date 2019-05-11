"use strict";
/**
 * Created by vlad on 11.05.2019.
 */

const getApple = ()=> ({
                          x: Math.floor(Math.random() * 100),
                          y: Math.floor(Math.random() * 100)
                       });
const state = {
    direction: "EAST",
    position: {
      x: 50,
      y: 50
    },
    apple: getApple(),
    tail: []
};

const directions ={
    EAST: { x:1, y:0 },
    WEST: { x:-1, y:0},
    NORTH: { x:0, y:1},
    SOUTH: { x:0, y:-1}
};
const next = ( prevState = state )=> {
    const prevStateCopy = JSON.parse( JSON.stringify(prevState) );
    const newState = {
            ...prevStateCopy,
            position:{
                x: prevStateCopy.position.x + directions[prevStateCopy.direction].x,
                y: prevStateCopy.position.y + directions[prevStateCopy.direction].y
            }
    };
    return newState;
};

