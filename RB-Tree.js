'use strict';
{
    class RBTree {
        // Конструктор
        constructor() {
            this.root = null;
        }

        // Инетерфейс для поиск узла с указанным значением
        find(value) {
            return find(this.root, value);
        }

        // Интерфейс для добавления узла со значениением value
        add(value) {
            if (this.root == null) {
                // Если дерево пусто, добавляем черный корень
                this.root = new Node(value, false, null);
                updateTree();
                return true;
            } else {
                let returnValue = add.call(this, this.root, value);
                updateTree();
                return returnValue;
            }
        }

        // Удаление узла со значением value
        remove(value) {
            // Поиск удаляемого узла
            let removable = find(this.root, value);
            if (removable == null) {
                return;
            }

            if (removable.left != NULL && removable.right != NULL) {
                // Если удаляемый узел имеет двух сыновей
                // Находим минимального в его правом поддереве
                let min = findMin(removable.right);
                // ~ swap(removable.data, min.data)
                [removable.data, min.data] = [min.data, removable.data];
                // Теперь удаляем найденный минимальный
                removable = min;
            }

            let son;
            // Запоминаем ссылку на единственного (если таковой есть) сына
            // удаляемого узла
            if (removable.left != NULL) {
                son = removable.left;
            } else {
                son = removable.right;
            }

            // Удаляем removable из дерева (разрывая связи)
            son.parent = removable.parent;
            if (removable.parent) {
                if (removable == removable.parent.left) {
                    // Если удаляемый узел является левым у своего родителя
                    removable.parent.left = son;
                } else {
                    // Если удаляемый узел является правым у своего родителя
                    removable.parent.right = son;
                }
            } else {
                // Если удаляется корень
                if (son != NULL) {
                    this.root = son;
                } else {
                    this.root = null;
                }
            }

            // Если удалили черный узел, то требуется балансировка
            if (!removable.isRed) {
                balancingAfterRemove.call(this, son);
            }
            updateTree();
        }
    }

    /**
     * find - поиск узла со значением value начиная с узла node
     *
     * @param {Node}                  node  Узел, с которого начинаем поиск
     * @param {Any Comparable Object} value Искомое значение
     *
     * @return Если поиск не удастся, вернёт null, иначе найденый узел
     */
    function find(node, value) {
        if (node == NULL) {
            // Прошли всё дерево, но так и не нашли узел с искомым значением
            return null;
        }

        if (value.compare(node.data) > 0) {
            // Искомое значение value > значения в текущей вершине
            // => Идём в правую ветку
            return find(node.right, value);
        } else if (value.compare(node.data) < 0) {
            // Искомое значение value < значения в текущей вершине
            // => Идём в левую ветку
            return find(node.left, value);
        } else {
            // Нашли узел с искомым значением
            return node;
        }
    }

    /**
     * add - добавление узла со значеним value в дерево начиная с узла node
     *
     * @param {Node}                  node  Узел, с которого начинаем вставку
     * @param {Any Comparable Object} value Вставляемое значение
     *
     * @return Если вставка не удастся, вернёт false, иначе true
     */
    function add(node, value) {
        if (value.compare(node.data) > 0) {
            // value > значения текущей вершины
            if (node.right == NULL) {
                // Вставляем красный узел
                node.right = new Node(value, true, node);
                // Балансировка
                balancingAfterAdd.call(this, node.right);
                return true;
            } else {
                // Идём в правую ветку
                return add.call(this, node.right, value);
            }
        } else if (value.compare(node.data) < 0) {
            // value < значения текущей вершины
            if (node.left == NULL) {
                // Вставляем красный узел
                node.left = new Node(value, true, node);
                // Балансировка
                balancingAfterAdd.call(this, node.left);
                return true;
            } else {
                // Идём в левую ветку
                return add.call(this, node.left, value);
            }
        } else {
            // Вершина с подобным значением уже есть в дереве
            return false;
        }
    }


    /**
     * balancingAfterAdd - балансировка дерева вверх от узла node после его добавления
     */
    function balancingAfterAdd(node) {
        let uncle;
        if (node.parent == null || !node.parent.isRed) {
            this.root.isRed = false;
            return;
        }

        if (node.parent == node.parent.parent.left) {
            // node в левом поддереве деда
            uncle = node.parent.parent.right; // Брат родителя node
            if (uncle.isRed) {
                node.parent.isRed = false;
                uncle.isRed = false;
                uncle.parent.isRed = true;
                balancingAfterAdd.call(this, uncle.parent); // Продолжаем балансировку выше
            } else {
                if (node == node.parent.right) {
                    // Если node является правым потомком своего родителя,
                    // делаем левый поворот вокруг родителя
                    // (Это позволяет свести два случая в один)
                    node = node.parent;
                    leftRotate.call(this, node);
                }

                node.parent.isRed = false;
                node.parent.parent.isRed = true;
                if (node.parent.parent == this.root) {
                    this.root = node.parent;
                }
                rightRotate.call(this, node.parent.parent);
            }
        } else {
            // node в правом поддереве деда
            uncle = node.parent.parent.left;
            if (uncle.isRed) {
                node.parent.isRed = false;
                uncle.isRed = false;
                uncle.parent.isRed = true;
                balancingAfterAdd.call(this, uncle.parent);
            } else {
                if (node == node.parent.left) {
                    node = node.parent;
                    rightRotate.call(this, node);
                }

                node.parent.isRed = false;
                node.parent.parent.isRed = true;
                leftRotate.call(this, node.parent.parent);
            }
        }
    }

    /**
     * findMin - поиск минимального узла в дереве с корнем node
     */
    function findMin(node) {
        if (node.left == NULL) {
            return node;
        }
        return findMin(node.left);
    }

    /**
     * balancingAfterRemove - балансировка дерева вверх от узла node
     */
    function balancingAfterRemove(node) {
		if (this.root == null) {
			return;
		}
	
        if (node == this.root || node.isRed) {
            node.isRed = false;
            return;
        }

        let sibling;

        if (node == node.parent.left) {
            sibling = node.parent.right;
            if (sibling.isRed) {
                sibling.isRed = false;
                node.parent.isRed = true;
                leftRotate.call(this, node.parent);
                sibling = node.parent.right;
            }

            if (!sibling.left.isRed && !sibling.right.isRed) {
                sibling.isRed = true;
                node = node.parent;
            } else {
                if (!sibling.right.isRed) {
                    sibling.left.isRed = false;
                    sibling.isRed = true;
                    rightRotate.call(this, sibling);
                    sibling = node.parent.right;
                }

                sibling.isRed = node.parent.isRed;
                node.parent.isRed = false;
                sibling.right.isRed = false;
                leftRotate.call(this, node.parent);
                node = this.root;
            }
        } else {
            sibling = node.parent.left;
            if (sibling.isRed) {
                sibling.isRed = false;
                node.parent.isRed = true;
                rightRotate.call(this, node.parent);
                sibling = node.parent.left;
            }

            if (!sibling.right.isRed && !sibling.left.isRed) {
                sibling.isRed = true;
                node = node.parent;
            } else {
                if (!sibling.left.isRed) {
                    sibling.right.isRed = false;
                    sibling.isRed = true;
                    leftRotate.call(this, sibling);
                    sibling = node.parent.left;
                }

                sibling.isRed = node.parent.isRed;
                node.parent.isRed = false;
                sibling.left.isRed = false;
                rightRotate.call(this, node.parent);
                node = this.root;
            }
        }

        balancingAfterRemove.call(this, node);
    }
	
	/*   |                   |
	*   (x)                 (y)
	*   / \                 / \
	*  a  (y)   =====>    (x)  c
	*     / \             / \
	*    b   c           a   b
	*/
	function leftRotate(x) {
		let y = x.right;
		x.right = y.left;

		if (y.left != NULL) {
			y.left.parent = x;
		}

		y.parent = x.parent;
		if (x.parent != null) {
			if (x == x.parent.left) {
				x.parent.left = y;
			} else {
				x.parent.right = y;
			}
		} else {
			this.root = y;
		}

		y.left = x;
		x.parent = y;
	}

	/*     |                |
	*     (x)              (y)
	*     / \              / \
	*   (y)  a   =====>   b  (x)
	*   / \                  / \
	*  b   c                c   a
	*/
	function rightRotate(x) {
		let y = x.left;
		x.left = y.right;

		if (y.right != NULL) {
			y.right.parent = x;
		}

		y.parent = x.parent;
		if (x.parent != null) {
			if (x == x.parent.left) {
				x.parent.left = y;
			} else {
				x.parent.right = y;
			}
		} else {
			this.root = y;
		}

		y.right = x;
		x.parent = y;
	}

    window.RBTree = RBTree;
}
