import Download from "./sections/Download"
import Generate from "./sections/Generate"
import Merge from "./sections/Merge"
import Navbar from "./sections/Navbar"
import Upload from "./sections/Upload"

function App() {


  return (
    <div className="bg-background">
      <Navbar />
      <main className="flex flex-col max-w-4xl md:w-[90%] mx-auto">
        <Upload />
        <Generate />
        <Merge />
        <Download />
      </main>
    </div>
  )
}

export default App
