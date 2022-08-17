import './css/styles.css';
import Notiflix from 'notiflix';
import  GallaryApiService  from "./fetchImages";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


  

const formEl = document.querySelector("#search-form");
const btnSearchEl = document.querySelector("[type='submit']");
const btnLoadMoreEl = document.querySelector("[type='button']");
const gallaryListEl = document.querySelector(".gallery");

const galleryService = new GallaryApiService();

formEl.addEventListener("submit", onSearch);
btnLoadMoreEl.addEventListener("click", onLoadMore);

function onSearch(e) {
    e.preventDefault();
    galleryService.query = e.currentTarget.elements.searchQuery.value;
    galleryService.resetPage();
    galleryService.fetchImages().then(({ data }) => {
        insertContent(data.hits);
    })
          
}
function onLoadMore() {
    galleryService.fetchImages().then(({ data }) => {
        insertContent(data.hits);
    });
}     
const insertContent = (hits) => {
    const result = generateGallaryImages(hits);
    gallaryListEl.insertAdjacentHTML("beforeend", result);   
}

const createImageCard = (items) => {
    const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = items;
    return `<div class="photo-card">
  <a class="gallery__item" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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
</div>`;
}


const generateGallaryImages = (items) => items?.reduce((acc, item) => acc + createImageCard(item), "");

function cleaneResult() {
    gallaryListEl.innerHTML = "";
}

