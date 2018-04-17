import React from 'react';
import moment from 'moment';
import { Table, Button, Icon } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

const Task = ({
  title,
  completed,
  createdAt,
  onTaskState,
  onTaskRemove,
  intl,
}) => (
  <Table.Row>
    <Table.Cell>{title}</Table.Cell>
    <Table.Cell>{intl.formatRelative(moment(createdAt))}</Table.Cell>
    <Table.Cell>
      <div>
        <Button icon positive={!!completed} onClick={() => onTaskState(title, completed)}>
          <Icon name="checkmark"/>
        </Button>
        <Button icon negative onClick={() => onTaskRemove(title)}>
          <Icon name="remove"/>
        </Button>
      </div>
    </Table.Cell>
  </Table.Row>
);

export default injectIntl(Task);