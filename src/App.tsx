import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingHero } from './components/LandingHero';
import { PersonaSelector } from './components/PersonaSelector';
import { QuestionStep } from './components/QuestionStep';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { ProcessingStep } from './components/ProcessingStep';
import { ResultReport } from './components/ResultReport';
import { AdminPanel } from './components/AdminPanel';
import { QUESTIONS_BANK } from './data/questions';
import { storageService } from './services/storageService';
import { calculateDiagnosis } from './utils/calculator';
import {
  AnswerValue,
  AppScreen,
  DiagnosisResult,
  Persona,
  UserLead,
} from './types';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [persona, setPersona] = useState<Persona>('personal_trainer');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, { value: AnswerValue; score: number }>
  >({});
  const [capturedLead, setCapturedLead] = useState<UserLead | null>(null);
  const [currentDiagnosis, setCurrentDiagnosis] = useState<DiagnosisResult | null>(null);

  // Restart entire diagnostic
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCapturedLead(null);
    setCurrentDiagnosis(null);
    setScreen('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Start from Landing
  const handleStart = () => {
    setScreen('persona_select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Persona (Personal Trainer vs Nutricionista)
  const handleSelectPersona = (selected: Persona) => {
    setPersona(selected);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Answer
  const currentQuestion = QUESTIONS_BANK[currentQuestionIndex];
  const selectedAnswerValue = currentQuestion
    ? answers[currentQuestion.id]?.value
    : undefined;

  const handleSelectAnswer = (value: AnswerValue, score: number) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: { value, score },
    }));
  };

  // Next Question or proceed to Lead Capture
  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUESTIONS_BANK.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Completed all 20 questions -> Lead Capture
      setScreen('lead_capture');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Previous Question or back to Persona Selection
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setScreen('persona_select');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Submit Lead -> Proceed to Processing
  const handleLeadSubmit = (lead: UserLead) => {
    setCapturedLead(lead);
    setScreen('processing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Processing Completed -> Compute and Display Result
  const handleProcessingComplete = () => {
    if (!capturedLead) return;
    const result = calculateDiagnosis(capturedLead, answers);
    setCurrentDiagnosis(result);
    // Persist diagnosis in storage
    storageService.saveDiagnosis(result);
    setScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // View specific diagnosis detail from admin panel
  const handleViewDiagnosisFromAdmin = (diag: DiagnosisResult) => {
    setCurrentDiagnosis(diag);
    setScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressPercent = Math.round(
    ((currentQuestionIndex + 1) / QUESTIONS_BANK.length) * 100
  );

  return (
    <div className="min-h-screen bg-[#101111] text-[#E6E2DA] flex flex-col font-sans selection:bg-[#A6824A] selection:text-[#101111]">
      {/* Header */}
      <Header
        currentScreen={screen}
        onNavigateHome={() => setScreen('home')}
        onOpenAdmin={() => setScreen(screen === 'admin' ? 'home' : 'admin')}
        questionProgress={
          screen === 'quiz'
            ? {
                current: currentQuestionIndex + 1,
                total: QUESTIONS_BANK.length,
                percent: progressPercent,
              }
            : undefined
        }
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {screen === 'home' && <LandingHero onStart={handleStart} />}

        {screen === 'persona_select' && (
          <PersonaSelector
            onSelectPersona={handleSelectPersona}
            onBack={() => setScreen('home')}
          />
        )}

        {screen === 'quiz' && currentQuestion && (
          <QuestionStep
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={QUESTIONS_BANK.length}
            persona={persona}
            selectedAnswer={selectedAnswerValue}
            onSelectAnswer={handleSelectAnswer}
            onNext={handleNextQuestion}
            onPrev={handlePrevQuestion}
          />
        )}

        {screen === 'lead_capture' && (
          <LeadCaptureModal
            profession={persona}
            onSubmit={handleLeadSubmit}
            onBack={() => {
              setCurrentQuestionIndex(QUESTIONS_BANK.length - 1);
              setScreen('quiz');
            }}
          />
        )}

        {screen === 'processing' && (
          <ProcessingStep onComplete={handleProcessingComplete} />
        )}

        {screen === 'result' && currentDiagnosis && (
          <ResultReport
            diagnosis={currentDiagnosis}
            onRestart={handleRestart}
          />
        )}

        {screen === 'admin' && (
          <AdminPanel
            onBackToApp={() => setScreen('home')}
            onViewDiagnosisDetail={handleViewDiagnosisFromAdmin}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setScreen('admin')} />
    </div>
  );
}
