import { useEffect, useRef, useState } from "react";

const options = ["draft", "pending", "paid"];

export default function FilterDropdown({
  selectedStatuses,
  setSelectedStatuses,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((item) => item !== status)
        : [...prev, status],
    );
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 text-sm font-bold hover:text-primary"
      >
        <span className="hidden sm:inline">Filter by status</span>
        <span className="sm:hidden">Filter</span>
        <span className={`text-primary transition ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-30 w-48 rounded-panel bg-white p-6 shadow-panel dark:bg-softDark">
          <div className="space-y-4">
            {options.map((status) => (
              <label
                key={status}
                className="flex cursor-pointer items-center gap-3 text-sm font-bold capitalize"
              >
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status)}
                  onChange={() => toggleStatus(status)}
                  className="h-4 w-4 accent-[#7C5DFA]"
                />
                {status}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
