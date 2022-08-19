import axios from 'axios';
export default class GallaryApiService {
  constructor() {
    this.searchQuery = "";
    this.page = 1;
  }
  async fetchImages() {
    const BAES_URL = "https://pixabay.com/api/";
    const PARAM = "image_type=photo&orientation=horizontal&safesearch=true"
    const PER_PAGE = "per_page=40";
    const KEY = '29286270-7757e7c355ff8fc146957d618';

    const URL = `${BAES_URL}?key=${KEY}&q=${this.searchQuery}&${PARAM}&page=${this.page}&${PER_PAGE}`;
    
    const response = await axios.get(URL);
     return response;
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  
}


