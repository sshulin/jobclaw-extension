import axios from 'axios';

const hhApi = {
  getVacancy: (id, success, fail) => {
    axios.get('https://api.hh.ru/vacancies/' + id)
      .then((response) => {
        if(success) success(response.data);
      }, (error) => {
        if(fail) fail(error);
      })

  }
}

export default hhApi;
