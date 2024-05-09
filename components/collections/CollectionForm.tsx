'use client'
import { Separator } from "@/components/ui/separator"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ImageUpload from "../custom ui/ImageUpload"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"



const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(2).max(500).trim(),
    image: z.string()
})

export default function CollectionForm() {
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            image: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) =>{
        
        try{
            setLoading(true)
            const res = await fetch('http://localhost:3000/api/collections', {
                method: "POST",
                body: JSON.stringify(values)
            });

            if(res.ok){
                setLoading(false)
                toast.success("Collection Created!")
                router.push('/collections')
            }

        }catch(err){
            console.log("[Collections_Form_Error]", err)
            toast.error("Something Went Wrong!")
        }
      }
    
      

    return (
        <div className="p-10">
            <p className="text-9xl font-bold text-slate-300">Create Collection</p>
            <Separator className="bg-grey-1 my-4" />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black">Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Title" {...field} />
                                </FormControl>
                                
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                </form>
            </Form>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black">Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Description" {...field} rows={5}/>
                                </FormControl>
                                
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                   
                </form>
            </Form>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black">Image</FormLabel>
                                <FormControl>
                                    <ImageUpload value={field.value ? [field.value]: []}
                                    onChange = {(url) => field.onChange(url)}
                                    onRemove = {() => field.onChange("")}/>
                                </FormControl>
                                
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        
                            <Button className='text-black bg-gray-400 rounded m-5 py-2' 
                            type="submit"
                            >Submit
                            </Button>
                        

                       

                        <Button className='text-black bg-gray-400 rounded m-5 py-2' 
                        type="button"
                        onClick={() => router.push('/collections/new')}>Discard</Button>
                    </div>
                   
                </form>
            </Form>
        </div>
    )
}