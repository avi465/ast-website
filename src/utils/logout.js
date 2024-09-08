export default async function logout() {
    try {
        const Response = await fetch("http://localhost:3000/api/admin/logout", {
            method: "POST",
        });
        console.log(Response);
        if (Response.status == 200) {
            // Handle successful logout here (e.g., store token, redirect, etc.)
            console.log("logged out sucessfully");
        }
    } catch (error) {
        console.error("error occured while logging out: " + error);
    }
}