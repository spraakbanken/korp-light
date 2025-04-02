// src/services/TourService.js
import { useEffect } from 'react';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

// You might want to customize these styles
const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    },
    classes: 'shepherd-theme-custom',
    scrollTo: true,
    popperOptions: {
      modifiers: [{ name: 'offset', options: { offset: [0, 12] } }]
    }
  },
  useModalOverlay: true
};

export const useTour = () => {
  const tour = new Shepherd.Tour(tourOptions);
  
  const setupTour = () => {
    // Step 1: Search Bar
    tour.addStep({
      id: 'search-bar',
      text: 'Här kan du söka efter ord och fraser i våra samlingar',
      attachTo: {
        element: '.search-bar-wrapper',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Avbryt',
          action: tour.cancel
        },
        {
          text: 'Nästa',
          action: tour.next
        }
      ]
    });

    // Step 2: Advanced Search Button
    tour.addStep({
      id: 'advanced-search',
      text: 'Utökad sökning låter dig använda mer avancerade sökfunktioner',
      attachTo: {
        element: '.landingpage__button_group button:nth-child(1)',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Tillbaka',
          action: tour.back
        },
        {
          text: 'Nästa',
          action: tour.next
        }
      ]
    });

    // Step 3: Corpus Button
    tour.addStep({
      id: 'corpus-button',
      text: 'Klicka här för att välja vilka textsamlingar du vill söka i',
      attachTo: {
        element: '.landingpage__button_group button:nth-child(2)',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Tillbaka',
          action: tour.back
        },
        {
          text: 'Nästa',
          action: tour.next
        }
      ]
    });

    // Step 4: History Button
    tour.addStep({
      id: 'history-button',
      text: 'Här kan du se din sökhistorik',
      attachTo: {
        element: '.landingpage__button_group button:nth-child(3)',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Tillbaka',
          action: tour.back
        },
        {
          text: 'Avsluta',
          action: tour.complete
        }
      ]
    });
  };

  const startTour = () => {
    setupTour();
    tour.start();
  };

  return { startTour };
};