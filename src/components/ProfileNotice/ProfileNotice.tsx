import { useState } from 'react'
import { X } from 'lucide-react'
import { useProfile } from '../../profile/ProfileContext'
import { profileContent } from '../../profile/profiles'
import './ProfileNotice.css'

const STORAGE_KEY = 'portfolio.profileNotice.dismissed'

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); just show the notice.
    return false
  }
}

function saveDismissed() {
  try {
    window.localStorage.setItem(STORAGE_KEY, 'true')
  } catch {
    // Ignore: the notice simply shows again on the next visit.
  }
}

/** Small, non-blocking first-visit hint that the portfolio has two profiles. */
function ProfileNotice() {
  const { profile, setProfile } = useProfile()
  const [dismissed, setDismissed] = useState(readDismissed)

  if (dismissed) return null

  const other = profile === 'qa' ? 'dev' : 'qa'

  const dismiss = () => {
    saveDismissed()
    setDismissed(true)
  }

  return (
    <aside className="profile-notice" aria-label="Aviso de perfil">
      <p>
        Estás viendo el perfil <strong>{profileContent[profile].name}</strong>
        <span aria-hidden="true"> · </span>
        <button
          type="button"
          className="profile-notice__link"
          onClick={() => {
            setProfile(other)
            dismiss()
          }}
        >
          Ver perfil {profileContent[other].name}
        </button>
      </p>
      <button
        type="button"
        className="profile-notice__close"
        onClick={dismiss}
        aria-label="Cerrar aviso"
      >
        <X size={16} aria-hidden="true" />
      </button>
    </aside>
  )
}

export default ProfileNotice
