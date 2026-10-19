import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMoreButton = document.querySelector(".load-more");
const lightbox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
});

export function createGallery(images) {
    const galleryMarkup = images
        .map(
            image => `
                <li class="gallery-item">
                    <a class="gallery-link" href="${image.largeImageURL}">
                        <img
                            class="gallery-image"
                            src="${image.webformatURL}"
                            alt="${image.tags}"
                            loading="lazy"
                        />
                        <div class="image-info">
                            <p><strong class="image-info-label">Likes</strong>${image.likes}</p>
                            <p><strong class="image-info-label">Views</strong>${image.views}</p>
                            <p><strong class="image-info-label">Comments</strong>${image.comments}</p>
                            <p><strong class="image-info-label">Downloads</strong>${image.downloads}</p>
                        </div>
                    </a>
                </li>
            `,
        )
        .join("");

    gallery.insertAdjacentHTML("beforeend", galleryMarkup);
    lightbox.refresh();
}

export function clearGallery() {
    gallery.innerHTML = "";
}

export function showLoader() {
    loader.classList.add("is-visible");
}

export function hideLoader() {
    loader.classList.remove("is-visible");
}

export function showLoadMoreButton() {
    loadMoreButton.classList.add("is-visible");
}

export function hideLoadMoreButton() {
    loadMoreButton.classList.remove("is-visible");
}
