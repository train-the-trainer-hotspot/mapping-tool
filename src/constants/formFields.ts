const suitabilityFields = [
  "suitableQ1",
  "suitableQ2",
  "suitableQ3",
]

const contentFields = [
  "courseTitle",
  "courseDescription",
  "courseUrl",
  "licenseIdentifier",
  "publisherName",
  "publisherType",
  "creatorName",
  "creatorType",
  "inLanguage",
  "keywords",
  "access",
];
const organizationalFieldsOnsite = [
  "courseType",
  "courseStart",
  "courseEnd",
  "locationName",
  "locationStreetNumber",
  "locationZip",
  "locationCity",
  "durationValue",
  "courseExpires",
];
const organizationalFieldsOnline = [
  "courseType",
  "courseStart",
  "courseEnd",
  "courseExpires",
  "durationValue",
];

export {
  contentFields,
  organizationalFieldsOnline,
  organizationalFieldsOnsite,
  suitabilityFields,
};
