"use client";

import React, { useState } from "react";
import { Card, CardBody, Button, Progress } from "@nextui-org/react";
import {
  Trophy,
  Brain,
  ArrowRight,
  ArrowLeft,
  Book,
  Star,
  CheckCircle2,
  AlertCircle,
  Timer,
  DollarSign,
  Wine,
  Home,
  Award,
} from "lucide-react";
import menuAnimation from "./menu.json";
import rewardAnimation from "./reward.json";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

const MenuMasterPro = () => {
  const [stage, setStage] = useState("welcome");
  const [currentItem, setCurrentItem] = useState(0);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [reviewedItems, setReviewedItems] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});

  const menuItems = [
    {
      id: 1,
      name: "Grilled Octopus",
      price: 32,
      category: "Seafood",
      description: "Spanish octopus, fingerling potatoes, chorizo, salsa verde",
      image:
        "https://img.freepik.com/free-photo/close-up-delicious-spanish-food_23-2149210886.jpg",
      keyPoints: [
        "48-hour tenderizing process",
        "Spanish coastal waters sourcing",
        "House-made salsa verde",
        "Grilled over oak wood",
      ],
      allergens: ["Shellfish"],
      pairings: ["Albariño", "Vermentino"],
      modifiers: [
        { name: "Extra chorizo", price: 4 },
        { name: "No potatoes", price: 0 },
        { name: "Extra salsa verde", price: 2 },
      ],
      prepTime: "12-15 minutes",
      profitMargin: 72,
      popularityScore: 89,
      quiz: [
        {
          question: "What's our tenderizing process time?",
          options: ["24 hours", "48 hours", "72 hours"],
          correct: 1,
          explanation:
            "We use a 48-hour tenderizing process for perfect texture.",
        },
        {
          question: "Which wine pairs best with this dish?",
          options: ["Cabernet", "Albariño", "Chardonnay"],
          correct: 1,
          explanation:
            "Albariño's crisp acidity complements seafood perfectly.",
        },
      ],
    },
    {
      id: 2,
      name: "Truffle Risotto",
      price: 38,
      category: "Pasta & Rice",
      description: "Carnaroli rice, black truffle, aged parmesan, mascarpone",
      image:
        "https://img.freepik.com/free-photo/black-rice-with-olives-close-up_23-2148469879.jpg",
      keyPoints: [
        "Black truffles from Umbria",
        "24-month aged parmesan",
        "Made to order - 25 min",
        "Carnaroli rice for perfect texture",
      ],
      allergens: ["Dairy"],
      pairings: ["Barolo", "Barbaresco"],
      modifiers: [
        { name: "Extra truffle", price: 12 },
        { name: "No cheese", price: 0 },
        { name: "Half portion", price: -8 },
      ],
      prepTime: "25 minutes",
      profitMargin: 65,
      popularityScore: 92,
      quiz: [
        {
          question: "What type of rice do we use?",
          options: ["Arborio", "Carnaroli", "Vialone Nano"],
          correct: 1,
          explanation: "Carnaroli is known as the 'king of rices' for risotto.",
        },
        {
          question: "How long is our parmesan aged?",
          options: ["12 months", "18 months", "24 months"],
          correct: 2,
          explanation: "24-month aged parmesan for maximum flavor development.",
        },
      ],
    },
  ];

  const getTotalQuestions = () => {
    return menuItems.reduce((total, item) => total + item.quiz.length, 0);
  };

  const getCorrectAnswers = () => {
    return Object.entries(quizAnswers).filter(([key, value]) => {
      const [itemIndex, questionIndex] = key.split("-").map(Number);
      return value === menuItems[itemIndex].quiz[questionIndex].correct;
    }).length;
  };

  const handleAnswer = (answerIndex) => {
    const newAnswers = {
      ...quizAnswers,
      [`${currentItem}-${currentQuizQuestion}`]: answerIndex,
    };
    setQuizAnswers(newAnswers);

    const isCorrect =
      answerIndex === menuItems[currentItem].quiz[currentQuizQuestion].correct;
    if (isCorrect) {
      setScore(score + 100);
    }

    // Move to next question or finish quiz
    setTimeout(() => {
      if (currentQuizQuestion < menuItems[currentItem].quiz.length - 1) {
        setCurrentQuizQuestion(currentQuizQuestion + 1);
      } else {
        if (currentItem < menuItems.length - 1) {
          setStage("learn");
          setCurrentQuizQuestion(0);
          setCurrentItem(currentItem + 1);
        } else {
          setStage("complete"); // Move to completion page when all items are done
        }
      }
    }, 1500);
  };

  const isAnswered = (itemIndex, questionIndex) => {
    return quizAnswers[`${itemIndex}-${questionIndex}`] !== undefined;
  };

  const isCorrect = (itemIndex, questionIndex) => {
    const answer = quizAnswers[`${itemIndex}-${questionIndex}`];
    return answer === menuItems[itemIndex].quiz[questionIndex].correct;
  };

  const WelcomeScreen = () => {
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.3,
        },
      },
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 },
      },
    };

    const cardVariants = {
      hidden: { scale: 0.8, opacity: 0 },
      visible: {
        scale: 1,
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 },
      },
      hover: {
        scale: 1.05,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      },
      tap: {
        scale: 0.95,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      },
    };

    return (
      <motion.div
        className="text-center p-4 sm:p-6 md:p-8 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-6" variants={itemVariants}>
          <div>
            <Lottie
              className="h-32 sm:h-40 md:h-48 mx-auto rounded-full"
              animationData={menuAnimation}
              loop={true}
            />
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl font-black mt-4"
              variants={itemVariants}
            >
              Menu Master Pro
            </motion.h1>
          </div>

          <motion.p
            className="text-lg sm:text-xl text-gray-600 max-w-xl mx-auto"
            variants={itemVariants}
          >
            Master our menu through interactive learning
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto mt-4 sm:mt-6 md:mt-8">
            <motion.div
              className="p-3 sm:p-4 border-2 border-black rounded-lg bg-blue-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-blue-600" />
              <h3 className="font-bold">Learn</h3>
              <p className="text-xs sm:text-sm">Study dish details</p>
            </motion.div>

            <motion.div
              className="p-3 sm:p-4 border-2 border-black rounded-lg bg-purple-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Timer className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-purple-600" />
              <h3 className="font-bold">Practice</h3>
              <p className="text-xs sm:text-sm">Test knowledge</p>
            </motion.div>

            <motion.div
              className="p-3 sm:p-4 border-2 border-black rounded-lg bg-amber-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:col-span-2 md:col-span-1 cursor-pointer"
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-amber-600" />

              <h3 className="font-bold">Master</h3>
              <p className="text-xs sm:text-sm">Earn points</p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-12 sm:mt-8">
            <Button
              size="lg"
              className="font-bold border-2 border-black bg-primary text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-4 py-2 sm:px-6 sm:py-3"
              onClick={() => setStage("learn")}
            >
              <motion.div
                className="flex items-center"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                Start Training
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  const CompletionScreen = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto text-center space-y-6 py-12 px-4 sm:px-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="mb-8"
      >
        <Lottie
          className="h-32 sm:h-40 md:h-40 mx-auto rounded-full"
          animationData={rewardAnimation}
          loop={true}
        />
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl sm:text-4xl font-black mb-2"
        >
          Training Complete!
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg sm:text-xl text-gray-600"
        >
          Congratulations on completing the menu training
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200 max-w-sm sm:max-w-md mx-auto">
          <CardBody className="p-4 sm:p-6">
            <div className="space-y-4">
              <motion.div
                className="flex justify-between items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <span className="font-bold">Total Score:</span>
                <span className="text-xl sm:text-2xl font-black">
                  {score} points
                </span>
              </motion.div>

              <motion.div
                className="flex justify-between items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="font-bold">Questions Completed:</span>
                <span className="text-xl sm:text-2xl font-black">
                  {Object.keys(quizAnswers).length}/{getTotalQuestions()}
                </span>
              </motion.div>

              <motion.div
                className="flex justify-between items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <span className="font-bold">Correct Answers:</span>
                <span className="text-xl sm:text-2xl font-black">
                  {getCorrectAnswers()}/{getTotalQuestions()}
                </span>
              </motion.div>

              <motion.div
                className="pt-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="mb-2 font-bold">Accuracy</div>
                <Progress
                  value={(getCorrectAnswers() / getTotalQuestions()) * 100}
                  className="h-4"
                  color="success"
                />
              </motion.div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size="lg"
          className="font-bold border-2 border-black bg-primary text-white 
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            transition-shadow duration-200 mt-8"
          onClick={() => {
            setStage("welcome");
            setCurrentItem(0);
            setCurrentQuizQuestion(0);
            setScore(0);
            setQuizAnswers({});
          }}
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Return to Main Menu
        </Button>
      </motion.div>
    </motion.div>
  );

  const LearnMode = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto space-y-6 py-12 px-4 sm:px-6"
    >
      {/* Header with Progress */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0"
      >
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">
            {menuItems[currentItem].name}
          </h2>
          <div className="text-gray-600">
            Item {currentItem + 1} of {menuItems.length}
          </div>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex items-center gap-2"
        >
          <Trophy className="w-5 h-5 text-amber-500" />
          <span className="font-bold">{score} points</span>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="relative">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              src={menuItems[currentItem].image}
              alt={menuItems[currentItem].name}
              className="w-full h-48 sm:h-64 object-cover rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute top-3 right-3"
            >
              <span className="px-3 py-1 bg-primary text-white text-sm sm:text-base font-bold rounded-full border-2 border-black">
                {menuItems[currentItem].category}
              </span>
            </motion.div>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-between items-center"
          >
            <h3 className="text-lg sm:text-xl font-bold">
              {menuItems[currentItem].name}
            </h3>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-lg sm:text-xl font-bold">
                {menuItems[currentItem].price}
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm sm:text-base text-gray-600 border-l-4 border-primary pl-4"
          >
            {menuItems[currentItem].description}
          </motion.p>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200">
              <CardBody className="p-4">
                <h3 className="font-bold flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-amber-500" />
                  Key Selling Points
                </h3>
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                  className="space-y-2"
                >
                  {menuItems[currentItem].keyPoints.map((point, idx) => (
                    <motion.div
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{point}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </CardBody>
            </Card>
          </motion.div>

          {/* Important Info Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Continue with Allergens and Wine Pairings sections... */}
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-8"
      >
        <Button
          className="font-bold border-2 border-black bg-gray-100 
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            transition-shadow duration-200 w-full sm:w-auto"
          onClick={() => setStage("welcome")}
        >
          <Home className="w-4 h-4 mr-2" />
          Main Menu
        </Button>

        <Button
          className="font-bold border-2 border-black bg-primary text-white 
            shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
            transition-shadow duration-200 w-full sm:w-auto"
          onClick={() => {
            setStage("practice");
            setCurrentQuizQuestion(0);
          }}
        >
          Test Knowledge
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </motion.div>
    </motion.div>
  );

  const PracticeMode = () => {
    // Single motion wrapper for page entry
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto space-y-6 py-12 px-4 sm:px-6"
      >
        {/* Quiz Header - No motion */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              {menuItems[currentItem].name}
            </h2>
            <div className="text-gray-600">
              Question {currentQuizQuestion + 1} of{" "}
              {menuItems[currentItem].quiz.length}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <span className="font-bold">{score} points</span>
          </div>
        </div>

        {/* Question Card - No motion */}
        <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200">
          <CardBody className="p-4 sm:p-6">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={menuItems[currentItem].image}
                  alt={menuItems[currentItem].name}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg border-2 border-black"
                />
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold mb-4">
                    {menuItems[currentItem].quiz[currentQuizQuestion].question}
                  </h3>
                  <div className="space-y-3">
                    {menuItems[currentItem].quiz[
                      currentQuizQuestion
                    ].options.map((option, idx) => {
                      const isAnswered =
                        quizAnswers[`${currentItem}-${currentQuizQuestion}`] !==
                        undefined;
                      const wasSelected =
                        quizAnswers[`${currentItem}-${currentQuizQuestion}`] ===
                        idx;
                      const isCorrectAnswer =
                        idx ===
                        menuItems[currentItem].quiz[currentQuizQuestion]
                          .correct;

                      return (
                        <Button
                          key={idx}
                          className={`w-full justify-start px-4 py-3 border-2 border-black font-medium
                              ${
                                isAnswered
                                  ? wasSelected
                                    ? isCorrectAnswer
                                      ? "bg-green-100 text-green-700 border-green-500"
                                      : "bg-red-100 text-red-700 border-red-500"
                                    : isCorrectAnswer
                                      ? "bg-green-100 text-green-700 border-green-500"
                                      : "bg-white"
                                  : "bg-white hover:bg-gray-50"
                              }
                              ${!isAnswered && "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-[2px] transition-all"}
                              text-sm sm:text-base`}
                          onClick={() => !isAnswered && handleAnswer(idx)}
                          disabled={isAnswered}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-black flex items-center justify-center
                                ${
                                  wasSelected
                                    ? isCorrectAnswer
                                      ? "bg-green-500 text-white"
                                      : "bg-red-500 text-white"
                                    : isAnswered && isCorrectAnswer
                                      ? "bg-green-500 text-white"
                                      : "bg-gray-100"
                                }`}
                            >
                              {String.fromCharCode(65 + idx)}
                            </div>
                            <span className="text-left">{option}</span>
                          </div>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Answer Explanation - Keep motion here as it's appearing new */}
              {quizAnswers[`${currentItem}-${currentQuizQuestion}`] !==
                undefined && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect(currentItem, currentQuizQuestion)
                      ? "bg-green-50 border-green-500"
                      : "bg-red-50 border-red-500"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect(currentItem, currentQuizQuestion) ? (
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" />
                    )}
                    <div>
                      <h5 className="font-bold mb-1">
                        {isCorrect(currentItem, currentQuizQuestion)
                          ? "Correct!"
                          : "Not quite right"}
                      </h5>
                      <p className="text-sm sm:text-base text-gray-600">
                        {
                          menuItems[currentItem].quiz[currentQuizQuestion]
                            .explanation
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Navigation - No motion */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0">
          <Button
            className="font-bold border-2 border-black bg-gray-100 
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
              transition-shadow duration-200 w-full sm:w-auto"
            onClick={() => setStage("learn")}
          >
            <Book className="w-4 h-4 mr-2" />
            Back to Learn
          </Button>

          <Button
            className="font-bold border-2 border-black bg-primary text-white 
              shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
              transition-shadow duration-200 w-full sm:w-auto"
            onClick={() => {
              if (
                currentQuizQuestion <
                menuItems[currentItem].quiz.length - 1
              ) {
                setCurrentQuizQuestion((prev) => prev + 1);
              } else if (currentItem < menuItems.length - 1) {
                setCurrentItem((prev) => prev + 1);
                setCurrentQuizQuestion(0);
                setStage("learn");
              } else {
                setStage("complete");
              }
            }}
            disabled={!isAnswered(currentItem, currentQuizQuestion)}
          >
            {currentQuizQuestion < menuItems[currentItem].quiz.length - 1 ? (
              <>
                Next Question
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : currentItem < menuItems.length - 1 ? (
              <>
                Next Item
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Complete Training
                <Trophy className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="p-4 min-h-screen bg-[#FFF4E8]">
      <div className="max-w-3xl mx-auto space-y-6">
        {stage === "welcome" && <WelcomeScreen />}
        {stage === "learn" && <LearnMode />}
        {stage === "practice" && <PracticeMode />}
        {stage === "complete" && <CompletionScreen />}
      </div>
    </div>
  );
};

export default MenuMasterPro;
