import React from 'react';
import orderBy from 'lodash/orderBy';
import { Table, Message } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import Task from './Task';
import SearchTasks from './SearchTasks';
import PaginateTasks from './PaginateTasks';

export default ({
  tasks,
  filter,
  searchTerm,
  sortBy,
  sortDirection,
  activePage,
  pageSize,
  totalPages,
  onPageChange,
  onPageSizeChange,
  onTaskState,
  onTaskRemove,
  onTaskRemoveDialogOpen,
  onTaskRemoveDialogClose,
  onTaskSort,
  onSearchChange,
  removeTaskDialogIsOpen,
}) => {


  const filterStateTask = task => (filter === 'completed') ? task.completed === true : task.completed === false;
  const filterSearchTask = task => task.title.includes(searchTerm);

  const mapTask = task => (
    <Task
      key={task.title}
      title={task.title}
      completed={task.completed}
      createdAt={task.createdAt}
      onTaskState={onTaskState}
      onTaskRemove={onTaskRemove}
    />
  );

  const direction = sortDirection === "ascending" ? "asc" : "desc";

  //0. If no tasks show message

  if (!tasks.length) {
    return (
      <div>
        <Message info>
          <p><FormattedMessage id="tasks.none"/></p>
        </Message>
      </div>
    );
  }

  //1. Sort tasks by field and direction
  let processedTasks = orderBy(tasks.concat(),[sortBy],[direction]);

  //2. Filter tasks by state
  if (filter) {
    processedTasks = processedTasks.filter(filterStateTask);
  }

  //3. Filter tasks by search term
  if (searchTerm) {
    processedTasks.filter(filterSearchTask);
  }

  return (
    <div>
      <SearchTasks
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
      />
      {
        processedTasks.length === 0
        ?
          <Message info>
            <p><FormattedMessage id="tasks.notfound"/></p>
          </Message>
        :
          <div>
            <Table celled sortable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    sorted={sortBy === 'title' ? sortDirection : null}
                    onClick={() => onTaskSort('title')}
                  >
                    <FormattedMessage id="tasks.title"/>
                  </Table.HeaderCell>
                  <Table.HeaderCell
                    sorted={sortBy === 'createdAt' ? sortDirection : null}
                    onClick={() => onTaskSort('createdAt')}
                  >
                    <FormattedMessage id="tasks.created"/>
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage id="tasks.actions"/>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  processedTasks
                    .slice(pageSize * (activePage - 1), (pageSize * (activePage - 1) + pageSize))
                    .map(mapTask)
                }
              </Table.Body>
            </Table>
            <PaginateTasks
              pageSize={pageSize}
              activePage={activePage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          </div>
      }
    </div>
  );

};
