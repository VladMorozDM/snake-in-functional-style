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
const getApple = ()=> ({ x: Math.ceil(Math.random() * 20)*5, y: Math.ceil(Math.random() * 20)*5 });
const firstState = () => ({
    direction: "EAST",
    head: {
      x: 50,
      y: 50
    },
    apple: getApple(),
    tail: [],
    crashed: false
});
const foundApple = ( head, apple ) => head.x === apple.x && head.y === apple.y;
const computeNextState = ( state )=> {
    const prevState = JSON.parse( JSON.stringify(state) );
    const appleX = prevState.apple.x;
    const appleY = prevState.apple.y;
    const head = {
        x: prevState.head.x + directions[prevState.direction].x*5,
        y: prevState.head.y + directions[prevState.direction].y*5
    };
    const reviewTail = ( state ) => {
        if( foundApple( head, { x: appleX, y: appleY }) ){
            return [ {...state.head}, ...state.tail ]
        }else if( state.tail.length){
            return  [ {...state.head}, ...state.tail.slice(0, -1) ]
        }else{
            return state.tail
        }
    };
    const leftedX = (head.x > 100 ? head.x = 0 : false) || (head.x < 0 ? head.x = 100 : false) ;
    head.x = leftedX ? leftedX : head.x;
    const leftedY = (head.y > 100 ? head.y = 0 : false) || (head.y < 0 ? head.y = 100 : false) ;
    head.y = leftedY ? leftedY : head.y;
    const tail = reviewTail( prevState );
    const computeCrash = ( tail ) => tail.filter( cube => head.x === cube.x && head.y === cube.y ).length;
    const apple = foundApple( head, { x: appleX, y: appleY }) ? getApple() : {...prevState.apple};
    const crashed = !!computeCrash( tail );
    const newState = {
                ...prevState,
                head: head,
                tail: tail,
                apple: apple,
                crashed: crashed
           };
    return newState;
};


