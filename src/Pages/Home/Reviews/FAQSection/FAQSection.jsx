import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "How does the posture corrector work?",
    answer:
      "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day. Here's how it typically functions: A posture corrector works by providing support and gentle alignment to your shoulders...",
  },
  {
    question: "Is it suitable for all ages and body types?",
    answer:
      "Yes! Postura Pro is fully adjustable and designed to fit most body types comfortably, from teens to seniors.",
  },
  {
    question: "Does it really help with back pain and posture improvement?",
    answer:
      "Thousands of users report significant reduction in back pain and noticeable posture improvement within 2–4 weeks of consistent use.",
  },
  {
    question: "Does it have smart features like vibration alerts?",
    answer:
      "Yes, the Postura Pro+ model includes smart vibration reminders when you slouch.",
  },
  {
    question: "How will I be notified when the product is back in stock?",
    answer:
      "Just enter your email on the product page and we'll send you an instant notification the moment it's restocked!",
  },
];

const FAQSection = () => {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-gray-600 text-lg mb-12">
          Enhance posture, mobility, and well-being effortlessly with Postura
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Disclosure
              key={index}
              as="div"
              className="bg-white rounded-2xl shadow-sm"
            >
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex w-full justify-between items-center px-6 py-5 text-left text-gray-800 font-medium text-lg hover:bg-teal-50 transition rounded-2xl focus:outline-none">
                    <span>{faq.question}</span>
                    <ChevronDownIcon
                      className={`${
                        open ? "rotate-180 transform" : ""
                      } h-6 w-6 text-teal-600 transition-transform`}
                    />
                  </Disclosure.Button>

                  <Disclosure.Panel className="px-6 pb-6 text-gray-600 leading-relaxed bg-teal-50/30 rounded-b-2xl">
                    {faq.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>

        {/* See More Button */}
        <div className="mt-12">
          <button className="inline-flex items-center gap-3 bg-lime-400 hover:bg-lime-500 text-black font-semibold px-8 py-4 rounded-full transition shadow-lg">
            See More FAQs
            <span className="bg-black text-white rounded-full p-2">
              <ChevronDownIcon className="h-5 w-5 rotate-[-90deg]" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
