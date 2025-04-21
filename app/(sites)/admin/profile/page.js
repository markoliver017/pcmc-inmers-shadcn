import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import Password from "./Password";
import UpdateProfile from "./UpdateProfile";
import { getAdmin } from "./action";
import { getServerSession } from "next-auth";

export default async function Page() {
    const session = await getServerSession();
    const { user } = session;
    const admin = await getAdmin(user.email);

    return (
        <div className="flex justify-center">
            <Tabs defaultValue="profile" className="w-full md:w-3/4">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="password">Change Password</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <UpdateProfile admin={admin} />
                </TabsContent>
                <TabsContent value="password">
                    <Password admin={admin} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
