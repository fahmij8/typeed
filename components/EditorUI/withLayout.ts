import type { EditorType, CustomElement } from "@/lib/types";
import { Transforms, Node as SlateNode, Element as SlateElement } from "slate";

const withLayout = (editor: EditorType) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    if (path.length === 0) {
      if (editor.children.length < 1) {
        const title: CustomElement = {
          type: "title",
          children: [{ text: "" }],
        };
        Transforms.insertNodes(editor, title, { at: path.concat(0) });
      }

      if (editor.children.length < 2) {
        const paragraph: CustomElement = {
          type: "paragraph",
          children: [{ text: "" }],
        };
        Transforms.insertNodes(editor, paragraph, { at: path.concat(1) });
      }

      for (const [child, childPath] of SlateNode.children(editor, path)) {
        let type: CustomElement["type"];
        const slateIndex = childPath[0];
        const enforceType = (type: CustomElement["type"]) => {
          if (SlateElement.isElement(child) && child.type !== type) {
            const newProperties: Partial<SlateElement> = { type };
            Transforms.setNodes<SlateElement>(editor, newProperties, {
              at: childPath,
            });
          }
        };

        switch (slateIndex) {
          case 0:
            type = "title";
            enforceType(type);
            break;
          case 1:
            type = "paragraph";
            enforceType(type);
            break;
          default:
            break;
        }
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};

export default withLayout;
