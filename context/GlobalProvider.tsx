import { getCurrentUser } from "@/lib/appwrite";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { Models } from "react-native-appwrite";

interface GlobalContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: Models.Document | null;
  setUser: React.Dispatch<React.SetStateAction<Models.Document | null>>;
  isLoading: boolean;
}

// Set default values for the context
const defaultValues: GlobalContextType = {
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
  isLoading: true,
};

const GlobalContext = createContext(defaultValues);

export const useGlobalContext = () => useContext(GlobalContext);

export default function GlobalProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Models.Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}
    ></GlobalContext.Provider>
  );
}
