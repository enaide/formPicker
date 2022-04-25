import { useSelector, useDispatch } from 'react-redux';
import { spaceActions } from '../store/space-slice';

const useInput = (validateValue) =>{    
    const dispatch = useDispatch() ;
    const inputValue = useSelector(state => state.space.inputValue);
    const isTouched = useSelector(state => state.space.isTouched);
    const valueIsValid = validateValue(inputValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = event => {
        dispatch(spaceActions.valueChangeHandler(event.target.value));
    };

    const inputBlurHandler = event => {
        dispatch(dispatch(spaceActions.inputBlurHandler()));
    };

    const reset = ()=> {
        dispatch(dispatch(spaceActions.reset()));
    };

    return {
        value: inputValue,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        reset
    }
};

export default useInput;