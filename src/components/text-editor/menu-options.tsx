import React from "react";

import { cn } from "../../lib/cn";
import { useTipTap } from "./provider";
import { Editor } from "@tiptap/react";

type MenuOptionsProps = Omit<
  React.HtmlHTMLAttributes<HTMLDivElement>,
  "children"
> & {
  children:
    | (({
        editor,
        forceMount,
      }: {
        editor: Editor;
        forceMount: () => void;
      }) => React.ReactNode)
    | React.ReactNode;
};

export const MenuOptions = ({
  children,
  className,
  ...props
}: MenuOptionsProps) => {
  const { editor, forceMount } = useTipTap();

  if (!editor) throw new Error("Editor not found");

  const childrenIsFunc = children && typeof children === "function";

  return (
    <div {...props} className={cn("py-3 border-b border-zinc-300", className)}>
      {childrenIsFunc && children({ editor, forceMount })}
      {!childrenIsFunc && children}
    </div>
  );
};
