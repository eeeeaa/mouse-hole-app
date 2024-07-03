import { decode } from "html-entities";

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

/**
 *
 * @param {string} text
 * @returns
 */
export const unicodeDecode = (text) => {
  return replaceAll(decode(text), "&#x27;", "'");
};
