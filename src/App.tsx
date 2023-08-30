import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Redo,
  UnderlineIcon,
  Undo,
} from "lucide-react";

import { TipTapV2 } from "./components/text-editor/editor";
import { MenuOptions } from "./components/text-editor/menu-options";

import { Button } from "./components/button";

import { TipTap } from "./components/tiptap";

const editorExtensions = [
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
    limit: 500,
  }),
  Superscript,
  Subscript,
  Placeholder.configure({
    placeholder: "Adicione a descrição da sua ordem de serviço aqui...",
  }),
];

function App() {
  return (
    <div className="bg-zinc-50 grid place-items-center h-screen w-screen">
      <TipTapV2 extensions={editorExtensions}>
        <MenuOptions>
          {({ editor, forceMount }) => (
            <div className="flex px-2 items-center gap-2">
              <Button
                isActive={editor.isActive("bold")}
                onClick={() => {
                  editor.chain().focus().toggleBold().run();
                  forceMount();
                }}
              >
                <Bold size={20} />
              </Button>
              <Button
                isActive={editor.isActive("italic")}
                onClick={() => {
                  editor.chain().focus().toggleItalic().run();
                  forceMount();
                }}
              >
                <Italic size={20} />
              </Button>

              <Button
                isActive={editor.isActive("underline")}
                onClick={() => {
                  editor.chain().focus().toggleUnderline().run();
                  forceMount();
                }}
              >
                <UnderlineIcon size={20} />
              </Button>

              <hr
                aria-orientation="vertical"
                className="h-6 w-px bg-zinc-300"
              />

              <Button
                isActive={editor.isActive("bulletList")}
                onClick={() => {
                  editor.chain().focus().toggleBulletList().run();
                  forceMount();
                }}
              >
                <List size={20} />
              </Button>

              <Button
                isActive={editor.isActive("orderedList")}
                onClick={() => {
                  editor.chain().focus().toggleOrderedList().run();
                  forceMount();
                }}
              >
                <ListOrdered size={20} />
              </Button>

              <hr
                aria-orientation="vertical"
                className="h-6 w-px bg-zinc-300"
              />

              <Button
                isActive={editor.isActive({ textAlign: "left" })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
              >
                <AlignLeft size={20} />
              </Button>

              <Button
                isActive={editor.isActive({ textAlign: "center" })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
              >
                <AlignCenter size={20} />
              </Button>

              <Button
                isActive={editor.isActive({ textAlign: "right" })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
              >
                <AlignRight size={20} />
              </Button>

              <Button
                isActive={editor.isActive({ textAlign: "justify" })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
              >
                <AlignJustify size={20} />
              </Button>

              <hr
                aria-orientation="vertical"
                className="h-6 w-px bg-zinc-300"
              />

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
          )}
        </MenuOptions>
      </TipTapV2>

      <TipTap placeholder="Adicione a descrição da sua ordem de serviço aqui..." />
    </div>
  );
}

export default App;
