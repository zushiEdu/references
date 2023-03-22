var accent = true;
var simplified = (localStorage.getItem("mode") === 'true');
const modeView = document.getElementById("simplifiedStatus");

refreshSimplified();
function displayURLs() {
    fetch("list.txt")
        .then((response) => response.text())
        .then((text) => {
            const file = text.trim().toLowerCase();
            const links = file.split("\n").sort();

            const list = document.getElementById("links");
            list.innerHTML = ``;
            var items = 1;
            for (const link of links) {
                if (link != "") {
                    // create constants
                    const div = document.createElement("div");
                    const li = document.createElement("li");
                    const a = document.createElement("a");

                    // set accent slots
                    if (accent) {
                        div.className = "accent";
                    } else {
                        div.className = "non-accent";
                    }
                    div.style = "width:100%";

                    // auto margin
                    if (items < 10) {
                        li.style = `margin-left: 25px`;
                    } else if (items < 100) {
                        li.style = `margin-left: 30px`;
                    } else if (items < 1000) {
                        li.style = `margin-left: 40px`;
                    } else if (items < 10000) {
                        li.style = `margin-left: 45px`;
                    }

                    a.href = link;
                    // show view based on mode
                    if (simplified) {
                        a.textContent = link
                            .replace("www.", "")
                            .replace("http://", "https://")
                            .replace(".html", "")
                            .replace(".htm", "");
                    } else {
                        a.textContent = link;
                    }

                    // apply elements
                    a.target = "_blank";
                    li.appendChild(a);
                    div.appendChild(li);
                    list.appendChild(div);

                    // iterate
                    accent = !accent;
                    items++;
                }
            }
            updateTheme();
            const count = document.getElementById("counter");
            count.textContent = `List Currently Holds ${links.length} links.`;
        });
}

function switchSimplified() {
    if (simplified) {
        simplified = false;
        modeView.innerText = "Simplified";
    } else {
        simplified = true;
        modeView.innerText = "Full URLs";
    }
    localStorage.setItem("mode", simplified);
    displayURLs();
}

function refreshSimplified() {
    if (simplified) {
        modeView.innerText = "Full URLs";
    } else {
        modeView.innerText = "Simplified";
    }
    displayURLs();
}

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