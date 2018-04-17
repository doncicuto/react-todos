import React from 'react';
import { Input } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

const SearchTask = ({
  searchTerm,
  onSearchChange,
  intl
}) => (
  <div className="App-search">
    <Input
      icon="search"
      iconPosition="left"
      fluid={true}
      placeholder={intl.formatMessage({id: "search.term"})}
      value={searchTerm}
      onChange={onSearchChange}
    />
  </div>
);

export default injectIntl(SearchTask);