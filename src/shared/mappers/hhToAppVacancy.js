import * as dayjs from 'dayjs';

const hhToAppVacancy = (hhData) => {
  const appVacancy = {
    title: hhData.name,
    salary: hhData.salary,
    company: hhData.employer.name,
    description: hhData.description,
    date_created: dayjs(hhData.created_at).valueOf(),
    date_updated: dayjs(hhData.published_at).valueOf(),
    hhid: hhData.id
  }

  return appVacancy;

}

export default hhToAppVacancy;
