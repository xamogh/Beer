import axios, { AxiosRequestConfig } from "axios";

function RequestLogger(config: AxiosRequestConfig<any>) {
    const today = new Date();
    console.log(
        `${config.method?.toUpperCase()} request sent to ${
            config.url
        } at ${today.getHours()} : ${today.getMinutes()}`
    );
    return config;
}

function ErrorLogger(error: unknown) {
    console.log(error);
}

const PunkApi = axios.create({
    baseURL: "https://api.punkapi.com/v2/beers",
});

const Server = axios.create({
    baseURL: "https://some-domain.com/api/",
});

Server.interceptors.request.use(RequestLogger, ErrorLogger);

export { PunkApi };
