"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import {
  TiptapVeltComments,
  renderComments,
  addComment,
} from "@veltdev/tiptap-velt-comments";
import { useCommentAnnotations } from "@veltdev/react";
import { useEffect } from "react";
import { StarterKit } from "@tiptap/starter-kit";
import { Button } from "./button";

import { MessageCircle } from "lucide-react";

const EDITOR_ID = "superhuman-demo-email";

const EmailPreviewComponent = ({content=`<p>Data for custom</p>`}:{content?: string}) => {
  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      TiptapVeltComments.configure({
        persistVeltMarks: false,
      }),
      StarterKit,
    ],
    content,
    autofocus: true,
    immediatelyRender: false,
  });

  // Get annotations
  const annotations = useCommentAnnotations();

  // Render annotations when editor and annotations are both ready
  useEffect(() => {
    if (editor && annotations?.length) {
      renderComments({
        editor,
        editorId: EDITOR_ID,
        commentAnnotations: annotations,
      });
    }
  }, [editor, annotations]);

  // Add comment handler - stop propagation to prevent parent elements from capturing events
  const onClickComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editor) {
      addComment({
        editor,
        editorId: EDITOR_ID,
      });
    }
  };

  return (
    <div className="">
      {/* Bubble Menu with comment button */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bubble-menu">
            <Button
              variant="outline"
              onClick={onClickComments}
              className="bg-[#b056ef] hover:bg-[#a22ff5] p-1 flex items-center justify-center rounded-full focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-300"
            >
              <MessageCircle color="white" />
            </Button>
          </div>
        </BubbleMenu>
      )}

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default EmailPreviewComponent;
