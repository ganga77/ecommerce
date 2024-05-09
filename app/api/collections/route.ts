import { connectToDb } from "@/lib/mongoDb";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";
import Collection from "@/lib/models/Collections";

export const POST = async (req: NextRequest) => {
    try{
        const {userId} = auth()

        if(!userId){
            return new NextResponse("Unauthorized", {status: 403})
        }

        await connectToDb()

        const {title, description, image} = await req.json();

        const existingCollection = await Collection.findOne({title})

        if(existingCollection){
            return new NextResponse("COllection already exists", {status: 400})
        }

        if(!title || !image){
            return new NextResponse("Title and Image are required", {status: 400})
            }

            const newCollection = await Collection.create({
                title,
                description,
                image,
            })
            

            await newCollection.save()
            return NextResponse.json(newCollection, {status: 200})        
    
    }catch (err){
        console.log("[collections_POST_ERROR]", err)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}