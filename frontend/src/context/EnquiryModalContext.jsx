import React, { createContext, useContext, useState } from 'react';

export const EnquiryModalContext = createContext(null);

export const EnquiryModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedDetailsCourse, setSelectedDetailsCourse] = useState(null);

  const openModal = (programData = null) => {
    if (typeof programData === 'string') {
      setSelectedProgram({ title: programData, category: 'Professional Program' });
    } else {
      setSelectedProgram(programData);
    }
    setIsOpen(true);
    setIsDetailsOpen(false); // Close details modal if open
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedProgram(null);
  };

  const openDetailsModal = (courseData) => {
    setSelectedDetailsCourse(courseData);
    setIsDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsOpen(false);
    setSelectedDetailsCourse(null);
  };

  return (
    <EnquiryModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        selectedProgram,
        isDetailsOpen,
        openDetailsModal,
        closeDetailsModal,
        selectedDetailsCourse
      }}
    >
      {children}
    </EnquiryModalContext.Provider>
  );
};

export const useEnquiryModal = () => {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error('useEnquiryModal must be used within an EnquiryModalProvider');
  }
  return context;
};
