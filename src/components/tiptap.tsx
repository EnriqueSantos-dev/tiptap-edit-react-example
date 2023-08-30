import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor, EditorOptions } from "@tiptap/react";

import { CharacterCount } from "@tiptap/extension-character-count";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { Placeholder } from "@tiptap/extension-placeholder";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
  Undo,
} from "lucide-react";

import { Button } from "./button";

type TipTapProps = Partial<EditorOptions> & {
  limitCharacters?: number;
  placeholder?: string;
};

export function TipTap({
  placeholder,
  limitCharacters,
  ...props
}: TipTapProps) {
  const editor = useEditor({
    ...props,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      CharacterCount.configure({
        limit: limitCharacters,
      }),
      Superscript,
      Subscript,
      Placeholder.configure({
        placeholder: placeholder ?? "Comece a escrever...",
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose-sm prose-neutral md:prose-base",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="max-w-xl w-full rounded-lg border shadow-md border-zinc-300 text-zinc-900">
      <div className="border-b border-zinc-300">
        <div className="py-3 px-2 flex items-center justify-between flex-wrap">
          <Button
            isActive={editor.isActive("bold")}
            onClick={() => {
              editor.chain().focus().toggleBold().run();
            }}
          >
            <Bold size={20} />
          </Button>
          <Button
            isActive={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic size={20} />
          </Button>

          <Button
            isActive={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon size={20} />
          </Button>

          <Button
            isActive={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough size={20} />
          </Button>

          <hr aria-orientation="vertical" className="h-6 w-px bg-zinc-300" />
          <Button
            isActive={editor.isActive("superscript")}
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
          >
            <SuperscriptIcon size={20} />
          </Button>

          <Button
            isActive={editor.isActive("subscript")}
            onClick={() => editor.chain().focus().toggleSubscript().run()}
          >
            <SubscriptIcon size={20} />
          </Button>

          <hr aria-orientation="vertical" className="h-6 w-px bg-zinc-300" />

          <Button
            isActive={editor.isActive("heading", { level: 1 })}
            onClick={() =>
              editor.chain().focus().setHeading({ level: 1 }).run()
            }
          >
            <Heading1 size={20} />
          </Button>

          <Button
            isActive={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().setHeading({ level: 2 }).run()
            }
          >
            <Heading2 size={20} />
          </Button>

          <Button
            isActive={editor.isActive("heading", { level: 3 })}
            onClick={() =>
              editor.chain().focus().setHeading({ level: 3 }).run()
            }
          >
            <Heading3 size={20} />
          </Button>

          <hr aria-orientation="vertical" className="h-6 w-px bg-zinc-300" />

          <Button
            isActive={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={20} />
          </Button>

          <Button
            isActive={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={20} />
          </Button>

          <hr aria-orientation="vertical" className="h-6 w-px bg-zinc-300" />

          <Button
            isActive={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft size={20} />
          </Button>

          <Button
            isActive={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter size={20} />
          </Button>

          <Button
            isActive={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight size={20} />
          </Button>

          <Button
            isActive={editor.isActive({ textAlign: "justify" })}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <AlignJustify size={20} />
          </Button>

          <hr aria-orientation="vertical" className="h-6 w-px bg-zinc-300" />

          <Button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo size={20} />
          </Button>

          <Button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo size={20} />
          </Button>
        </div>
      </div>

      <div className="px-2 py-4 grid min-h-[150px]">
        <EditorContent
          editor={editor}
          className="rounded border border-zinc-300 py-2 px-4"
        />

        {limitCharacters && (
          <div className="text-zinc-500 text-xs pt-2">
            {editor.storage.characterCount.characters()}/{limitCharacters}{" "}
            carácteres
            <br />
            {editor.storage.characterCount.words()} palavras
          </div>
        )}
      </div>
    </div>
  );
}
