import "./components.css";

const InputField = ({ 
    name, 
    label, 
    type = "text", 
    value, 
    onChange = () => {}, 
    onBlur= () => {}, 
    error }) => (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );

  export default InputField;
  