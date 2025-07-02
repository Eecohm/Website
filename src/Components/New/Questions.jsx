import React, { useState } from 'react';
import styles from './Questions.module.css';

const Questions = () => {
  const questions = [
    {
      text: "In my free time, I enjoy:",
      options: [
        "Hosting gatherings or cooking for others",
        "Experimenting with code or new technology",
        "Planning events or exploring business ideas",
      ],
    },
    {
      text: "Which school subjects do you like most?",
      options: [
        "Home Science, Tourism, Languages (culture & people)",
        "Math, Computer Science, Physics (logic & technology)",
        "Economics, Accounting, Business Studies (finance & management)",
      ],
    },
    {
      text: "What kind of problem do you prefer to solve?",
      options: [
        "A guest complaint or event-planning issue",
        "A programming bug or technical issue",
        "A budgeting or management problem",
      ],
    },
    {
      text: "In group projects, I tend to:",
      options: [
        "Motivate team members and keep everyone working together",
        "Take on technical or analytical tasks (calculations, coding)",
        "Organize the project, set goals, and manage the schedule",
      ],
    },
    {
      text: "I prefer tasks involving:",
      options: [
        "Cooking, serving, or interacting with people",
        "Working on a computer, coding, or analyzing data",
        "Planning, organizing, or managing projects",
      ],
    },
    {
      text: "Which scenario appeals most to you?",
      options: [
        "Running a hotel or restaurant and making sure guests are happy",
        "Creating a new software app or solving computer problems",
        "Starting or managing a business and handling its finances",
      ],
    },
    {
      text: "For work hours, I prefer:",
      options: [
        "Flexible schedules (evenings, weekends) with variety",
        "A regular 9–5 schedule and stability",
        "Mostly regular hours with some flexibility for special tasks",
      ],
    },
    {
      text: "My motivation in a job comes from:",
      options: [
        "Helping people and providing good service",
        "Solving challenging problems and learning new tech",
        "Achieving success, leading others, and earning rewards",
      ],
    },
    {
      text: "I work best in:",
      options: [
        "A lively, busy place with lots of people",
        "A quiet, focused setting (computer lab or office)",
        "An organized office with clear goals and teamwork",
      ],
    },
    {
      text: "I would describe myself as:",
      options: [
        "Outgoing and friendly; I enjoy interacting with others",
        "Analytical and logical; I like working independently",
        "Organized and ambitious; I aim for leadership roles",
      ],
    },
    {
      text: "On weekends, I’m most likely to:",
      options: [
        "Travel or spend time with friends and family",
        "Work on a tech project or learn a new computer skill",
        "Plan future goals or organize events",
      ],
    },
    {
      text: "I am happiest when my tasks are:",
      options: [
        "Varied and unpredictable, with new challenges daily",
        "Logical and consistent, with clear steps to follow",
        "Well-organized and structured, with clear instructions",
      ],
    },
    {
      text: "How do you feel about travel for work?",
      options: [
        "I would love to travel often and meet new people",
        "I prefer a desk job with minimal travel",
        "Occasional travel is fine, especially for meetings or events",
      ],
    },
    {
      text: "I enjoy creative tasks such as:",
      options: [
        "Designing menus, decor, or customer experiences",
        "Developing innovative software or new apps",
        "Crafting marketing plans or new business strategies",
      ],
    },
    {
      text: "What matters more to me in a career?",
      options: [
        "Personal satisfaction and helping others",
        "A balance of good salary and engaging work",
        "High income and opportunities to lead",
      ],
    },
    {
      text: "How excited are you about learning new technology?",
      options: [
        "Somewhat: It’s useful but not my main interest",
        "Very: I love learning new tools and programming languages",
        "Moderately: If it helps business goals, I’m interested",
      ],
    },
    {
      text: "I prefer to learn new concepts:",
      options: [
        "By hands-on practice and real experience",
        "By researching and experimenting on my own",
        "Through structured lessons and guided courses",
      ],
    },
    {
      text: "In a school project, I often act as:",
      options: [
        "Coordinator, keeping the team on track",
        "Technical expert, doing the calculations or coding",
        "Planner, assigning tasks and managing the timeline",
      ],
    },
    {
      text: "Which extracurricular activity appeals to you most?",
      options: [
        "Helping organize school events or volunteering in service roles",
        "Joining a tech/robotics club or programming team",
        "Leading a student organization or business competition",
      ],
    },
    {
      text: "Which future scenario sounds most appealing?",
      options: [
        "Managing a hotel or restaurant and satisfying guests",
        "Developing software or leading a tech team",
        "Running a successful company or being a business leader",
      ],
    },
  ];

  const [answers, setAnswers] = useState(Array(20).fill(null));
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const calculateStream = () => {
    const counts = { 0: 0, 1: 0, 2: 0 };
    answers.forEach((answer) => {
      if (answer !== null) counts[answer]++;
    });
    const maxCount = Math.max(...Object.values(counts));
    const streams = ['Hotel Management', 'Computer Science', 'Business Studies'];
    const possibleStreams = Object.keys(counts).filter(
      (key) => counts[key] === maxCount
    );
    return streams[possibleStreams[0]]; // Pick first in case of tie
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^(97|98)\d{8}$/.test(number)) {
      alert('Phone number must be 10 digits starting with 97 or 98');
      return;
    }
    const stream = calculateStream();
    setResult(stream);
    setIsSubmitted(true);
    fetch('https://bishamsinchiury.com.np/api/user/new/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: name, number, stream }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className={styles.container}>
    <div className={styles.title}>
      <h1 className={styles.title}>
        Career Choice Self-Assessment Quiz{' '}
        <span role="img" aria-label="graduation cap">
          🎓
        </span>
      </h1>
      <p className={styles.instructions}>
        Answer the following 20 questions to find out which stream suits you best: Hotel Management (HM), Computer Science (CS), or Business Studies (BS).{' '}
        <span role="img" aria-label="thinking face">
          🤔
        </span>
      </p>
      <div className={styles.progress}>
        <div
          className={styles.progressBar}
          style={{
            width: `${(answers.filter((a) => a !== null).length / 20) * 100}%`,
          }}
        ></div>
      </div>
      </div>
      {questions.map((question, index) => (
        <div key={index} className={styles.question}>
          <p className={styles.questionText}>
            {index + 1}. {question.text}{' '}
            <span role="img" aria-label="light bulb">
              💡
            </span>
          </p>
          <div className={styles.options}>
            {question.options.map((option, optIndex) => (
              <label key={optIndex} className={styles.optionLabel}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  checked={answers[index] === optIndex}
                  onChange={() => handleAnswerChange(index, optIndex)}
                  className={styles.radio}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        className={styles.submitButton}
        onClick={() => {
          if (answers.includes(null)) {
            alert('Please answer all questions');
          } else {
            setModalOpen(true);
          }
        }}
      >
        See Your Stream
      </button>
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            {isSubmitted ? (
              <div className={styles.result}>
                <h2>
                  Your Recommended Stream: {result}{' '}
                  <span role="img" aria-label="trophy">
                    🏆
                  </span>
                </h2>
                <button
                    className={styles.closeButton}
                    onClick={() => window.location.href = 'https://eecohm.edu.np'}
                    >
                    Close
                    </button>
              </div>
            ) : (
              <div className={styles.form}>
                <label className={styles.inputLabel}>
                  <span role="img" aria-label="name tag">
                    🏷️
                  </span>{' '}
                  <h4>Full Name:</h4> 
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={styles.input}
                  />
                </label>
                <label className={styles.inputLabel}>
                  <span role="img" aria-label="telephone">
                    📞
                  </span>{' '}
                  <h4>Phone Number:</h4>
                  <input
                    type="text"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                    className={styles.input}
                  />
                </label>
                <button
                  className={styles.submitModalButton}
                  onClick={handleSubmit}
                >
                  Okay
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;