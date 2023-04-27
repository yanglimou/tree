class Node {
    constructor(val, left, right) {
        this.val = val
        this.left = left
        this.right = right
    }
}

export class Tree {
    add(num) {
        if (!this.root) {
            this.root = new Node(num, null, null)
        } else {
            let temp = this.root
            while (temp) {
                if (temp.val === num) {
                    return
                } else if (num < temp.val) {
                    if (temp.left) {
                        temp = temp.left
                    } else {
                        temp.left = new Node(num, null, null)
                        return
                    }
                } else {
                    if (temp.right) {
                        temp = temp.right
                    } else {
                        temp.right = new Node(num, null, null)
                        return
                    }
                }
            }
        }
        console.log(this.root)
    }
    getLocationMap() {
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
    draw(canvas) {
        if (!this.root) {
            return map
        }
        const ctx = canvas.getContext("2d")
        ctx.fillStyle = '#ff0000';
        ctx.font = '20px Arial';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        console.log(ctx)
        const map = this.getLocationMap()
        const getLocation = (node) => {
            const [x, y] = map.get(node.val)
            return [x * 20 + 20, y * 100 + 20]
        }
        const digui = (node) => {
            if (node != null) {
                const [x, y] = getLocation(node)
                ctx.fillText(node.val, x, y)
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
