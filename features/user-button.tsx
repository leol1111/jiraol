import { DottedSeparator } from "@/components/dotted-separator"
import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar"
import { DropdownMenu,DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react"

export default function UserButton() {
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
                    <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 items-center justify-center">
                        K
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
                <div className="flex flex-col items-center justify-center gap-2 px-2 py-4">
                <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
                    <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 items-center justify-center">
                            K
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-center justify-center ">
                        <p className="text-sm font-medium text-neutral-900"> 
                            Khiem Le
                        </p>
                        <p className="text-sm text-neutral-500">
                            khiem@gmail.com
                        </p>
                    </div>
                </div>
                <DottedSeparator></DottedSeparator>
                <DropdownMenuItem className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer">
                    <LogOut className="size-4"/>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
            
        </DropdownMenu>
        
    )
}