"use strict";
/**
 * Created by vlad on 11.05.2019.
 */
const STATE = firstState();
const NEXT = computeNextState;


const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');

const sizeCoefficients = {
                            width: canvas.width/100,
                            height: canvas.height/100
                         };
const computeSizes = ( { x, y } ) => ( { x: x*sizeCoefficients.width, y: y*sizeCoefficients.height } );

const draw = ( newState ) => {
    const x1 = X => computeSizes( X ).x;
    const x2 = -sizeCoefficients.width*5;
    const y1 = Y => computeSizes( Y ).y;
    const y2 = -sizeCoefficients.height*5;

    ctx.fillStyle = '#232323';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw snake
     ctx.fillStyle = 'rgb(0,200,50)';
     [ {...newState.head}, ...newState.tail ].forEach( cube => ctx.fillRect(x1(cube), y1(cube), x2, y2) );

    // draw apples
    ctx.fillStyle = 'rgb(255,50,0)';
    ctx.fillRect(x1(newState.apple), y1(newState.apple), x2, y2)

    /* TODO: - add crash
     if (state.snake.length == 0) {
         ctx.fillStyle = 'rgb(255,0,0)'
         ctx.fillRect(0, 0, canvas.width, canvas.height)
     } */
};
const step = () => {
    const newState = NEXT( STATE );
    STATE.head = newState.head;
    STATE.tail = newState.tail;
    STATE.apple = newState.apple;
    draw( STATE );
    console.log("GOTHC YA! ");
    // step( newState );
    // TODO: - add animation fragment
};
draw( STATE );


window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'w': case 'h': case 'ArrowUp':    STATE.direction =  "NORTH"; break;
        case 'a': case 'j': case 'ArrowLeft':  STATE.direction = "WEST"; break;
        case 's': case 'k': case 'ArrowDown':  STATE.direction ="SOUTH"; break;
        case 'd': case 'l': case 'ArrowRight': STATE.direction = "EAST";  break
    }
});