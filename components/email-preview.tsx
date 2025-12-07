"use client";

import { Star, Archive, Trash2, Reply, ReplyAll, Forward, MoveHorizontal as MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import EmailPreviewComponent from "./ui/EmailPreviewComponent";
import { VeltComments } from "@veltdev/react";
import useTheme from "@/hooks/use-theme";

const currentEmail = {
  id: "1",
  sender: "GitHub",
  senderEmail: "noreply@github.com",
  senderAvatar: "",
  subject: "[bolt-new] New pull request: Fix authentication bug",
  date: new Date(2024, 11, 15, 10, 30),
  isStarred: true,
  labels: ["work", "github"]
};

export function EmailPreview() {
    const theme = useTheme();

  return (
    <div className="flex-1 flex flex-col bg-background min-w-0">
      {/* Email Header */}
      <div className="border-b p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-xl font-semibold mb-2">
              {currentEmail.subject}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={currentEmail.senderAvatar} />
                  <AvatarFallback className="text-xs">
                    {currentEmail.sender.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-foreground">{currentEmail.sender}</span>
                <span className="hidden md:inline">&lt;{currentEmail.senderEmail}&gt;</span>
              </div>
              <span>•</span>
              <span className="hidden sm:inline">{format(currentEmail.date, 'MMM d, yyyy')}</span>
              <span className="sm:hidden">{format(currentEmail.date, 'MMM d')}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon">
              <Star className={currentEmail.isStarred ? "fill-yellow-400 text-yellow-400" : ""} />
            </Button>
            <Button variant="ghost" size="icon">
              <Archive className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Labels */}
        <div className="flex gap-2">
          {currentEmail.labels.map((label) => (
            <Badge key={label} variant="secondary" className="text-xs">
              {label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Email Content */}
      <EmailPreviewComponent/>
 <VeltComments
        textMode={false}
        shadowDom={false}
        textCommentToolShadowDom={false}
        darkMode={theme.theme === "dark"}
      />
      
      {/* Action Bar */}
      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <Reply className="h-4 w-4" />
            <span className="hidden sm:inline">Reply</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <ReplyAll className="h-4 w-4" />
            <span className="hidden md:inline">Reply All</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Forward className="h-4 w-4" />
            <span className="hidden sm:inline">Forward</span>
          </Button>
        </div>
      </div>

      {/* Keyboard Shortcuts Helper */}
      <div className="border-t bg-muted/20 p-3 hidden md:block">
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">r</kbd>
            <span>Reply</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">a</kbd>
            <span>Archive</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">s</kbd>
            <span>Star</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">#</kbd>
            <span>Delete</span>
          </div>
        </div>
      </div>
    </div>
  );
}