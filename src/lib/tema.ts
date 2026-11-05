/* La scelta del tema, letta prima del primo disegno (components/ThemeToggle.tsx per l'interruttore).
   Come in Basecamp: segue il sistema; l'interruttore lo fissa chiaro o scuro su questo dispositivo.
   Sta fuori dal componente client: un valore esportato da un file "use client" non arriva al server. */
export const CHIAVE_TEMA = "tema";

export const SCRIPT_TEMA = `try{var t=localStorage.getItem("${CHIAVE_TEMA}");if(t==="chiaro")document.documentElement.dataset.theme="light";else if(t==="scuro")document.documentElement.dataset.theme="dark"}catch(e){}`;
