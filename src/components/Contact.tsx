import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { motion, useInView, AnimatePresence } from "framer-motion";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ mode: "onTouched" });

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const ariaLiveRef = useRef<HTMLDivElement | null>(null);

  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      toast({
        title: "reCAPTCHA required",
        description: "Please confirm you're not a bot.",
        variant: "destructive",
      });
      return;
    }

    try {
      await emailjs.send(
        "service_2cclxbm",
        "template_yn3glut",
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out — I’ll respond within 3 business days.",
        variant: "success",
      });

      reset();
      recaptchaRef.current?.reset();
      setShowSuccess(true);
      if (ariaLiveRef.current) {
        ariaLiveRef.current.innerText = "Message sent successfully!";
      }

      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Failed to send message",
        description: "Please try again or email me directly: info@phils-portfolio.co.uk",
        variant: "destructive",
      });

      if (ariaLiveRef.current) {
        ariaLiveRef.current.innerText = "There was an error sending the message.";
      }
    }
  };

  const handleValidationErrors = () => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast({
        title: "Form error",
        description: String(firstError.message),
        variant: "info",
      });
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="contact"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.3 } },
        hidden: {},
      }}
      aria-labelledby="contact-heading"
    >
      <div
        ref={ariaLiveRef}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      />

      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-teal-100/30 to-blue-100/20 rounded-full blur-3xl opacity-60"
        animate={{ scale: isInView ? 1 : 0.8, opacity: isInView ? 0.6 : 0 }}
        transition={{ duration: 1 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-cyan-100/40 to-teal-100/30 rounded-full blur-3xl opacity-50"
        animate={{ scale: isInView ? 1 : 0.8, opacity: isInView ? 0.5 : 0 }}
        transition={{ duration: 1 }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16">
          <h2
            id="contact-heading"
            className="text-4xl sm:text-5xl font-bold font-[Poppins] text-gray-800"
          >
            Let's Talk
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            className="space-y-10"
            variants={{
              hidden: { x: -50, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: { type: "spring", duration: 1 },
              },
            }}
          >
            <p className="text-lg text-gray-600 font-[Inter]">
              Have a project in mind? I’d love to hear about it. Use the form or reach out directly.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-teal-600 text-white rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Location</p>
                  <p className="text-gray-600">St. Albans, Hertfordshire, UK</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-teal-600 text-white rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Email</p>
                  <p className="text-gray-600">info@phils-portfolio.co.uk</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 border rounded-xl">
              <h4 className="font-semibold mb-2 font-[Poppins] text-gray-800">
                Why Work With Me?
              </h4>
              <ul className="space-y-1 text-sm text-gray-700 font-[Inter]">
                <li>✓ 5+ years frontend experience</li>
                <li>✓ Fast turnaround & ongoing support</li>
                <li>✓ Mobile-first, SEO-friendly builds</li>
              </ul>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit(onSubmit, handleValidationErrors)}
            className="bg-white rounded-2xl p-8 shadow-md border border-gray-100"
            variants={{
              hidden: { x: 50, opacity: 0 },
              visible: {
                x: 0,
                opacity: 1,
                transition: { type: "spring", duration: 1, delay: 0.2 },
              },
            }}
          >
            <div className="space-y-6">
              {["name", "email", "subject"].map((field) => (
                <div className="relative z-0 w-full group" key={field}>
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    {...register(field as keyof FormData, {
                      required: `${field[0].toUpperCase() + field.slice(1)} is required`,
                    })}
                    placeholder=" "
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pt-4 pb-2.5 text-sm text-gray-900 focus:border-yellow-400 focus:outline-none focus:ring-0"
                  />
                  <label
                    htmlFor={field}
                    className="absolute top-2 left-0 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-200 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-yellow-600"
                  >
                    {field[0].toUpperCase() + field.slice(1)}
                  </label>
                </div>
              ))}

              <div className="relative z-0 w-full group">
                <textarea
                  id="message"
                  rows={5}
                  {...register("message", {
                    required: "Message is required",
                  })}
                  placeholder=" "
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 pt-4 pb-2.5 text-sm text-gray-900 focus:border-yellow-400 focus:outline-none focus:ring-0"
                />
                <label
                  htmlFor="message"
                  className="absolute top-2 left-0 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-200 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-yellow-600"
                >
                  Message
                </label>
              </div>

              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full font-semibold transition-all hover:scale-[1.01] shadow-lg bg-yellow-500 hover:bg-yellow-600 text-gray-900"
              >
                {isSubmitting ? "Sending..." : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center text-green-600 gap-2 text-sm font-medium mt-4"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Message sent successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;