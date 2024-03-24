import ky from "ky";
import {
    ACCESS_TOKEN,
    BASE_API_URL,
} from "../consts/api.ts";

export const authorizedApi = ky.create({
    prefixUrl: BASE_API_URL,
    hooks: {
        beforeRequest: [
            request => {
                request.headers.set(
                    "Authorization",
                    `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                );
            },
        ],
    },
});

export const unAuthorizedApi = ky.create({
    prefixUrl: BASE_API_URL,
});