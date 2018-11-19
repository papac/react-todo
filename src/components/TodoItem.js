import React, { Component } from "react";

export default class TodoItem extends Component {
	/**
	 * Launch Todo mark method
	 * 
	 * @return {*}
	 */
	mark() {
		this.props.onMarkItem();
	}

	/**
	 * Launch Todo remove item method
	 * 
	 * @return {*}
	 */
	remove() {
		this.props.onRemoveItem()
	}

	render() {
		return (
			<li className="ui-state-default">
        <div className="checkbox">
          <label>
          	<input type="checkbox" 
          		onChange={this.mark.bind(this)} 
          		checked={this.props.checked}/>
          	<span>{this.props.text}</span>
          </label>
          <div className="pull-right">
          	<button 
          		className="btn btn-danger btn-xs"
          		onClick={this.remove.bind(this)}>
          		<span className="glyphicon glyphicon-remove"></span>
          	</button>
          </div>
        </div>
      </li>
		);
	}
}