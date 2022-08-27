import axiosClient from "services/axiosClient";
import DISCOUNT_API from "./url";

class DiscountService {
    getDiscount(page) {
        const params = (page) ?? 1
        const url = DISCOUNT_API.DISCOUNT_URL + `?page=${params}&limit=10`;
        return axiosClient.get(url);
    }

    getDiscountDetails(id) {
        const url = DISCOUNT_API.CUD_DISCOUNT_URL.replace("{id}", id);
        return axiosClient.get(url);
    }

    postDiscount(newDiscount) {
        const url = DISCOUNT_API.DISCOUNT_URL;
        return axiosClient.post(url, newDiscount);
    }

    updateDiscount(id, bodyDiscount) {
        const url = DISCOUNT_API.CUD_DISCOUNT_URL.replace("{id}", id);
        return axiosClient.patch(url, bodyDiscount);
    }

    deleteDiscount(id) {
        const url = DISCOUNT_API.CUD_DISCOUNT_URL.replace("{id}", id);
        return axiosClient.delete(url);
    }
}

export default new DiscountService();