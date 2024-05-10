import { Trash } from "lucide-react";
import { Button } from "../ui/button";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from "react-hot-toast";

type Id = {
    id: string
}

export default function Delete({ id }: Id) {

    const handleDelete = async () =>{
        try{
            const res = await fetch(`http://localhost:3000/api/collections/${id}`, {
                method: 'DELETE'
            })

            if(res.ok){
                window.location.href = "/collections"
                toast.success("Collection Deleted")

            }
        }catch(err){
            console.log("[delete_collection failed]", err)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button className="text-white bg-red-1">
                    <Trash />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white text-gray-1">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-1">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your collection.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                        <Button onClick={handleDelete}>Delete</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}