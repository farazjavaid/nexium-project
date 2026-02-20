"use client";

import { useState } from "react";
import { contactService } from "@/lib/services/contactService";

export default function ContactFormSection() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields");
      return;
    }

    if (!agreed) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    setLoading(true);

    try {
      await contactService.create(formData);
      alert("Thank you for contacting us! We will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
      setAgreed(false);
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      alert("Failed to submit contact form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full pt-20 lg:pt-28 pb-16 lg:pb-0 mb-0 lg:mb-[-140px] px-4 lg:px-20 bg-[#e7e5e5]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          <div className="flex flex-col justify-start pt-4">
            <p className="text-[#353638] font-montserrat font-normal text-[22px] lg:text-[28px] mb-10">Collaborate with us</p>
            <h2 className="block lg:hidden text-[26px] sm:text-[32px] text-[#353638] font-montserrat font-normal capitalize mb-8 leading-[1.15] tracking-[-0.8px]">
              Let&apos;s Build Something Great
            </h2>
            <h2 className="hidden lg:block text-[80px] text-[#353638] font-montserrat font-normal capitalize mb-8 leading-[1.15] tracking-[-0.8px]">
              Let&apos;s Build <br /> Something <br /> Great
            </h2>
            <p className="text-[#353638] font-montserrat font-normal text-[18px] lg:text-[22px] leading-[1.6] max-w-lg">
              Have a project in mind or need product support? Reach out and our experts will respond shortly.
            </p>
          </div>

          <div className="bg-white px-6 lg:px-10 pt-10 lg:pt-[60px] pb-10 lg:pb-[80px] mt-8 lg:mt-40 z-9">
            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-10">
              <div className="border-b-2 border-[#e4e4e4] pb-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full font-montserrat text-[18px] lg:text-[22px] text-[#a2a2a2] bg-transparent border-none outline-none placeholder:text-[#a2a2a2]"
                  required
                />
              </div>
              <div className="border-b-2 border-[#e4e4e4] pb-3">
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full font-montserrat text-[18px] lg:text-[22px] text-[#a2a2a2] bg-transparent border-none outline-none placeholder:text-[#a2a2a2]"
                  required
                />
              </div>
              <div className="border-b-2 border-[#e4e4e4] pb-3">
                <textarea
                  placeholder="Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full font-montserrat text-[18px] lg:text-[22px] text-[#a2a2a2] bg-transparent border-none outline-none resize-none placeholder:text-[#a2a2a2]"
                  required
                />
              </div>
              <div className="flex items-center gap-4 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-[13px] h-[13px] rounded border-[#767676]"
                />
                <label htmlFor="terms" className="text-[#353638] font-montserrat font-normal text-[13px]">
                  I agree with <span className="underline font-bold">Terms & Conditions</span>
                </label>
              </div>

              <div className="pt-8 lg:pt-20">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#267275] text-white px-16 py-5 text-[14px] tracking-[4.2px] uppercase font-montserrat font-bold hover:bg-[#1e5a5d] transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
