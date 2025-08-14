import { QueryPage } from '@/modules/portal'
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <div className="text-2xl">Loading...</div>
          </div>
        }
      >
        <QueryPage />
      </Suspense>
    </>
  )
}
