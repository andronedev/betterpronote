settings_btn = `
<li id="settings" style="margin-left: 10px;" style="cursor: pointer;">
<span class="GMenu_Btn GMenu_Btn_Settings" title="Paramètres"
style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; padding: 0px; margin: 0px">
<svg width="24px" height="24px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9794 2.97636C12.7523 2.27761 11.2477 2.27761 10.0207 2.97636L7.59467 4.35783L7.59463 4.35776L7.58436 4.36378L5.17499 5.77401C3.95632 6.48731 3.20403 7.79031 3.19563 9.20235L3.17903 11.994L3.17896 11.994L3.17903 12.0059L3.19563 14.7976C3.20403 16.2097 3.95632 17.5127 5.17499 18.226L7.58436 19.6362L7.58433 19.6363L7.59467 19.6422L10.0207 21.0236C11.2477 21.7224 12.7523 21.7224 13.9794 21.0236L16.4053 19.6422L16.4054 19.6422L16.4157 19.6362L18.825 18.226C20.0437 17.5127 20.796 16.2097 20.8044 14.7976L20.821 12.0059H20.8211L20.821 11.994L20.8044 9.20235C20.796 7.7903 20.0437 6.4873 18.825 5.77401L16.4157 4.36378L16.4157 4.36371L16.4053 4.35783L13.9794 2.97636ZM11.0103 4.71433C11.6239 4.36496 12.3762 4.36496 12.9897 4.71433L15.4105 6.09285L17.8147 7.50008C18.4241 7.85673 18.8002 8.50823 18.8044 9.21425L18.821 12L18.8044 14.7857C18.8002 15.4918 18.4241 16.1433 17.8147 16.4999L15.4105 17.9072L12.9897 19.2857C12.3762 19.635 11.6239 19.635 11.0103 19.2857L8.58952 17.9071L6.18528 16.4999C5.57594 16.1433 5.1998 15.4918 5.1956 14.7857L5.17903 12L5.1956 9.21425C5.1998 8.50823 5.57594 7.85673 6.18528 7.50008L8.5895 6.09286L11.0103 4.71433ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12ZM12 9C10.3432 9 9.00001 10.3431 9.00001 12C9.00001 13.6568 10.3432 15 12 15C13.6569 15 15 13.6568 15 12C15 10.3431 13.6569 9 12 9Z" fill="#ffffff"></path> </g></svg>
</span>
</li>
`;

settings_menu = `
<div id="settings_menu" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);">
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #ffffff; border-radius: 10px; margin: 10px; width: 90%; height: 50%; overflow: auto;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #000000;">
            <h1>BetterPronote</h1>
        </div>
        <div style="padding: 10px;">
            <h2>Paramètres</h2>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h3>Thème</h3>
                <select id="theme">
                    <option value="default" selected>Par défaut</option>
                    <option value="orange">Orange</option>
                </select>
            </div>
        </div>
        <div style="padding: 10px;">
            <h2>À propos</h2>
            <p>BetterPronote est une extension pour pronote qui permet d'ajouter des fonctionnalités supplémentaires.</p>
            <p>Version: 1.0.0</p>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-top: 1px solid #000000;">
            <button id="close_settings">Fermer</button>
            <button id="save_settings">Sauvegarder</button>
        </div>
    </div>
</div>
`;

menu = document.querySelector("#GInterface\\.Instances\\[2\\] > nav > div > div.header-droit > ul")

if (menu) {
    // check if settings button already exists
    if (!document.querySelector("#GInterface\\.Instances\\[2\\]_Btn_Settings")) {
        menu.insertAdjacentHTML("beforeend", settings_btn)
        document.querySelector("#settings").addEventListener("click", openSettings)
    }
}

function openSettings() {
    if (!document.querySelector("#settings_menu")) {
        document.body.insertAdjacentHTML("beforeend", settings_menu)
        document.querySelector("#close_settings").addEventListener("click", closeSettings)
        document.querySelector("#save_settings").addEventListener("click", saveSettings)
        let settings = loadSettings()
        document.querySelector("#theme").value = settings.theme

    }

    
}

function closeSettings() {
    document.querySelector("#settings_menu").remove()
}

function saveSettings() {
    let theme = document.querySelector("#theme").value
    localStorage.setItem("theme", theme)
    closeSettings()
}

function loadSettings() {
    let theme = localStorage.getItem("theme")
    return {
        theme: theme
    }
}
