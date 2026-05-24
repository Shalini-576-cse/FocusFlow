import { Search } from "lucide-react";

const Navbar = ({ search, setSearch }) => {

  return (
    <div className="flex justify-end">

      <div className="bg-white flex items-center px-4 py-3 rounded-2xl shadow-sm w-[380px]">

        <Search
          className="text-gray-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-3 w-full outline-none bg-transparent"
        />

      </div>

    </div>
  );
};

export default Navbar;