export default async function verifySession() {
    try {
        const Response = await fetch(process.env.BASE_URL + "/api/admin/verify-session", {
            method: "GET",
            cache: "no-store"
        });
        if (Response.status == 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("error occured while verifying session: " + error);
    }
}

export let isLoggedIn = verifySession();
console.log(isLoggedIn);