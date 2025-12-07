"use client";

import { 
  Inbox, 
  Send, 
  Archive, 
  Star, 
  Clock, 
  Trash2,
  Tag,
  Plus,
  Zap,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface SidebarItem {
  icon: any;
  label: string;
  count?: number;
  active?: boolean;
}

const mainItems: SidebarItem[] = [
  { icon: Inbox, label: "Inbox", count: 12, active: true },
  { icon: Star, label: "Important", count: 3 },
  { icon: Send, label: "Sent" },
  { icon: Clock, label: "Snoozed", count: 2 },
  { icon: Archive, label: "Done" },
  { icon: Trash2, label: "Trash" },
];

const labels = [
  { name: "Work", color: "bg-blue-500" },
  { name: "Personal", color: "bg-green-500" },
  { name: "Important", color: "bg-red-500" },
  { name: "Later", color: "bg-yellow-500" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile overlay
  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
        )}
        
        {/* Mobile Sidebar */}
        <div className={cn(
          "fixed left-0 top-0 h-full w-80 bg-background border-r z-50 transform transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded"></div>
              <span className="font-semibold">Superhuman</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Content */}
          <div className="flex flex-col h-full">
            {/* Compose Button */}
            <div className="p-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
                <Zap className="h-4 w-4" />
                Compose
              </Button>
            </div>

            {/* Navigation */}
            <div className="flex-1 px-2">
              <nav className="space-y-1">
                {mainItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.label}
                      variant={item.active ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-3 h-10 px-3",
                        item.active && "bg-muted/70"
                      )}
                      onClick={onClose}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.count && (
                        <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                          {item.count}
                        </Badge>
                      )}
                    </Button>
                  );
                })}
              </nav>

              <Separator className="my-4 mx-2" />

              {/* Labels */}
              <div className="px-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Labels
                  </span>
                  <Button variant="ghost" size="icon" className="h-5 w-5">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="space-y-1">
                  {labels.map((label) => (
                    <Button
                      key={label.name}
                      variant="ghost"
                      className="w-full justify-start gap-3 h-9 px-2"
                      onClick={onClose}
                    >
                      <div className={cn("h-2 w-2 rounded-full", label.color)} />
                      <span>{label.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className={cn(
      "border-r bg-background/50 flex flex-col transition-all duration-300 ease-in-out hidden md:flex",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Collapse Toggle */}
      <div className="p-2 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full h-8"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Compose Button */}
      <div className="p-2">
        {isCollapsed ? (
          <Button size="icon" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Zap className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
            <Zap className="h-4 w-4" />
            Compose
          </Button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 px-2">
        <nav className="space-y-1">
          {mainItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant={item.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full h-9",
                  item.active && "bg-muted/70",
                  isCollapsed ? "justify-center px-0" : "justify-start gap-3 px-3"
                )}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="h-4 w-4" />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left text-sm">{item.label}</span>
                    {item.count && (
                      <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                        {item.count}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            );
          })}
        </nav>

        {!isCollapsed && (
          <>
            <Separator className="my-4 mx-2" />

            {/* Labels */}
            <div className="px-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Labels
                </span>
                <Button variant="ghost" size="icon" className="h-5 w-5">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-1">
                {labels.map((label) => (
                  <Button
                    key={label.name}
                    variant="ghost"
                    className="w-full justify-start gap-3 h-8 px-2"
                  >
                    <div className={cn("h-2 w-2 rounded-full", label.color)} />
                    <span className="text-sm">{label.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}

        {isCollapsed && (
          <>
            <Separator className="my-4 mx-2" />
            
            {/* Collapsed Labels */}
            <div className="space-y-1">
              {labels.map((label) => (
                <Button
                  key={label.name}
                  variant="ghost"
                  size="icon"
                  className="w-full h-8"
                  title={label.name}
                >
                  <div className={cn("h-3 w-3 rounded-full", label.color)} />
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}