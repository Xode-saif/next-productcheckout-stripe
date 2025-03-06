"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatters";
import { useState } from "react"
import { addProduct, updateProduct } from "../../_action/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";
import Image from "next/image";

export default function ProductForm({product}:{product?:Product|null}){ //props to edit the product and use it to default value -- ? says prop is optional
    const [priceInCents, setPriceInCents] = useState<number|undefined>(product?.priceInCents);
    const[error,action] = useFormState(product==null?addProduct:updateProduct.bind(null,product.id),{})
    return(
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" name="name" required defaultValue={product?.name|| ""}/>
                {error.name && <div className="text-red-500">{error.name}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="priceInCents">Price In Cents</Label>
                <Input type="number" id="priceInCents" name="priceInCents" required  value={priceInCents} defaultValue={product?.priceInCents|| ""}
                onChange={e=>setPriceInCents(Number(e.target.value)||undefined)}
                />
                 <div className="text-muted-foreground">
                    {formatCurrency((priceInCents || 0)/100)}
                </div>
                {error.priceInCents && <div className="text-red-500">{error.priceInCents}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" required defaultValue={product?.description|| ""}/>
                {error.description && <div className="text-red-500">{error.description}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="file">File</Label>
                {/* //only required when product is null ==> required = {prosuct==null} */}
                <Input type="file" id="file" name="file"  required={product==null}/> 
                {/* will show the path of the file while editing the product */}
                {product!=null && <div className="text-muted-foreground">{product.filePath}</div>}
                {error.file && <div className="text-red-500">{error.file}</div>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" required={product == null}/>
                {/* will show the imaage while editing the product */}
                {product!=null && <Image priority={true} src={product.imagePath} alt="Product image" height="200" width="200"/>}
                {error.image && <div className="text-red-500">{error.image}</div>}
            </div>
            <SubmitButton/>
        </form>
    )
}

function SubmitButton(){
    const {pending} = useFormStatus();
    return (
        <Button type="submit" disabled={pending}>{pending?"Saving...":"Save"}</Button>
    )
}