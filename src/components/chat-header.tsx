import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { data } from '@/constant/data';

export function ChatHeader({ profile }: { profile: 'hitesh' | 'piyush' }) {
    return (
        <header className="px-4 md:px-8 py-2 h-14 border-b">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-6">
                    <Link href='/' className={buttonVariants({ variant: 'outline', size: 'icon' })}>
                        <ArrowLeft className='size-4' />
                    </Link>

                    <div className="flex items-center gap-2">
                        <Image
                            src={profile === 'hitesh' ? '/images/hitesh-sir.png' : '/images/piyush-sir.png'}
                            alt={profile}
                            width={40}
                            height={40}
                            className='rounded-full'
                        />
                        <p className='text-xl font-medium'>
                            {data.find((item) => item.id === profile)?.name}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    )
}