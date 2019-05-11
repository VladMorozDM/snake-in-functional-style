"use strict";
/**
 * Created by vlad on 11.05.2019.
 */
const directions ={
    EAST: { x:1, y:0 },
    WEST: { x:-1, y:0},
    NORTH: { x:0, y:-1},
    SOUTH: { x:0, y:1}
};
const getApple = ()=> ({
                          x: Math.ceil(Math.random() * 20)*5,
                          y: Math.ceil(Math.random() * 20)*5
                       });
const firstState = () => ({
    direction: "EAST",
    head: {
      x: 50,
      y: 50
    },
    apple: getApple(),
    tail: []
});



const computeNextState = (state )=> {
    const prevState = JSON.parse( JSON.stringify(state) );
    const foundApple = () => head.x === prevState.apple.x && head.y === prevState.apple.y;
    const reviewTail = () => {
        if( foundApple() ){
            return [ {...prevState.head}, ...prevState.tail ]
        }else{
            return prevState.tail.length
                             ? [ {...prevState.head}, ...prevState.tail.slice(0, -1) ]
                             : prevState.tail;
        }
    };
    const head = {
        x: prevState.head.x + directions[prevState.direction].x*5,
        y: prevState.head.y + directions[prevState.direction].y*5
    };
    const tail = reviewTail();
    const apple = foundApple() ? getApple() : {...prevState.apple};
    const newState = {
                ...prevState,
                head: head,
                tail: tail,
                apple: apple
           };
    return newState
};
const setNextDirection = ( state, newDirection)=> ({ ...state, direction: newDirection});

