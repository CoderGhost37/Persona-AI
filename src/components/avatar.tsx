import { cn } from '@/lib/utils';
import { UserCircle } from 'lucide-react';
import Image from 'next/image';

export function Avatar({ profile, isUser = false, }: { profile: 'hitesh' | 'piyush', isUser?: boolean }) {
    return (
        <div
            className={cn(
                "flex items-center justify-center size-8 shrink-0 rounded-full",
                isUser ? "bg-gray-200 text-gray-700" : "bg-emerald-950",
            )}
        >
            {isUser ? <UserCircle size={20} /> :
                <Image
                    src={profile === 'hitesh' ? '/images/hitesh-sir.png' : '/images/piyush-sir.png'}
                    alt={profile}
                    width={20}
                    height={20}
                    className='rounded-full'
                />
            }
        </div>
    )
}