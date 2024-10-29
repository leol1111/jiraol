"use client";
import { z } from "zod";
import { DottedSeparator } from "@/components/dotted-separator";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import  Image  from "next/image";
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
import { registerScheme } from "../schemas";
import { useRegister } from "../api/user-register";


export default function SignUpCard() {

    const { mutate } = useRegister();

    const form = useForm<z.infer<typeof registerScheme>>({
        resolver: zodResolver(registerScheme),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });
    const onSubmit = (values: z.infer<typeof registerScheme>) => {
        console.log(values)
        mutate({ json: values })
    }
    return (
        <Card className="w-full mx-auto md:w-[500px] border-none shadow-none">
            <CardHeader>
                <CardTitle className="text-center">
                    Sign Up
                </CardTitle>
            </CardHeader>
            <div className="px-6 mb-2">
                <DottedSeparator/>
            </div>
            <CardContent className="p-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                        <FormField 
                                name="name"
                                control={form.control}
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input 
                                                type="text"
                                                {...field}
                                                placeholder="Enter your name"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                                >
                            
                        </FormField>
                        <FormField 
                            name="email"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input 
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
                        
                        <Button disabled={false} size="lg" className="w-full">Sign Up</Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-6 mb-2">
                <DottedSeparator/>
            </div>
            <CardContent>
                <Button disabled={false} size="lg" variant={"secondary"} className="w-full">
                <Image  src="./google-icon.svg" alt="Google Icon" height={20} width={20} />
                Sign In</Button>
            </CardContent>
            <div className="px-6 mb-2">
                <DottedSeparator/>
            </div>
            <CardContent className="p-6 flex items-center justify-center">
                <p>
                    Already have an account?
                    <Link href="/sign-in">
                        <span className="text-blue-700">&nbsp;Sign In</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}

