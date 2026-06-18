import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { ResumeData } from './types';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import './App.css';

const initialData: ResumeData = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
    photo: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certificates: [],
};

export default function App() {
  const [data, setData] = useState<ResumeData>(initialData);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    const el = document.getElementById('resume-preview');
    if (!el) return;
    const canvas = await html2canvas(el, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');
  };

  const handleReset = () => setData(initialData);

  return (
    <div className="app-layout">
      <nav className="toolbar">
        <h1>Resume Builder</h1>
        <div className="toolbar-actions">
          <button onClick={handleExportPDF}>Export PDF</button>
          <button className="reset" onClick={handleReset}>Reset</button>
        </div>
      </nav>
      <div className="main-content" ref={previewRef}>
        <ResumeForm data={data} onChange={setData} />
        <ResumePreview data={data} />
      </div>
    </div>
  );
}
