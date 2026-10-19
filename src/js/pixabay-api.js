import axios from "axios";

const PIXABAY_API_URL = "https://pixabay.com/api/";
const PIXABAY_API_KEY = "38889455-fd8af79455bb4793a4bd4120e";

export async function getImagesByQuery(query, page) {
    const response = await axios.get(PIXABAY_API_URL, {
        params: {
            key: PIXABAY_API_KEY,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page,
            per_page: 15,
        },
    });

    return response.data;
}
