import httpCommon from "../utils/http-common";
import authHeader from "../utils/auth-header";

class PaymentDataService {
  createIntent(amount, productId, customerId) {
    return httpCommon.post(
      "/payment/paymentIntent",
      { amount, customerId, productId },
      { headers: authHeader() }
    );
  }
  createSetUpIntent(customerId) {
    return httpCommon.post("/payment/setUpIntent", customerId, {
      headers: authHeader(),
    });
  }
}

export default new PaymentDataService();
