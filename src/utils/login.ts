export const login = async (email: string, password: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/login`, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message ?? "Login failed");
  }

  return response.json();
};
