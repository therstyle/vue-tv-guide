const getImageUrl = (fileName) => new URL(`../assets/images/${fileName}`, import.meta.url);

export default getImageUrl;