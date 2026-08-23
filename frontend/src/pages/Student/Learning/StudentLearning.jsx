import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlayCircle,
  CheckCircle2,
  FileDown,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  ChevronDown
} from 'lucide-react';
import { mockCurriculumLessons } from '../../../data/studentMockData';
import './StudentLearning.css';

const StudentLearning = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(new Set(['les-102']));
  const [mobileCurriculumOpen, setMobileCurriculumOpen] = useState(true);

  const currentLesson = mockCurriculumLessons[currentIndex] || mockCurriculumLessons[0];

  const toggleComplete = (id) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleNext = () => {
    if (currentIndex < mockCurriculumLessons.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="learning-classroom-shell">
      {/* Top Header */}
      <div className="learning-top-header">
        <div>
          <span className="learning-course-tag">
            Course: AI Agentic Workflows & LangChain Architecture
          </span>
          <h1 className="learning-lesson-title">
            {currentLesson.title}
          </h1>
        </div>

        <button
          onClick={() => toggleComplete(currentLesson.id)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.55rem 1.15rem',
            backgroundColor: completedLessons.has(currentLesson.id) ? '#dcfce7' : '#1c1917',
            color: completedLessons.has(currentLesson.id) ? '#166534' : '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.82rem',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <CheckCircle2 size={16} />
          <span>{completedLessons.has(currentLesson.id) ? 'Completed' : 'Mark as Completed'}</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="learning-content-grid">
        {/* Left Col: Video Player & Lesson Notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Responsive 16:9 Video Box */}
          <div className="learning-video-container">
            <video
              controls
              src={currentLesson.videoUrl}
              poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
              className="learning-video-element"
            />
          </div>

          {/* Lesson Overview & Download Assets */}
          <div className="learning-details-box">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem' }}>
              Lesson Overview
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#44403c', lineHeight: 1.5, marginBottom: '1.25rem' }}>
              {currentLesson.summary || 'In this session, explore real-world vector database querying, query reformulation with LLMs, and cosine similarity matching algorithms.'}
            </p>

            <h4 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1c1917', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Downloadable Lesson Assets:
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {currentLesson.resources?.map((file, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert(`Downloading asset: ${file}`); }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 0.85rem',
                    backgroundColor: '#efe9e3',
                    border: '0.0625rem solid #d9cfc7',
                    borderRadius: '0.375rem',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#1c1917',
                    textDecoration: 'none'
                  }}
                >
                  <FileDown size={14} color="#8b7050" />
                  <span>{file}</span>
                </a>
              )) || <span style={{ fontSize: '0.75rem', color: '#78716c' }}>No additional downloads for this lesson.</span>}
            </div>

            {/* Next / Previous Lesson Controls */}
            <div className="learning-nav-controls">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="btn-lesson-nav"
              >
                <ArrowLeft size={15} />
                <span>Previous Lesson</span>
              </button>

              <span style={{ fontSize: '0.75rem', color: '#78716c', fontWeight: 600 }}>
                Lesson {currentIndex + 1} of {mockCurriculumLessons.length}
              </span>

              <button
                onClick={handleNext}
                disabled={currentIndex === mockCurriculumLessons.length - 1}
                className="btn-lesson-nav"
              >
                <span>Next Lesson</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Curriculum Playlist */}
        <div className="curriculum-sidebar-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>
              Module Curriculum ({mockCurriculumLessons.length})
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {mockCurriculumLessons.map((les, idx) => {
              const isSelected = currentIndex === idx;
              const isDone = completedLessons.has(les.id);

              return (
                <div
                  key={les.id}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    padding: '0.75rem 0.85rem',
                    borderRadius: '0.5rem',
                    backgroundColor: isSelected ? '#1c1917' : isDone ? '#f9f8f6' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#1c1917',
                    border: '0.0625rem solid',
                    borderColor: isSelected ? '#1c1917' : '#d9cfc7',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.65rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ marginTop: '0.15rem' }}>
                    {isDone ? (
                      <CheckCircle2 size={16} color={isSelected ? '#c9b59c' : '#16a34a'} />
                    ) : (
                      <PlayCircle size={16} color={isSelected ? '#c9b59c' : '#78716c'} />
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.3 }}>
                      {les.title}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: isSelected ? '#d6d3d1' : '#78716c' }}>
                      {les.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLearning;
