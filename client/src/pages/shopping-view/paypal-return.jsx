import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// PayPal is no longer used. This page simply redirects to the success page
// in case anyone navigates here directly.
function PaypalReturnPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/shop/payment-success", { replace: true });
  }, [navigate]);

  return null;
}

export default PaypalReturnPage;
