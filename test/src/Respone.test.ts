import {
    Payment3DSResponse,
    PaymentClientResponse,
    PaymentFailedResponse,
    PaymentSuccessResponse,
    PaymentWith3DSClientResponse,
    PayoutClientResponse,
    PayoutSuccessResponse,
} from "../../src";
import {createResponse} from "./lib/functions";

test("Payment Response", () => {
    const dataPaymentSuccess = createResponse<PaymentSuccessResponse>({
        TransactionId: 1,
        AuthCode: "1",
    });
    const response = new PaymentClientResponse(dataPaymentSuccess);
    expect(response.isPaymentSuccessResponse()).toBe(true);
    expect(response.getResponse()).toEqual(dataPaymentSuccess);
    expect(response.getResponse().Model.TransactionId).toEqual(dataPaymentSuccess.Model.TransactionId);
});

test("Payment with 3DS Response", () => {
    const dataSuccess = createResponse<Payment3DSResponse>(
        {
            TransactionId: 1,
            PaReq: "PaReq",
            AcsUrl: "AcsUrl",
        },
        false,
    );

    const response = new PaymentWith3DSClientResponse(dataSuccess);
    expect(response.isPayment3DSResponse()).toBe(true);
    expect(response.getResponse()).toEqual(dataSuccess);
    expect(response.getResponse().Model.AcsUrl).toBe(dataSuccess.Model.AcsUrl);
});

test("Payout Response", () => {
    const dataSuccess = createResponse<PayoutSuccessResponse>({
        TransactionId: 1,
        AuthCode: "1",
    });

    const response = new PayoutClientResponse(dataSuccess);
    expect(response.isPayoutSuccessResponse()).toBe(true);
    expect(response.getResponse()).toEqual(dataSuccess);
    expect(response.getResponse().Model.TransactionId).toBe(dataSuccess.Model.TransactionId);
});

test("Payment Fail", () => {
    const data = createResponse<PaymentFailedResponse>({Reason: "Error"}, false);
    const response = new PaymentWith3DSClientResponse(data);

    expect(response.isSuccess()).toBe(false);
    expect(response.getResponse().Model.Reason).toBe("Error");
});
