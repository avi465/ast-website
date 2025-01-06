export default async function logout() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/logout`, {
            method: "POST",
            cache: "no-store",
            credentials: "include",
        });

        if (response.status === 200) {
            console.log("Logged out successfully");
            return true; // Indicate success
        } else {
            console.error("Failed to log out", response.status);
            return false; // Indicate failure
        }
    } catch (error) {
        console.error("Error occurred while logging out:", error);
        return false;
    }
}
