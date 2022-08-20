import httpCommon from "../utils/http-common";
import authHeader from "../utils/auth-header";

class PaymentDataService {
  createIntent(amount, productId, customerId) {
    return httpCommon.post(
      "/auth/paymentIntent",
      { amount, customerId, productId },
      { headers: authHeader() }
    );
  }
}

export default new PaymentDataService();
