"use client"

import { createContext, useCallback, useContext, useState } from "react"
import { useSession } from "@/lib/auth-client"

type Session = ReturnType<typeof useSession>["data"]
type User = NonNullable<Session>["user"]

interface AuthContextValue {
  session: Session
  user: User | undefined
  isPending: boolean
  isAuthModalOpen: boolean
  openAuthModal: () => void
  closeAuthModal: () => void
  requireAuth: (action: () => void) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), [])
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), [])

  const requireAuth = useCallback(
    (action: () => void) => {
      if (session?.user) {
        action()
      } else {
        setIsAuthModalOpen(true)
      }
    },
    [session]
  )

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user,
        isPending,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
