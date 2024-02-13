class SearchView {
  _parentEl = document.querySelector('.search');

  getQuery() {
    const queryValue = this._parentEl.querySelector('.search__field').value;

    this._clearInput();

    return queryValue;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      handler();
    });
  }
}

export default new SearchView();
