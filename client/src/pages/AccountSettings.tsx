import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UpdateUsername from "./components/account-settings/update-username";

function AccountSettings() {
    return (
        <section className="py-8 bg-secondary dark:bg-background">
            <MaxWidthWrapper className="max-w-screen-xl space-y-6">
                <header>
                    <h1 className="font-bold text-3xl -tracking-tighter">
                        Account settings
                    </h1>
                </header>

                <Card className="border rounded-lg">
                    <CardHeader className="border-b bg-secondary">
                        <CardTitle className="font-normal -tracking-tighter">
                            Display Name
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="py-6 space-y-6">
                        <p className="text-sm -tracking-tighter">
                            To update your display name, please fill the form
                            below
                        </p>
                        <UpdateUsername />
                    </CardContent>
                </Card>
            </MaxWidthWrapper>
        </section>
    );
}

export default AccountSettings;
