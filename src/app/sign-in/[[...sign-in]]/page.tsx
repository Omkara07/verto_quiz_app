import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex items-center justify-center my-20'>
            <SignIn
                path="/sign-in"
                routing="path"
                afterSignInUrl="/dashboard"
            />
        </div>
    )
}