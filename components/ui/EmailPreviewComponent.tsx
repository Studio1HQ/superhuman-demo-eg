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

const EmailPreviewComponent = () => {
  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      TiptapVeltComments.configure({
        persistVeltMarks: false,
      }),
      StarterKit,
    ],
    content: ` <div>
        <h2>Hi there,</h2>
        <p>A new pull request has been opened by <strong>johndoe</strong> in the <strong>bolt-new</strong> repository.</p>

        <div>
            <h3>Pull Request Details:</h3>
            <ul>
                <li><strong>Title:</strong> Fix authentication bug</li>
                <li><strong>Author:</strong> johndoe</li>
                <li><strong>Branch:</strong> fix-auth-bug</li>
                <li><strong>Files changed:</strong> 3</li>
            </ul>
        </div>

        <div>
            <h3>Summary:</h3>
            <p>This PR addresses the authentication bug that was causing users to be logged out unexpectedly. The issue was in the token validation logic.</p>
        </div>

        <div>
            <h3>Changes:</h3>
            <ul>
                <li>Added proper error handling for expired tokens</li>
                <li>Improved user session management</li>
            </ul>
        </div>

        <p>You can review the pull request here: <a href="https://github.com/bolt-new/pull/123" class="link">https://github.com/bolt-new/pull/123</a></p>

        <p>Best regards,<br>GitHub Team</p>
    </div>`,
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

  // Add comment handler
  const onClickComments = () => {
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
      <EditorContent editor={editor} className="p-4"/>
    </div>
  );
};

export default EmailPreviewComponent;