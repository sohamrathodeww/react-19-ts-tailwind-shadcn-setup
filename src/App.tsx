function App() {

  return (
    <>
      <div className="flex v-screen items-center justify-center">
        <h1 className="text-4xl font-bold">
          Developer Frontend
        </h1>
      </div>
      <div className="flex h-screen items-center justify-center">
        <button className="text-danger bg-neutral-primary border border-danger hover:bg-danger hover:text-white focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" name="back" value="Home" id="home">Go Home </button>
      </div>
    </>
    
  )
}

export default App
