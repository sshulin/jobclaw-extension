/*global chrome, window, document*/

import chromeStorage from '../../shared/utils/chromeStorage';
const { href }  = window.location;

export default () => {
  let favoriteVacancies = [];
  let blacklistVacancies = [];

  if(href.indexOf('search/vacancy') !== -1) {
    document.querySelectorAll('.vacancy-serp-item').forEach((domNode) => {
      const linkWrapper = domNode.querySelector('.vacancy-serp-item__info');
      const link = domNode.querySelector('.bloko-link');

      const linkHref = link.getAttribute('href');
      const vacancyId = linkHref.split('/vacancy/')[1].split('?')[0];
      domNode.vacancyId = vacancyId;

      let favoriteToggler = document.createElement('a');
      favoriteToggler.classList.add('vacancy-serp-item__jc-toggler');
      favoriteToggler.innerHTML = '<3';
      favoriteToggler.addEventListener('click', () => {
        chrome.runtime.sendMessage({
          eventName: "hhVacancyFavoriteClicked",
          payload: {
            id: vacancyId,
            title: link.innerHTML
          }
        })
      });

      linkWrapper.appendChild(favoriteToggler);

      domNode.setFavorite = () => {
        domNode.classList.add('vacancy-serp-item--jc-favorite');
        favoriteToggler.innerHTML = '<3!';
      }

      domNode.unsetFavorite = () => {
        domNode.classList.remove('vacancy-serp-item--jc-favorite');
        favoriteToggler.innerHTML = '<3';
      }

      let blacklistToggler = document.createElement('a');
      blacklistToggler.classList.add('vacancy-serp-item__jc-blacklist-toggler');
      blacklistToggler.innerHTML = 'X';
      blacklistToggler.addEventListener('click', () => {
        chrome.runtime.sendMessage({
          eventName: "hhVacancyBlacklistClicked",
          payload: {
            id: vacancyId,
            title: link.innerHTML
          }
        })
      });

      linkWrapper.appendChild(blacklistToggler);

      domNode.setBlacklisted = () => {
        domNode.classList.add('vacancy-serp-item--jc-blacklisted');
        blacklistToggler.innerHTML = 'X!';
      }

      domNode.unsetBlacklisted = () => {
        domNode.classList.remove('vacancy-serp-item--jc-blacklisted');
        blacklistToggler.innerHTML = 'X';
      }
    });

    const updateVacancySelection = () => {
      document.querySelectorAll('.vacancy-serp-item').forEach((domNode) => {
        if(favoriteVacancies.indexOf(domNode.vacancyId) !== -1) {
          domNode.setFavorite();
        } else {
          domNode.unsetFavorite();
        }

        if(blacklistVacancies.indexOf(domNode.vacancyId) !== -1) {
          domNode.setBlacklisted();
        } else {
          domNode.unsetBlacklisted();
        }
      })
    }

    const checkVacancies = () => {

      chromeStorage.getFavoriteList((favorite) => {

        if(favorite) {
          favoriteVacancies = favorite.map((item) => item.hhid);
        }
        chromeStorage.getBlacklist((blacklist) => {
          if(blacklist) {
            blacklistVacancies = blacklist.map((item) => item.hhid)
          }

          updateVacancySelection();
        })
      });

    }

    checkVacancies();
    chromeStorage.subscribe(() => {
      checkVacancies();
    })
  }
}
