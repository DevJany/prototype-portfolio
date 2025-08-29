import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Sun,
  Moon,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import './App.css';

// Importar imagens
import profileImage from './assets/profile-picture.jpg';
import projectImage1 from './assets/SLKhT3lkI13B.png';
import projectImage2 from './assets/1loRC2YNEpsQ.jpg';
import projectImage3 from './assets/PHZ7nMxktceA.png';

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fullText = 'Janyelle Oliveira';

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animação de digitação melhorada
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting && currentIndex < fullText.length) {
        setTypingText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (!isDeleting && currentIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentIndex > 0) {
        setTypingText(fullText.slice(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setTimeout(() => setCurrentIndex(0), 500);
      }
    }, isDeleting ? 100 : 150);

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, fullText]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'educacao', label: 'Educação' },
    { id: 'experiencia', label: 'Experiência' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'skills', label: 'Skills' },
    { id: 'contato', label: 'Contato' }
  ];

  const hardSkills = [
    'Java', 'Spring Boot', 'Python', 'Django', 'JavaScript', 'TypeScript',
    'Angular', 'HTML', 'CSS', 'PostgreSQL', 'MongoDB', 'MySQL',
    'Docker', 'Git', 'GitHub', 'APIs REST', 'IA Generativa', 'API Rest', 'Figma'
  ];

  const softSkills = [
    'Trabalho em Equipe', 'Comunicação Eficaz', 'Resolução de Problemas',
    'Adaptabilidade', 'Pensamento Analítico', 'Organização', 'Liderança'
  ];

  const projects = [
    {
      title: 'Sistema de Agendamento FCJA',
      description: 'Aplicativo mobile para gerenciamento de visitas e pesquisas em instituições públicas, desenvolvido com foco em usabilidade e acessibilidade.',
      image: projectImage1,
      technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Express', 'JWT'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Interface Mobile Responsiva',
      description: 'Desenvolvimento de interfaces mobile com design moderno e experiência do usuário otimizada para diferentes dispositivos.',
      image: projectImage2,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'Mobile First'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Prototipação e Wireframes',
      description: 'Criação de protótipos e wireframes utilizando Figma, aplicando princípios de UX/UI Design e metodologias ágeis.',
      image: projectImage3,
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Miro'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="font-gothic-title text-2xl font-bold text-primary">
            Jany.
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 text-sm font-medium hover:text-primary transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center section-spacing">
        {/* Background Animado */}
        <div className="animated-background">
          <div className="geometric-shape"></div>
          <div className="geometric-shape"></div>
          <div className="geometric-shape"></div>
          <div className="geometric-shape"></div>
          <div className="geometric-shape"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-lg text-muted-readable mb-4">Olá, eu sou</p>
          
          <h1 className="font-gothic-title text-6xl md:text-8xl font-bold mb-6 gothic-ornament">
            <span className="inline-block min-h-[1.2em]">
              {typingText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          
          <h2 className="font-gothic-subtitle text-2xl md:text-3xl text-primary mb-8">
            Desenvolvedora Full Stack
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              className="blur-button text-white px-8 py-3"
              onClick={() => scrollToSection('projetos')}
            >
              Ver Projetos
            </Button>
            <Button 
              variant="outline" 
              className="glass-effect px-8 py-3"
              onClick={() => scrollToSection('contato')}
            >
              Entre em Contato
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="scroll-indicator"
          onClick={() => scrollToSection('sobre')}
        >
          <ChevronDown className="h-6 w-6 text-primary" />
        </div>
      </section>

      {/* Sobre Mim */}
      <section id="sobre" className="section-spacing">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="font-gothic-title text-4xl md:text-5xl font-bold mb-6 gothic-ornament">
                Sobre Mim
              </h2>
              <p className="text-lg text-readable mb-6 leading-relaxed">
                Sou uma desenvolvedora Full Stack apaixonada por criar soluções digitais inovadoras e eficientes. 
                Com experiência em desenvolvimento web e mobile, combino conhecimento técnico sólido com 
                criatividade para entregar projetos que fazem a diferença.
              </p>
              <p className="text-lg text-readable mb-8 leading-relaxed">
                Especializada em tecnologias modernas como Java, Spring Boot, Python, Django, JavaScript, 
                TypeScript e integração com Inteligência Artificial Generativa, sempre busco aprender novas ferramentas e metodologias para oferecer as melhores 
                soluções.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-readable">João Pessoa, PB - Brasil</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-readable">(83) 98675-0297</span>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <img 
                  src={profileImage} 
                  alt="Janyelle Oliveira" 
                  className="w-80 h-80 object-cover rounded-2xl gothic-hover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educação */}
      <section id="educacao" className="section-spacing bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="font-gothic-title text-4xl md:text-5xl font-bold text-center mb-12 gothic-ornament">
            Educação
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="glass-effect gothic-hover">
              <CardContent className="p-6">
                <h3 className="font-gothic-bold text-xl font-bold mb-2 text-primary">
                  Engenharia de Software
                </h3>
                <p className="text-muted-readable mb-2">UNINTER</p>
                <p className="text-sm text-muted-readable mb-4">Março de 2023 - Em andamento</p>
                <p className="text-readable">
                  Formação focada em desenvolvimento de software, engenharia de sistemas, 
                  arquitetura de software e metodologias ágeis.
                </p>
              </CardContent>
            </Card>
            
            <Card className="glass-effect gothic-hover">
              <CardContent className="p-6">
                <h3 className="font-gothic-bold text-xl font-bold mb-2 text-primary">
                  Análise e Desenvolvimento de Sistemas
                </h3>
                <p className="text-muted-readable mb-2">UEPB</p>
                <p className="text-sm text-muted-readable mb-4">Agosto de 2023 - Junho de 2025</p>
                <p className="text-readable">
                  Tecnólogo com foco em desenvolvimento de sistemas, banco de dados, 
                  programação web e análise de requisitos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section-spacing">
        <div className="container mx-auto px-4">
          <h2 className="font-gothic-title text-4xl md:text-5xl font-bold text-center mb-12 gothic-ornament">
            Habilidades
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="font-gothic-bold text-2xl font-bold mb-6 text-primary">Hard Skills</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {hardSkills.map((skill, index) => (
                  <Card key={index} className="glass-effect gothic-hover">
                    <CardContent className="p-4 text-center">
                      <span className="text-sm font-medium text-readable">{skill}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-gothic-bold text-2xl font-bold mb-6 text-primary">Soft Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {softSkills.map((skill, index) => (
                  <Card key={index} className="glass-effect gothic-hover">
                    <CardContent className="p-4 text-center">
                      <span className="text-sm font-medium text-readable">{skill}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experiência Profissional */}
      <section id="experiencia" className="section-spacing bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="font-gothic-title text-4xl md:text-5xl font-bold text-center mb-12 gothic-ornament">
            Experiência Profissional
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="timeline">
              <div className="timeline-item">
                <Card className="glass-effect gothic-hover">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="font-gothic-bold text-2xl font-bold text-primary mb-2 md:mb-0">
                        Estagiária de Desenvolvimento
                      </h3>
                      <Badge variant="secondary" className="w-fit">
                        Nov 2024 - Fev 2025
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-readable font-medium">
                        Fundação Casa de José Américo
                      </span>
                      <span className="text-muted-readable"> - João Pessoa, PB</span>
                    </div>
                    
                    <p className="text-readable mb-6 leading-relaxed">
                      Desenvolvimento de soluções web focadas em UX/UI, implementação de metodologias ágeis 
                      e criação de interfaces acessíveis para sistemas institucionais.
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-readable">
                          Implementação de princípios de UX/UI Design para melhorar a experiência do usuário
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-readable">
                          Aplicação de metodologias ágeis (Scrum/Kanban) no desenvolvimento de projetos
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-readable">
                          Foco em acessibilidade web seguindo diretrizes WCAG para inclusão digital
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-gothic-bold text-lg font-semibold mb-3 text-primary">
                        Tecnologias utilizadas:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Trello', 'Figma', 'Git', 'Scrum'].map((tech) => (
                          <span key={tech} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projetos */}
      <section id="projetos" className="section-spacing">
        <div className="container mx-auto px-4">
          <h2 className="font-gothic-title text-4xl md:text-5xl font-bold text-center mb-12 gothic-ornament">
            Projetos
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Card key={index} className="glass-effect gothic-hover overflow-hidden p-0">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition duration-300 hover:grayscale"
                  />

                </div>
                <CardContent className="p-6">
                  <h3 className="font-gothic-bold text-xl font-bold mb-3 text-primary">
                    {project.title}
                  </h3>
                  <p className="text-readable mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="tech-tag text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button size="sm" className="blur-button text-white flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Acessar Projeto
                    </Button>
                    <Button size="sm" variant="outline" className="glass-effect flex-1">
                      <Github className="h-4 w-4 mr-2" />
                      Ver no GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="section-spacing bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="font-gothic-title text-4xl md:text-5xl font-bold text-center mb-12 gothic-ornament">
            Contato
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="contact-container text-center">
              <p className="text-xl text-readable mb-8 leading-relaxed">
                Ficou interessado(a) no meu trabalho? Entre em contato...
              </p>
              
              <div className="mb-8">
                <p className="text-2xl font-gothic-bold text-primary mb-6">
                  janyelleoliveira30@gmail.com
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="blur-button text-white px-8 py-3"
                  onClick={() => window.open('mailto:janyelleoliveira30@gmail.com')}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Enviar Email
                </Button>
                <Button 
                  variant="outline" 
                  className="glass-effect px-8 py-3"
                  onClick={() => window.open('https://www.linkedin.com/in/janyelle/', '_blank')}
                >
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </Button>
                <Button 
                  variant="outline" 
                  className="glass-effect px-8 py-3"
                  onClick={() => window.open('https://github.com/devjany', '_blank')}
                >
                  <Github className="h-5 w-5 mr-2" />
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-readable">
            © 2025 Janyelle Oliveira. Desenvolvido com React e Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

