"use client";

import { Search, Command, Settings, Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggleButton } from "@/hooks/use-theme";

interface TopNavigationProps {
  onMenuClick: () => void;
}

export function TopNavigation({ onMenuClick }: TopNavigationProps) {
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-4">
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden h-8 w-8"
          onClick={onMenuClick}
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded"></div>
          <span className="font-semibold text-sm hidden sm:block">Superhuman</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-sm relative hidden sm:block">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search mail..."
            className="pl-8 bg-muted/50 border-0 focus-visible:ring-1 h-8 text-sm"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
              <Command className="h-2.5 w-2.5 mr-1" />
              K
            </Badge>
          </div>
        </div>

        {/* Mobile Search Button */}
        <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8">
          <Search className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
            <Settings className="h-4 w-4" />
          </Button>
           <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
}