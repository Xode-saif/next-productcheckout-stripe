import { Button } from '@/components/ui/button';
import db from '@/db/db'
import { formatCurrency } from '@/lib/formatters'
import Image from 'next/image'
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)
export default async function SucessPage({searchParams}:{searchParams:{payment_intent:string}}) {
  const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent);
  
  if(paymentIntent.metadata.productId == null) return notFound();
  const product = await db.product.findUnique({
    where:{id:paymentIntent.metadata.productId},
  })
  if(product == null ) return notFound();

  const isSuccess = paymentIntent.status === "succeeded"
  // const isSuccess = false to test try again
  return (
    <div className=" max-w-5xl w-full mx-auto space-x-8 ">
        <h1 className='text-4xl font-bold'>{isSuccess?"Success!":"Error!"}</h1>
        <div className="flex gap-4 items-center my-4">
            <div className="aspect-video flex-shrink-0 w-1/3 relative">
                <Image src={product.imagePath} fill alt={product.name}/>
            </div>
            <div>
                <div className="text-lg">{formatCurrency(product.priceInCents/100)}</div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="line-clamp-3 text-muted-foreground">{product.description}</div>
                <Button asChild className='mt-4' size="lg">
                  {isSuccess?<a></a>:
                  <Link href={`/products/${product.id}/purchase`}>Try again</Link>}
                </Button>
            </div>
        </div>
    </div>
  )
}
