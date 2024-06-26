import { getServerSession } from 'next-auth'
import ProductCard from './components/ProductCard'
import { authOptions } from './api/auth/authOptions'

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  return (
    <main>
      <h1>Hello {session ? session.user?.name : 'World'}</h1>

      <ProductCard />
    </main>
  )
}
