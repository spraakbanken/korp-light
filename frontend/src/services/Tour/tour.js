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
    const totalSteps = 6;


//     I Korpi kan du söka på ord i stora textsamlingar, så kallade korpusar. Texterna kommer bland annat från nyheter, romaner och sociala medier.

// Se exempel på hur ord används eller jämför antalet sökresultat för olika ord i olika typer av korpusar. Eller hitta ditt eget användningsområde!

// Till exempel kan du välja att se hur ordet "korp" används av SVT nyheter.

// För utökad funktionalitet kan du använda Korp, vilket är Språkbankens ordforskningsplattform.
    tour.addStep({
      id: 'info-text',
      title: `Allmänt om Korpi <div class="step-counter">1/${totalSteps}</div>`,
      text: `<p>I Korpi kan du söka på ord i store textsamlingar, så kallade korpusar. 
      Texterna kommer bland annat från nyheter, romaner och sociala medier.</p>
      
      <p>Se exempel på hur ord används eller jämför antalet sökresultat för 
      olika ord i olika typer av korpusar. Eller hitta ditt eget användningsområde!</p>
      
      <p>Till exempel kan du välja att se hur ordet "korp" används av SVT nyheter.</p>
      
      <p>För utökad funktionalitet kan du använda 
      <a href="https://spraakbanken.gu.se/korp/" target="_blank">Korp</a>, 
      vilket är <a href="https://sprakbanken.se/" target="_blank">Språkbankens</a> ordforskningsplattform.</p>`,
      attachTo: {
        element: '.logo-container',
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

    // Step 2: Search Bar
    tour.addStep({
      id: 'search-bar',
      title: `Sökfält <div class="step-counter">2/${totalSteps}</div>`,
      text: 'Här kan du söka efter ord i våra korpusar.',
      attachTo: {
        element: '.searchBarWrapper',
        on: 'bottom'
      },
      modalOverlayOpeningPadding: 8,
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
      title: `Välj korpus <div class="step-counter">3/${totalSteps}</div>`,
      text: 'Klicka här för att välja vilka korpusar (textsamlingar) du vill söka i, t.ex. "Nyheter".',
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

     // Step 4: Extended Search Button
     tour.addStep({
      id: 'extended-search',
      title: `Utökad sökning <div class="step-counter">4/${totalSteps}</div>`,
      text: 'Utökad sökning låter dig använda mer avancerade sökfunktioner, t.ex. grundform eller ordklass.',
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

    // Step 5: Filter Button
    tour.addStep({
      id: 'filter-button',
      title: `Sökinställningar <div class="step-counter">5/${totalSteps}</div>`,
      text: 'Välj hur resultat ska presenteras, t.ex. hur många resultat per korpus som du vill se.',
      attachTo: {
        element: '.filter-button',
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

    // Step 6: History Button
    tour.addStep({
      id: 'history-button',
      title: `Historik <div class="step-counter">6/${totalSteps}</div>`,
      text: 'Här kan du se din sökhistorik, tryck på ett ord för att gå till den sökningen.',
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