import axios from 'axios';
export default class GallaryApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }
   async fetchImages() {
    const KEY = '29286270-7757e7c355ff8fc146957d618';
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`;
    
    const responce = await axios.get(URL);
     this.incrementPage();
     return responce;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    return this.searchQuery = newQuery;
  }
}


