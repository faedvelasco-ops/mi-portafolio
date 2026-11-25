import { useProfile } from '../../profile/ProfileContext'
import { profileContent, profiles } from '../../profile/profiles'
import './ProfileSwitch.css'

interface ProfileSwitchProps {
  className?: string
}

/** Segmented "QA | Dev" control. Native buttons with aria-pressed keep it keyboard operable. */
function ProfileSwitch({ className }: ProfileSwitchProps) {
  const { profile, setProfile } = useProfile()

  return (
    <div
      className={`profile-switch${className ? ` ${className}` : ''}`}
      role="group"
      aria-label="Perfil profesional"
    >
      {profiles.map((option) => (
        <button
          key={option}
          type="button"
          className="profile-switch__option"
          aria-pressed={profile === option}
          title={`Ver perfil ${profileContent[option].name}`}
          onClick={() => setProfile(option)}
        >
          {profileContent[option].label}
        </button>
      ))}
    </div>
  )
}

export default ProfileSwitch
