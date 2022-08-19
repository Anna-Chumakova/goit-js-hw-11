import './css/styles.css';
import Notiflix from 'notiflix';
import  GallaryApiService  from "./fetchImages";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl = document.querySelector("#search-form");
const btnLoadMoreEl = document.querySelector("[type='button']");
const gallaryListEl = document.querySelector(".gallery");
hideBtn();
const galleryService = new GallaryApiService();
const gallerySimple = new SimpleLightbox('.gallery a');

formEl.addEventListener("submit", onSearch);
btnLoadMoreEl.addEventListener("click", onLoadMore);

async function onSearch(e) {
    hideBtn();
    e.preventDefault();
    galleryService.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
    if (galleryService.searchQuery === "") {
        Notiflix.Notify.info("Please enter text and try again.");
        return;
    } else {
        galleryService.resetPage();
        cleaneResult();
    
    try {
        const { data } = await galleryService.fetchImages();
        galleryService.incrementPage();
    if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
        }
        insertContent(data.hits);
        gallerySimple.refresh();
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        countPages(data.totalHits);    
    } catch (error) {
        console.log(error.message);
    }
    }           
}

async function onLoadMore() {
    try {
    hideBtn();
    const { data } = await galleryService.fetchImages();
    galleryService.incrementPage();
    insertContent(data.hits);
    gallerySimple.refresh();
    countPages(data.totalHits);    
    } catch (error) {
    console.log(error.message);
    }
} 
    
function countPages(amount) {
    const pageAmount = Math.ceil(amount / 40);
    const currentPage = galleryService.page;
    if (currentPage >= pageAmount) {
        hideBtn();
        return Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    showBtn();
}
function insertContent (hits) {
    const result = generateGallaryImages(hits);
    gallaryListEl.insertAdjacentHTML("beforeend", result);   
}
function createImageCard (items) {
    const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = items;
    return `<a class="gallery__item" href="${largeImageURL}">
    <div class="photo-card">
    <img class="img_item" src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>
</a>`;
}
function generateGallaryImages(items) {
  return  items?.map((item) => createImageCard(item)).join(" ");
}
function cleaneResult() {
    gallaryListEl.innerHTML = "";
}
function showBtn() {
    btnLoadMoreEl.classList.remove("is-hidden");
}
function hideBtn() {
    btnLoadMoreEl.classList.add("is-hidden");
}
