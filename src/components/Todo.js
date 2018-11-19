import React, { Component } from "react";
import TodoItem from "./TodoItem";
import TodoFooter from "./TodoFooter";
import { connect } from 'react-redux';
import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  UPDATE_FIELD_EDITOR,
  MARK_ALL
} from "../constances/actionTypes"

const mapDispatchToProps = dispatch => ({
  onAdd: todo => dispatch({
    type: ADD_TODO,
    ...todo
  }),
  onDelete: index => dispatch({ 
    type: DELETE_TODO, 
    index 
  }),
  onToggle: index => dispatch({
    type: TOGGLE_TODO,
    index
  }),
  onCompletAll: () => dispatch({
    type: MARK_ALL
  }),
  onUpdatefield: text => dispatch({
    type: UPDATE_FIELD_EDITOR,
    text
  }),
  onFilter: direction => dispatch({
    type: direction
  })
});

const mapStateToProps = state => {
  return {
    ...state, text: "", inProgressLength: 0, completedLength: 0
  }
};

class Todo extends Component {
  /**
   * Todo Constructor
   * 
   * @param  {object} props
   * @return {*}
   */
  constructor(props) {
    super(props);

    this.input = {};

    this.addItem = (e) => {
      const text = this.input.value;
      if (text.length === 0) {
        return alert('Please put the task title !');
      }
      this.input.value = '';
      this.props.onAdd({text, completed: false});
    }

    this.markItem = (id) => {
      this.props.onToggle(id);
    }

    this.removeItem = (index) => {
      this.props.onDelete(index)
    }

    this.getCompleted = () => {
      return this.props.todos.filter(todo => todo.completed).length;
    }

    this.getInProgress = () => {
      return this.props.todos.filter(todo => !todo.completed).length;
    }

    this.markAll = () => {
      this.props.onCompletAll();
    }
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-offset-4 col-sm-4 col-xs-12">
            <div className="todolist not-completed">
              <h1>Todos</h1>
              <div className="input-group">
                <input type="text" ref={node => this.input = node}
                  className="form-control add-todo" 
                  placeholder="Add todo"/>
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
                <span>Mark all as completed</span>
              </button>
              <hr />
              {this.props.todos.length === 0 && <div className="text-muted text-center">No task defined !</div>}
              <ul className="list-unstyled">
                {this.props.todos.map((todo, key) => 
                  <TodoItem {...todo} key={key} 
                    onMarkItem={this.markItem.bind(this, key)} 
                    onRemoveItem={this.removeItem.bind(this, key)} 
                    checked={todo.completed}/>
                )}
              </ul>
              <TodoFooter 
                progress={this.getInProgress()} 
                completed={this.getCompleted()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);