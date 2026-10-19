import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api.js";
import {
    clearGallery,
    createGallery,
    hideLoadMoreButton,
    hideLoader,
    showLoadMoreButton,
    showLoader,
} from "./js/render-functions.js";

const searchForm = document.querySelector(".form");
const searchInput = document.querySelector('input[name="search-text"]');
const loadMoreButton = document.querySelector(".load-more");
const PER_PAGE = 15;

let currentPage = 1;
let currentQuery = "";
let totalHits = 0;

async function searchImages(query) {
    if (!query) {
        iziToast.warning({
            message: "Please enter a search query.",
            position: "topRight",
        });
        return;
    }

    currentQuery = query;
    currentPage = 1;
    searchInput.value = query;
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const { hits, totalHits: responseTotalHits } = await getImagesByQuery(query, currentPage);
        totalHits = responseTotalHits;

        if (hits.length === 0) {
            iziToast.info({
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: "topRight",
            });
            return;
        }

        createGallery(hits);
        updateLoadMoreButton(hits.length);
    } catch (error) {
        iziToast.error({
            message: error.message,
            position: "topRight",
        });
    } finally {
        hideLoader();
    }
}

async function loadMoreImages() {
    currentPage += 1;
    hideLoadMoreButton();
    showLoader();

    try {
        const { hits } = await getImagesByQuery(currentQuery, currentPage);

        createGallery(hits);
        updateLoadMoreButton(hits.length);
        scrollAfterLoading();
    } catch (error) {
        currentPage -= 1;
        showLoadMoreButton();
        iziToast.error({
            message: error.message,
            position: "topRight",
        });
    } finally {
        hideLoader();
    }
}

function updateLoadMoreButton(lastPageSize) {
    if (currentPage * PER_PAGE >= totalHits || lastPageSize < PER_PAGE) {
        hideLoadMoreButton();
        iziToast.info({
            message: "We're sorry, but you've reached the end of search results.",
            position: "topRight",
        });
        return;
    }

    showLoadMoreButton();
}

function scrollAfterLoading() {
    const galleryCard = document.querySelector(".gallery-item");

    if (!galleryCard) {
        return;
    }

    const cardHeight = galleryCard.getBoundingClientRect().height;
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}

searchForm.addEventListener("submit", event => {
    event.preventDefault();

    const query = searchInput.value.trim();

    const searchParams = new URLSearchParams(window.location.search);
    if (query) {
        searchParams.set("search-text", query);
    } else {
        searchParams.delete("search-text");
    }
    const queryString = searchParams.toString();
    const nextUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    window.history.replaceState({}, "", nextUrl);
    searchImages(query);
});

loadMoreButton.addEventListener("click", loadMoreImages);

const initialQuery = new URLSearchParams(window.location.search).get("search-text")?.trim();

if (initialQuery) {
    searchImages(initialQuery);
}
