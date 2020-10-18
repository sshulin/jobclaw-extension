const hhToAppVacancy = (hhData) => {
  const appVacancy = {
    title: hhData.name,
    salary: hhData.salary,
    company: hhData.employer.name,
    hhid: hhData.id
  }

  return appVacancy;

}

export default hhToAppVacancy;
