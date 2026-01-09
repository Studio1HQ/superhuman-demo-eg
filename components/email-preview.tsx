"use client";

import { Star, Archive, Trash2, Reply, ReplyAll, Forward, MoveHorizontal as MoreHorizontal } from "lucide-react";
import { MapPin, Building, Phone, Mail, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import EmailPreviewComponent from "./ui/EmailPreviewComponent";

const currentEmail = {
    id: "2",
    sender: "Sarah Johnson",
    senderEmail: "sarah@company.com",
    senderAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    subject: "Q4 Planning Meeting - December 20th",
    date: new Date(2024, 11, 15, 9, 15),
    isStarred: false,
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
    labels: ["work", "meetings"],
    profile: {
        name: "Sarah Johnson",
        title: "Senior Project Manager",
        company: "Company Inc.",
        location: "San Francisco, CA",
        phone: "+1 (555) 123-4567",
        email: "sarah@company.com",
        avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
        department: "Product Management",
        joinDate: "January 2022"
    }
};

export function EmailPreview() {
    return (
        <div className="flex-1 flex bg-background min-w-0 hidden lg:flex">
            {/* Main Email Content */}
            <div className="flex-1 flex flex-col">
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
                                    <span className="text-[13px] font-medium text-foreground">{currentEmail.sender}</span>
                                    <span className="text-[13px] hidden md:inline">&lt;{currentEmail.senderEmail}&gt;</span>
                                </div>
                                <span className="text-[13px] hidden sm:inline">{format(currentEmail.date, 'MMM d, yyyy')}</span>
                                <span className="text-[13px] sm:hidden">{format(currentEmail.date, 'MMM d, yyyy')}</span>
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
                <div className="flex-1 p-6 overflow-y-auto max-h-[calc(100vh-330px)]">
                    <EmailPreviewComponent content={currentEmail.content} />
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

        </div>
    );
}