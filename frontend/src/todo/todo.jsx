import React, { Component } from 'react'
import Axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props){
        super(props)
       this.state = { description: '',list: [] }
        
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)

        this.refresh()
    }
    
handleAdd(){
    const description = this.state.description
    Axios.post(URL, {description}).then( resp=> this.refresh())
}
handleChange(e){
    this.setState({...this.state, description: e.target.value})

}
refresh(){
    Axios.get(`${URL}?sort=-createAt`)
        .then(resp=> this.setState({...this.state, description:'', list: resp.data}))
} 


handleRemove(todo){
    Axios.delete(`${URL}/${todo._id}`)
        .then(resp => this.refresh())
}
handleMarkAsDone(todo){
    Axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
        .then(resp => this.refresh())
}

handleMarkAsPending(todo){
    Axios.put(`${URL}/${todo._id}`,{ ...todo, done:false})
        .then(resp=> this.refresh())
}

render(){
    return(
        <div>
            <h1>Todo</h1>
            <PageHeader name='Tarefas' small='cadastro' />
            <TodoForm              
                description={this.state.description} 
                handleChange={this.handleChange}
                handleAdd={this.handleAdd} />
                
            <TodoList list={this.state.list} 
                handleRemove={this.handleRemove}
                handleMarkAsDone={this.handleMarkAsDone}
                handleMarkAsPending={this.handleMarkAsPending}/>           
            </div>
    )
}
}