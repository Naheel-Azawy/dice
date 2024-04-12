function rand(min, max) {
    return min + Math.round(Math.random() * (max - min));
}

function num2dice(num, html) {
    if (html) {
        switch (num) {
        case 1: return `
<table id="dice">
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td>⬤</td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
</table><br>
` ; break;

        case 2: return `
<table id="dice">
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td>⬤</td> <td> </td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td> </td> <td>⬤</td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
</table><br>
` ; break;

        case 3: return `
<table id="dice">
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td>⬤</td> <td> </td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td>⬤</td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td> </td> <td>⬤</td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
</table><br>
` ; break;

        case 4: return `
<table id="dice">
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td>⬤</td> <td> </td> <td>⬤</td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td>⬤</td> <td> </td> <td>⬤</td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
</table><br>
` ; break;

        case 5: return `
<table id="dice">
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td>⬤</td> <td> </td> <td>⬤</td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td>⬤</td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td>⬤</td> <td> </td> <td>⬤</td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
</table><br>
` ; break;

        case 6: return `
<table id="dice">
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
    <tr><td> </td> <td>⬤</td> <td> </td> <td>⬤</td> <td> </td></tr>
    <tr><td> </td> <td>⬤</td> <td> </td> <td>⬤</td> <td> </td></tr>
    <tr><td> </td> <td>⬤</td> <td> </td> <td>⬤</td> <td> </td></tr>
    <tr><td> </td> <td> </td> <td> </td> <td> </td> <td> </td></tr>
</table><br>
` ; break;
        }

    } else {

        switch (num) {
        case 1: return `
╭─────────╮
│         │
│    ⬤    │
│         │
╰─────────╯
` ; break;

        case 2: return `
╭─────────╮
│  ⬤      │
│         │
│      ⬤  │
╰─────────╯
` ; break;

        case 3: return `
╭─────────╮
│  ⬤      │
│    ⬤    │
│      ⬤  │
╰─────────╯
` ; break;

        case 4: return `
╭─────────╮
│  ⬤   ⬤  │
│         │
│  ⬤   ⬤  │
╰─────────╯
` ; break;

        case 5: return `
╭─────────╮
│  ⬤   ⬤  │
│    ⬤    │
│  ⬤   ⬤  │
╰─────────╯
` ; break;

        case 6: return `
╭─────────╮
│  ⬤   ⬤  │
│  ⬤   ⬤  │
│  ⬤   ⬤  │
╰─────────╯
` ; break;
        }
    }

    return "!!?";
}

function roll(html) {
    const num     = rand(1, 6);
    const percent = rand(0, 100);
    const binary  = rand(0, 1);
    const choice  = binary ? "yes" : "no";

    return num2dice(num, html) + "\n" +
        `Random percentage: ${percent}%\n` +
        `Random choice: ${choice}\n` +
        `Random fractions:\n` +
        `${rand(1, 2)}/2 ${rand(1, 3)}/3\n` +
        `${rand(1, 4)}/4 ${rand(1, 5)}/5`;
}

async function handle_pwa() {
    if ("serviceWorker" in navigator) {
        try {
            let reg = await navigator.serviceWorker.register("sw.js");
            console.log("SW registered: ", reg);
        } catch (e) {
            console.log("SW registration failed: ", e);
        }
    }
}

function main() {
    if (typeof process != "undefined") {
        console.log(roll());
    } else if (typeof window != "undefined") {
        handle_pwa();
    }
}

main();
