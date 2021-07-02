window.addEventListener("load", () => {
    document.querySelectorAll("a").forEach(a => {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
    });
});
