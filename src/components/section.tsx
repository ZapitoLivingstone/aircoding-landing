"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Section({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <section id={id} className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
