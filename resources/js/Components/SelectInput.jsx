import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function SelectInput({ title = '', options = [], className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);
const tyh = ()  =>{}
    return (
        <div className="flex flex-col items-start">
            <select
                {...props}
                className={
                    'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                    className
                }
                ref={input}
            >
                <option value="">Select a {title}</option>
                {
                    // console.log(options)
                    options.map((option, i) => {
                        return (
                            <option key={i} value={option}>{option}</option>
                        );
                    })
                }
            </select>
        </div>
    );
});
