import React from "react";

function CompletionStatus(props) {
	// const { status } = props;

	const completionStatus = (status) => {
		if (status === 0) {
			return (
				<div className='badge badge-primary flex-grow-1 p-2'>
					Status: Not Yet Started
				</div>
			);
		} else if (status === 1) {
			return (
				<div className='badge badge-warning flex-grow-1 p-2'>
					Status: On Going
				</div>
			);
		} else {
			return (
				<div className='badge badge-success flex-grow-1 p-2'>
					Status: Finished
				</div>
			);
		}
	};
	return completionStatus(props.status);
}

export default CompletionStatus;
