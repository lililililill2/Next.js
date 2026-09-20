export async function request<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("에러");
    }

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
