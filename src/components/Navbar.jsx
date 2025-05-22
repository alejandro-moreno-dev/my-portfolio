export default function Navbar() {
  return (
    <nav className="p-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">My Portfolio</h1>
      <div className="space-x-4">
        <a href="#home" className="hover:text-blue-500">Home</a>
        <a href="#projects" className="hover:text-blue-500">Projects</a>
        <a href="#contact" className="hover:text-blue-500">Contact</a>
      </div>
    </nav>
  );
}
