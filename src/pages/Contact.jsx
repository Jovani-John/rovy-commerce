import React, { useState } from "react";
import { toast } from "react-toastify";
import { Mail, Phone, MapPin, Send, User, MessageCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "6c123e70-b648-423d-882b-da0fdfd7e8fe",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Contact Form: ${formData.subject || 'New Message'}`,
          message: `
            Name: ${formData.name}
            Email: ${formData.email}
            Phone: ${formData.phone || 'Not provided'}
            Subject: ${formData.subject || 'No subject'}
            
            Message:
            ${formData.message}
          `,
          from_name: "ROVY Contact Form",
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 bg-clip-text text-transparent mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-green-900 max-w-3xl mx-auto leading-relaxed">
            Have a question or want to work together? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
                  <div className="bg-emerald-600 p-2 rounded-lg">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Phone</h4>
                    <p className="text-green-700">+201552568856</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-green-50 to-teal-50 border border-green-100">
                  <div className="bg-teal-600 p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Email</h4>
                    <p className="text-green-700 break-all">jovanijohn40@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-100">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Location</h4>
                    <p className="text-green-700">Zagazig, Sharqia, Egypt</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 rounded-2xl text-white">
              <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>24/7 Customer Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Fast Response Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Professional Service</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-xl border border-white/20">
              <h3 className="text-3xl font-bold text-green-900 mb-8 flex items-center gap-3">
                <Send className="w-7 h-7 text-emerald-600" />
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="name" className="block font-semibold mb-2 text-green-800 text-sm uppercase tracking-wider">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-green-50/50 hover:bg-white"
                        required
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="email" className="block font-semibold mb-2 text-green-800 text-sm uppercase tracking-wider">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-green-50/50 hover:bg-white"
                        required
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label htmlFor="phone" className="block font-semibold mb-2 text-green-800 text-sm uppercase tracking-wider">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-green-50/50 hover:bg-white"
                        placeholder="+201234567890"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-semibold mb-2 text-green-800 text-sm uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-4 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-green-50/50 hover:bg-white"
                      placeholder="What's this about?"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block font-semibold mb-2 text-green-800 text-sm uppercase tracking-wider">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-4 border-2 border-green-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-green-50/50 hover:bg-white resize-none"
                    required
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 px-8 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;