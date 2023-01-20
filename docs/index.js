var _root,
  _create_root = () => {
    _create_root = null;
    var dyn0;
    return _root = new ESXElement([dyn0 = ESXSlot.createTag()], [], [dyn0]);
  },
  _root2,
  _create_root2 = () => {
    _create_root2 = null;
    var dyn0;
    var dyn1;
    return _root2 = new ESXElement([ESXSlot.createTag("button"), dyn0 = new ESXSlot("onClick")], [dyn1 = new ESXSlot(null)], [dyn0, dyn1]);
  },
  _esx,
  _create_esx = () => {
    _create_esx = null;
    return _esx = new ESX(new ESXElement([ESXSlot.createTag("div")], [ESXSlot.createText("You reached 10 \uD83E\uDD73")], []));
  };
import { ESXSlot, ESXElement, ESX } from "@es-esx/esx";
import { hooked, useState } from 'https://unpkg.com/uhooks?module';
const transform = esx => {
  const tag = esx.getSlotValue(esx.root.slots[0]);
  if (typeof tag === 'function') {
    let node, prevRoot;
    hooked(() => {
      const newNodeEsx = tag();
      if (newNodeEsx.root !== prevRoot) {
        prevRoot = newNodeEsx.root;
        const replace = transform(newNodeEsx);
        if (!node) node = replace;else if (node !== replace) {
          node.replaceWith(replace);
          node = replace;
        }
      }
      node.update(newNodeEsx);
    })();
    return node;
  } else {
    const node = document.createElement(tag);
    node.update = nodeEsx => {
      const {
        root: {
          children,
          slots
        }
      } = nodeEsx;
      node.onclick = slots[1] && nodeEsx.getSlotValue(slots[1]);
      node.textContent = nodeEsx.getSlotValue(children[0]);
    };
    return node;
  }
};
document.body.appendChild(transform(new ESX(_root || _create_root(), [Counter])));
function Counter() {
  const [count, update] = useState(0);
  return count < 10 ? new ESX(_root2 || _create_root2(), [() => update(count + 1), count]) : _esx || _create_esx();
}