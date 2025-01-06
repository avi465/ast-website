export default async function verifySession(req) {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/admin/verify-session`, {
            method: "GET",
            cache: "no-store",
            credentials: "include", // Ensure cookies are sent with the request
        });

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error occurred while verifying session:", error);
        return false;
    }
}