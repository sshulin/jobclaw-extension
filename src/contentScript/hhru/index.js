/*global chrome, window, document*/

const { href }  = window.location;

const togglerStyles = `
  color: #a35061;
  cursor: pointer;
  display: inline-block;
  font-size: 18px;
  font-weight: 600;
  margin-left: 5px;
`;

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
      toggler.setAttribute('style', togglerStyles);
      toggler.innerHTML = '<3';
      toggler.addEventListener('click', () => {
        chrome.runtime.sendMessage({
          eventName: "hhVacancyClicked",
          payload: {
            id: vacancyId,
            title: link.innerHTML
          }
        }, function(response) {
          domNode.setSelected();
        });
      });

      linkWrapper.appendChild(toggler);

      domNode.setSelected = () => {
        toggler.innerHTML = '<3!';
        toggler.style.fontWeight = '400';
        domNode.setAttribute('style', `
          background: #f2d3cc;
        `);
      }
    });

    const updateVacancySelection = () => {
      document.querySelectorAll('.vacancy-serp-item').forEach((domNode) => {
        if(vacancies.indexOf(domNode.vacancyId) !== -1) {
          domNode.setSelected();
        }
      })
    }

    const checkVacancies = () => {

      chrome.storage.sync.get('hhItems', (data) => {

        if(data && data.hhItems) {
          vacancies = data.hhItems.map((item) => item.hhid);
          updateVacancySelection();
          // chrome.storage.sync.set({'hhItems': []});
        }
      });

    }

    checkVacancies();
    chrome.storage.onChanged.addListener(() => {
      checkVacancies();
    })
  }
}