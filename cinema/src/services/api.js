import Config from "../../config";
import { cleanCinemaData } from "../utils/cleanCinemaDataUtil";
import { cleanMovieData } from "../utils/cleanMovieDataUtil";

function decodeToken(token) {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
}

export async function authenticate(username, password) {
    try {
        const encodedCredentials = btoa(`${username}:${password}`);
        const response = await fetch(`${Config.API_URL}/authenticate`, {
            method: "POST",
            headers: {
                Authorization: `Basic ${encodedCredentials}`,
                Accept: "application/json",
            },
        });
        const data = await response.json();
        const decoded = decodeToken(data.token);

        return {
            token: data.token,
            expiration: decoded.exp * 1000,
        };
    } catch (error) {
        throw new Error("Authentication error: ", error.message);
    }
}

export async function getCinemas(token) {
    try {
        const response = await fetch(`${Config.API_URL}/theaters`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
        });

        const text = await response.text();

        if (!response.ok) {
            throw new Error(
                `HTTP Error: ${response.status}. Response: ${text}`,
            );
        }

        const data = JSON.parse(text);

        return cleanCinemaData(data);
    } catch (error) {
        throw new Error("Error fetching cinemas: ", error.message);
    }
}

export async function fetchMovies(token) {
    try {
        const response = await fetch(
            `${Config.API_URL}/movies?timestamp=${Date.now()}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token,
                    "Cache-Control": "no-cache",
                },
            },
        );

        const text = await response.text();
        console.log("Status:", response.status);
        console.log("Response:", text);
        if (!response.ok) {
            throw new Error(
                `HTTP Error: ${response.status}. Response: ${text}`,
            );
        }
        const data = JSON.parse(text);
        return cleanMovieData(data);
    } catch (error) {
        throw new Error(`Error fetching upcoming movies: ${error.message}`);
    }
}

export async function fetchUpcomingMovies(token) {
    try {
        const response = await fetch(`${Config.API_URL}/upcoming`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
        });
        const text = await response.text();

        if (!response.ok) {
            throw new Error(
                `HTTP Error: ${response.status}. Response: ${text}`,
            );
        }
        const data = JSON.parse(text);
        return cleanMovieData(data);
    } catch (error) {
        throw new Error("Error fetching upcoming movies: ", error.message);
    }
}
