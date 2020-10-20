import React, { useEffect } from 'react';

import { fetchCurrentVacancy } from '../../actions';

import { connect } from 'react-redux';

const VacancyDetailPage = ({ vacancy, uuid, fetchCurrentVacancy }) => {

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
                  { vacancy.salary.from ? (<span>{ vacancy.salary.from }</span>) : null }
                  { vacancy.salary.from && vacancy.salary.to ? (<span> - </span>) : null }
                  { vacancy.salary.to ? (<span>{ vacancy.salary.to }</span>) : null }
                  { vacancy.salary.currency ? (<span className="vacancy-detail__salary-currency">{ vacancy.salary.currency }</span>) : null }
                </div>
              ) : (
                <div className="vacancy-detail__salary"></div>
              )
            }
            <div className="vacancy-detail__company">
              { vacancy.company }
            </div>
            <div className="vacancy-detail__description" dangerouslySetInnerHTML={{__html: vacancy.description}} ></div>
          </div>
        </div>
      </div>
    </div>
  ) : (<span></span>)
}

const mapStateToProps = ({ currentVacancy }, { match } ) => {
  return {
    vacancy: currentVacancy.data,
    uuid: match.params.uuid
  }
}

const mapDispatchToProps = {
  fetchCurrentVacancy
}

export default connect(mapStateToProps, mapDispatchToProps)(VacancyDetailPage);
