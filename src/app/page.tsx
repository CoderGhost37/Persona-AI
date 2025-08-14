import Image from "next/image";
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { buttonVariants } from '@/components/ui/button';
import { MessageCircleIcon } from 'lucide-react';
import { data } from '@/constant/data';

export default function Home() {
  return (
    <main>
      <header className="px-4 md:px-8 py-4 border-b">
        <div className="max-w-7xl mx-auto">
          <p className="text-2xl font-bold">🍵 Chai & Chat with AI Gurus</p>
        </div>
      </header>

      <section className='py-12 max-w-7xl mx-auto'>
        <div className="flex flex-col gap-4 justify-center">
          <h2 className="text-4xl font-bold text-primary text-center">
            Chat with AI Gurus
          </h2>

          <div className="mt-8 px-4 md:px-8 flex flex-col md:flex-row gap-4 md:gap-12 justify-center items-center">
            {data.map((card) => (
              <Card key={card.id} className='group w-full'>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Image src={card.image} alt={card.name} width={100} height={100} className='rounded-full h-14 w-auto object-cover' />
                    <CardTitle className='text-2xl'>{card.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className='text-muted-foreground text-base'>
                  {card.description}
                </CardContent>
                <CardFooter>
                  <Link href={card.href} className={buttonVariants({
                    className: 'w-full'
                  })}>
                    <MessageCircleIcon className='size-4' />
                    <span>Chat with {card.name.split(' ')[0]}</span>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
