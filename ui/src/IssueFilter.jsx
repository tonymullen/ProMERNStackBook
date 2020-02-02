import React from 'react';
import URLSearchParams from 'url-search-params';
import { withRouter } from 'react-router-dom';
/* eslint "react/prefer-stateless-function": "off" */

class IssueFilter extends React.Component {
  constructor() {
    super();
    this.onChangeStatus = this.onChangeStatus.bind(this);
  }

  onChangeStatus(e) {
    const status = e.target.value;
    const { history } = this.props;
    history.push({
      pahtname: '/issues',
      search: status ? `?status=${status}` : '',
    });
  }

  render() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    return (
      <div>
        Status:
        {' '}
        <select value={params.get('status') || ''} onChange={this.onChangeStatus}>
          <option value="">(All)</option>
          <option value="New">New</option>
        </select>
      </div>
    );
  }
}

export default withRouter(IssueFilter);
