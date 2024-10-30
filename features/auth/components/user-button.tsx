"use client";
import { Loader, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DottedSeparator } from "@/components/dotted-separator";

import { useLogout } from "../api/user-logout";
import { useCurrent } from "../api/user-current";

export const UserButton = () => {
    const { data: user, isLoading } = useCurrent();
    const { mutate } = useLogout();

    if (isLoading) {
        return (
            <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
                <Loader className="size-4 animate-spin text-muted-foreground" />
            </div>
        );
    }
    if (!user) {
        return null;
    }

    const { name, email } = user;

    const avatarFallback = name
        ? name.charAt(0).toUpperCase()
        : email?.charAt(0).toUpperCase() ?? "U";


    return (
        <DropdownMenu modal={false} >
            <DropdownMenuTrigger className="outline-none relative">
                <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
                    <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60 p-4">
                <div className="flex flex-col items-center justify-center gap-2 px-2">
                    <Avatar className="size-[50px] border border-neutral-300">
                        <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center gap-1">
                        <p className="text-sm font-medium">
                            {name || "User"}
                        </p>
                        <p className="text-xs text-neutral-600">
                            {email || "Email"}
                        </p>
                    </div>
                    <DottedSeparator></DottedSeparator>
                    <DropdownMenuItem onClick={() => mutate()} className="text-red-700 font-medium">

                        <LogOut className="size-4 " />
                        Log out

                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>

    );

}