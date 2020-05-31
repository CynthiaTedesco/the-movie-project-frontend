import { isValid } from "date-fns";
import AGES from "@/constants/ages.js";
import BUDGETS from "@/constants/budgets.js";
import WORD_COUNTS from "@/constants/wordCounts.js";
import LENGTHS from "@/constants/lengths.js";
import MONTHS from "@/constants/months.js";

export function beautifyCashValue(labelValue) {
  // Nine Zeroes for Billions
  // Math.abs(Number(labelValue)) >= 1.0e+9

  // Six Zeroes for Millions
  return Math.abs(Number(labelValue)) >= 1.0e6
    ? Math.floor(Math.abs(Number(labelValue)) / 1.0e6) + "M$"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? Math.floor(Math.abs(Number(labelValue)) / 1.0e3) + "K$"
    : Math.floor(Math.abs(Number(labelValue)));
}
export function isMobile() {
  return document.documentElement.clientWidth <= 860;
}
export function slices() {
  if (!document) {
    return 50;
  }
  return isMobile() ? 20 : 50;
}
export function calculateAge(birthdate, releaseDate) {
  if (!birthdate || !releaseDate) {
    return "";
  }
  if (!isValid(new Date(birthdate)) || !isValid(new Date(releaseDate))) {
    return "";
  }

  const diff_ms =
    new Date(releaseDate).getTime() - new Date(birthdate).getTime();
  const age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
}

export function winnerKey(keyword, singleKeyword) {
  return keyword + (singleKeyword ? `-${singleKeyword}` : "");
}

export function sanitizedId(attr, category) {
  return (
    attr +
    category
      .split(" ")
      .join("-")
      .split(".")
      .join("--")
  );
}

