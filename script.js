var accent = true;
fetch("list.txt")
    .then((response) => response.text())
    .then((text) => {
        const file = text.trim().toLowerCase();
        const links = file.split("\n").sort();

        const list = document.getElementById("links");
        for (const link of links) {
            if (link != "") {
                const div = document.createElement("div");
                const li = document.createElement("li");
                const a = document.createElement("a");
                if (accent) {
                    div.className = "accent";
                } else {
                    div.className = "non-accent";
                }
                div.style = "width:100%";
                a.href = link.replace("www.", "").replace("http://", "https://");
                a.textContent = link
                    .replace("www.", "")
                    .replace("http://", "https://")
                    .replace(".html", "")
                    .replace(".htm", "");
                a.target = "_blank";
                li.appendChild(a);
                div.appendChild(li);
                list.appendChild(div);
                accent = !accent;
            }
        }
        updateTheme();
        const count = document.getElementById("counter");
        count.textContent = `List Currently Holds ${links.length} links.`;
    });

function updateTheme() {
    const background = document.getElementsByClassName("body");
    const links = document.getElementsByClassName("b");
    const fluff = document.getElementsByClassName("fluff");
    const headers = document.getElementsByClassName("sesame-seeds");
    const buttons = document.getElementsByClassName("theme");
    const accent = document.getElementsByClassName("accent");
    if (localStorage.getItem("dark") == 1) {
        // find all elements with matching class names and set their theme corresponding color

        //light mode
        for (let a = 0; a < background.length; a++) {
            background[a].style.setProperty("--bg", "#f2f2f2");
        }
        for (let b = 0; b < links.length; b++) {
            links[b].style.setProperty("--lnk", "#465e73");
        }
        for (let c = 0; c < fluff.length; c++) {
            fluff[c].style.setProperty("--text", "#00010d");
        }
        for (let d = 0; d < headers.length; d++) {
            headers[d].style.setProperty("--headers", "#00010d");
        }
        for (let e = 0; e < buttons.length; e++) {
            buttons[e].style.setProperty("--bc", "#a8b5bf");
        }
        for (let f = 0; f < accent.length; f++) {
            accent[f].style.setProperty("--ac", "#cecece");
        }
    } else {
        // find all elements with matching class names and set their theme corresponding color

        //dark mode
        for (let a = 0; a < background.length; a++) {
            background[a].style.setProperty("--bg", "#1E1E3C");
        }
        for (let b = 0; b < links.length; b++) {
            links[b].style.setProperty("--lnk", "#8F8F8F");
        }
        for (let c = 0; c < fluff.length; c++) {
            fluff[c].style.setProperty("--text", "#8F8F8F");
        }
        for (let d = 0; d < headers.length; d++) {
            headers[d].style.setProperty("--headers", "#8F8F8F");
        }
        for (let e = 0; e < buttons.length; e++) {
            buttons[e].style.setProperty("--bc", "#3E5366");
        }
        for (let f = 0; f < accent.length; f++) {
            accent[f].style.setProperty("--ac", "#2f2f5e");
        }
    }
}

function themeChange() {
    if (localStorage.getItem("dark") == 1) {
        // make theme dark
        localStorage.setItem("dark", 0);
    } else {
        // make theme light
        localStorage.setItem("dark", 1);
    }
    updateTheme();
}