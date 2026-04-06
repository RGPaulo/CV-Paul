import { useState, useEffect } from "react";
import { Menu, X, Download, Mail, ChevronDown } from "lucide-react";
import { cvData } from "./data";
import ChatBot from "./components/ChatBot";
import "./App.css";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "experience", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Accueil" },
    { id: "experience", label: "Parcours" },
    { id: "skills", label: "Compétences" },
    { id: "projects", label: "Projets" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border z-50">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="font-bold text-xl text-primary cursor-pointer" 
            onClick={() => scrollToSection("home")}
          >
            PC
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors relative ${
                  activeSection === item.id
                    ? "text-primary"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">

            <a
              href={cvData.cvPdfUrl}
              download="Paul_Chauviere_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <Download size={16} />
              CV
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="container max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-2 px-4 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={cvData.cvPdfUrl}
                download="Paul_Chauviere_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium w-full justify-center"
              >
                <Download size={16} />
                Télécharger CV
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-background via-background to-secondary/50">
          <div className="w-full max-w-4xl mx-auto text-center animate-fade-in-up">
            {/* Profile Image */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/50 rounded-full blur-2xl opacity-30" />
                <div className="relative w-full h-full rounded-full border-4 border-primary overflow-hidden bg-card flex items-center justify-center">
                  {cvData.profileImage ? (
                    <img
                      src={cvData.profileImage}
                      alt={cvData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary/20">PC</div>
                  )}
                </div>
              </div>
            </div>

            {/* Name and Title */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-foreground">
              {cvData.name}
            </h1>
            {/* Bio */}
            <p className="text-sm sm:text-base md:text-lg text-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              {cvData.profile}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <a
                href={`mailto:${cvData.contact.email}`}
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold text-sm sm:text-base"
              >
                Me contacter
              </a>
              <a
                href={cvData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors font-semibold text-sm sm:text-base"
              >
                LinkedIn
              </a>
            </div>

            {/* Chatbot CTA */}
            <div className="mt-12 p-6 bg-card border border-border rounded-lg max-w-2xl mx-auto animate-fade-in-up hover:shadow-lg transition-shadow">
              <p className="text-sm sm:text-base text-foreground">
                💬 <span className="font-semibold">Vous avez des questions ?</span> Testez mon assistant IA en bas à droite pour en savoir plus sur mon profil !
              </p>
            </div>

            {/* Scroll Down Indicator */}
            <button
              onClick={() => scrollToSection("experience")}
              className="mx-auto flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-bounce mt-12"
            >
              <span className="text-xs sm:text-sm">Découvrir mon parcours</span>
              <ChevronDown size={24} />
            </button>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-4 bg-card">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Parcours Professionnel</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-12">
              Mes expériences professionnelles et stages qui m'ont permis de développer mes compétences.
            </p>

            <div className="space-y-8">
              {cvData.experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className="bg-background border border-border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">{exp.title}</h3>
                      <p className="text-base sm:text-lg text-primary font-semibold">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                      📅 {exp.period}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4">
                    📍 {exp.location}
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((desc, idx) => (
                      <li key={idx} className="flex gap-3 text-sm sm:text-base text-foreground/80">
                        <span className="text-primary mt-1 flex-shrink-0">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm rounded-full">
                    {exp.duration} mois
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Compétences</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-12">
              Un aperçu des compétences que j'ai développées au cours de mes expériences.
            </p>

            {/* Skill Categories */}
            <div className="space-y-8 mb-12">
              {cvData.skills.map((category, idx) => (
                <div
                  key={idx}
                  className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <h3 className="text-lg sm:text-xl font-bold mb-6 text-foreground">{category.category}</h3>
                  <div className="flex flex-wrap gap-3">
                    {category.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="px-3 sm:px-4 py-2 bg-primary/10 text-primary text-xs sm:text-sm rounded-lg hover:bg-primary/20 transition-colors border border-primary/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="bg-card border border-border rounded-lg p-4 sm:p-8 animate-fade-in-up mb-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-lg">
                  🌍
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Langues</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {cvData.languages.map((lang, idx) => (
                  <div
                    key={idx}
                    className="bg-background border border-primary/20 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h4 className="font-bold text-foreground text-base sm:text-lg mb-2">{lang.name}</h4>
                    <p className="text-primary text-sm sm:text-base font-semibold">{lang.level}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="bg-card border border-border rounded-lg p-4 sm:p-8 animate-fade-in-up">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground">Centres d'Intérêt</h3>
              <div className="flex flex-wrap gap-3">
                {cvData.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 sm:px-4 py-2 bg-primary/10 text-primary text-xs sm:text-sm rounded-lg hover:bg-primary/20 transition-colors border border-primary/20"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 bg-card">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Projets & Réalisations</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-12">
              Les projets et initiatives que j'ai menés avec succès.
            </p>

            <div className="space-y-8">
              {cvData.projects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-background border border-border rounded-lg p-4 sm:p-8 hover:shadow-lg transition-shadow animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg flex-shrink-0">
                      {project.id === 1 ? "📚" : "🏆"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{project.title}</h3>
                      {project.subtitle && (
                        <p className="text-sm sm:text-base text-primary font-semibold mb-3 italic">{project.subtitle}</p>
                      )}
                      <p className="text-sm sm:text-base text-foreground/80 mb-4">{project.description}</p>
                    </div>
                  </div>

                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <p className="text-xs sm:text-sm font-semibold text-muted-foreground mb-3">Points clés :</p>
                      <div className="flex flex-wrap gap-2">
                        {project.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="px-2 sm:px-3 py-1 bg-primary/10 text-primary text-xs sm:text-sm rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="bg-card border border-border rounded-lg p-6 sm:p-8 animate-fade-in-up hover:shadow-lg transition-shadow">
              <p className="text-sm sm:text-base text-foreground">
                💫 <span className="font-semibold">Vous souhaitez en savoir plus sur mes projets ?</span> N'hésitez pas à me contacter pour discuter de mes réalisations et de comment je pourrais contribuer à vos projets.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">Contact</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-12">
              Vous avez une question ou une opportunité ? N'hésitez pas à me contacter.
            </p>

            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              {/* Contact Information */}
              <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg h-fit flex-shrink-0">
                    ✉️
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Email</h3>
                    <a
                      href={`mailto:${cvData.contact.email}`}
                      className="text-primary hover:text-primary/80 transition-colors text-sm sm:text-base break-all"
                    >
                      {cvData.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg h-fit flex-shrink-0">
                    📱
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Téléphone</h3>
                    <a
                      href={`tel:${cvData.contact.phone}`}
                      className="text-primary hover:text-primary/80 transition-colors text-sm sm:text-base"
                    >
                      {cvData.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg h-fit flex-shrink-0">
                    📍
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">Localisation</h3>
                    <p className="text-foreground/80 text-sm sm:text-base">{cvData.contact.location}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg h-fit flex-shrink-0">
                    🔗
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 text-sm sm:text-base">LinkedIn</h3>
                    <a
                      href={cvData.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors text-sm sm:text-base break-all"
                    >
                      Profil LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="animate-fade-in-up">
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    const subject = formData.get('subject');
                    const message = formData.get('message');
                    
                    try {
                      // Envoyer via l'API backend
                      const response = await fetch('/api/send-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: name,
                          email: email,
                          subject: subject,
                          message: message
                        })
                      });
                      
                      if (response.ok) {
                        alert('Merci pour votre message ! Je vous répondrai dès que possible.');
                        e.target.reset();
                      } else {
                        const errorData = await response.json();
                        alert('Erreur lors de l\'envoi: ' + (errorData.error || 'Veuillez réessayer.'));
                      }
                    } catch (error) {
                      console.error('Erreur:', error);
                      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Nom</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Votre email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Sujet</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Sujet de votre message"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Votre message"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Chatbot Floating Button */}
      <ChatBot />

      {/* Footer */}
      <footer className="bg-card text-card-foreground py-8 px-4 border-t border-border">
        <div className="container max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground mb-4">
            © 2026 Paul Chauvière. Tous droits réservés.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={cvData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors text-2xl"
            >
              🔗
            </a>
            <a
              href={`mailto:${cvData.contact.email}`}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
