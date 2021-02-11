export default function Button(props) {
	const { children, variant = "base" } = props;

	return <button className='px-5 py-2 bg-green-700'>{children}</button>;
}
