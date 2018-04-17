import React from 'react';
import { Button } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

export default ({
  filter,
  showTasks,
}) => (
  <div className="App-filter">
    <Button.Group>
      <Button active={filter === "pending"} onClick={() => showTasks("pending")}><FormattedMessage id="show.pending"/></Button>
      <Button.Or />
      <Button active={filter === "completed"} onClick={() => showTasks("completed")}><FormattedMessage id="show.completed"/></Button>
      <Button.Or />
      <Button active={!filter} onClick={() => showTasks()}><FormattedMessage id="show.all"/></Button>
    </Button.Group>
  </div>
);