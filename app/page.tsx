"use client"
import React, {Suspense, lazy, useRef } from "react";
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Send, User, Briefcase, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

import emailjs from 'emailjs-com';


<link rel="preload" as="font" href="/fonts/your-font.woff2" type="font/woff2" crossOrigin="anonymous" />





  export default function Portfolio() {
    
    const [activeSection, setActiveSection] = useState("hero")
    const formRef = useRef<HTMLFormElement>(null);
    const ParticlesBackground = React.lazy(() => import('@/components/ParticlesBackground'))


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formRef.current) return;
    emailjs.sendForm(
    'service_96j7a7h',
    'template_9q8apvf',
    formRef.current,
    'AtW0nFvMhxHI-OFBk'
  ).then(
    (result) => {
      console.log('Success:', result.text);
      alert('Message sent!');
      formRef.current?.reset(); // clear form
    },
    (error) => {
      console.error('Error:', error.text);
      alert('Message failed to send.');

        return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <input type="text" name="name" placeholder="Your name" required className="border p-2 rounded" />
      <input type="email" name="email" placeholder="Your email" required className="border p-2 rounded" />
      <input type="email" name="to_email" value="solankibhavya74@gmail.com" hidden />

      <textarea name="message" placeholder="Your message" required className="border p-2 rounded" />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Send</button>
    </form>
  )}
  );
};
    

    useEffect(() => {
      const handleScroll = () => {
        const sections = ["hero", "about", "projects", "contact"]
        const scrollPosition = window.scrollY + 100

        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section)
              break
            }
          }
        }
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    };

   
  
   
  
  
 
  return (
     <section className="relative z-[10]">
    <div className="bg-dark text-light min-h-screen">
  
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold bg-gradient-to-r from-violet to-cyan bg-clip-text text-transparent"
            >
              Portfolio
            </motion.div>
            <div className="flex space-x-4 relative z-1" >
              {[
                { id: "hero", label: "Home", icon: User },
                { id: "about", label: "About", icon: User },
                { id: "projects", label: "Projects", icon: Briefcase },
                { id: "contact", label: "Contact", icon: MessageCircle },
              ].map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === id ? "text-violet bg-violet/10" : "text-muted hover:text-light"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>
      

      {/* Hero Section */}
      
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-br from-violet/5 to-cyan/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <motion.h1
              className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-light">Hello, I'm </span>
              <motion.span
  className="bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent"
  animate={{
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
  }}
  transition={{
    duration: 3,
    repeat: Number.POSITIVE_INFINITY,
    ease: "linear",
  }}
>
  Bhavya Solanki
</motion.span>

            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-muted mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
               Helping users, fixing systems, and freelancing my way through tech
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
             <Button
  onClick={() => scrollToSection("projects")}
  variant="outline"
  className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300"
>
  View My Work
</Button>

              <Button
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <a href="#about">
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <ChevronDown className="w-6 h-6 text-muted" />
        </motion.div>
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-dark to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-light">About </span>
              <span className="text-light">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-violet to-cyan mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-violet to-cyan rounded-2xl blur-xl opacity-20" />
                <Image
                  src="/Myimg.png"
                  alt="Profile"
                  width={400}
                  height={400}
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-light">Aspiring IT Support Engineer & Developer</h3>
              <p className="text-muted leading-relaxed">
                 I'm a recently graduated Diploma student in Information Technology (2025) with a
                 passion for problem-solving and building tech solutions. I hold a Google IT Support Professional Certificate
                 and have hands-on experience through internships in Django (Python) and Flutter.

              </p>
              <p className="text-muted leading-relaxed">
                 I enjoy diving into systems, troubleshooting issues, and creating clean, responsive 
                 user experiences. My goal is to grow as an IT Support Engineer while sharpening my development skills.
                 Always learning, always curious.

              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { label: "Projects Completed", value: "12+" },
                  { label: "Years Experience", value: "3+" },
                  { label: "Happy Clients", value: "20+" },
                  { label: "Technologies", value: "15+" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                  >
                    <div className="text-2xl font-bold text-white bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.value}
                    </div>

                    <div className="text-sm text-muted">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-light">Featured Projects</span>
              
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-violet to-cyan mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                description: "A full-stack e-commerce solution built with Next.js, Stripe, and PostgreSQL",
                image: "/placeholder.svg?height=300&width=400",
                tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
                github: "#",
                live: "#",
              },
              {
                title: "Task Management App",
                description: "A collaborative task management tool with real-time updates and team features",
                image: "/placeholder.svg?height=300&width=400",
                tech: ["React", "Node.js", "Socket.io", "MongoDB"],
                github: "#",
                live: "#",
              },
              {
                title: "Portfolio Website",
                description: "A responsive portfolio website with smooth animations and modern design",
                image: "/placeholder.svg?height=300&width=400",
                tech: ["React", "Framer Motion", "Tailwind CSS"],
                github: "#",
                live: "#",
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-violet/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet/10 to-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                </div>

                <div className="relative p-6">
                  <h3 className="text-xl font-bold text-light mb-2 group-hover:text-violet transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-gray-800 text-cyan rounded-full border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 text-muted hover:text-violet transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Code</span>
                    </motion.a>
                    <motion.a
                      href={project.live}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 text-muted hover:text-cyan transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-dark to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-light">Get In Touch</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-violet to-cyan mx-auto rounded-full" />
            <p className="text-muted mt-4 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project and create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-light mb-6">Let's Connect</h3>
                <p className="text-muted leading-relaxed mb-8">
                  I'm always interested in hearing about new opportunities and exciting projects. Whether you have a
                  question or just want to say hi, feel free to reach out!
                </p>
              </div>

              <div className="space-y-6">
                
                {[
                  { icon: Mail, label: "Email", value: "solankibhavya74@gmail.com", href: "mailto:solankibhavya74@gmail.com" },
                  { icon: Github, label: "GitHub", value: "@bhavya", href: "https://github.com/bhavyaa-s-lnk" },
                  { icon: Linkedin, label: "LinkedIn", value: "Bhavya Solanki", href: "https://linkedin.com/in/bhavyaa-s-lnk" },
                ].map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-violet/50 transition-all duration-300 group"
                  >
                    <contact.icon className="w-6 h-6 text-violet group-hover:text-cyan transition-colors" />
                    <div>
                      <div className="text-light font-medium">{contact.label}</div>
                      <div className="text-muted">{contact.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
            

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 bg-gray-900 p-8 rounded-2xl border border-gray-800">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-light font-medium mb-2">Name</label>
                    <Input
                      name="name"
                      className="bg-gray-800 border-gray-700 text-light focus:border-violet focus:ring-violet"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-light font-medium mb-2">Email</label>
                    <Input
                      name="email"
                      type="email"
                      className="bg-gray-800 border-gray-700 text-light focus:border-violet focus:ring-violet"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-light font-medium mb-2">Subject</label>
                  <Input
                    name="inquiry"
                    className="bg-gray-800 border-gray-700 text-light focus:border-violet focus:ring-violet"
                    placeholder="Project inquiry"
                    required
                  />
                </div>

                <div>
                  <label className="block text-light font-medium mb-2">Message</label>
                  <Textarea
                    name="message"
                    rows={5}
                    className="bg-gray-800 border-gray-700 text-light focus:border-violet focus:ring-violet resize-none"
                    placeholder="Tell me about your project..."
                    required  
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-violet to-cyan hover:from-violet/80 hover:to-cyan/80 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
         </section>
    

      {/* Footer */}
      <footer className="py-8 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-muted">© 2025 Bhavya Solanki. Built with Next.js, Tailwind CSS, and Framer Motion.</p>
          </div>
        </div>
      </footer>
    </div></section>
  )
}
