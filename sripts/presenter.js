"use strict";
const STATE = firstState();     // "imported" function from another file
const NEXT = computeNextState;  // "imported" function from another file
const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');
const sizeCoefficients = { width: (canvas.width)/100, height: (canvas.height)/100 };
const computeSizes = ( { x, y } ) => ( { x: x*sizeCoefficients.width, y: y*sizeCoefficients.height } );
const delay = ms => new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve()
    }, ms)
});
const draw = ( newState ) => {
    const x1 = X => computeSizes( X ).x;
    const x2 = -sizeCoefficients.width*5;
    const y1 = Y => computeSizes( Y ).y;
    const y2 = -sizeCoefficients.height*5;
    ctx.fillStyle = '#232323';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw tail
     ctx.fillStyle = 'rgb(0,200,50)';
     [  ...newState.tail ].forEach( cube => ctx.fillRect(x1(cube), y1(cube), x2, y2) );
    // draw apple
    ctx.fillStyle = 'rgb(255,50,0)';
    ctx.fillRect(x1(newState.apple), y1(newState.apple), x2, y2);
    // draw head
    ctx.fillStyle = 'rgb(255,140,0)';
    [ {...newState.head}].forEach( cube => ctx.fillRect(x1(cube), y1(cube), x2, y2) );
    if( newState.crashed ) {
        ctx.fillStyle = 'rgb(255,0,0)';
        return Promise.all([  ...newState.tail ]
                        .map( (cube, i) => delay(50*(i+1)).then( ()=> ctx.fillRect(x1(cube), y1(cube), x2, y2) ) )
            )
            .then( () => delay(1000) )
            .then( () => { ctx.fillRect(150, 150, canvas.width-300, canvas.height-300); return delay(700) })
            .then( () => { ctx.fillRect(100, 100, canvas.width-200, canvas.height-200); return delay(700) })
            .then( () => { ctx.fillRect(50, 50, canvas.width-100, canvas.height-100); return delay(700) })
            .then( () => { ctx.fillRect(0, 0, canvas.width, canvas.height); return delay(700) })
    }
    return Promise.resolve()
};
const step = () => {
        const newState = NEXT(STATE);
        if(newState.crashed){
            draw( newState ).then( () => delay(3000)).then( () => {
                const newState = firstState();
                STATE.direction = newState.direction;
                STATE.tail = newState.tail;
                STATE.head = newState.head;
                STATE.apple = newState.apple;
                STATE.crashed = newState.crashed;
                return draw(newState)
            }).then(() => delay(100)).then(() => step())
        }else {
            STATE.head = newState.head;
            STATE.tail = newState.tail;
            STATE.apple = newState.apple;
            draw( newState ).then(() => delay(100)).then(() => step())
        }
};
draw(STATE).then( () => step() );
const isFalid =  direction => {
    switch(direction){
        case "NORTH":
            STATE.direction = STATE.direction !== "SOUTH" ? direction : STATE.direction;
            break;
        case "SOUTH":
            STATE.direction = STATE.direction !== "NORTH" ? direction : STATE.direction;
            break;
        case "WEST":
            STATE.direction = STATE.direction !== "EAST" ? direction : STATE.direction;
            break;
        case "EAST":
            STATE.direction = STATE.direction !== "WEST" ? direction : STATE.direction;
            break;
    }

} ;
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'w': case'ц': case 'h':case'р': case 'ArrowUp':   isFalid("NORTH"); break;
        case 'a': case'ф': case 'j':case'о': case 'ArrowLeft':  isFalid("WEST"); break;
        case 's': case'ы': case 'k':case'л': case 'ArrowDown':  isFalid("SOUTH"); break;
        case 'd': case'в': case 'l':case'д': case 'ArrowRight': isFalid("EAST");  break
    }
});