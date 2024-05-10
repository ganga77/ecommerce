'use client'
import { columns } from "@/components/collections/CollectionColumns"
import { DataTable } from "@/components/custom ui/DataTable"
import SearchBar from "@/components/ui/SearchBar"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
export default function CollectionsPage() {
    const [loading, setIsLoading] = useState(true)
    const [collections, setCollections] = useState([])

    const getCollection = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/collections")

            const data = await res.json();

            setCollections(data)

            setIsLoading(false)
        } catch (err) {
            console.log("[collections_get_error]", err)
        }
    }

    useEffect(() => {
        getCollection()
    }, [])

   

    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="text-heading2-bold">Collections</p>
                <Button className="bg-blue-1 text-white">Create Collection</Button>
            </div>
            <div className="py-4">
            
            <DataTable columns={columns} data={collections} searchKey="title"/>
        
            </div>
            </div>

    )
}