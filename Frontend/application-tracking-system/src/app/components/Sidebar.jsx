import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-blue-800 text-white hidden md:block">
      <div className="p-4 text-2xl font-semibold">My App</div>
      <nav>
        <ul className="space-y-2 p-4">
          <li>
            <Link href="/">
              <a className="block p-2 rounded hover:bg-blue-600">Dashboard</a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a className="block p-2 rounded hover:bg-blue-600">Profile</a>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <a className="block p-2 rounded hover:bg-blue-600">Settings</a>
            </Link>
          </li>
          <li>
            <Link href="/messages">
              <a className="block p-2 rounded hover:bg-blue-600">Messages</a>
            </Link>
          </li>
          <li>
            <Link href="/logout">
              <a className="block p-2 rounded hover:bg-blue-600">Log Out</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
