import * as moment from 'moment';
import { AppConstants } from 'src/app/commons/constants/app.constants';
/**
 * Clase encargada de recoger métodos útiles y poder ser reutilizados por los distintos componentes de la aplicación
 */
export class AppBasePageComponent {

    /**
     * Librería moment para poder ser utilizada en todo componente que extienda de éste
     */
    moment = moment;

    /**
     * @ignore
     */
    constructor() {
    }

    /**
     * Recibe una fecha en formato {string} y retorna la fecha en un formato único para toda clase que la invoque
     * , en caso de no proporcionar una fecha válida retornará null
     * @param date {string} fecha en formato string que será formateada
     */
    formatDate(date: string): string {
        let dateParse: string;
        if (date && date.length > 0) {
            dateParse = this.moment(date).format(AppConstants.MOMENT_FORMATS.parse.dateInput);
            return dateParse;
        }
        return null;
    }

    /**
     * Hace el cáculo de paginación y retorna la página a consultar correspondiente
     * @param pageOffset {number} offset encargado de indicar los siguientes resultados a consultar
     * @param rowsPerPage {number} número de resultados por página que deseamos para el muestreo.
     */
    calcActualPage(pageOffset: number = 0, rowsPerPage: number = 10): number {
        return pageOffset / rowsPerPage;
    }

    /**
     * Return true if empty
     * @param array : Array to inspect
     */
    checkEmptyArray(array: Array<any>): boolean {
        if (array && array.length) {
            return array.length <= 0;
        }
        return true;
    }

    /**
     * Retorna el literal con el atributo del objeto que se le pasa
     * Funcón modificada para que si se indica el fullpath no retorne el primer elemento
     * para evitar usar el nombre de la clase que se invoca
     * @example { name: 'Total', prop: CDAppConstants.nameof(() => CDAppConstants.moviMod.total), sortable: true } -> Retornaría "total"
     * @param selector función que recibirá el atributo de la clase
     * @param fullname booleano para indicar si se quiere retornar el atributo o todo el path de la clase del atributo
     */
    nameof(selector: () => any, fullname = false) {
        const s = '' + selector;
        const m = s.match(/return\s+([A-Z$_.]+)/i)
            || s.match(/.*?(?:=>|function.*?{(?!\s*return))\s*([A-Z$_.]+)/i);
        const name = m && m[1] || '';
        return fullname ? name.split('.').slice(1).join('.') : name.split('.').reverse()[0];
    }
}
