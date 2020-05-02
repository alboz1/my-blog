import { useState } from 'react';
//Custom hook for getting user inputs value
const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(''),
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value)
            }
        }
    }
}

export default useInput;