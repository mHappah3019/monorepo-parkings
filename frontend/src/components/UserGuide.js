class UserGuide extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      const howItWorks1 = "Avverti che stai parcheggiando la tua bicicletta.";
      const howItWorks2 = "Parcheggi e allucchetti la tua bicicletta.";
      const howItWorks3 = "Il miglior modo per rendere efficace il sistema è munendosi di un buon lucchetto con allarme. Le attività possono quindi continuare a lavorare al solito ritmo senza dover attivamente sorvegliare nessuna bicicletta.";
      return (
        <div className="descriptionContent steps mildPadding mildSpacing">
          <h3 className="descriptionHeaders">
            How
          </h3>
          <ul className="a">
      
            <li>{howItWorks1}</li>
            <li>{howItWorks2}</li>
            <li className="b">{howItWorks3}</li>
  
          </ul>
        </div>
      )
    }
  }
  