type Options = {
  headers?: Record<string, string>;
  body?: any;
};

export const fetchApi = async (
  url: string,
  method: string = "GET",
  options?: Options
) => {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      body: method !== "GET" ? JSON.stringify(options?.body) : undefined,
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        data: undefined,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (err: any) {
    return {
      success: false,
      data: undefined,
    };
  }
};
