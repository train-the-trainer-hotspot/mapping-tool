const form = {
  sections: {
    suitability: "Passt mein Angebot auf den Trainspot?",
    general: "Inhaltliche Angaben",
    organizational: "Organisatorische Angaben",
    competencies: "GRETA-Kompetenzen automatisch erkannt",
    skillLevels: "Wählen Sie nun die passende Lernzielstufen für die GRETA-Kompetenzen aus:",
  },
  suitability: {
    items: [
      {
        name: "suitableQ1",
        label:
          "Richtet sich Ihr Angebot an Trainer:innen, Dozent:innen oder andere Personen, die in der Erwachsenen- oder Weiterbildung tätig sind oder es werden wollen?",
        helperText: "1. Für wen ist Ihr Angebot gedacht? ",
      },
      {
        name: "suitableQ2",
        label:
          "Bezieht sich Ihr Angebot auf Lehren, Lernen oder die Gestaltung von Bildungsprozessen in der Erwachsenenbildung (z. B. Didaktik, Methodik, Kursplanung, digitale Lehre, Lernbegleitung)?",
        helperText: "2. Worum geht es inhaltlich?",
      },
      {
        name: "suitableQ3",
        label:
          "Fördert Ihr Angebot pädagogische oder didaktische Kompetenzen, also Fähigkeiten, die überfachlich für viele Lehr- und Lernsituationen wichtig sind (z. B. Kommunikation, Moderation, Feedback, Lernprozessgestaltung)? ",
        helperText: "3. Welche Kompetenzen werden vermittelt?",
      },
    ],
    options: {
      yes: { label: "Ja", value: "1" },
      no: { label: "Nein", value: "0" },
    },
    error: "Bitte wählen"
  },
  competenceFrameworkSelect: {
    options: {
      greta: { label: "GRETA", value: "GRETA" },
      esco: { label: "ESCO", value: "ESCO" },
      digCompEdu: { label: "DigCompEdu", value: "DigCompEdu" },
      digCompEsco: { label: "DigCompEsco", value: "DigCompeEsco" },
    },
    confirmButtonText: "Vorschläge Generieren",
    refreshButtonText: "Neue Vorschläge Laden",
    helperText:
      "Die KI hat passende GRETA-Kompetenzen für Sie erkannt! Wählen Sie einen Aspekt aus, um die vorgeschlagenen Kompetenzfacetten zu sehen und Ihre Auswahl bei Bedarf anzupassen.",
    errorLoadingSkills: "Die KI konnte leider keine Kompetenzvorschläge generieren. Bitte passen Sie die Kursbeschreibung an und versuchen Sie es erneut. Alternativ können Sie auch manuell Kompetenzen auswählen.",
    maxSkillsWarning: "Es können maximal 5 Kompetenzfacetten ausgewählt werden. Sie können Häkchen deaktivieren und dafür eine andere Kompetenz auswählen."
  },
  courseTitle: {
    label: "Kurstitel",
    helperText: "Titel des Kurses",
    error: "Der Kurstitel darf nicht leer sein",
  },
  courseDescription: {
    label: "Kursbeschreibung",
    helperText: "Beschreibung des Kurses",
  },
  courseUrl: {
    label: "Kurs-URL",
    helperText: "Link, der zu dem Kursangebot führt",
    errorEmpty: "Die Kurs-URL darf nicht leer sein",
    errorInvalid: "Bitte eine gültige URL eingeben. Beispiel: www.weiterbildung.de/kurse/kommunikation001",
  },
  courseStart: {
    label: "Kursstart",
    helperText: "Datum und Zeitpunkt, an dem der Kurs beginnt",
  },
  courseEnd: {
    label: "Kursende",
    helperText: "Datum und Zeitpunkt, an dem der Kurs endet",
  },
  courseExpires: {
    label: "Kursablaufdatum",
    helperText: "Datum, an dem der Kurs nicht mehr zugänglich ist",
  },
  duration: {
    label: "Kursdauer",
    helperText: "Gesamtdauer des Kurses",
  },
  licenseIdentifier: {
    label: "Kurs-Lizenz",
    helperText: "Lizenz des Kursmaterials",
    error: "Bitte wähle eine Lizenz aus",
    options: [
      { label: "Proprietär", value: "proprietary", url: null },
      {
        label: "Creative Commons Namensnennung (CC BY 4.0)",
        value: "CC-BY-4.0",
        url: "https://spdx.org/licenses/CC-BY-4.0.html",
      },
      {
        label:
          "Creative Commons Namensnennung - Weitergabe unter gleichen Bedingungen (CC BY-SA 4.0)",
        value: "CC-BY-SA-4.0",
        url: "https://spdx.org/licenses/CC-BY-SA-4.0.html",
      },
      {
        label:
          "Creative Commons Namensnennung - Nicht kommerziell (CC BY-NC 4.0)",
        value: "CC-BY-NC-4.0",
        url: "https://spdx.org/licenses/CC-BY-NC-4.0.html",
      },
      {
        label: "MIT Licence",
        value: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      {
        label: "Apache Licence 2.0",
        value: "Apache-2.0",
        url: "https://spdx.org/licenses/Apache-2.0.html",
      },
    ],
  },
  publisherName: {
    label: "Publisher",
    helperText: "Name des Publishers",
    error: "Publisher darf nicht leer sein",
    infoTooltip: "Die Organisation oder Person, die den Kurs veröffentlicht hat. Beispiel: Schöner Lernen AG oder Lisa Mustermann. ",
  },
  publisherType: {
    label: "Publisher Typ",
    helperText: "Handelt es sich beim Publisher um eine Person oder Organisation?",
    error: "Bitte wählen",
  },
  creatorName: {
    label: "Creator",
    helperText: "Name des Creators",
    error: "Creator darf nicht leer sein",
    infoTooltip: "Die Organisation oder Person, die die Lernmaterialien erstellt hat. Beispiel: Schöner Lernen AG oder Lisa Mustermann. Hinweis: Creator und Publisher können identisch sein. "
  },
  creatorType: {
    label: "Creator Typ",
    helperText: "Handelt es sich beim Creator um eine Person oder Organisation?",
    error: "Bitte wählen",
  },
  courseType: {
    label: "Kursart",
    helperText: "Findet der Kurs in Präsenz, Live-Online oder Online on Demand statt?",
    options: {
      präsenz: { label: "Präsenz", value: "onsite, synchronous" },
      online_sync: { label: "Live-Online", value: "online, synchronous" },
      online_async: { label: "Online on Demand", value: "online, asynchronous" }
    },
  },
  inLanguage: {
    label: "Sprache des Kurses",
    helperText: "In welcher Sprache wird der Kurs angeboten?",
    options: [
      { value: "de", label: "Deutsch" },
      { value: "en", label: "English" },
      { value: "fr", label: "Français" },
      { value: "es", label: "Español" },
    ],
  },
  keywords: {
    label: "Keywords",
    helperText: "Stichworte, die den Kurs beschreiben (durch Kommas getrennt)",
  },
  access: {
    label: "Zugang",
    helperText: "Wie kann auf den Kurs zugegriffen werden?",
    options: [
      { label: "Kostenlos", value: "free" },
      { label: "Kostenpflichtig", value: "paid" },
      { label: "Nur für Studenten", value: "student" },
      { label: "Sonstiges", value: "other" },
    ],
  },
  metadataFramework: {
    label: "Metadaten Schema",
    helperText:
      "In welchem Format/Schema die Kursinformationen gespeichert werden sollen",
    options: {
      amb: {
        label: "AMB (Allgemeines Metadatenprofil für Bildungsressourcen)",
        value: "amb",
      },
      moochub: { label: "MOOChub", value: "moochub" },
      pushConnector: { label: "Push Connector", value: "pushConnector" },
    },
  },
  organizational: {
    address: "Adresse",
    timeStartEnd: "Kursstart und -ende",
    duration: "Kursdauer",
  },
  locationName: {
    label: "Veranstaltungsort",
    helperText: "z.B. Freie Universität Berlin",
  },
  locationStreetNumber: {
    label: "Straße und Hausnummer",
    helperText: "z.B. Töpferstraße 4",
  },
  locationZip: {
    label: "Postleitzahl",
    helperText: "z.B. 13187",
  },
  locationCity: {
    label: "Ort / Stadt",
    helperText: "z.B. Berlin",
  },
  courseCompetenceFramework: {
    label: "Kompetenz System",
    helperText: "Einheitliche Klassifikation von Fähigkeiten z.B ESCO / GRETA",
  },
  stepper: {
    buttons: {
      next: "Weiter",
      back: "Zurück",
      skip: "Überspringen",
      reset: "Neu Starten",
      finish: "Abschließen",
    },
    steps: [
      "Passt mein Angebot?",
      "Inhaltliche Angaben",
      "Organisatorische Angaben",
      "Kompetenzen",
      "Level wählen",
      "Download"
    ],
  },
  skillLevelSelect: {
    helperText:
      "Bestimmen Sie hier, auf welcher Lernzielstufe die jeweilige Kompetenz in Ihrem Kurs gestärkt wird. Wenn Sie sich unsicher sind, können Sie diesen Schritt einfach überspringen; Ihre bisherigen Angaben bleiben erhalten.",
    noSkillsSelected: "Bitte wählen Sie zunächst mindestens eine Kompetenzfacette aus, um die Lernzielstufen festzulegen.",
  },
  finish: {
    info: "Alles geschafft - Ihr Datenset wurde erstellt!",
    helpertext: "Ihre Metadaten-Datei wurde erfolgreich erstellt. Sie können sie jetzt im MOOChub-Format herunterladen oder bei Bedarf einen neuen Durchlauf starten. Die fertige Datei können Sie für Ihre Anbindung an den TrainSpot verwenden.",
    buttons: {
      download: "Datei herunterladen",
      assessment: "Assessment anzeigen",
      connect: "Kurs anbinden",
      downloadGretaLabel: "GRETA-Label herunterladen"
    },
    buttonHelperText: "Die Datei wird im technisch lesbaren JSON-Format zur Verfügung gestellt. "

  },
};

export {form };
