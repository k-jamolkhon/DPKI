import { Navbar, Welcome, Footer, Services, Transactions, Verify } from "./components"
const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
        <Services />
      </div>

      <Verify />
      <Transactions />
      <Footer />
    </div>
  )
}

export default App
