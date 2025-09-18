import React, { useState, useContext } from "react";
import { WishlistContext } from "./WishlistContext";
import { toast } from "react-toastify";
import { 
  User, 
  MapPin, 
  Phone, 
  CreditCard, 
  Package, 
  CheckCircle2, 
  ShoppingCart,
  Truck,
  Shield,
  Clock
} from "lucide-react";

const Checkout = () => {
  const { cart, cartTotal, removeFromCart } = useContext(WishlistContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    paymentMethod: "creditCard",
    specialInstructions: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.address || !formData.phone) {
      toast.error("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // إرسال بيانات الطلب إلى Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "6c123e70-b648-423d-882b-da0fdfd7e8fe",
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: `New Order - ${formData.fullName}`,
          message: `
            🛍️ NEW ORDER RECEIVED
            
            Customer Information:
            - Name: ${formData.fullName}
            - Email: ${formData.email}
            - Phone: ${formData.phone}
            - Address: ${formData.address}
            - City: ${formData.city}
            - Postal Code: ${formData.postalCode}
            - Payment Method: ${formData.paymentMethod}
            
            Order Details:
            ${cart.map(({ product, quantity }) => 
              `• ${product.title} x${quantity} - $${(product.price * quantity).toFixed(2)}`
            ).join('\n')}
            
            Total Amount: $${cartTotal.toFixed(2)}
            
            Special Instructions:
            ${formData.specialInstructions || 'None'}
          `,
          from_name: "ROVY E-commerce",
        }),
      });

      if (response.ok) {
        setIsSubmitting(false);
        setOrderPlaced(true);
        toast.success("Order placed successfully! Your items will arrive in 3-5 business days.");

        // Clear cart after successful order
        cart.forEach(item => removeFromCart(item.product.id));
      } else {
        throw new Error("Failed to process order");
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Failed to process your order. Please try again.");
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-md">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some amazing products before checkout.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center px-4">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl max-w-2xl">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            Order Confirmed!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase! Your order will arrive in 3-5 business days.
          </p>
          
          {/* Order Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4">
              <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-800">Free Shipping</p>
              <p className="text-sm text-gray-600">On orders over $50</p>
            </div>
            <div className="text-center p-4">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-800">Secure Payment</p>
              <p className="text-sm text-gray-600">Your data is protected</p>
            </div>
            <div className="text-center p-4">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-800">Fast Delivery</p>
              <p className="text-sm text-gray-600">3-5 business days</p>
            </div>
          </div>

          <button
            onClick={() => setOrderPlaced(false)}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-10 py-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 bg-clip-text text-transparent mb-4">
            Checkout
          </h1>
          <p className="text-xl text-gray-600">Almost there! Complete your purchase below.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Order Summary */}
          <div className="lg:col-span-1 lg:order-2">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20 sticky top-8">
              <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-3">
                <Package className="w-6 h-6 text-emerald-600" />
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <h4 className="font-semibold text-green-900 text-sm">{product.title}</h4>
                      <p className="text-green-700 text-sm">Quantity: {quantity}</p>
                    </div>
                    <span className="font-semibold text-green-900">${(product.price * quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex justify-between text-green-700">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-green-900 border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2 lg:order-1">
            <div className="bg-white/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-lg border border-white/20">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Customer Information */}
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-3">
                    <User className="w-6 h-6 text-emerald-600" />
                    Customer Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block font-semibold mb-2 text-green-800 text-sm uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-green-50/50 hover:bg-white"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-semibold mb-2 text-green-800 text-sm uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-green-50/50 hover:bg-white"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                    Shipping Address
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="address" className="block font-semibold mb-2 text-green-800 text-sm uppercase tracking-wider">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-green-50/50 hover:bg-white"
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="city" className="block font-semibold mb-2 text-green-800 text-sm uppercase tracking-wider">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-green-50/50 hover:bg-white"
                          placeholder="Your city"
                        />
                      </div>

                      <div>
                        <label htmlFor="postalCode" className="block font-semibold mb-2 text-green-800 text-sm uppercase tracking-wider">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-green-50/50 hover:bg-white"
                          placeholder="12345"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block font-semibold mb-2 text-green-800 text-sm uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        pattern="^\+?\d{7,15}$"
                        className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-green-50/50 hover:bg-white"
                        placeholder="+201234567890"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center gap-3">
                    <CreditCard className="w-6 h-6 text-emerald-600" />
                    Payment Method
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      { value: "creditCard", label: "Credit Card", icon: "💳" },
                      { value: "paypal", label: "PayPal", icon: "💰" },
                      { value: "cashOnDelivery", label: "Cash on Delivery", icon: "💵" },
                    ].map((method) => (
                      <label
                        key={method.value}
                        className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.paymentMethod === method.value
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-green-300 hover:border-green-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={formData.paymentMethod === method.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <span className="text-2xl mr-3">{method.icon}</span>
                        <span className="font-semibold text-green-900">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label htmlFor="specialInstructions" className="block font-semibold mb-2 text-green-800 text-sm uppercase tracking-wider">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    id="specialInstructions"
                    name="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-green-50/50 hover:bg-white resize-none"
                    placeholder="Any special delivery instructions or notes..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-8 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Order...
                    </>
                  ) : (
                    <>
                      Place Order - ${cartTotal.toFixed(2)}
                      <CheckCircle2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </button>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 text-sm text-green-700 mt-4">
                  <Shield className="w-4 h-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;