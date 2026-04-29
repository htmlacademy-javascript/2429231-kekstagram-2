const MAX_HASHTAG_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]+$/i;

const normalizeHashtags = (value) => value
  .trim()
  .toLowerCase()
  .split(/\s+/)
  .filter((hashtag) => hashtag.length > 0);

const hasValidHashtagCount = (value) =>
  normalizeHashtags(value).length <= MAX_HASHTAG_COUNT;

const hasValidHashtagLength = (value) =>
  normalizeHashtags(value).every((hashtag) => hashtag.length <= MAX_HASHTAG_LENGTH);

const hasValidHashtagFormat = (value) =>
  normalizeHashtags(value).every((hashtag) =>
    hashtag.startsWith('#') &&
    hashtag.length > 1 &&
    HASHTAG_REGEXP.test(hashtag)
  );

const hasUniqueHashtags = (value) => {
  const hashtags = normalizeHashtags(value);
  return hashtags.length === new Set(hashtags).size;
};

export {
  hasValidHashtagCount,
  hasValidHashtagLength,
  hasValidHashtagFormat,
  hasUniqueHashtags
};
