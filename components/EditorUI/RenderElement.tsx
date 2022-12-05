import type { ReactNode } from "react";
import type { Element as SlateElement } from "slate";

interface ElementProps extends Omit<SlateElement, "type"> {
  align?: "left" | "center" | "right";
  type:
    | "paragraph"
    | "block-quote"
    | "bulleted-list"
    | "title"
    | "heading-two"
    | "list-item"
    | "numbered-list";
}

const Element = ({
  attributes,
  children,
  element,
}: {
  attributes: {
    "data-slate-node": "element";
    "data-slate-inline"?: true;
    "data-slate-void"?: true;
    dir?: "rtl";
    ref: any;
  };
  children: ReactNode;
  element: ElementProps;
}) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "title":
      return (
        <h1 style={style} {...attributes} className="text-2xl font-bold">
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "list-item":
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

export default Element;
