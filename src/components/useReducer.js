import React,{useReducer} from "react";

const CounterReducer=(state,action)=>{
    switch(action.type){
        case 'increase':
            return {...state,count:state.count+1};
        case 'decrease':
            return {...state,count:state.count-1};
        default:
            throw new Error();
    }
};

const Counter=()=>{
    const[state,dispatch]=useReducer(CounterReducer,{count:0});

    const handleIncrease=()=>{
        dispatch({type:"increase"});
    };
    const handleDecrease=()=>{
        dispatch({type:"decraese"});
    };

    return(
        <div>
            <h1>demo of usereducer</h1>
            <p>count:{state.count}</p>
            <div>
                <button type="button" onClick={handleIncrease}>+</button>
                <button type="button" onClick={handleDecrease}>-</button>
            </div>
        </div>
    );
};