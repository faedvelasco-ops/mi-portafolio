import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ProfileContext } from './ProfileContext'
import { pathForProfile, profileContent, profileFromPath } from './profiles'
import type { Profile } from './profiles'

/**
 * The active profile lives in the URL (/qa, /dev; "/" falls back to QA), so each
 * CV can link straight to its profile and the browser's back/forward buttons work.
 */
function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<Profile>(() =>
    profileFromPath(window.location.pathname),
  )

  useEffect(() => {
    const handlePopState = () => setProfileState(profileFromPath(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.profile = profile
    document.title = profileContent[profile].documentTitle
  }, [profile])

  const setProfile = useCallback(
    (next: Profile) => {
      if (next === profile) return
      window.history.pushState({ profile: next }, '', pathForProfile(next))
      setProfileState(next)
    },
    [profile],
  )

  const value = useMemo(
    () => ({ profile, content: profileContent[profile], setProfile }),
    [profile, setProfile],
  )

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export default ProfileProvider
