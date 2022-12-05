"use client";

import { useTypeedContext } from "@/lib/context";

export default function EditorHeader() {
  const { dispatch, forceShowToolbar } = useTypeedContext();

  return (
    <div className="flex flex-col items-end">
      <label className="mt-3 flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-3 w-3"
          checked={forceShowToolbar}
          onChange={() =>
            dispatch({
              type: "SET_VALUE",
              payload: {
                forceShowToolbar: !forceShowToolbar,
              },
            })
          }
        />
        <span className="ml-1 text-gray-700 dark:text-white text-xs">
          Show toolbar on focus
        </span>
      </label>
    </div>
  );
}
