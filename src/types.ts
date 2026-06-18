export interface Personal {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  photo: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  link: string;
  image: string;
}

export interface ResumeData {
  personal: Personal;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
}
