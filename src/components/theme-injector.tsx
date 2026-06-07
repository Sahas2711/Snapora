"use client";

import { useServerInsertedHTML } from "next/navigation";

const THEME_INIT_SCRIPT = `(function(){var e=localStorage.getItem("theme")||"system";var t=e==="system"?(window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"):e;document.documentElement.classList.add(t)})()`;

export function ThemeInjector() {
  useServerInsertedHTML(() => (
    <script
      id="snapora-theme"
      dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
    />
  ));
  return null;
}
