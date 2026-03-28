import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function PaymentSuccessPage() {
    const navigate = useNavigate();

    return (
        <Card className="glass-panel mx-auto mt-8 w-full max-w-2xl border-0 p-8 sm:p-12">
            <CardHeader className="p-0 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Confirmed
                </p>
                <CardTitle className="mt-3 text-4xl">
                    Payment is successful
                </CardTitle>
                <p className="mt-3 text-muted-foreground">
                    Your order has been placed and is now in processing.
                </p>
            </CardHeader>
            <Button
                className="mx-auto mt-8 h-11 w-full max-w-xs rounded-xl"
                onClick={() => navigate("/shop/account")}
            >
                View Orders
            </Button>
        </Card>
    );
}

export default PaymentSuccessPage;
