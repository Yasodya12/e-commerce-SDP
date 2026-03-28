import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";

function ShoppingAccount() {
    return (
        <div className="fade-up flex flex-col gap-6">
            <div className="relative h-[240px] w-full overflow-hidden rounded-3xl border shadow-lg sm:h-[300px]">
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/45 to-transparent" />
                <img
                    src={accImg}
                    className="h-full w-full object-cover object-center"
                />
                <div className="absolute bottom-6 left-6 z-20 text-white sm:left-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                        My Account
                    </p>
                    <h1 className="mt-2 text-4xl">Orders and Addresses</h1>
                </div>
            </div>
            <div className="mx-auto grid w-full grid-cols-1 gap-8 py-2">
                <div className="glass-panel flex flex-col p-6">
                    <Tabs defaultValue="orders">
                        <TabsList className="w-full justify-start rounded-xl bg-secondary/70 p-1 sm:w-fit">
                            <TabsTrigger value="orders">Orders</TabsTrigger>
                            <TabsTrigger value="address">Address</TabsTrigger>
                        </TabsList>
                        <TabsContent value="orders">
                            <ShoppingOrders />
                        </TabsContent>
                        <TabsContent value="address">
                            <Address />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default ShoppingAccount;
