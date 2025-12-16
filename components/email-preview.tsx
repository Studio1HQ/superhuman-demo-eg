"use client";

import { Star, Archive, Trash2, Reply, ReplyAll, Forward, MoveHorizontal as MoreHorizontal } from "lucide-react";
import { MapPin, Building, Phone, Mail, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

const currentEmail = {
    id: "2",
    sender: "Sarah Johnson",
    senderEmail: "sarah@company.com",
    senderAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    subject: "Q4 Planning Meeting - December 20th",
    date: new Date(2024, 11, 15, 9, 15),
    isStarred: false,
    content: `Hi team,

I hope this email finds you well! I wanted to schedule our Q4 planning meeting for December 20th at 2 PM in the main conference room.

Meeting Agenda:
• Review Q3 performance metrics
• Discuss Q4 goals and objectives
• Budget allocation for upcoming projects
• Team resource planning
• Holiday schedule coordination

What to Prepare:
Please come prepared with your department's Q3 summary and Q4 project proposals. I've attached the meeting template for your reference.

Location: Main Conference Room (Building A, 3rd Floor)
Duration: Approximately 2 hours
Remote Option: Zoom link will be shared closer to the date

Looking forward to a productive discussion and planning session. Please confirm your attendance by replying to this email.

If you have any questions or agenda items to add, feel free to reach out.

Best regards,
Sarah Johnson
Senior Project Manager
Company Inc.`,
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

        </div>
    );
}