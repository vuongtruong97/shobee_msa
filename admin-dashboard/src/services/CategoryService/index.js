import axiosClient from "services/axiosClient";
import CATEGORY_API from "./url";

class CategoryService {
    getCategory(page, limit = 5) {
        const params = page ?? 1;
        const url =
            CATEGORY_API.CATEGORY_URL + `?page=${params}&limit=${limit}`;
        return axiosClient.get(url);
    }

    getCategoryDetails(id) {
        const url = CATEGORY_API.CUD_CATEGORY_URL.replace("{id}", id);
        return axiosClient.get(url);
    }

    postCategory(newCategory) {
        const url = CATEGORY_API.CATEGORY_URL;
        return axiosClient.post(url, newCategory);
    }

    updateCategory(id, bodyCategory) {
        const url = CATEGORY_API.CUD_CATEGORY_URL.replace("{id}", id);
        return axiosClient.patch(url, bodyCategory);
    }

    deleteCategory(id) {
        const url = CATEGORY_API.CUD_CATEGORY_URL.replace("{id}", id);
        return axiosClient.delete(url);
    }
}

export default new CategoryService();
