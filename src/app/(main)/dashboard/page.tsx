import { initialProfile } from "@/lib/initialProfile";
import { RedirectToSignIn } from "@clerk/nextjs";
const DashboardPage = async () => {
    const profile = await initialProfile();
    if (!profile) return <RedirectToSignIn />
    return (
        <div>
            <div className="flex flex-col ml-10 my-6">
                <div className="flex flex-col gap-3">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <h3 className="font-semibold text-stone-600 text-lg">Welcome {profile.name}</h3>
                </div>
            </div>

        </div>
    );
}

export default DashboardPage;