import { RES_PER_PAGE } from '../config';
import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton(`${curPage + 1}`, 'next');
    }

    // Last Page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton(`${curPage - 1}`, 'prev');
    }

    // Other Page
    if (curPage < numPages) {
      const prev = this._generateMarkupButton(`${curPage - 1}`, 'prev');

      const next = this._generateMarkupButton(`${curPage + 1}`, 'next');

      return prev + next;
      //   return `
      //         <button class="btn--inline pagination__btn--prev">
      //             <svg class="search__icon">
      //             <use href="${icons}#icon-arrow-left"></use>
      //             </svg>
      //             <span>Page ${curPage - 1}</span>
      //         </button>

      //         <button class="btn--inline pagination__btn--next">
      //   <span>Page ${curPage + 1}</span>
      //   <svg class="search__icon">
      //   <use href="${icons}#icon-arrow-right"></use>
      //   </svg>
      //         </button>
      //     `;
    }

    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButton(pageNav, direction) {
    return `
            ${
              direction === 'prev'
                ? `
                <button data-goto="${pageNav}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${pageNav}</span>
                </button>

            `
                : `
                <button data-goto="${pageNav}" class="btn--inline pagination__btn--next">
                <span>Page ${pageNav}</span>
                <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
                </svg>
                </button>
            `
            }
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }
}

export default new PaginationView();
