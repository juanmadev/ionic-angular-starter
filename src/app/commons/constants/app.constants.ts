/**
 * Clase para almacenar las constantes referentes a la aplicación
 */
export class AppConstants {

    public static APP_MENU_PAGES = [
        {
            title: 'Perfil',
            url: '/main/profile',
            icon: 'assets/icon/user-regular.svg',
            disabled: false,
            lines: 'inset',
        },
        {
            title: 'Campañas',
            url: '/main/discover',
            icon: 'assets/icon/globe-europe-solid.svg',
            disabled: false,
            lines: 'inset',
        },
        {
            title: 'Mis acciones',
            url: '/main/my-actions',
            icon: 'assets/icon/seedling-solid.svg',
            disabled: false,
            lines: 'none',
        },
        {
            title: 'Mi monedero',
            url: '/main/tokens',
            icon: 'assets/icon/acorn.svg',
            disabled: false,
            lines: 'inset',
        }

    ];
    public static SESSION_USER = 'currentUser';
    public static AUTH_BASIC_KEY = '';
    public static DEFAULT_LANG = 'es';
    public static DEFAULT_APP_LANG = 'es';

    public static MOMENT_FORMATS = {
        parse: {
            dateInput: 'DD-MM-YYYY',
        },
        display: {
            dateInput: 'DD/MM/YYYY',
            monthYearLabel: 'MMM YYYY',
            dateA11yLabel: 'LL',
            monthYearA11yLabel: 'MMMM YYYY',
        },
    };

    /**
     * Retorna el literal con el atributo del objeto que se le pasa
     * Funcón modificada para que si se indica el fullpath no retorne
     * el primer elemento para evitar usar el nombre de la clase que se invoca
     * @example { name: 'Total', prop: CDAppConstants.nameof(() => CDAppConstants.moviMod.total), sortable: true } -> Retornaría "total"
     * @param selector función que recibirá el atributo de la clase
     * @param fullname booleano para indicar si se quiere retornar el atributo o todo el path de la clase del atributo
     */
    public static nameof(selector: () => any, fullname = false) {
        const s = '' + selector;
        const m = s.match(/return\s+([A-Z$_.]+)/i)
            || s.match(/.*?(?:=>|function.*?{(?!\s*return))\s*([A-Z$_.]+)/i);
        const name = m && m[1] || '';
        return fullname ? name.split('.').slice(2).join('.') : name.split('.').reverse()[0];
    }
}
