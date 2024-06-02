"use client";

import React, { useEffect, useRef } from "react";
import { sendEmail } from "@/ui/Contact/SendEmailAction";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {}, []);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formElement = form.current;
    if (!formElement) return;
    await sendEmail(formElement);
    formElement.reset();
  };

  return (
    <form
      className="w-10/12 md:w-7/12 h-max mt-6 md:mt-0"
      onSubmit={onSubmit}
      ref={form}
    >
      <input
        className="w-full h-12 border border-gray-700 text-gray-700 p-5 text-sm outline-none"
        type="text"
        placeholder="Name"
        name="name"
      />
      <input
        className="w-full h-12 border border-gray-700 border-t-0 text-gray-700 p-5 text-sm outline-none"
        type="text"
        placeholder="Email"
        name="email"
      />
      <div>
        <textarea
          className="w-full h-36 border border-gray-700 border-t-0 text-gray-700 p-5 text-sm outline-none break-words resize-y"
          name="message"
          placeholder="Message"
        />
      </div>
      <input
        className="w-full h-auto md:h-12 bg-customblue-300 md:bg-transparent md:hover:bg-customblue-300 transition text-white md:text-gray-700 text-md md:text-sm md:hover:text-white font-bold md:border md:border-customblue-300 mt-6 p-4 outline-none cursor-pointer"
        type="submit"
        value="Send Message"
      />
    </form>
  );
};

export default ContactForm;
