export default async function verifySession() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/verify-session`, {
      method: "GET",
      cache: "no-store",
      credentials: "include", // Ensure cookies are sent with the request
    });

    return response;
  } catch (error: any) {
    return error.message;
  }
}
