import { useState } from "react";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Subscribed:", email);
      setEmail("");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section
      className="mx-auto my-16 max-w-4xl rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-xl"
      aria-labelledby="newsletter-heading"
    >
      <p
        id="newsletter-heading"
        className="text-2xl font-medium text-gray-800"
      >
        Subscribe now & get 20% off!
      </p>

      <p className="mt-3 text-sm text-gray-400">
        Sign up for our newsletter to receive updates and exclusive offers.
      </p>

      <form
        className="mt-6 flex justify-center"
        onSubmit={onSubmitHandler}
        noValidate
      >
        <label htmlFor="email" className="sr-only">
          Email address
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={isSubmitting}
          className="w-64 rounded-l-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-r-xl bg-black px-4 py-2 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-600"
        >
          {isSubmitting ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </section>
  );
};

export default NewsLetterBox;
