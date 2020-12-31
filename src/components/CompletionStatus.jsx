import React from "react";

function CompletionStatus(props) {
	const { status, wrap } = props;

	const whitespace = () => {
		if (wrap) return { whiteSpace: "normal" };
		else return {};
	};


	const completionStatus = (status) => {
		if (status === 0) {
			return (
				<div className='badge badge-primary flex-grow-1 p-2' style={whitespace()}>
					Status: Not Yet Started
				</div>
			);
		} else if (status === 1) {
			return (
				<div className='badge badge-warning flex-grow-1 p-2' style={whitespace()}>
					Status: On Going
				</div>
			);
		} else {
			return (
				<div className='badge badge-success flex-grow-1 p-2' style={whitespace()}>
					Status: Finished
				</div>
			);
		}
	};

	return completionStatus(status);
}

export default CompletionStatus;
