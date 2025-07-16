import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now just show a toast
    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }

    // Here you can add logic to send form data to backend or email service

    toast.success("Message sent successfully!");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="max-w-lg mx-auto  p-6 bg-white rounded shadow mt-30">
      <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Message"
          className="border px-3 py-2 rounded resize-none"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-zinc-950 text-white py-2 rounded hover:bg-zinc-800 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
