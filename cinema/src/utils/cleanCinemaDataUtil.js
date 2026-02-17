export function cleanCinemaData(data) {
    return data.map((cinema) => {
        const cleanedCinema = {};

        Object.keys(cinema).forEach((key) => {
            const cleanedKey = key.trim();
            let value = cinema[key];

            if (cleanedKey === "description" && typeof value === "string") {
                value = value
                    .replace(/\n+/g, " ")
                    .replace(/\s+/g, " ")
                    .replace(/<b>+/g, " ")
                    .replace(/<br>+/g, "\n")
                    .trim();
            }
            cleanedCinema[cleanedKey] = value;
        });

        return cleanedCinema;
    });
}
