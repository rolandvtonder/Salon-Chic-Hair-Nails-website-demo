import { StrictMode, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Hair } from "./pages/Hair";
import { Home } from "./pages/Home";
import { Lashes } from "./pages/Lashes";
import { Nails } from "./pages/Nails";
import { Specials } from "./pages/Specials";
import { Wellness } from "./pages/Wellness";

// Each HTML entry names its page in data-page; one bundle serves all eight.
const pages: Record<string, ComponentType> = {
  home: Home,
  hair: Hair,
  nails: Nails,
  lashes: Lashes,
  wellness: Wellness,
  specials: Specials,
  about: About,
  contact: Contact,
};

const root = document.getElementById("root")!;
const Page = pages[root.dataset.page ?? "home"] ?? Home;

createRoot(root).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
