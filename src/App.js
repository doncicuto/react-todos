import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/es';
import './App.css';
import { Divider } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import AddTask from './components/AddTask';
import Tasks from './components/Tasks';
import TaskFilter from './components/TaskFilter';

class App extends Component {
  constructor(props) {
    super(props);

    const tasks = JSON.parse(localStorage.getItem('myTodos')) || [];
    const pageSize = 5;

    this.state = {
      tasks,
      pageSize,
      newTask: "",
      searchTerm: "",
      errorNewTask: null,
      filter: "pending",
      activePage: 1,
      totalPages: this.calculateTotalPages(tasks.filter( item => !item.completed ), pageSize),
      sortBy: "createdAt",
      sortDirection: "ascending",
    }

    moment.locale('es');

    this.handleTaskAdd = this.handleTaskAdd.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleTaskRemove = this.handleTaskRemove.bind(this);
    this.handleTaskState = this.handleTaskState.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleTaskSort = this.handleTaskSort.bind(this);
    this.showTasks = this.showTasks.bind(this);
  }

  calculateTotalPages(tasks, pageSize) {
    return tasks.length > 0 ? Math.ceil(tasks.length / pageSize) : 1;
  }

  handleTaskAdd() {
    const { newTask, pageSize, tasks } = this.state;
    if(newTask) {
      if (!tasks.some( task => task.title === newTask )) {
        const updatedTasks = [...tasks, { title: newTask, completed: false, createdAt: new Date().getTime()}];
        const totalPages = this.calculateTotalPages(updatedTasks, pageSize);
        localStorage.setItem('myTodos', JSON.stringify(updatedTasks));
        this.setState({
          filter: "pending",
          newTask: "",
          tasks: updatedTasks,
          totalPages,
          activePage: totalPages,
          sortBy: "createdAt",
          sortDirection: "ascending"
        });
      } else {
        this.setState({
          errorNewTask: "Ya existe una tarea con el mismo título."
        });
      }
    }
  }

  handleTaskChange(event) {
    const newTask = event.target.value;
    this.setState({
      newTask,
      errorNewTask: ""
    });
  }

  handleTaskState(task, completed) {
    const {tasks} = this.state;
    const updatedTasks = tasks.map( item =>
      (item.title === task) ? { ...item, completed: !completed } : { ...item }
    );
    localStorage.setItem('myTodos', JSON.stringify(updatedTasks));
    this.setState({
      tasks: updatedTasks,
      activePage: 1
    });
  }

  handleTaskSort(clickedColumn) {
    const { sortBy, sortDirection } = this.state

    if (sortBy !== clickedColumn) {
      this.setState({
        sortBy: clickedColumn,
        sortDirection: 'ascending',
      })
    } else {
      this.setState({
        sortDirection: sortDirection === 'ascending' ? 'descending' : 'ascending',
      })
    }
  }

  handleTaskRemove(task) {
    const {tasks, pageSize} = this.state;
    const updatedTasks = tasks.filter( item => item.title !== task );
    localStorage.setItem('myTodos', JSON.stringify(updatedTasks));
    this.setState({
      activePage: 1,
      tasks: updatedTasks,
      totalPages: this.calculateTotalPages(updatedTasks, pageSize),
    });
  }

  handlePageChange(event, {activePage}) {
    this.setState({
      activePage: activePage
    });
  }

  handlePageSizeChange(event) {
    const pageSize = parseInt(event.target.value, 10);
    const { tasks } = this.state;

    if (pageSize > 0) {
      const totalPages = this.calculateTotalPages(tasks, pageSize);;

      this.setState({
        activePage: 1,
        pageSize,
        totalPages
      });
    }
  }

  handleSearchChange(event) {
    const searchTerm = event.target.value;

    this.setState({
      searchTerm
    })
  }

  showTasks(filter=null) {
    const { tasks, pageSize } = this.state;
    let totalPages;

    if(filter) {
      const filteredTasks = filter === 'completed' ? tasks.filter( item => item.completed ) : tasks.filter( item => !item.completed );
      totalPages = this.calculateTotalPages(filteredTasks, pageSize);
    } else {
      totalPages = this.calculateTotalPages(tasks, pageSize);
    }

    this.setState({
      filter,
      totalPages,
      activePage: 1
    });
  }

  render() {
    const {
      tasks,
      filter,
      searchTerm,
      sortBy,
      sortDirection,
      activePage,
      pageSize,
      totalPages,
      errorNewTask,
      newTask
    } = this.state;
    return (
      <div className="AppContainer">
        <h1 className="App-header"><FormattedMessage id="app.title"/></h1>
        <AddTask newTask={newTask} errorNewTask={errorNewTask} onTaskAdd={this.handleTaskAdd} onTaskChange={this.handleTaskChange}/>
        <Divider />
        <Tasks
          tasks={tasks}
          filter={filter}
          searchTerm={searchTerm}
          sortBy={sortBy}
          sortDirection={sortDirection}
          activePage={activePage}
          pageSize={pageSize}
          totalPages={totalPages}
          onTaskState={this.handleTaskState}
          onTaskRemove={this.handleTaskRemove}
          onPageChange={this.handlePageChange}
          onPageSizeChange={this.handlePageSizeChange}
          onSearchChange={this.handleSearchChange}
          onTaskSort={this.handleTaskSort}
        />
        <Divider />
        <TaskFilter
          filter={filter}
          showTasks={this.showTasks}
        />
      </div>
    );
  }
}

export default App;
