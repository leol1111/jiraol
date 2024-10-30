"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({children}: AuthLayoutProps )  {
    const pathname = usePathname();
    const isSignIn = pathname === "/sign-in";
    return (
        <div className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <Link href="/">
                        <Image src="/logo.svg" alt="logo" width={80} height={50} />
                    </Link>
                    <div>
                     <Button asChild variant={"secondary"}>
                        <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                            {isSignIn ? "Sign Up" : "Sign In"}
                        </Link>
                     </Button>   
                    </div>
                </nav>
                {children}
            </div>
        </div>
    )
}