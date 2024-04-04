// src/utils/tools/get-sluged.ts
function getSluged(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
}

export {
  getSluged
};
