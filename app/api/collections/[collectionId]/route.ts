import Collection from "@/lib/models/Collections";
import { connectToDb } from "@/lib/mongoDb";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

type Params  = {
    collectionId: string
}

export const DELETE = async (reg: NextRequest, {params} : {params : Params}) => {
    try{
        const {userId} = auth()

        if(!userId){
            return new NextResponse("Unauthorized", {status: 403})
        }

        await connectToDb()
        await Collection.findByIdAndDelete(params.collectionId)
        return new NextResponse("Collection deleted successfully", { status: 200 });
    }catch(err){
        console.log("[delete_collection_id_error]", err)
    }
}