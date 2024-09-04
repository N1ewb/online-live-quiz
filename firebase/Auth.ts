import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth/web-extension";
import { toastMessage } from "./db";
import { auth } from "./firebase";

export async function LoginUser(email: string, password: string) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    if (user) {
      toastMessage("Login Success");
      return user;
    }
    return null;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      toastMessage(`Error in: ${error.message}`);
    } else {
      toastMessage("Unkown Error");
    }
  }
}

export async function CreateUser(
  email: string,
  password: string,
  confirmPassword: string
) {
  try {
    if (password.length < 7) {
      toastMessage("Passowrd length must be longer than 7 characters");
      return null;
    }
    if (password !== confirmPassword) {
      toastMessage("Password does not match");
      return null;
    }
    const user = await createUserWithEmailAndPassword(auth, email, password);
    if (user) {
      toastMessage("Account created successfully");
      return user;
    }
    return null;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      toastMessage(`Error in: ${error.message}`);
    } else {
      toastMessage("Unkown Error");
    }
  }
}

export async function LogoutUser() {
  try {
    await auth.signOut();
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      toastMessage(`Error in: ${error.message}`);
    } else {
      toastMessage("Unkown Error");
    }
  }
}
