import React from "react";
import ClientsSlider from "./ClientsSlider";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-indigo-900 mb-12 tracking-tight">
          About <span className="text-green-600">ROVY</span>
        </h1>

        <p className="max-w-4xl mx-auto text-center text-lg text-gray-700 leading-relaxed mb-16">
          At ROVY, we are passionate about delivering premium clothing collections that combine style, comfort, and sustainability. Our mission is to empower individuals worldwide with fashion that reflects their unique personality and values.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <FeatureCard
            title="Global Reach"
            description="Serving customers in over 50 countries with fast and reliable shipping."
            icon={
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20"
                />
              </svg>
            }
          />
          <FeatureCard
            title="Sustainability"
            description="Committed to eco-friendly materials and ethical production processes."
            icon={
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10z"
                />
              </svg>
            }
          />
          <FeatureCard
            title="Customer Support"
            description="24/7 support to assist you with your shopping experience."
            icon={
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 10v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14v-4"
                />
                <circle cx="12" cy="7" r="4" stroke="none" fill="currentColor" />
              </svg>
            }
          />
        </div>

        <section>
          <h2 className="text-3xl font-bold text-center text-indigo-900 mb-8">
            Trusted by Leading Clients & Partners
          </h2>
          <ClientsSlider />
        </section>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-500">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-indigo-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default About;