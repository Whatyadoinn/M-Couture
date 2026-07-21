import { motion } from "framer-motion";
import { InstagramIcon } from "./SocialIcons";

export default function InstagramFloatingButton() {
  return (
    <motion.a
      href="https://www.instagram.com/m_couture_by_minkynarang/"
      target="_blank"
      rel="noreferrer"
      aria-label="Follow us on Instagram"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.6 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-[88px] right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-lg"
    >
      <InstagramIcon size={26} className="text-white" />
    </motion.a>
  );
}
