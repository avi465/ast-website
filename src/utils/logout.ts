export async function logout() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/logout`, {
      method: "POST",
      cache: "no-store",
      credentials: "include",
    });

    return response.json();
  } catch (error) {
    console.error("Error occurred while logging out:", error);
    return false;
  }
}
