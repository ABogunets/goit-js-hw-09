import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// console.log(galleryItems);

const galleryRef = document.querySelector('.gallery');

//Gallery Items Markup
const galleryItemsMarkup = createGalleryItemsMarkUp(galleryItems);

galleryRef.innerHTML = galleryItemsMarkup;

function createGalleryItemsMarkUp(items) {
  return items.map(({ preview, original, description }) =>
    `<a class="gallery__item" href=${original}>
  <img class="gallery__image" src=${preview} alt=${description} />
</a>`).join('');
}

// image processing by Lightbox library
const gallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: "alt",
  captionDelay: 250,
});
gallery.on('show.simplelightbox', function () {});