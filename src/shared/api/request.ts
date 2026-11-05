export async function request<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("요청에 실패했습니다. 다시 시도해 주세요.");
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
}
