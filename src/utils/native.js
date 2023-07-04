export const loadscript = (scriptUrl) => {
  return new Promise((resolve) => {
    const scriptTag = document.createElement("script");
    scriptTag.src = scriptUrl;

    scriptTag.onload = () => {
      resolve(true);
    };

    scriptTag.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(scriptTag);
  });
};
