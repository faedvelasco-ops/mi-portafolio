import type { SVGProps } from 'react'

function baseProps(size: number, props: SVGProps<SVGSVGElement>): SVGProps<SVGSVGElement> {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true,
    focusable: false,
    ...props,
  }
}

export function LinkedinIcon({ size = 18, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg {...baseProps(size, props)}>
      <path d="M6.94 8.5H4.06V19.94h2.88Zm-1.44-4.6a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34ZM19.94 19.94h-2.87v-6.02c0-1.44-.03-3.28-2-3.28-2.02 0-2.33 1.57-2.33 3.18v6.12H9.87V8.5h2.76v1.56h.04c.38-.73 1.33-1.5 2.74-1.5 2.93 0 3.47 1.93 3.47 4.44Z" />
    </svg>
  )
}

export function GithubIcon({ size = 18, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg {...baseProps(size, props)}>
      <path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.1.65-.2.65-.46v-1.7c-2.64.58-3.2-1.28-3.2-1.28-.43-1.1-1.06-1.4-1.06-1.4-.87-.6.06-.58.06-.58.96.07 1.47 1 1.47 1 .86 1.47 2.25 1.05 2.8.8.09-.63.34-1.05.6-1.29-2.1-.24-4.32-1.06-4.32-4.7 0-1.04.37-1.89.97-2.55-.1-.24-.42-1.2.1-2.5 0 0 .8-.26 2.6 1a9 9 0 0 1 4.74 0c1.8-1.26 2.6-1 2.6-1 .52 1.3.2 2.26.1 2.5.6.66.97 1.51.97 2.55 0 3.65-2.23 4.46-4.34 4.7.34.3.65.87.65 1.76v2.6c0 .27.17.57.66.46A9.5 9.5 0 0 0 12 2.5Z" />
    </svg>
  )
}
