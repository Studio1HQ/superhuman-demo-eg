"use client";

import { Star, Paperclip, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  date: Date;
  isRead: boolean;
  isStarred: boolean;
  hasAttachment: boolean;
  isImportant: boolean;
  labels: string[];
}

const emails: Email[] = [
  {
    id: "1",
    sender: "GitHub",
    senderEmail: "noreply@github.com",
    subject: "[bolt-new] New pull request: Fix authentication bug",
    preview: "A new pull request has been opened by johndoe. This PR fixes the authentication bug that was causing...",
    date: new Date(2024, 11, 15, 10, 30),
    isRead: false,
    isStarred: true,
    hasAttachment: false,
    isImportant: true,
    labels: ["work"]
  },
  {
    id: "2",
    sender: "Sarah Johnson",
    senderEmail: "sarah@company.com",
    subject: "Q4 Planning Meeting - December 20th",
    preview: "Hi team, I wanted to schedule our Q4 planning meeting for December 20th at 2 PM. We'll be discussing...",
    date: new Date(2024, 11, 15, 9, 15),
    isRead: false,
    isStarred: false,
    hasAttachment: true,
    isImportant: false,
    labels: ["work", "meetings"]
  },
  {
    id: "3",
    sender: "Netflix",
    senderEmail: "info@netflix.com",
    subject: "New shows added to your list",
    preview: "We've added some new shows based on your viewing history. Check out these recommendations...",
    date: new Date(2024, 11, 14, 18, 45),
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    isImportant: false,
    labels: ["personal"]
  },
  {
    id: "4",
    sender: "Alex Chen",
    senderEmail: "alex@startup.com",
    subject: "Investment proposal review",
    preview: "Thanks for taking the time to review our investment proposal. I've attached the updated deck with...",
    date: new Date(2024, 11, 14, 14, 20),
    isRead: true,
    isStarred: true,
    hasAttachment: true,
    isImportant: true,
    labels: ["important", "work"]
  },
  {
    id: "5",
    sender: "Linear",
    senderEmail: "notifications@linear.app",
    subject: "Weekly report: 5 issues completed",
    preview: "Here's your weekly summary. Your team completed 5 issues this week and closed 3 bugs...",
    date: new Date(2024, 11, 14, 12, 0),
    isRead: true,
    isStarred: false,
    hasAttachment: false,
    isImportant: false,
    labels: ["work"]
  }
];

export function EmailList() {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return format(date, 'HH:mm');
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  return (
    <div className="flex-1 border-r bg-background min-w-0 hidden lg:block">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Inbox</h2>
          <Badge variant="secondary" className="text-xs">
            12 unread
          </Badge>
        </div>
      </div>

      {/* Email List */}
      <div className="overflow-y-auto">
        {emails.map((email, index) => (
          <div
            key={email.id}
            className={cn(
              "border-b border-border/40 px-4 py-3 cursor-pointer transition-colors hover:bg-muted/30",
              !email.isRead && "bg-muted/20",
              index === 0 && "bg-muted/50 border-l-2 border-l-blue-500"
            )}
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center gap-2 mt-0.5">
                <div className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  !email.isRead ? "bg-blue-500" : "bg-transparent"
                )} />
                <Star className={cn(
                  "h-4 w-4 cursor-pointer",
                  email.isStarred ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground hover:text-foreground"
                )} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={cn(
                      "font-medium truncate",
                      !email.isRead && "font-semibold"
                    )}>
                      {email.sender}
                    </span>
                    {email.isImportant && (
                      <Badge variant="destructive" className="h-4 text-xs px-1">
                        Important
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap hidden sm:block">
                    {formatDate(email.date)}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-1">
                  <h3 className={cn(
                    "text-sm truncate",
                    !email.isRead ? "font-semibold" : "font-normal"
                  )}>
                    {email.subject}
                  </h3>
                  <div className="flex items-center gap-1 ml-2">
                    {email.hasAttachment && (
                      <Paperclip className="h-3 w-3 text-muted-foreground" />
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground truncate hidden sm:block">
                  {email.preview}
                </p>

                {/* Mobile date */}
                <div className="sm:hidden mt-1">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(email.date)}
                  </span>
                </div>

                {email.labels.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {email.labels.map((label) => (
                      <Badge key={label} variant="outline" className="h-5 text-xs px-1.5">
                        {label}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}