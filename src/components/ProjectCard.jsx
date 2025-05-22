export default function ProjectCard({ repo }) {
  return (
    <div className="p-4 border rounded-lg shadow-md hover:shadow-xl transition">
      <h2 className="text-lg font-semibold">{repo.name}</h2>
      <p className="text-sm text-gray-600">{repo.description || "No description"}</p>
      <a href={repo.html_url} target="_blank" className="text-blue-500 mt-2 inline-block">View on GitHub</a>
    </div>
  );
}
