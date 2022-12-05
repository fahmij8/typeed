import { Editor, Element as SlateElement, Transforms } from "slate";
import type { CustomElement, EditorType } from "@/lib/types";

export const LIST_TYPES = ["numbered-list", "bulleted-list"];
export const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

const isMarkActive = (
  editor: EditorType,
  format: CustomElement["type"]
): boolean => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as keyof typeof marks] === true : false;
};

export const toggleMark = (
  editor: EditorType,
  format: CustomElement["type"]
) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (
  editor: EditorType,
  format: CustomElement["type"],
  blockType = "type"
) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType as keyof typeof n] === format,
    })
  );

  return !!match;
};

export const toggleBlock = (
  editor: EditorType,
  format: CustomElement["type"]
) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type"
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<CustomElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const initialValue: CustomElement[] = [
  {
    type: "title",
    children: [
      {
        text: "Welcome to Typeed! 👋 ",
        bold: true,
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Typeed is your go-to web app to save your quick notes without pulling up your native notepad app 🤣.",
      },
    ],
  },

  {
    type: "paragraph",
    children: [
      {
        text: "It comes with ",
      },
      {
        text: "a fancy formatting menu ",
        bold: true,
      },
      {
        text: "by selecting the text you want to format. You can also use the ",
      },
      {
        text: "keyboard shortcuts",
        italic: true,
        underline: true,
      },
      {
        text: " to format your text. Lastly, no need to worry about saving your notes, Typeed will automatically save your notes as you type. ",
      },
      {
        text: "Enjoy! and start with deleting all of this text 😂",
      },
    ],
  },
];
