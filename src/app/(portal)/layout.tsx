interface LayoutProps {
  children: React.ReactNode
}
export default function layout({ children }: LayoutProps) {
  return <>{children}</>
}
