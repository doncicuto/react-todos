import React from 'react';
import { Input, Label, Button } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

const Task = ({
  newTask,
  errorNewTask,
  onTaskAdd,
  onTaskChange,
  intl,
}) => {
  const addTaskButton = (
    <Button
      primary disabled={!newTask}
      onClick={onTaskAdd}
      type="button">{intl.formatMessage({id: "task.add"})}
    </Button>
  );

  return (
    <div>
      <Input
        type="text"
        placeholder={intl.formatMessage({id: "task.placeholder"})}
        error={!!errorNewTask}
        value={newTask}
        action={addTaskButton}
        onChange={onTaskChange}
        icon="tasks"
        iconPosition="left"
        fluid={true}
      />
      {!!errorNewTask && <Label basic color='red' pointing>{errorNewTask}</Label>}
    </div>
  );
}

export default injectIntl(Task);
