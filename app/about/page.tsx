export default function AboutPage() {
  return (
    <div className="p-10 text-white leading-8">
      <h1 className="text-4xl text-cyan-400 mb-5 font-bold">About TaskFlow</h1>

      <p className="text-lg">
        TaskFlow is a modern task management application designed to improve
        productivity and organization.
      </p>

      <div className="mt-8 p-6 bg-slate-800 rounded-xl">
        <h2 className="text-2xl text-cyan-400 mb-4">Features</h2>

        <ul className="list-disc pl-6 text-lg">
          <li>Create and manage tasks</li>
          <li>Track completed work</li>
          <li>Simple and responsive UI</li>
          <li>Built with Next.js</li>
        </ul>
      </div>
    </div>
  );
}
