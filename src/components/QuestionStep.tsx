import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { ANSWER_OPTIONS } from '../data/questions';
import { DIMENSIONS_META } from '../data/dimensions';
import { AnswerValue, Persona, Question } from '../types';

interface QuestionStepProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  persona: Persona;
  selectedAnswer?: AnswerValue;
  onSelectAnswer: (value: AnswerValue, score: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const QuestionStep: React.FC<QuestionStepProps> = ({
  question,
  currentIndex,
  totalQuestions,
  persona,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  onPrev,
}) => {
  const currentDimension = DIMENSIONS_META[question.dimension];
  const questionNumber = currentIndex + 1;
  const progressPercent = Math.round((questionNumber / totalQuestions) * 100);
  const questionText = question.questionText[persona];
  const contextNote = question.contextNote?.[persona];

  // Optional keyboard navigation (1-5 for options, Enter for next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        const opt = ANSWER_OPTIONS[idx];
        if (opt) {
          onSelectAnswer(opt.value, opt.score);
        }
      } else if (e.key === 'Enter' && selectedAnswer) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAnswer, onSelectAnswer, onNext]);

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-[#101111] text-[#E6E2DA] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Meta & Fine Progress Bar */}
      <div className="mx-auto w-full max-w-3xl space-y-4">
        {/* Top Header Row */}
        <div className="flex items-center justify-between text-xs tracking-widest uppercase">
          <button
            onClick={onPrev}
            className="inline-flex items-center gap-1.5 text-[#E6E2DA]/60 hover:text-[#A6824A] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar</span>
          </button>

          <div className="flex items-center gap-2 text-[#A6824A]">
            <span className="font-serif font-bold text-sm tracking-widest">RAIO-X DO NEGÓCIO</span>
            <span className="text-[#A6824A]/40">·</span>
            <span className="text-[11px] font-mono text-[#E6E2DA]/80">
              {currentDimension.code} {currentDimension.name.toUpperCase()}
            </span>
          </div>

          <span className="text-[#E6E2DA]/70 font-mono text-[11px] tabular-nums">
            {questionNumber.toString().padStart(2, '0')} / {totalQuestions}
          </span>
        </div>

        {/* Fine Progress Bar */}
        <div className="space-y-1.5">
          <div className="h-[2px] w-full bg-[#181919] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#154230] via-[#A6824A] to-[#A6824A] transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#E6E2DA]/40 font-mono">
            <span>Pergunta {questionNumber} de {totalQuestions}</span>
            <span className="text-[#A6824A]">{progressPercent}% concluído</span>
          </div>
        </div>
      </div>

      {/* Center Question Block */}
      <div className="mx-auto w-full max-w-3xl py-8 my-auto">
        <div className="space-y-8">
          {/* Question Text */}
          <div className="space-y-3">
            <span className="inline-block text-[11px] uppercase tracking-widest text-[#A6824A] font-medium">
              Dimensão {currentDimension.code} · {currentDimension.name}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#E6E2DA] leading-snug">
              “{questionText}”
            </h2>
            {contextNote && (
              <p className="text-xs text-[#E6E2DA]/50 italic">
                {contextNote}
              </p>
            )}
          </div>

          {/* 5 Response Options */}
          <div className="grid grid-cols-1 gap-2.5">
            {ANSWER_OPTIONS.map((opt, idx) => {
              const isSelected = selectedAnswer === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onSelectAnswer(opt.value, opt.score)}
                  className={`group relative w-full text-left p-4 sm:p-5 border transition-all duration-150 flex items-center justify-between cursor-pointer select-none ${
                    isSelected
                      ? 'border-[#A6824A] bg-[#154230]/40 shadow-md shadow-[#A6824A]/5'
                      : 'border-[#A6824A]/20 bg-[#141615] hover:border-[#A6824A]/50 hover:bg-[#181919]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Number index indicator */}
                    <span
                      className={`text-xs font-mono w-6 h-6 border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-[#A6824A] text-[#101111] bg-[#A6824A] font-bold'
                          : 'border-[#A6824A]/30 text-[#E6E2DA]/50 group-hover:border-[#A6824A]'
                      }`}
                    >
                      {idx + 1}
                    </span>

                    <div>
                      <div
                        className={`text-base font-serif font-medium tracking-wide transition-colors ${
                          isSelected ? 'text-[#E6E2DA] font-semibold' : 'text-[#E6E2DA]/85 group-hover:text-[#E6E2DA]'
                        }`}
                      >
                        {opt.label}
                      </div>
                      <div className="text-xs text-[#E6E2DA]/55 hidden sm:block mt-0.5">
                        {opt.description}
                      </div>
                    </div>
                  </div>

                  {/* Radio / Check indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-[#A6824A] bg-[#A6824A] text-[#101111]'
                        : 'border-[#A6824A]/30 text-transparent'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mx-auto w-full max-w-3xl pt-6 border-t border-[#A6824A]/15 flex items-center justify-between">
        <button
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-5 py-3 border border-[#A6824A]/30 text-xs uppercase tracking-widest text-[#E6E2DA]/70 hover:text-[#E6E2DA] hover:border-[#A6824A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Voltar</span>
        </button>

        <button
          onClick={onNext}
          disabled={!selectedAnswer}
          className={`inline-flex items-center gap-2.5 px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-200 ${
            selectedAnswer
              ? 'bg-[#154230] hover:bg-[#1a533d] border border-[#A6824A] text-[#E6E2DA] cursor-pointer shadow-md'
              : 'bg-[#141615] border border-[#A6824A]/20 text-[#E6E2DA]/40 cursor-not-allowed'
          }`}
        >
          <span>{questionNumber === totalQuestions ? 'Finalizar Perguntas' : 'Próxima'}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#A6824A]" />
        </button>
      </div>
    </div>
  );
};
