
const url = "https://openlibrary.org/search.json";

export async function fetchBooks(searchTerm = "fiction") {
    try {
        const params = new URLSearchParams({
            title: searchTerm,
            fields: "key,title,author_name,first_publish_year,cover_i",
            limit: "1000",
        });

        const response = await fetch(`${url}?${params}`);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        console.log("API returned:", data.docs.length, "books");

        return data.docs;
    } catch (error) {
        console.error("API fetch failed:", error);
        throw error;
    }
}
