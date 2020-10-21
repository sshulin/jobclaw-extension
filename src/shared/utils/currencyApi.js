import axios from 'axios';

const currencyApi = {
  getRates: (success, fail) => {
    axios.get('https://api.exchangeratesapi.io/latest?base=RUB')
      .then((response) => {
        if(success) success(response.data);
      }).catch((error) => {
        if(fail) fail(error)
      })
  }
}

export default currencyApi;
