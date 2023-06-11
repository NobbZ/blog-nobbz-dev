import * as React from "react";

export const Comments: React.FC = () => (
  <section
    ref={(elem) => {
      if (!elem) {
        return;
      }
      const scriptElem = document.createElement("script");
      scriptElem.src = "https://utteranc.es/client.js";
      scriptElem.async = true;
      scriptElem.crossOrigin = "anonymous";
      scriptElem.setAttribute("repo", "nobbz/blog-nobbz-dev");
      scriptElem.setAttribute("issue-term", "pathname");
      scriptElem.setAttribute("label", "💬 utteranc.es");
      scriptElem.setAttribute("theme", "github-light");
      elem.appendChild(scriptElem);
    }}
  />
);
