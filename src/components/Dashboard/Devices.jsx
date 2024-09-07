import React, { useEffect, useState } from "react";

// Array of beautiful short notes from doctors
const doctorNotes = [
  "Your strength and positivity are truly inspiring. Keep up the great work; you're on a path to recovery.",
  "Healing takes time, but each step forward is a step closer to your full recovery. Keep believing in yourself.",
  "You're making incredible progress. Your resilience is the key to your recovery. Stay strong and positive.",
  "Your dedication to your treatment is commendable. Every effort you make is helping you get closer to wellness.",
  "Remember, you're never alone in this journey. We're here to support you every step of the way.",
  "Each day brings new opportunities for healing. Keep moving forward with hope and determination.",
  "Your courage in facing these challenges is admirable. You're doing a fantastic job—keep it up!",
  "Every small victory counts. Celebrate your progress and stay motivated.",
  "You're making strides every day. Keep up the excellent work and stay positive.",
  "Your commitment to your health is inspiring. Continue taking care of yourself, and you'll reach your goals.",
  "You're on a remarkable journey to recovery. Stay hopeful and trust in the process.",
  "Your strength and perseverance are powerful. Continue to believe in your ability to overcome.",
  "Every effort you make is a step towards better health. Keep up the great work!",
  "Your positive attitude is a key part of your healing process. Keep smiling and moving forward.",
  "Recovery may take time, but your efforts are making a difference. Stay encouraged and focused.",
  "You're showing incredible resilience. Keep up the hard work, and you'll continue to see progress.",
  "Your journey to wellness is unique and valuable. Stay strong and keep pushing forward.",
  "Each day is a new opportunity for improvement. Keep striving and believing in yourself.",
  "Your determination and strength are commendable. Continue to take care of yourself and stay positive.",
  "You are making a positive impact on your own recovery. Keep moving forward with hope and courage.",
  "Your hard work and dedication are paying off. Stay encouraged and keep aiming for your goals.",
  "Every positive change is a step towards better health. Celebrate your progress and keep going.",
  "Your resilience is a source of inspiration. Keep believing in yourself and your journey to recovery.",
  "You're doing an excellent job with your treatment. Stay focused and positive, and you'll achieve your goals.",
  "Your progress is a testament to your strength. Keep up the great work and continue to stay motivated.",
  "You're making significant strides in your recovery. Stay hopeful and keep moving forward.",
  "Your efforts are making a real difference. Continue to stay strong and positive throughout your journey.",
  "You are on the right track with your recovery. Keep believing in yourself and your ability to heal.",
  "Your commitment to your health is impressive. Keep up the good work and stay positive.",
  "Every day you are getting closer to full recovery. Keep pushing forward with determination and hope.",
  "Your journey is a testament to your strength. Continue to stay focused and positive.",
  "You're showing great progress. Keep believing in yourself and your ability to overcome these challenges.",
  "Your dedication is truly inspiring. Keep up the excellent work and stay positive.",
  "Each day brings you closer to your goals. Continue to stay hopeful and motivated.",
  "Your resilience and strength are remarkable. Keep moving forward with confidence and courage.",
  "You're making wonderful progress. Stay positive and keep working towards your recovery.",
  "Your perseverance is a key part of your healing. Continue to stay strong and focused.",
  "Every small achievement is a step towards wellness. Keep celebrating your progress and stay motivated.",
  "You're doing a fantastic job with your treatment. Keep up the great work and stay encouraged.",
  "Your strength and positive attitude are making a real difference. Keep moving forward with hope.",
  "You're on a path to recovery, and every effort counts. Stay positive and keep pushing forward.",
  "Your commitment to your health is admirable. Continue to stay strong and believe in your recovery.",
  "You're making progress every day. Keep up the good work and stay hopeful.",
  "Your journey is a testament to your strength and resilience. Keep believing in yourself and your recovery.",
  "You're doing an excellent job managing your health. Stay encouraged and keep moving forward.",
  "Each step you take is bringing you closer to wellness. Continue to stay positive and determined.",
  "Your hard work is paying off. Keep believing in yourself and stay focused on your recovery.",
  "You're making great strides. Stay positive and keep pushing towards your health goals.",
  "Your dedication is truly inspiring. Keep up the excellent work and continue to stay motivated.",
  "Each day is a new opportunity for healing. Keep striving and believing in yourself.",
  "Your progress is a result of your strength and perseverance. Keep moving forward with hope.",
  "You're on the right path to recovery. Stay positive and continue to put in the effort.",
  "Your journey is unique and valuable. Keep believing in your ability to overcome and succeed.",
  "You're showing great resilience. Continue to stay strong and focused on your recovery.",
  "Your commitment and positive attitude are making a significant difference. Keep up the good work.",
  "Every step you take is bringing you closer to recovery. Stay hopeful and keep working hard.",
  "Your strength and dedication are inspiring. Keep believing in yourself and your journey to wellness.",
  "You're making wonderful progress. Continue to stay positive and focused on your recovery.",
];

const Devices = () => {
  const [note, setNote] = useState(doctorNotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNote(doctorNotes[Math.floor(Math.random() * doctorNotes.length)]);
    }, 3500); // Change note every 3.5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-white flex flex-col justify-center items-center md:w-1/4 rounded-lg p-4 shadow-lg ring-1 ring-gray-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Daily Doctor's Note
      </h2>
      <div className="p-4 border-l-4 border-green-500 bg-gray-50 rounded-lg">
        <p className="text-lg italic text-gray-700 text-center">{note}</p>
      </div>
    </div>
  );
};

export default Devices;
