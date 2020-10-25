import React, { useEffect } from 'react';
import Salary from '../core/salary';

import { fetchCurrentVacancy } from '../../actions';
import convertSalary from '../../../shared/mappers/convertSalary';
import timestampStringify from '../../../shared/stringifiers/timestampStringify';

import { connect } from 'react-redux';

const VacancyDetailPage = ({ vacancy, rates, uuid, fetchCurrentVacancy }) => {

  useEffect(() => {
    fetchCurrentVacancy(uuid)
  }, [fetchCurrentVacancy, uuid])

  return (vacancy) ? (
    <div className="page">
      <div className="page__wrapper">
        <div className="page__title">
          { vacancy.title }
        </div>
        <div className="page__section page__section--grower">
          <div className="vacancy-detail">
            { vacancy.salary ? (
              <div className="vacancy-detail__salary">
                <Salary salary={ vacancy.salary } />
                { rates && rates[vacancy.salary.currency] && vacancy.salary.currency !== 'RUR' ? (
                 <span>(<Salary salary={ convertSalary(vacancy.salary, rates) } />)</span>
                ) : null}
              </div>
            ) : (
              <div className="vacancy-detail__salary"></div>
            )}
            <div className="vacancy-detail__company">
              { vacancy.company }
            </div>
            <div className="vacancy-detail__description" dangerouslySetInnerHTML={{__html: vacancy.description}} ></div>
            <div className="vacancy-detail__date-list">
              <div className="vacancy-detail__date-item">
                <div className="vacancy-detail__date-icon">
                  <i className="fa fa-plus"></i>
                </div>
                <div className="vacancy-detail__date-value">
                  { timestampStringify(vacancy.date_created) }
                </div>
              </div>
              <div className="vacancy-detail__date-item">
                <div className="vacancy-detail__date-icon">
                  <i className="fa fa-save"></i>
                </div>
                <div className="vacancy-detail__date-value">
                  { timestampStringify(vacancy.date_updated) }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (<span></span>)
}

const mapStateToProps = ({ currentVacancy, rates }, { match } ) => {
  return {
    vacancy: currentVacancy.data,
    rates: rates.data,
    uuid: match.params.uuid
  }
}

const mapDispatchToProps = {
  fetchCurrentVacancy
}

export default connect(mapStateToProps, mapDispatchToProps)(VacancyDetailPage);
