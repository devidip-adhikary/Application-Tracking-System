import axios, { AxiosRequestConfig, Method } from 'axios';

interface ApiRequestOptions {
  url: string;
  method: Method;
  body?: any;
  id?: string | number;
  token?: string;
  queryParams?: Record<string, string | number | boolean>;
}


export async function apiAction<T>({
  url,
  method,
  body,
  id,
  token,
  queryParams,
}: ApiRequestOptions): Promise<T> {
  try {
    // Build the complete URL with ID and query parameters if provided
    let fullUrl = id ? `${url}/${id}` : url;
    if (queryParams) {
      const queryString = new URLSearchParams(queryParams as any).toString();
      fullUrl += `?${queryString}`;
    }

    // Set up Axios request configuration
    const config: AxiosRequestConfig = {
      url: fullUrl,
      method,
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,OPTIONS",
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      data: body, // Axios uses `data` for the request body
    };

    // Make the API request
    const response = await axios(config);

    // Return the response data
    return response.data;
  } catch (error:any) {
    if (error.status === 401) {
      localStorage.clear();
      window.location.href='/auth/signin';
    } else {
      // Log or handle other errors as needed
      console.error('API request error:', error);
    }
    throw error;
  }
}
