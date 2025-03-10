import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { studentViewFinalizeOrder } from "@/services";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const StudentPaymentSuccess = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    console.log(payerId, paymentId);
    const finalizePayment = async () => {
      const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

      const response = await studentViewFinalizeOrder({
        paymentId,
        payerId,
        orderId,
      });
    };
  }, []);
  return (
    <Card>
      <CardTitle>
        <CardHeader>Your payment is being processed. Please wait...</CardHeader>
      </CardTitle>
    </Card>
  );
};

export default StudentPaymentSuccess;
