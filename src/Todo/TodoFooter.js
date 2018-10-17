import React from "react";

const TodoFooter = (props) => {
	return (
		<div className="todo-footer row">
			<div className="pull-left">
				<strong><span className="count-todos">({props.progress})</span></strong> <span>In progress</span>
			</div>
			<div className="pull-right">
				<strong><span className="count-todos">({props.done})</span></strong> <span>Done</span>
			</div>
		</div>
	);
}

export default TodoFooter;