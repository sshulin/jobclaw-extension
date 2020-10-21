import React from 'react';

import numberStringify from '../../../../shared/stringifiers/numberStringify';

const Salary = ({salary, rates}) => {
  return (
    <span className="salary">
      { salary.from ? (<span>{ numberStringify(salary.from) }</span>) : null }
      { salary.from && !salary.to ? ('+') : null }
      { salary.from && salary.to ? (<span> - </span>) : null }
      { salary.to && !salary.from ? ('<') : null }
      { salary.to ? (<span>{ numberStringify(salary.to) }</span>) : null }
      { salary.currency ? (<span className="salary__currency">{ salary.currency }</span>) : null }
    </span>
  )
}

export default Salary;
