import { UserLogin } from "../interfaces/UserLogin";
import { ApiMessage } from "../interfaces/ApiMessage";


const login = async (userInfo: UserLogin): Promise<{ token: string; message: string }> => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorData: ApiMessage = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data: { token: string; message: string } = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unexpected error occurred');
  }
};

export { login };
