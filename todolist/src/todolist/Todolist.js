import React, { Component,Fragment } from 'react';
import TodoItem from './TodoItem';


class Todolist extends Component {
  constructor(props) {
      super(props);
      this.state = {
          inputValue: '',
          list: []
      }
      this.handleInputChange=this.handleInputChange.bind(this);
      this.handleClick=this.handleClick.bind(this);
  }
  handleInputChange(e) {
      const value = e.target.value;
      this.setState({
          inputValue: value
      })
  }
  handleClick() {
      const list = [...this.state.list,this.state.inputValue];
      this.setState({
        list,
        inputValue: ''
    })
  }
  handleItemDelete(index) {
    const list=[...this.state.list];
    list.splice(index,1);
    this.setState({
      list
    })
  }

  render() {
    return (
      <Fragment>
        <input 
          placeholder="请输入新增内容" 
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleClick}>提交</button>
        <ul>
            {
              this.state.list.map((item,index) => {
                return (
                <TodoItem
                  key={[index,item]} 
                  index={index}
                  content={item}
                  deleteItem={this.handleItemDelete.bind(this)}
                />)
              })
            }
        </ul>
      </Fragment>
    );
  }
}

export default Todolist;