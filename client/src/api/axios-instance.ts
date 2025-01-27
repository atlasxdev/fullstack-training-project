import { useSession } from "@/hooks/use-session";
import axios from "axios";
import { useEffect } from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const timeout = 5000; // must have different timeouts for each api call category (eg. standard api call -> 2-5 seconds)

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    timeout,
    headers: {
        "Content-Type": "application/json",
    },
});

export function useAxiosInstance() {
    const { session } = useSession();

    useEffect(() => {
        if (session) {
            axiosInstance.defaults.headers.Authorization = `Bearer ${session.user.id}`;
        } else {
            delete axiosInstance.defaults.headers.Authorization;
        }
    }, [session]);

    return axiosInstance;
}
