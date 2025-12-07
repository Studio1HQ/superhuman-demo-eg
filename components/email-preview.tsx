"use client";

import { Star, Archive, Trash2, Reply, ReplyAll, Forward, MoveHorizontal as MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

const currentEmail = {
  id: "1",
  sender: "GitHub",
  senderEmail: "noreply@github.com",
  senderAvatar: "",
  subject: "[bolt-new] New pull request: Fix authentication bug",
  date: new Date(2024, 11, 15, 10, 30),
  isStarred: true,
  content: `Hi there,

A new pull request has been opened by johndoe in the bolt-new repository.

**Pull Request Details:**
- Title: Fix authentication bug
- Author: johndoe
- Branch: fix-auth-bug
- Files changed: 3

**Summary:**
This PR addresses the authentication bug that was causing users to be logged out unexpectedly. The issue was in the token validation logic where expired tokens weren't being handled properly.

**Changes:**
1. Updated token validation in auth middleware
2. Added proper error handling for expired tokens  
3. Improved user session management

You can review the pull request here: https://github.com/bolt-new/pull/123

Best regards,
GitHub Team`,
  labels: ["work", "github"]
};

export function EmailPreview() {
  return (
    <div className="flex-1 flex flex-col bg-background min-w-0 hidden lg:flex">
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
              <span className="hidden sm:inline">{format(currentEmail.date, 'MMM d, yyyy at h:mm a')}</span>
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
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-sm leading-relaxed">
            {currentEmail.content}
          </div>
        </div>
      </div>

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