{
  'use strict';

  const templateBook = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  const booksList = document.querySelector('.books-list');
  const form = document.querySelector('.filters');
  const filters = [];
  const favoriteBooks =[];

  class BooksList {

    constructor() {
      this.data = dataSource.books;
      
      this.render(this.data);
      this.initActions(this.data);
    }

    render(books){
      for (let book in books){
        let ratingBgc = this.determineRatingBgc(books[book].rating);
        let ratingWidth = books[book].rating*10;
        const allData = books[book];
        allData.ratingBgc = ratingBgc;
        allData.ratingWidth = ratingWidth;
        let generatedHTML= templateBook(allData);
        let bookElement = utils.createDOMFromHTML(generatedHTML);
        booksList.appendChild(bookElement);
      }   
    }

    determineRatingBgc(rating){
      if (rating < 6)
        return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      else if (rating > 6 && rating <= 8)
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      else if (rating > 8 && rating <= 9)
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      else
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }   

    initActions(books) {
      booksList.addEventListener('dblclick', function(event){
        event.preventDefault();
        const clickedBook = event.target.offsetParent;
        if(clickedBook.classList.contains('book__image')){
          const bookId = clickedBook.getAttribute('data-id');
          if (!favoriteBooks.includes(bookId)){
            clickedBook.classList.add('favorite');
            favoriteBooks.push(bookId);
          } else { 
            clickedBook.classList.remove('favorite');
            favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);}
        }
      });
      form.addEventListener('click', function(event){
        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
          if (event.target.checked){
            filters.push(event.target.value);
          } else {
            filters.splice(filters.indexOf(event.target.value), 1);
          }
        }
        for (let book of books){
          let shouldBeHidden = false;
          for (let filter of filters){
            if (!book.details[filter]){
              shouldBeHidden = true;
            }
          }
          const bookElement = document.querySelector('.book__image[data-id="' + book.id + '"]');
          if(shouldBeHidden){
            bookElement.classList.add('hidden');
          } else {
            bookElement.classList.remove('hidden');
          }
        }
      });
    }
  }
  
  const app = new BooksList();
  console.log('BookList: ', app);
}