import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@components/ui/tabs"
import Profile from "./Profile";
import Password from "./Password";

export default function Page() {
    return (
        <div className="flex justify-center">

            <Tabs defaultValue="profile" className="min-w-[800px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="password">Change Password</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <Profile />
                </TabsContent>
                <TabsContent value="password">
                    <Password />
                </TabsContent>
            </Tabs>
        </div>
    );
}
