import type { CustomElement } from "@/lib/types";
import type { ReactNode } from "react";

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
  element: CustomElement;
}) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote
          style={style}
          {...attributes}
          className="p-4 my-4 bg-gray-50 border-l-4 border-gray-300 dark:bg-gray-800"
        >
          <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">
            {children}
          </p>
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes} className="list-disc p-5">
          {children}
        </ul>
      );
    case "title":
      return (
        <h1 style={style} {...attributes} className="text-2xl font-extrabold">
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes} className="text-xl font-semibold">
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
        <ol style={style} {...attributes} className="list-decimal p-5">
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
