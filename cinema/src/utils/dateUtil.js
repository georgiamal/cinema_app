const months = [
    "janúar",
    "febrúar",
    "mars",
    "apríl",
    "maí",
    "júní",
    "júlí",
    "ágúst",
    "september",
    "október",
    "nóvember",
    "desember",
];

export const formatDate = (releaseDate) => {
    if (!releaseDate) {
        return "Unknown";
    }

    const date = new Date(releaseDate);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}. ${month} ${year}`;
};
