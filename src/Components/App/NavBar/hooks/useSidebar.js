import { useState, useEffect } from "react";

const useSidebar = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);

  const toggle = () => setOpen((v) => !v);
  const openSidebar = () => setOpen(true);
  const closeSidebar = () => setOpen(false);

  // optional: close on escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeSidebar();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { open, toggle, openSidebar, closeSidebar };
};

export default useSidebar;
