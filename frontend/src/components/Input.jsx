const Input = (props) => {
    const type = props.type || 'text';
    const placeholder = props.placeholder || 'Enter Details';
    const classes = props.class || '';
    const value = props.value || '';
    const onChange = props.onChange || (() => {});

    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`w-full rounded-md p-2 outline-none focus:shadow-xl focus:outline-2 focus:outline-gray-600 ${classes}`}
            value={value}
            onChange={onChange}
        />
    );
};

export default Input;
