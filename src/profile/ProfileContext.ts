import { createContext, useContext } from 'react'
import type { Profile, ProfileContent } from './profiles'

export interface ProfileContextValue {
  profile: Profile
  content: ProfileContent
  setProfile: (profile: Profile) => void
}

export const ProfileContext = createContext<ProfileContextValue | null>(null)

export function useProfile(): ProfileContextValue {
  const value = useContext(ProfileContext)
  if (!value) throw new Error('useProfile must be used inside <ProfileProvider>')
  return value
}
