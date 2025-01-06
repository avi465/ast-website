// utils/api.js
export const fetchCourses = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/`, {
            method: "GET",
            cache: "no-cache",
        });

        if (!response.ok) {
            throw new Error("Failed to fetch courses");
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
