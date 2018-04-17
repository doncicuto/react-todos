import React from 'react';
import { Pagination, Input } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

 const PaginateTasks = ({
  pageSize,
  activePage,
  totalPages,
  onPageChange,
  onPageSizeChange,
  intl,
}) => (
  <div>
    { totalPages > 1 &&
      <div className="App-pagination">
        <Pagination
          defaultActivePage={activePage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    }
    <div className="App-pagination">
      <Input
        type="number"
        label={{ basic: true, content: intl.formatMessage({id: "page.size"})}}
        labelPosition="right"
        value={pageSize}
        onChange={onPageSizeChange}
      />
    </div>
  </div>
);

export default injectIntl(PaginateTasks);