export function getAgesGroups(base) {
  const temp = AGES.map((ageLabel) => {
    return [ageLabel, []];
  });

  Object.entries(base).map((entry) => {
    const age = entry[0];
    const movies = entry[1];
    if (age <= 15) {
      temp[0][1] = temp[0][1].concat(movies);
    } else if (age <= 20) {
      temp[1][1] = temp[1][1].concat(movies);
    } else if (age <= 25) {
      temp[2][1] = temp[2][1].concat(movies);
    } else if (age <= 30) {
      temp[3][1] = temp[3][1].concat(movies);
    } else if (age <= 35) {
      temp[4][1] = temp[4][1].concat(movies);
    } else if (age <= 40) {
      temp[5][1] = temp[5][1].concat(movies);
    } else if (age <= 45) {
      temp[6][1] = temp[6][1].concat(movies);
    } else if (age <= 50) {
      temp[7][1] = temp[7][1].concat(movies);
    } else if (age <= 55) {
      temp[8][1] = temp[8][1].concat(movies);
    } else if (age <= 60) {
      temp[9][1] = temp[9][1].concat(movies);
    } else if (age >= 60) {
      temp[10][1] = temp[10][1].concat(movies);
    }
  });

  return temp;
}
export function getWordCountsGroups(base) {
  const temp = WORD_COUNTS.map((wordCountLabel) => {
    return [wordCountLabel, []];
  });
  Object.entries(base).map((entry) => {
    const count = entry[0];
    const movies = entry[1];
    if (count <= 40) {
      temp[0][1] = temp[0][1].concat(movies);
    } else if (count <= 50) {
      temp[1][1] = temp[1][1].concat(movies);
    } else if (count <= 60) {
      temp[2][1] = temp[2][1].concat(movies);
    } else if (count <= 70) {
      temp[3][1] = temp[3][1].concat(movies);
    } else if (count <= 80) {
      temp[4][1] = temp[4][1].concat(movies);
    } else if (count <= 90) {
      temp[5][1] = temp[5][1].concat(movies);
    } else if (count > 91) {
      temp[6][1] = temp[6][1].concat(movies);
    }
  });

  return temp;
}
export function getLengthsGroups(base) {
  const temp = LENGTHS.map((lengthLabel) => {
    return [lengthLabel, []];
  });
  Object.entries(base).map((entry) => {
    const length = entry[0];
    const movies = entry[1];
    if (length <= 100) {
      temp[0][1] = temp[0][1].concat(movies);
    } else if (length <= 110) {
      temp[1][1] = temp[1][1].concat(movies);
    } else if (length <= 120) {
      temp[2][1] = temp[2][1].concat(movies);
    } else if (length <= 130) {
      temp[3][1] = temp[3][1].concat(movies);
    } else if (length <= 140) {
      temp[4][1] = temp[4][1].concat(movies);
    } else if (length <= 150) {
      temp[5][1] = temp[5][1].concat(movies);
    } else if (length <= 160) {
      temp[6][1] = temp[6][1].concat(movies);
    } else if (length <= 170) {
      temp[7][1] = temp[7][1].concat(movies);
    } else if (length > 170) {
      temp[8][1] = temp[8][1].concat(movies);
    }
  });

  return temp;
}
export function getBudgetsGroups(base) {
  const temp = BUDGETS.map((budgetLabel) => {
    return [budgetLabel, []];
  });
  Object.entries(base).map((entry) => {
    const budget = entry[0] / 10e5;
    const movies = entry[1];
    if (budget < 100) {
      temp[0][1] = temp[0][1].concat(movies);
    } else if (budget < 150) {
      temp[1][1] = temp[1][1].concat(movies);
    } else if (budget < 200) {
      temp[2][1] = temp[2][1].concat(movies);
    } else if (budget < 250) {
      temp[3][1] = temp[3][1].concat(movies);
    } else if (budget < 300) {
      temp[4][1] = temp[4][1].concat(movies);
    } else if (budget < 350) {
      temp[5][1] = temp[5][1].concat(movies);
    } else {
      temp[6][1] = temp[6][1].concat(movies);
    }
  });

  return temp;
}
export function getMonthsGroups(base) {
  const temp = MONTHS.map((monthLabel) => {
    return [monthLabel, []];
  });

  Object.entries(base).map((entry) => {
    const month = entry[0];
    const movies = entry[1];
    if (month === "01") {
      temp[0][1] = temp[0][1].concat(movies);
    } else if (month === "02") {
      temp[1][1] = temp[1][1].concat(movies);
    } else if (month === "03") {
      temp[2][1] = temp[2][1].concat(movies);
    } else if (month === "04") {
      temp[3][1] = temp[3][1].concat(movies);
    } else if (month === "05") {
      temp[4][1] = temp[4][1].concat(movies);
    } else if (month === "06") {
      temp[5][1] = temp[5][1].concat(movies);
    } else if (month === "07") {
      temp[6][1] = temp[6][1].concat(movies);
    } else if (month === "08") {
      temp[7][1] = temp[7][1].concat(movies);
    } else if (month === "09") {
      temp[8][1] = temp[8][1].concat(movies);
    } else if (month === "10") {
      temp[9][1] = temp[9][1].concat(movies);
    } else if (month === "11") {
      temp[10][1] = temp[10][1].concat(movies);
    } else if (month === "12") {
      temp[11][1] = temp[11][1].concat(movies);
    }
  });

  return temp;
}
export function simpleGroups(base) {
  return Object.entries(base).sort((a, b) => b[1].length - a[1].length);
}
export function calculateWinner(groups) {
  return [...groups].sort((group1, group2) => {
    const total1 = group1[1]
      .map((a) => parseFloat(a.revenue))
      .reduce((a, b) => a + b, 0);
    const total2 = group2[1]
      .map((a) => parseFloat(a.revenue))
      .reduce((a, b) => a + b, 0);

    return total2 - total1;
  })[0][0];
}

export function groupByObject(movies, key) {
  return movies.reduce((rv, x) => {
    const innerKey = x[key] ? x[key].name : "";

    if (innerKey) {
      (rv[innerKey] = rv[innerKey] || []).push(x);
    }
    return rv;
  }, {});
}
export function groupByKeywordFn(movies, keywordFn) {
  return movies.reduce((rv, x) => {
    const innerKey = keywordFn(x);

    if (innerKey) {
      (rv[innerKey] = rv[innerKey] || []).push(x);
    }
    return rv;
  }, {});
}
export function groupByManyWithInnerKey(movies, key, props) {
  const { singleKeyword, primaryKey = "primary" } = props;

  return movies.reduce((rv, x) => {
    let innerKey;

    const primary = x[key].find((a) => a[primaryKey]);
    innerKey = primary ? primary[singleKeyword] : "";

    if (innerKey) {
      (rv[innerKey] = rv[innerKey] || []).push(x);
    }
    return rv;
  }, {});
}
export function groupByPlain(movies, key) {
  return movies.reduce((rv, x) => {
    const innerKey = x[key];

    if (innerKey) {
      (rv[innerKey] = rv[innerKey] || []).push(x);
    }
    return rv;
  }, {});
}
