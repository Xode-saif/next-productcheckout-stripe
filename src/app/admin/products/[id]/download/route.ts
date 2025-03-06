import db from "@/db/db";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises"
export async function GET(req:NextRequest,{params}:{params:{id:string}}) {
    const {id} = await params;
    const product = await db.product.findUnique({where:{id},
    select:{filePath:true,name:true}});

    if(product == null ) return notFound();
    const {size} = await fs.stat(product.filePath);
    const file = await fs.readFile(product.filePath);
    const extension = product.filePath.split(".").pop();

    return new NextResponse(file,{headers:{
        "Content-Disposition":`attachment; filename="${product.name}.${extension}"`,
        "Content-Length":size.toString(),
    }})

// Content-Disposition:This header tells the browser to treat the response as a downloadable file.
// The attachment directive forces the browser to download the file instead of displaying it.
// The filename parameter specifies the name of the file being downloaded. In this case, it uses product.name and extension to construct the filename.


    
    
}