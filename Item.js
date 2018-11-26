/*
*    Реализация абстрактного Item
*/
class Item {
    constructor(value) {
        this.value = value;
    }

    /*
    *   Задаём правило сравнения двух значений
    *   (В данном случае будем сравнивать числа)
    *   Возвращаемые значения:
    *   return = 0 => this = term
    *   return > 0 => this > term
    *   return < 0 => this < term
    */
    compare(term) {
        return this.value - term.value;
    }

    /*
    *   Строковое представление Item
    */
    toString() {
        return this.value.toString();
    }
}
