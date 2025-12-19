"use client";

import { Star, Archive, Trash2, Reply, ReplyAll, Forward } from "lucide-react";
import { MapPin, Building, Phone, Mail, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomModal } from "@/components/ui/custom-modal";
import { format } from "date-fns";
import EmailPreviewComponent from "./ui/EmailPreviewComponent";


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
    content?: string;
    senderAvatar?: string;
    profile?: {
        name: string;
        title: string;
        company: string;
        location: string;
        phone: string;
        email: string;
        avatar: string;
        department: string;
        joinDate: string;
    };
}

interface EmailModalProps {
    email: Email | null;
    isOpen: boolean;
    onClose: () => void;
}

export function EmailModal({ email, isOpen, onClose }: EmailModalProps) {
    if (!email) return null;

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} className="max-w-6xl w-full h-[90vh] p-0 gap-0">
            <div className="flex h-full">
                {/* Main Email Content */}
                <div className="flex-1 flex flex-col">
                    {/* Email Header */}
                    <div className="border-b p-6 mt-3">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h1 className="text-xl font-semibold mb-2">
                                    {email.subject}
                                </h1>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-6 h-6">
                                            <AvatarImage src={email.senderAvatar} />
                                            <AvatarFallback className="text-xs">
                                                {email.sender.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium text-foreground">{email.sender}</span>
                                        <span className="hidden md:inline">&lt;{email.senderEmail}&gt;</span>
                                    </div>
                                    <span>•</span>
                                    <span className="hidden sm:inline">{format(email.date, 'MMM d, yyyy at h:mm a')}</span>
                                    <span className="sm:hidden">{format(email.date, 'MMM d')}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 pe-3">
                                <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                    <Star className={email.isStarred ? "fill-yellow-400 text-yellow-400" : ""} />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                    <Archive className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Labels */}
                        <div className="flex gap-2">
                            {email.labels.map((label) => (
                                <Badge key={label} variant="secondary" className="text-xs">
                                    {label}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 p-6 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <EmailPreviewComponent />
                    </div>

                    {/* Action Bar */}
                    <div className="border-t p-4">
                        <div className="flex items-center gap-2">
                            <Button className="gap-2" onClick={(e) => e.stopPropagation()}>
                                <Reply className="h-4 w-4" />
                                <span className="hidden sm:inline">Reply</span>
                            </Button>
                            <Button variant="outline" className="gap-2" onClick={(e) => e.stopPropagation()}>
                                <ReplyAll className="h-4 w-4" />
                                <span className="hidden md:inline">Reply All</span>
                            </Button>
                            <Button variant="outline" className="gap-2" onClick={(e) => e.stopPropagation()}>
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
                                <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Esc</kbd>
                                <span>Close</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Profile Sidebar */}
                {email.profile && (
                    <div className="w-80 border-l bg-muted/20 flex flex-col hidden lg:flex">
                        {/* Profile Header */}
                        <div className="p-6 border-b">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src={email.profile.avatar} />
                                    <AvatarFallback className="text-lg font-semibold">
                                        {email.profile.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold text-lg">{email.profile.name}</h3>
                                    <p className="text-sm text-muted-foreground">{email.profile.title}</p>
                                    <p className="text-sm text-muted-foreground">{email.profile.company}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="p-6 space-y-4">
                            <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground">
                                Contact Information
                            </h4>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{email.profile.email}</p>
                                        <p className="text-xs text-muted-foreground">Work Email</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{email.profile.phone}</p>
                                        <p className="text-xs text-muted-foreground">Direct Line</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{email.profile.location}</p>
                                        <p className="text-xs text-muted-foreground">Location</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Building className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{email.profile.department}</p>
                                        <p className="text-xs text-muted-foreground">Department</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">{email.profile.joinDate}</p>
                                        <p className="text-xs text-muted-foreground">Joined Company</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="p-6 border-t mt-auto">
                            <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-3">
                                Quick Actions
                            </h4>
                            <div className="space-y-2">
                                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Schedule Meeting
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                                    <Users className="h-4 w-4" />
                                    View Team
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                                    <Mail className="h-4 w-4" />
                                    Send Message
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CustomModal>
    );
}