import React, { useState, useEffect } from "react";
import styles from "./MultiStepForm.module.css";

const MultiStepForm = ({
    steps,
    currentStep,
    onStepChange,
    onNext,
    onPrev,
    onSubmit,
    isSubmitting,
    title,
    children,
    isStepValid,
}) => {
    // steps is an array of object { key: string, label: string, icon: ReactNode }

    // Calculate progress
    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <div className={styles.multiStepContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.progressBarContainer}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className={styles.stepper}>
                    {steps.map((step, index) => {
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;

                        return (
                            <div
                                key={step.key}
                                className={`${styles.stepItem} ${isActive ? styles.active : ""} ${isCompleted ? styles.completed : ""}`}
                            >
                                <div className={styles.stepIcon}>
                                    {isCompleted ? "✓" : (step.icon || index + 1)}
                                </div>
                                <div className={styles.stepLabel}>{step.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={styles.stepContent}>
                {/* Render only the active child/content */}
                {children}
            </div>

            <div className={styles.footer}>
                <button
                    type="button"
                    className={styles.prevButton}
                    onClick={onPrev}
                    disabled={currentStep === 0}
                >
                    Previous
                </button>

                {currentStep === steps.length - 1 ? (
                    <button
                        type="submit"
                        className={styles.submitButton}
                        onClick={onSubmit}
                        disabled={isSubmitting || !isStepValid}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                ) : (
                    <button
                        type="button"
                        className={styles.nextButton}
                        onClick={onNext}
                        disabled={!isStepValid}
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default MultiStepForm;
