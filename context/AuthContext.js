"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import auth from "@/lib/auth";
import db from "@/lib/firestore";
import { doc, getDoc } from "firebase/firestore";


const AuthContext = createContext();


export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {

        if (currentUser) {

          setUser(currentUser);


          // Get Firestore profile
          const userRef = doc(
            db,
            "users",
            currentUser.uid
          );

          const userSnap = await getDoc(userRef);


          if (userSnap.exists()) {
            setProfile(userSnap.data());
          }


        } else {

          setUser(null);
          setProfile(null);

        }


        setLoading(false);

      }
    );


    return () => unsubscribe();

  }, []);



  async function logout() {

    await signOut(auth);

  }



  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );

}



export function useAuth(){

  return useContext(AuthContext);

}