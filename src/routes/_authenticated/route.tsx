/* eslint-disable no-console */
import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    const { auth } = useAuthStore.getState()
    console.log('[RouterGuard] Checking auth for:', location.href)
    console.log('[RouterGuard] Current User:', auth.user)
    console.log('[RouterGuard] Has AccessToken:', !!auth.accessToken)

    if (!auth.accessToken) {
      console.warn('[RouterGuard] No token found. Redirecting to /sign-in')
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }
    console.log('[RouterGuard] Auth OK. Proceeding.')
  },
  component: AuthenticatedLayout,
  errorComponent: ({ error }) => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold text-red-600">Route Error</h1>
      <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto text-black">
        {error.message || JSON.stringify(error, null, 2)}
      </pre>
      <button onClick={() => window.location.href = '/sign-in'} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Back to Login
      </button>
    </div>
  ),
})
