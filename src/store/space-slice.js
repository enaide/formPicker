import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialSpace = { inputValue: '', isTouched: false, isValid: false, hasError: false};
const initialUrl = { inputValue: '', isTouched: false, isValid: false, hasError: false };
const initialFormState = { image: null, people: 'Sólo yo', privacy: 'Privado' };

const spaceSlice = createSlice({
    name: 'space',
    initialState: initialSpace,
    reducers: {
        valueChangeHandler(state, action){
            state.inputValue = action.payload 
            state.isValid = state.inputValue.trim() !== '';           
            state.hasError = state.isTouched && !state.isValid;           
        },
        inputBlurHandler(state){
            state.isTouched = true;
        },
        reset(state){
            state = { isTouched: false, inputValue: '', isValid: false};            
        }
    }
});

const urlSlice = createSlice({
    name: 'url',
    initialState: initialUrl,
    reducers: {
        valueChangeHandler(state, action){
            state.inputValue = action.payload;
            state.isValid = state.inputValue.trim() !== '';           
            state.hasError = state.isTouched && !state.isValid;             
        },
        inputBlurHandler(state){
            state.isTouched = true;
        },
        reset(state){
            state = { isTouched: false, inputValue: ''};            
        }
    }
});

const formSlice = createSlice({
    name: 'form',
    initialState: initialFormState,
    reducers: {       
        onImageChangeHandler(state, action){
            state.image = action.payload;
        },
        onPeopleNumberHandler(state, action){
            state.people = action.payload;  
        },
        onPrivacyChangeHandler(state, action){
            state.privacy = action.payload;
        },
        reset(state){
            state = { image: null, people: 'Sólo yo', privacy: 'Privado' };            
        }
    }
});
export const spaceActions = spaceSlice.actions;
export const urlActions = urlSlice.actions;
export const formActions = formSlice.actions;

const store = configureStore({ reducer: {
    space: spaceSlice.reducer,
    url: urlSlice.reducer,
    form: formSlice.reducer
}});

export default store;