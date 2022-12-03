export * from "./context";

import type { BaseEditor } from "slate";
import type { ReactEditor } from "slate-react";

type CustomElement = { type: "paragraph"; children: CustomText[] };
type CustomText = { text: string };
export type EditorType = BaseEditor & ReactEditor;

declare module "slate" {
  interface CustomTypes {
    Editor: EditorType;
    Element: CustomElement;
    Text: CustomText;
  }
}
