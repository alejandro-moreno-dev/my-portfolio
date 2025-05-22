import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/alejandro-moreno-dev/repos")
      .then(res => res.json())
      .then(data => setRepos(data));
  }, []);

  return (
    <section id="projects" className="p-8">
      <h2 className="text-2xl font-bold mb-4">Different Time Zones Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map(repo => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}
