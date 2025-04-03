import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';
import './tour.css'; 

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true
    },
    classes: 'shepherd-theme-custom',
    scrollTo: true,
    highlightClass: 'shepherd-enabled',
    popperOptions: {
      modifiers: [
        { name: 'offset', options: { offset: [0, 12] } },
        { name: 'arrow', options: { element: '.shepherd-arrow' } }
      ]
    }
  },
  useModalOverlay: true,
  exitOnEsc: true,
  keyboardNavigation: true
};

export const useTour = () => {
  const tour = new Shepherd.Tour(tourOptions);
  
    const setupTour = () => {
      // Step 1: Search Bar
      tour.addStep({
        id: 'search-bar',
        title: 'Sökfält',
        text: 'Här kan du söka efter ord i våra korpusar.',
        attachTo: {
          element: '.searchBarWrapper',
          on: 'bottom'
        },
        modalOverlayOpeningPadding: 8,
        canClickTarget: false, 
        buttons: [
          {
            text: 'Avbryt',
            action: tour.cancel,
            classes: 'shepherd-button-secondary'
          },
          {
            text: 'Nästa',
            action: tour.next,
            classes: 'shepherd-button-primary'
          }
        ]
      });

    // Step 2: Extended Search Button
    tour.addStep({
      id: 'extended-search',
      title: 'Utökad sökning',
      text: 'Utökad sökning låter dig använda mer avancerade sökfunktioner, tex grundform eller ordklass',
      attachTo: {
        element: '.extended-search-button',
        on: 'bottom'
      },
      canClickTarget: false, 
      buttons: [
        {
          text: 'Tillbaka',
          action: tour.back,
          classes: 'shepherd-button-secondary'
        },
        {
          text: 'Nästa',
          action: tour.next,
          classes: 'shepherd-button-primary'
        }
      ]
    });

    // Step 3: Corpus Button
    tour.addStep({
      id: 'corpus-button',
      title: 'Textsamlingar',
      text: 'Klicka här för att välja vilka korpusar du vill söka i, tex Nyhetstexter',
      attachTo: {
        element: '.corpus-button',
        on: 'bottom'
      },
      canClickTarget: false,
      buttons: [
        {
          text: 'Tillbaka',
          action: tour.back,
          classes: 'shepherd-button-secondary'
        },
        {
          text: 'Nästa',
          action: tour.next,
          classes: 'shepherd-button-primary'
        }
      ]
    });

    // Step 4: History Button
    tour.addStep({
      id: 'history-button',
      title: 'Historik',
      text: 'Här kan du se din sökhistorik, tryck på ett ord för att gå till den sökningen',
      attachTo: {
        element: '.history-button',
        on: 'bottom'
      },
      canClickTarget: false,
      buttons: [
        {
          text: 'Tillbaka',
          action: tour.back,
          classes: 'shepherd-button-secondary'
        },
        {
          text: 'Avsluta',
          action: tour.complete,
          classes: 'shepherd-button-primary'
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