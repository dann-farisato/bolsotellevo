import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import 'firebase/firebase-auth-compat'
import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const AuthContext = React.createContext<LoginType>({} as LoginType)

export function useAuth() {
  return useContext(AuthContext)
}
export interface LoginType {
  currentUser: any,
  login: (email: string, password: string) => Promise<UserCredential>,
  signup: (email: string, password: string) => Promise<UserCredential>,
  logout: () => Promise<void> | void,
  resetPassword: (email: string) => Promise<void> | void,
  updateEmail: (email: string) => any,
  updatePassword: (password: string) => any
}



export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState() as any;
  const [loading, setLoading] = useState(true)

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateEmail(email: string) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password: string) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}