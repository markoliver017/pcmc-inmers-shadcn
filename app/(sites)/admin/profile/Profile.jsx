"use client"

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/form";

const formSchema = z.object({
    first_name: z.string().min(2, {
        message: "First name must be at least 2 characters.",
    }),
    profile_picture: z
        .instanceof(File)
        .refine((file) => file.size <= 1024 * 1024 * 5, {
            message: "File size should be less than 5MB",
        })
        .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
            message: "Only JPEG and PNG files are supported",
        }),
    // last_name: z.string().min(2, {
    //     message: "Last name must be at least 2 characters.",
    // }),
})

export default function Profile() {

    const form = useForm({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            gender: "",
            email: "",
            profile_picture: null,
        },
    });

    function onSubmit(data) {
        // Handle form data here
        console.log(data);
        // Send data to API or update state
    };
    return (

        <Card>
            <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                    Make changes to your account here. Click save when you're done.
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <CardContent className="space-y-8">
                        <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="first name" {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="profile_picture"
                            render={({ field: { onChange, value, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Profile Picture</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            onChange={(e) => onChange(e.target.files[0])}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Save changes</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>

    )
}
