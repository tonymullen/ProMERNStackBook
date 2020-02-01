import React from 'react';
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
    return (
      <div>
        Status:
        {' '}
        <select onChange={this.onChangeStatus}>
          <option value="">(All)</option>
          <option value="New">New</option>
          <option value="Assigned">Assigned</option>
        </select>
      </div>
    );
  }
}

export default withRouter(IssueFilter);
