class Node {
    constructor(val, left, right) {
        this.val = val
        this.left = left
        this.right = right
        this.height = 0
    }
}

export class Tree {
    constructor(canvas) {
        this.canvas = canvas
        this.root = null
    }
    add(num) {
        this.root = this._add(this.root, num)
        this._draw()
    }
    _add(node, num) {
        if (!node) return new Node(num)
        if (num > node.val) {
            node.right = this._add(node.right, num)
        } else if (num < node.val) {
            node.left = this._add(node.left, num)
        }
        return this._balance(node)
    }
    _balance(node) {
        if (!node) return node
        const height_left = this._height(node.left)
        const height_right = this._height(node.right)
        if (height_left - height_right > 1) {
            if (this._height(node.left.left) > this._height(node.left.right)) {
                // ll
                node = this._ll(node)
            } else {
                // lr
                node = this._lr(node)
            }
        } else if (height_right - height_left > 1) {
            if (this._height(node.right.right) > this._height(node.right.left)) {
                // rr
                node = this._rr(node)
            } else {
                // rl
                node = this._rl(node)
            }
        } else {
            this._updateHeight(node)
        }
        return node
    }
    _ll(node) {
        const temp = node.left
        node.left = temp.right
        temp.right = node
        this._updateHeight(temp.right)
        this._updateHeight(temp)
        return temp
    }
    _rr(node) {
        const temp = node.right
        node.right = temp.left
        temp.left = node
        this._updateHeight(temp.left)
        this._updateHeight(temp)
        return temp
    }
    _lr(node) {
        node.left = this._rr(node.left)
        return this._ll(node)
    }
    _rl(node) {
        node.right = this._ll(node.right)
        return this._rr(node)
    }
    _updateHeight(node) {
        node.height = Math.max(this._height(node.left), this._height(node.right)) + 1
    }
    _height(node) {
        return node ? node.height : -1
    }
    remove(num) {
        this.root = this._remove(this.root, num)
        this._draw()
    }
    _remove(node, num) {
        if (!node) return node
        if (num > node.val) {
            node.right = this._remove(node.right, num)
        } else if (num < node.val) {
            node.left = this._remove(node.left, num)
        } else {
            if (node.left && node.right) {
                let cur = node.left
                while (cur.right) {
                    cur = cur.right
                }
                node.val = cur.val
                node.left = this._remove(node.left, cur.val)
            } else {
                node = node.left || node.right
            }
        }
        return this._balance(node)
    }
    _getLocationMap() {
        let map = new Map()
        if (!this.root) {
            return map
        }
        let x = 0
        const digui = (node, y) => {
            if (node != null) {
                digui(node.left, y + 1)
                map.set(node.val, [x++, y])
                digui(node.right, y + 1)
            }
        }
        digui(this.root, 0)
        console.log(map)
        return map
    }
    _draw() {
        const ctx = this.canvas.getContext("2d")
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        if (!this.root) {
            return
        }
        ctx.fillStyle = '#ff0000';
        ctx.font = '20px Arial';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        console.log(ctx)
        const map = this._getLocationMap()
        const getLocation = (node) => {
            const [x, y] = map.get(node.val)
            return [x * 30 + 20, y * 100 + 20]
        }
        const digui = (node) => {
            if (node != null) {
                const [x, y] = getLocation(node)
                ctx.fillText(`${node.val}(${node.height})`, x, y)
                if (node.left) {
                    const [x_, y_] = getLocation(node.left)
                    ctx.moveTo(x, y + 20)
                    ctx.lineTo(x_, y_ - 20)
                }
                if (node.right) {
                    const [x_, y_] = getLocation(node.right)
                    ctx.moveTo(x, y + 20)
                    ctx.lineTo(x_, y_ - 20)
                }
                digui(node.left)
                digui(node.right)
            }
        }
        ctx.beginPath()
        digui(this.root)
        ctx.stroke()

    }
}
