
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react";

const FooterSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];
  
  const quickLinks = [
    { label: "About Us", href: "#" },
    { label: "How It Works", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Success Stories", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ];
  
  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Disclaimer", href: "#" },
  ];
  
  return (
    <footer className="bg-muted/30 backdrop-blur-sm relative z-10">
      <div className="absolute inset-0 bg-astro-grid opacity-5 z-0"></div>
      
      <div className="container mx-auto py-16 px-6 md:px-10 relative z-10">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-button-gradient animate-pulse-slow"></div>
              <h3 className="text-xl font-bold text-gradient">InvestIQ</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Revolutionizing investment strategies with AI-powered insights and data-driven decision making.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                >
                  <a 
                    href={link.href} 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center group"
                  >
                    <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden mr-0 group-hover:mr-1" />
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-base font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex items-start"
              >
                <Mail className="h-4 w-4 mt-1 mr-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">support@investiq.ai</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex items-start"
              >
                <Phone className="h-4 w-4 mt-1 mr-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="flex items-start"
              >
                <MapPin className="h-4 w-4 mt-1 mr-3 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  888 Financial District<br />
                  San Francisco, CA 94111
                </span>
              </motion.li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-base font-bold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest investment insights and AI updates.
            </p>
            <form className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full h-10 rounded-md bg-white/5 border border-white/10 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 h-8 px-3 rounded-md bg-primary/80 hover:bg-primary transition-colors text-xs font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
        
        {/* Legal Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-xs text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} InvestIQ. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
