"use client";
import { z } from "zod";
import { DottedSeparator } from "@/components/dotted-separator";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import  Image  from "next/image"
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage

} from "@/components/ui/form"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginScheme } from "../schemas";
import { useLogin } from "../api/user-login";


export default function SignInCard() {

    const { mutate, isPending } = useLogin();

    const form = useForm<z.infer<typeof loginScheme>>({
        resolver: zodResolver(loginScheme),
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const onSubmit = (values: z.infer<typeof loginScheme>) => {
        mutate({
            json: values,
        });
    }
    return (
        <Card className="w-full mx-auto md:w-[500px] border-none shadow-none">
            <CardHeader>
                <CardTitle>
                    Sign In
                </CardTitle>
            </CardHeader>
            <div className="px-6 mb-2">
                <DottedSeparator/>
            </div>
            <CardContent className="p-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                        <FormField 
                            name="email"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            disabled={isPending}
                                            type="email"
                                            {...field}
                                            placeholder="Enter email address"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            >
                            
                        </FormField>
                        <FormField 
                            name="password"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            disabled={isPending}
                                            type="password"
                                            {...field}
                                            placeholder="Enter your password"
                                        />
                                        
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                            >
                            
                        </FormField>
                        
                        
                            
                            <Button disabled={isPending} size="lg" className="w-full">Sign In</Button>
                                
                          
                        
                    </form>
                </Form>
            </CardContent>
            <div className="px-6 mb-2">
                <DottedSeparator/>
            </div>
            <CardContent>
                <Button disabled={false} size="lg" variant={"secondary"} className="w-full">
                <Image  src="./google-icon.svg" alt="Google Icon" height={20} width={20} />
                Sign In With Google</Button>
            </CardContent>
            <div className="px-6 mb-2">
                <DottedSeparator/>
            </div>
            <CardContent className="p-6 flex items-center justify-center">
                <p>
                    Don&apos;t have an account?
                    <Link href="/sign-up">
                        <span className="text-blue-700">&nbsp;Sign Up</span>
                    </Link>
                </p>
            </CardContent>

        </Card>
    )
}
