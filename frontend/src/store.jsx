import { configureStore } from "@reduxjs/toolkit";
import newsReducer from './features/news/newsSlice';

const loadState = ()=>{
    try {
        const serialzedState = sessionStorage.getItem('newsState');
        if(serialzedState === null){
            return undefined;
        }
        return JSON.parse(serialzedState);
    } catch (error) {
        console.error('Could not load State',error);
        return undefined
    }
};

const saveState = (state)=>{
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('newsState',serializedState);
    } catch (error) {
        console.error('Could not save state');
    }
}

const preloadedState = loadState();

const store = configureStore({
    reducer:{
        news:newsReducer,
    },
    preloadedState,
});

store.subscribe(()=>{
    saveState({
        news:store.getState().news,
    })
});

export default store;