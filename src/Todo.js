import React, { Component } from "react";
import Item from "./Todo/Item";
import TodoFooter from "./Todo/TodoFooter";

class Todo extends Component {
	/**
	 * Todo Constructor
	 * 
	 * @param  {object} props
	 * @return {*}
	 */
	constructor(props) {
		super(props);
		this.state = {
			items: [{text: "Take out the trash", done: false }], 
			text: ""
		};
	}

	/**
	 * Mark one task as done or toggle on in-progress
	 * 
	 * @param  {number} id
	 * @return {*}
	 */
	markItem(id) {
		let items = this.state.items.map((item, key) => {
			if (id === key) {
				item.done = !item.done;
			}

			return item;
		});

		this.setState({items})
	}

	/**
	 * Mark one task as done or toggle on in-progress
	 * 
	 * @param  {number} id
	 * @return {*}
	 */
	removeItem(id) {
		let items = this.state.items.filter((item, key) => {
			return id !== key;
		});

		this.setState({items})
	}

	/**
	 * Get all done task
	 * 
	 * @return {array}
	 */
	getDones() {
		return this.state.items.filter(item => item.done)
	}

	/**
	 * Get all in progress tasks
	 * 
	 * @return {array}
	 */
	getInProgress() {
		return this.state.items.filter(item => !item.done)
	}

	/**
	 * Mark all as done
	 */
	markAll() {
		const items = this.state.items.map(item => {
			item.done = true;
			return item;
		});

		this.setState({items});
	}

	/**
	 * Add Item
	 * 
	 * @param {Event} e
	 */
	addItem(e) {
		const text = this.state.text;
		const done = false;

		if (text.length == 0) {
			return alert('Please put the task title !');
		}

		let items = this.state.items;
		items.push({text, done});

		this.setState({items, text: ""});
	}

	onChange(e) {
		let value = e.target.value;
		this.setState({text: value});
	}

	/**
	 * React Render method
	 * 
	 * @return {*}
	 */
	render() {
		return (
			<div className="row">
				<div className="col-sm-offset-4 col-sm-4 col-xs-12">
	        <div className="todolist not-done">
		        <h1>Todos</h1>
		        <div className="input-group">
			        <input type="text" 
			        	className="form-control add-todo" 
			        	placeholder="Add todo" value={this.state.text} onChange={this.onChange.bind(this)}/>
				      <span className="input-group-btn">
				        <button 
				        	className="btn btn-primary" 
				        	onClick={this.addItem.bind(this)}>Add</button>
				      </span>
			      </div>
		        <button 
		        	id="checkAll" 
		        	className="btn btn-success" 
		        	onClick={this.markAll.bind(this)}>
		        	<span>Mark all as done</span>
		        </button>
		        <hr />
		        {this.state.items.length == 0 && <div className="text-muted text-center">No task defined !</div>}
		        <ul className="list-unstyled">
		          {this.state.items.map((item, key) => 
		          	<Item {...item} key={key} 
		          		onMarkItem={this.markItem.bind(this, key)} 
		          		onRemoveItem={this.removeItem.bind(this, key)}/>
		          )}
		      	</ul>
		      	<TodoFooter 
		      		progress={this.getInProgress().length} 
		      		done={this.getDones().length} />
	        </div>
				</div>
			</div>
		);
	}
}

export default Todo;