const API_URL = "https://eventmanagerapi-1.onrender.com/api";

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  const responseText = await response.text();

  let data;

  try {
    data = JSON.parse(responseText);
  } catch {
    data = responseText;
  }

  if (!response.ok) {
    throw new Error(
      typeof data === "object"
        ? data.message || data.title || "Request failed"
        : data || "Request failed"
    );
  }

  return data;
};