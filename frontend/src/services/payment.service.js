import httpCommon from "../http-common";
import authHeader from "../auth-header";

class PaymentDataService {
    createIntent(amount,productId,customerId) {
        return httpCommon.post("/auth/paymentIntent", {amount,customerId,productId}, {headers: authHeader()})
    }
}

export default new PaymentDataService();