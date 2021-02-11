function Input(props) {
	const {
		name = "formName",
		label = capitalize(name),
		classes = "flex flex-col mx-8",
		type = "text",
		inputClass = "outline-none border rounded w-full",
		inputProps = {},
		refs,
	} = props;

	return (
		<div className={classes}>
			<label htmlFor={name}>{label}</label>
			<input
				className={inputClass}
				type={type}
				name={name}
				{...inputProps}
				ref={refs}
			/>
		</div>
	);
}

export default Input;

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
