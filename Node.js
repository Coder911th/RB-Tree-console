// Фиктивный узел
var NULL = {
    data: "NULL",
    isRed: false,
    left: NULL,
    right: NULL,
    parent: NULL
};

// Узел дерева
class Node {
    // data - данные, хранящиеся в узле
    // isRed - логическое значение: является ли узел краснымы
    // parnet - родительский узел
    constructor(data, isRed, parent) {
        this.data = data;
        this.left = this.right = NULL;
        this.parent = parent;
        this.isRed = isRed;
    }
}
