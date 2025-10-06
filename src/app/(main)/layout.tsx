import { Button } from '@/components/ui/button';
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import Link from 'next/link';
const MainLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='flex flex-col w-full'>
            <header className="flex justify-between px-10 items-center py-8 shadow-xl gap-4 h-10 w-full">
                <div>
                    <Link href='/'><h1 className='font-extrabold text-2xl'>VertoQuiz</h1></Link>
                </div>
                <div>
                    <SignedOut>
                        <SignInButton mode='redirect'><Button>Sign in</Button></SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </header>
            <div>
                {children}
            </div>

        </div>
    );
}

export default MainLayout;