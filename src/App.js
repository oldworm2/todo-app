import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircle from '@material-ui/icons/AddCircle';

class App extends Component {
  constructor(){
    super();
    this.state = {
      title: 'Todo title',
      newTodo: '',
      todos: [
        {
          title: 'Making Todo App',
          done: false
        },
        {
          title: 'Refactoring Todo App',
          done: false
        }
      ]
    };
    
  }

  newTodoChanged(event){
    this.setState({
      newTodo: event.target.value
    });
  }

  addTodo(){
    if(this.state.newTodo === ''){
      return;
    }
    this.setState({
      newTodo: '',
      todos: [...this.state.todos, {
        title: this.state.newTodo,
        done: false
      }]
    });
  }

  toggleTodoDone(index){
    const todos = [...this.state.todos];
    todos[index] = {
      ...todos[index],
      done: !todos[index].done
    };
    console.log(todos);
    this.setState({
      todos
    });
  }

  removeTodo(index){
    const todos = [...this.state.todos];
    todos.splice(index, 1);
    this.setState({
      todos
    });
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Todo App
            </Typography>
          </Toolbar>
        </AppBar>
        
      
        <Grid 
        direction="column"
        justify="center"
        alignItems="center"
        container>

          <Grid item>
            <h1>
              {this.state.title}
            </h1>
          </Grid>

          <Grid item>
            <NewTodo 
            newTodo = {this.state.newTodo} 
            addTodo={this.addTodo.bind(this)} 
            newTodoChanged={this.newTodoChanged.bind(this)}
            />
          </Grid>

          <Grid item>
            <h2>
              Todo List
            </h2> 
          </Grid>

          <Grid item>
            <TodoList
            todos={this.state.todos}
            toggleTodoDone={this.toggleTodoDone.bind(this)} 
            removeTodo={this.removeTodo.bind(this)}
            />
          </Grid>

        </Grid>

        
      </div>
    );
  }
}

function NewTodo(props) {
  return <div>
    <TextField
    id="outlined-dense"
    label="New Todo"
    margin="dense"
    variant="outlined"
    onChange={props.newTodoChanged}
    value={props.newTodo}
    onKeyPress={event => {
      if (event.key === 'Enter') {
        props.addTodo();
      }
    }}
    />

    <IconButton aria-label="Delete">
      <AddCircle  onClick={props.addTodo} color="primary" style={{ fontSize: 35 }} />
    </IconButton>
  </div>;
}

function TodoList(props) {
  return <List>
    {props.todos.map((todo, index) => (
      <ListItem key={index} dense >
        <Checkbox
          checked={todo.done}
          tabIndex={-1}
          onClick={() => props.toggleTodoDone(index)}
        />
        <ListItemText primary={`${index+1}. ${todo.title}`} style={todo.done ? {'text-decoration': 'line-through'} : {} } />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <DeleteIcon onClick={() => props.removeTodo(index)} color="secondary" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>;
}

export default App;
