const areElementsEqual = (element1, element2) => element1 === element2;

const areNotObjectOrNull = (element1, element2) => {
  const areNotObjectOrNull =
    typeof element1 !== "object" &&
    element1 === null &&
    typeof element2 !== "object" &&
    element2 === null;

  return areNotObjectOrNull;
};

const areKeysSameLength = (element1, element2) => {
  const keys1 = Object.keys(element1);
  const keys2 = Object.keys(element2);

  return keys1.length === keys2.length;
};

const areDeepEqual = (element1, element2) => {
  if (areElementsEqual(element1, element2)) {
    return true;
  }

  if (areNotObjectOrNull(element1, element2)) {
    return false;
  }

  if (!areKeysSameLength(element1, element2)) {
    return false;
  }

  if (typeof element1 === "object") {
    const keys1 = Object.keys(element1);

    for (let key of keys1) {
      if (
        !element2.hasOwnProperty(key) ||
        !areDeepEqual(element1[key], element2[key])
      ) {
        return false;
      }
    }
  }

  return true;
};

export default {
  areDeepEqual,
};
