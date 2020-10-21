const convertSalary = (salary, rates) => {
  let rubbledSalary = {
    ...salary,
    currency: 'RUR'
  }

  if(salary.from) rubbledSalary.from *= (1/rates[salary.currency]);
  if(salary.to) rubbledSalary.to *= (1/rates[salary.currency]);

  return rubbledSalary;
}

export default convertSalary;
