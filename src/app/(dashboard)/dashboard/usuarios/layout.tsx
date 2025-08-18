import { PersonFilters } from '@/modules/dashboard'

interface Props {
  children?: React.ReactNode
}

export default function Layout(props: Props) {
  const { children } = props
  return (
    <>
      <PersonFilters />
      {children}
    </>
  )
}
