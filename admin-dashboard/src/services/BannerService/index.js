import axiosClient from "services/axiosClient";
import BRAND_API from "./url";

class BannerService {
    getBrand(page) {
        const params = page ?? 1;
        const url = BRAND_API.BRAND_URL + `?page=${params}&limit=10`;
        return axiosClient.get(url);
    }

    getBrandDetails(id) {
        const url = BRAND_API.CUD_BRAND_URL.replace("{id}", id);
        return axiosClient.get(url);
    }

    postBrand(newBrand) {
        const url = BRAND_API.BRAND_URL;
        return axiosClient.post(url, newBrand);
    }

    updateBrand(id, bodyBrand) {
        const url = BRAND_API.CUD_BRAND_URL.replace("{id}", id);
        return axiosClient.patch(url, bodyBrand);
    }

    deleteBrand(id) {
        const url = BRAND_API.CUD_BRAND_URL.replace("{id}", id);
        return axiosClient.delete(url);
    }
}

export default new BannerService();
