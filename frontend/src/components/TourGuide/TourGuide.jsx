// import React, { useEffect, useRef } from "react";
// import Shepherd from "shepherd.js";
// import "shepherd.js/dist/css/shepherd.css";

// const TourGuide = ({ startTour, setStartTour }) => {
//     const tourRef = useRef(null);

//     useEffect(() => {
//         // Initialize Shepherd Tour but don't start it automatically
//         tourRef.current = new Shepherd.Tour({
//             defaultStepOptions: {
//                 cancelIcon: { enabled: true },
//                 classes: "shadow-md bg-purple-dark",
//                 scrollTo: { behavior: "smooth", block: "center" },
//                 modal: true,
//             }
//         });

//         const tour = tourRef.current;

//         const goToNextStep = () => {
//             const currentStep = tour.getCurrentStep();
//             if (currentStep) currentStep.hide(); // Hide current step
//             tour.next(); // Show next step
//         };


//         // Define tour steps
//         tour.addStep({
//             id: "searchBar",
//             text: "This is the search bar. You can type your query here.",
//             attachTo: { element: ".searchBar", on: "bottom" },
//             buttons: [{ text: "Next", action: goToNextStep }],
//         });

//         tour.addStep({
//             id: "extended-search",
//             text: "Click here to make more advanced searches.",
//             attachTo: { element: ".extended-search-button", on: "right" },
//             buttons: [{ text: "Next", action: goToNextStep }],
//         });

//         tour.addStep({
//             id: "select-corpora",
//             text: "Click here to select corpora for your search.",
//             attachTo: { element: ".select-corpora-button", on: "right" },
//             buttons: [{ text: "Next", action: goToNextStep }],
//         });

//         tour.addStep({
//             id: "history",
//             text: "Click here to view your search history.",
//             attachTo: { element: ".history-button", on: "right" },
//             buttons: [{ text: "Finish", action: () => tour.complete() }],
//         });    
//     }, [startTour]);

//     return null;
// };

// export default TourGuide;