# WBS Databridge

## Projektbeschreibung

**WBS Databridge** ist ein Metadatentool, das Weiterbildungsanbietern die Anbindung ihrer Weiterbildungskurse an digitale Datenräume erleichtern soll. Die Anwendung unterstützt Nutzer:innen schrittweise bei der Erstellung einer maschinenlesbaren Metadaten-Datei (JSON), die dem Moochub-Standard entspricht.

Durch die automatische Generierung standardisierter Metadaten und die Verwendung des GRETA Kompetenzmodells wird die Auffindbarkeit und Interoperabilität  von Weiterbildungskursen unterstützt.

## Features

- **Moochub-Standard**: Alle Eingaben werden in den Moochub-Standard transformiert.
- **GRETA-Kompetenzmodell**: Mithilfe von [Wisy@KI](https://github.com/ild-thl/wisyki-api) werden KI-basiert Kompetenzvorschläge auf Basis der gegebenen Kursbeschreibung generiert.

## Installation

1. Repository klonen:
  ```bash
  git clone git@github.com:train-the-trainer-hotspot/mapping-tool.git
  ```
2. In das Projektverzeichnis wechseln:
  ```bash
  cd wbs-databridge
  ```
3. Abhängigkeiten installieren:
  ```bash
  npm install
  ```
4. Addresse in nginx.conf und vite.config.ts eintragen.

## Nutzung

1. Anwendung starten:
  ```bash
  npm start
  ```