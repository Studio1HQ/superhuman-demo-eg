"use client";

import { Search, Command, Settings, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
interface TopbarProps {
  channelName: string;
  memberCount: number;
  onMobileMenuToggle?: () => void;
  isMobileMenuOpen?: boolean;
}
import {
  useVeltClient,
  VeltCommentsSidebar,
  VeltNotificationsTool,
  VeltPresence,
  VeltSidebarButton,
} from "@veltdev/react";

import { names, userIds, useUserStore } from "@/helper/userdb";
import { User } from "lucide-react";
import React, { useEffect, useMemo, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import useTheme, { ThemeToggleButton } from "@/hooks/use-theme";

interface TopNavigationProps {
  onMenuClick: () => void;
}

export function TopNavigation({ onMenuClick }: TopNavigationProps) {
    const { theme } = useTheme();
  const { user, setUser } = useUserStore();
  const { client } = useVeltClient();
  const prevUserRef = useRef(user);
  const isInitializingRef = useRef(false); // Prevent overlapping initialization calls

  const predefinedUsers = useMemo(
    () =>
      userIds.map((uid, index) => {
        const avatarUrls = [
          "https://api.dicebear.com/7.x/pixel-art/svg?seed=Nany",
          "https://api.dicebear.com/7.x/pixel-art/svg?seed=Mary",
        ];
        return {
          uid: uid,
          displayName: names[index],
          email: `${names[index].toLowerCase()}@gmail.com`,
          photoUrl: avatarUrls[index],
        };
      }),
    []
  );

  // Initialize user from localStorage if none exists
  useEffect(() => {
    if (typeof window !== "undefined" && !user) {
      const storedUser = localStorage.getItem("user-storage");
      if (!storedUser) {
        setUser(predefinedUsers[0]);
      }
    }
  }, [user, setUser, predefinedUsers]);

  // Handle Velt client initialization, user identification, and document setting
  useEffect(() => {
    if (!client || !user || isInitializingRef.current) {
      console.log("Velt init skipped:", {
        client: !!client,
        user: !!user,
        initializing: isInitializingRef.current,
      });
      return;
    }

    const initializeVelt = async () => {
      isInitializingRef.current = true;
      try {
        // Detect user switch
        const isUserSwitch = prevUserRef.current?.uid !== user.uid;
        prevUserRef.current = user;

        console.log("Starting Velt init for user:", user.uid, { isUserSwitch });

        // Re-identify the user (handles initial and switches)
        const veltUser = {
          userId: user.uid,
          organizationId: "organization_id",
          name: user.displayName,
          email: user.email,
          photoUrl: user.photoUrl,
        };
        await client.identify(veltUser);
        console.log("Velt user identified:", veltUser.userId);
        await client.setDocuments([
          {
            id: "superhuman-velt",
            metadata: { documentName: "superhuman-velt" },
          },
        ]);
        console.log("Velt documents set: superhuman-velt");
      } catch (error) {
        console.error("Error initializing Velt:", error);
      } finally {
        isInitializingRef.current = false;
      }
    };

    initializeVelt();
  }, [client, user]); // Re-run on client or user change
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 justify-between items-center px-4 gap-4">
        <div className="w-full flex gap-5">
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
            <span className="font-semibold text-sm hidden sm:block">
              Superhuman
            </span>
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
                <Command className="h-2.5 w-2.5 mr-1" />K
              </Badge>
            </div>
          </div>

          {/* Mobile Search Button */}
          <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hidden sm:flex"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 h-8 bg-white  text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200  dark:border dark:border-white/30 dark:!bg-[#121212] dark:hover:!bg-gray-700"
                >
                  <Avatar className="w-5 h-5">
                    <AvatarImage
                      src={user?.photoUrl || "https://via.placeholder.com/100"}
                      alt={user?.displayName || "User"}
                    />
                    <AvatarFallback className="text-xs">
                      {user?.displayName}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm truncate max-w-[100px]">
                    {user?.displayName}
                  </span>
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 bg-white  text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200  dark:bg-[#121212] dark:border dark:border-white/30"
              >
                <DropdownMenuLabel>Select User</DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-white/40" />
                {predefinedUsers.map((Currentuser) => (
                  <DropdownMenuItem
                    key={Currentuser.uid}
                    onClick={() => setUser(Currentuser)}
                    className="flex items-center space-x-3 p-3 cursor-pointer hover:!bg-gray-100 hover:dark:!bg-[#121212] dark:hover:!bg-gray-700"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={Currentuser.photoUrl}
                        alt={Currentuser.displayName}
                      />
                      <AvatarFallback className="text-xs">
                        {Currentuser.displayName}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white/70">
                        {Currentuser.displayName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-white/60">
                        {Currentuser.email}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-white/50">
                        User
                      </div>
                    </div>
                    {user?.uid === Currentuser.uid && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    )}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center space-x-2 text-blue-600 hover:dark:bg-[#515881] ">
                  <User size={16} />
                  <span className="hover:dark:text-white/70">Manage Users</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="max-md:hidden">
              <VeltPresence />
            </div>
            <VeltNotificationsTool darkMode={theme === "dark"} />
          </div>
          <VeltSidebarButton darkMode={theme === "dark"} />

          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
}
