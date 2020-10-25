const hhToAppVacancy = (hhData) => {
  const appVacancy = {
    title: hhData.name,
    salary: hhData.salary,
    company: hhData.employer.name,
    description: hhData.description,
    date_created: hhData.created_at,
    date_updated: hhData.published_at,
    hhid: hhData.id
  }

  return appVacancy;

}

export default hhToAppVacancy;
