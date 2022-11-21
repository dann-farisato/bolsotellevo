import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import { LoginType } from "../Type";

const AuthContext = React.createContext<LoginType | null>(null);
;

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState() as any;
  const [loading, setLoading] = useState(true)

  function signup(email: string, password: string) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email: string, password: string) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email: string) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email: string) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password: string) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // const value = {

  // }

  return (
    <AuthContext.Provider value={ }>
      {!loading && children}
    </AuthContext.Provider>
  )
}