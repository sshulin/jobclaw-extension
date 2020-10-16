/*global chrome, window, document*/

import chromeStorage from '../../shared/utils/chromeStorage';
const { href }  = window.location;

export default () => {
  let vacancies = [];

  if(href.indexOf('search/vacancy') !== -1) {
    document.querySelectorAll('.vacancy-serp-item').forEach((domNode) => {
      const linkWrapper = domNode.querySelector('.vacancy-serp-item__info');
      const link = domNode.querySelector('.bloko-link');

      const linkHref = link.getAttribute('href');
      const vacancyId = linkHref.split('/vacancy/')[1].split('?')[0];
      domNode.vacancyId = vacancyId;

      let toggler = document.createElement('a');
      toggler.classList.add('vacancy-serp-item__jc-toggler');
      toggler.innerHTML = '<3';
      toggler.addEventListener('click', () => {
        chrome.runtime.sendMessage({
          eventName: "hhVacancyClicked",
          payload: {
            id: vacancyId,
            title: link.innerHTML
          }
        }
        // , function(response) {
        //   // domNode.setSelected();
        //   // checkVacancies();
        // }
        );
      });

      linkWrapper.appendChild(toggler);

      domNode.setSelected = () => {
        domNode.classList.add('vacancy-serp-item--jc-bookmarked');
        toggler.innerHTML = '<3!';
      }

      domNode.setUnselected = () => {
        domNode.classList.remove('vacancy-serp-item--jc-bookmarked');
        toggler.innerHTML = '<3';
      }
    });

    const updateVacancySelection = () => {
      document.querySelectorAll('.vacancy-serp-item').forEach((domNode) => {
        if(vacancies.indexOf(domNode.vacancyId) !== -1) {
          domNode.setSelected();
        } else {
          domNode.setUnselected();
        }
      })
    }

    const checkVacancies = () => {

      chromeStorage.getFavoriteList((favorite) => {

        if(favorite) {
          vacancies = favorite.map((item) => item.hhid);
          updateVacancySelection();
        }
      });

    }

    checkVacancies();
    chromeStorage.subscribe(() => {
      checkVacancies();
    })
  }
}
